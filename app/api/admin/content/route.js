import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminTokenFromRequest, verifyAdminToken } from '@/lib/admin-auth';

// GET - Fetch all content items
export async function GET(request) {
  try {
    const token = getAdminTokenFromRequest(request);
    const admin = await verifyAdminToken(token);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const isActive = searchParams.get('isActive');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where = {};
    if (type) where.type = type;
    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const [contents, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.content.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      contents,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// POST - Create new content item
export async function POST(request) {
  try {
    const token = getAdminTokenFromRequest(request);
    const admin = await verifyAdminToken(token);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.type || !data.titleEn || !data.descriptionEn) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const content = await prisma.content.create({
      data: {
        type: data.type,
        titleEn: data.titleEn,
        titleHi: data.titleHi || null,
        descriptionEn: data.descriptionEn,
        descriptionHi: data.descriptionHi || null,
        imageUrl: data.imageUrl || null,
        price: data.price ? parseFloat(data.price) : null,
        category: data.category || null,
        isActive: data.isActive !== undefined ? data.isActive : true,
        order: data.order || 0,
        metadata: data.metadata || null
      }
    });

    return NextResponse.json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}

// PATCH - Update content item
export async function PATCH(request) {
  try {
    const token = getAdminTokenFromRequest(request);
    const admin = await verifyAdminToken(token);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    // Process price if provided
    if (updateData.price !== undefined && updateData.price !== null) {
      updateData.price = parseFloat(updateData.price);
    }

    const content = await prisma.content.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// DELETE - Delete content item
export async function DELETE(request) {
  try {
    const token = getAdminTokenFromRequest(request);
    const admin = await verifyAdminToken(token);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    await prisma.content.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}

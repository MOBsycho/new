import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch active content items (public endpoint)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    const where = { isActive: true };
    if (type) where.type = type;
    if (category) where.category = category;

    const contents = await prisma.content.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      contents
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

# 🚀 Quick Setup Guide - Get Started in 5 Minutes!

## ⚡ Step 1: Fix Database Connection (2 minutes)

Your current DATABASE_URL has a placeholder. Update it in `.env`:

**Current (Line 2 in .env):**
```
DATABASE_URL="postgresql://postgres:KARTIKPANWAr12345@db.xxx.supabase.co:5432/postgres..."
```

**Replace `db.xxx.supabase.co` with your actual Supabase URL:**

1. Go to: https://supabase.com/dashboard
2. Open your project
3. Settings → Database → Connection String
4. Copy the URI (looks like: `db.abcdefghijk.supabase.co`)
5. Replace `xxx` in your `.env` file

**Example:**
```
DATABASE_URL="postgresql://postgres:KARTIKPANWAr12345@db.abcdefghijk.supabase.co:5432/postgres?connection_limit=5&sslmode=require"
```

---

## ⚡ Step 2: Run Database Migration (1 minute)

```bash
cd /workspace/epic-petal-4967

# Generate Prisma client
bunx prisma generate

# Run migration to add Content table
bunx prisma migrate dev --name add_content_model
```

**Expected output:** "Migration applied successfully"

---

## ⚡ Step 3: Start the Server (1 minute)

```bash
# Start development server
bun run dev

# Visit: http://localhost:3000
```

---

## ⚡ Step 4: Test Admin Dashboard (1 minute)

1. **Open:** http://localhost:3000/admin/login

2. **Login with:**
   - Email: `your-admin@email.com`
   - Password: `YourSecurePassword123!`

3. **Click "Content" in sidebar**

4. **Click "+ Add New Content"**

5. **Create test content:**
   - Type: Service Card
   - Title (EN): Test Service
   - Description (EN): This is a test service
   - Check "Active"
   - Click "Create"

**Success!** You should see your content in the table.

---

## ⚡ Step 5: Test Donation Button (1 minute)

1. **Open:** http://localhost:3000

2. **Scroll to:** "Support Our Temple" section

3. **Click:** "Make a Donation" button

4. **Fill form:**
   - Project: Temple Maintenance
   - Amount: ₹501 (or custom)
   - Name: Your Name
   - Email: your@email.com

5. **Click:** "Proceed to Payment"

6. **Test Payment:**
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: Any future date
   - Click "Pay"

**Success!** You'll see a success message with receipt number.

---

## 🎉 You're All Set!

### What's Working:
✅ Dynamic content management
✅ Donation payments
✅ Service booking payments  
✅ Shop integration
✅ Admin dashboard

### Admin Dashboard Features:
- **Overview** - View stats
- **Content** - Add/edit/delete content
- **Bookings** - View bookings
- **Users** - Manage users

---

## 🧪 Quick Tests

### Test 1: Add Service Card
```
Admin → Content → + Add New Content
Type: SERVICE_CARD
Title: "Evening Aarti"
Description: "Join us for evening prayers"
Price: 751
Active: ✓
→ Create
```

### Test 2: Add Shop Product
```
Admin → Content → + Add New Content
Type: SHOP_PRODUCT
Title: "Rudraksha Mala"
Description: "108 beads blessed Rudraksha"
Price: 2501
Category: "Spiritual Items"
Active: ✓
→ Create
```

### Test 3: Test Donation
```
Homepage → Make a Donation
Project: Temple Maintenance
Amount: Custom → 1000
Fill details → Proceed to Payment
Use test card: 4111 1111 1111 1111
→ Success!
```

---

## 📋 Environment Variables (Already Set)

Your `.env` file is configured with:

✅ Database URL (needs actual Supabase URL)
✅ JWT secrets
✅ Razorpay test credentials
✅ Admin credentials
✅ Security settings

**Only change needed:** Update DATABASE_URL with real Supabase project ID

---

## 🆘 Common Issues

### "Can't reach database server"
→ Update DATABASE_URL with actual Supabase URL (see Step 1)

### "Payment failed"
→ Using test mode, use test card `4111 1111 1111 1111`

### "Unauthorized" in admin
→ Check credentials: `your-admin@email.com` / `YourSecurePassword123!`

### Content not showing
→ Make sure "Active" is checked when creating content

---

## 📞 Need Help?

Read detailed documentation:
- `IMPLEMENTATION_COMPLETE.md` - Full implementation details
- `ADMIN_SETUP.md` - Admin dashboard guide
- `PAYMENT_INTEGRATION_GUIDE.md` - Payment setup

---

**Total Setup Time: ~5 minutes**
**Ready to use: Immediately after Step 2!**

🕉️ **May Lord Kuber bless your temple website!** 🙏

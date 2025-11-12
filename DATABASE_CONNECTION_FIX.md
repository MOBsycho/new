# 🔧 Database Connection Troubleshooting

## Current Status

❌ **Cannot connect to database:** `db.rsqjcpzlpnhmmgwxsbrr.supabase.co`

**Error:** `Can't reach database server at db.rsqjcpzlpnhmmgwxsbrr.supabase.co:5432`

---

## 🎯 Quick Fix Steps

### Step 1: Check if Supabase Project is Active

1. Go to: https://supabase.com/dashboard
2. Open your project: **rsqjcpzlpnhmmgwxsbrr**
3. Check the status at the top

**If it says "PAUSED":**
- Click "Resume Project" or "Restore"
- Wait 2-3 minutes for it to start
- Then try the migration again

### Step 2: Verify Database Password

Your password contains special characters: `KARTIKpanwar@12345`

**Check in Supabase:**
1. Dashboard → Project Settings → Database
2. Look for "Database Password" section
3. If you forgot it, click "Reset Database Password"
4. Copy the new password
5. Update `.env` file

**Format for password with @ symbol:**
- Original: `KARTIKpanwar@12345`
- URL-encoded: `KARTIKpanwar%4012345` ← Already done in .env

### Step 3: Get Fresh Connection String

1. **Supabase Dashboard** → Your Project
2. **Settings** (gear icon) → **Database**
3. Scroll to **Connection string**
4. Select **"URI"** tab (not Session mode)
5. Copy the full connection string
6. Replace `[YOUR-PASSWORD]` with your actual password

**Should look like:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.rsqjcpzlpnhmmgwxsbrr.supabase.co:5432/postgres
```

### Step 4: Try Alternative Connection Ports

Supabase has different connection modes:

**Direct Connection (Port 5432):**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.rsqjcpzlpnhmmgwxsbrr.supabase.co:5432/postgres"
```

**Pooled Connection (Port 6543):**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.rsqjcpzlpnhmmgwxsbrr.supabase.co:6543/postgres?pgbouncer=true"
```

**Session Mode (Port 5432 with parameter):**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.rsqjcpzlpnhmmgwxsbrr.supabase.co:5432/postgres?sslmode=require"
```

---

## 🔍 Detailed Troubleshooting

### Check 1: Project Status

**Supabase Free Tier:**
- Projects pause after 7 days of inactivity
- Need to manually resume
- Takes 2-3 minutes to become active

**How to Resume:**
1. Visit: https://supabase.com/dashboard/project/rsqjcpzlpnhmmgwxsbrr
2. If paused, click "Resume" button
3. Wait for green "Active" status

### Check 2: Network Settings

**IP Restrictions:**
1. Supabase Dashboard → Settings → Database
2. Look for "Network Restrictions"
3. If enabled, add current IP or disable temporarily

**SSL/TLS:**
Some networks require SSL:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.rsqjcpzlpnhmmgwxsbrr.supabase.co:5432/postgres?sslmode=require"
```

### Check 3: Password Special Characters

Your password: `KARTIKpanwar@12345`

**Special characters that need encoding:**
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `^` → `%5E`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

**Your encoded password:** `KARTIKpanwar%4012345`

### Check 4: Test Connection Manually

Try connecting via command line:

```bash
# Install psql if needed (optional)
# On Ubuntu/Debian: sudo apt-get install postgresql-client
# On Mac: brew install postgresql

# Test connection
psql "postgresql://postgres:KARTIKpanwar%4012345@db.rsqjcpzlpnhmmgwxsbrr.supabase.co:5432/postgres"
```

---

## ✅ Once Connection Works

After you fix the connection issue, run:

```bash
cd /workspace/epic-petal-4967

# 1. Generate Prisma Client
bunx prisma generate

# 2. Run Migration (adds Content table)
bunx prisma migrate dev --name add_content_model

# 3. Verify with Prisma Studio
bunx prisma studio
```

**Expected Result:**
- ✅ Migration creates `contents` table
- ✅ All existing tables remain intact
- ✅ You can view tables in Prisma Studio

---

## 🆘 Still Not Working?

### Option 1: Create New Supabase Project

If the project is corrupted or unavailable:

1. **Create New Project:**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Name: "kuberji-temple-new"
   - Region: India (or closest)
   - Strong password (save it!)

2. **Get New Connection String:**
   - Settings → Database → Connection String
   - Copy URI format

3. **Update .env:**
   ```env
   DATABASE_URL="postgresql://postgres:NEW_PASSWORD@db.NEW_PROJECT_ID.supabase.co:5432/postgres"
   ```

4. **Run Initial Setup:**
   ```bash
   bunx prisma migrate dev --name init
   bunx prisma db seed
   ```

### Option 2: Use Prisma Studio to Check

Open Prisma Studio to browse existing data:

```bash
bunx prisma studio
```

If this opens successfully, your connection is working!

### Option 3: Check Supabase Status

Check if Supabase is having issues:
- Visit: https://status.supabase.com
- Look for any reported incidents

---

## 📝 What I've Already Done

✅ **Created .env file** with your credentials
✅ **URL-encoded password** (`@` → `%40`)
✅ **Updated Prisma schema** with Content model
✅ **Generated Prisma client**
❌ **Migration pending** (waiting for database connection)

---

## 🎯 Next Steps After Connection Fixed

Once you run the migration successfully:

### 1. Verify Tables
```bash
bunx prisma studio
```

You should see:
- ✅ users
- ✅ services
- ✅ bookings
- ✅ payments
- ✅ livestreams
- ✅ settings
- ✅ **contents** (NEW!)

### 2. Test Admin Dashboard
```bash
# Start server
bun run dev

# Visit
http://localhost:3000/admin/login

# Login
Email: your-admin@email.com
Password: YourSecurePassword123!

# Navigate to Content section
# Click "+ Add New Content"
```

### 3. Add Sample Content
Create test content items:
- Service Card
- Donation Project
- Shop Product

### 4. Test Frontend
Visit homepage and see if you can fetch content from database.

---

## 💡 Most Common Solution

**90% of the time, this is the issue:**

1. Supabase project is **PAUSED**
2. Go to dashboard
3. Click **"Resume Project"**
4. Wait 2 minutes
5. Try migration again

**That should fix it!**

---

## 📞 Need Help?

If none of this works, please provide:

1. Screenshot of Supabase project dashboard (showing status)
2. Error message when trying to connect
3. Confirmation that password is correct

I'll help you troubleshoot further!

---

**Current Connection String in .env:**
```
postgresql://postgres:KARTIKpanwar%4012345@db.rsqjcpzlpnhmmgwxsbrr.supabase.co:5432/postgres
```

**Try this after resuming project:**
```bash
bunx prisma migrate dev --name add_content_model
```

🕉️ **Once connected, everything will work perfectly!**

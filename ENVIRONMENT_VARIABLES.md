# Environment Variables Documentation

This document explains all the environment variables required to run the Kuberji Mandir application.

## 📋 Quick Setup

1. Copy the example below into a new file named `.env.local` in the project root
2. Replace placeholder values with your actual credentials
3. Restart the development server

## 🔐 Required Environment Variables

### Database Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Supabase or any PostgreSQL database) | `postgresql://user:pass@host:port/database` |

**Format:** `postgresql://[username]:[password]@[host]:[port]/[database]`

### JWT Authentication

| Variable | Description | Default | Notes |
|----------|-------------|---------|-------|
| `JWT_SECRET` | Secret key for signing access tokens | - | Generate with: `openssl rand -base64 32` |
| `JWT_REFRESH_SECRET` | Secret key for signing refresh tokens | - | Generate with: `openssl rand -base64 32` |
| `JWT_EXPIRES_IN` | Access token expiration time | `7d` | Examples: `15m`, `1h`, `7d`, `30d` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration time | `30d` | Examples: `7d`, `30d`, `90d` |

### Password Security

| Variable | Description | Default | Notes |
|----------|-------------|---------|-------|
| `BCRYPT_ROUNDS` | Number of salt rounds for password hashing | `12` | Higher = more secure but slower (10-14 recommended) |

### Application URLs

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Public URL of your application | `http://localhost:3000` (dev)<br>`https://yoursite.com` (prod) |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

### Node Environment

| Variable | Description | Values |
|----------|-------------|--------|
| `NODE_ENV` | Runtime environment | `development`, `production`, `test` |

### Payment Gateway (Razorpay)

| Variable | Description | Example | Where to Find |
|----------|-------------|---------|---------------|
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | `rzp_test_xxxxx` (test)<br>`rzp_live_xxxxx` (prod) | [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys) |
| `RAZORPAY_KEY_SECRET` | Razorpay API Key Secret | `your_secret_key` | [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys) |

**Important:** Use test keys (`rzp_test_`) for development and live keys (`rzp_live_`) for production.

### Admin Panel

| Variable | Description | Example | Notes |
|----------|-------------|---------|-------|
| `ADMIN_EMAIL` | Default admin email address | `admin@temple.com` | Used for admin login |
| `ADMIN_PASSWORD` | Default admin password | `SecurePass123!` | Change after first login |
| `ADMIN_JWT_SECRET` | JWT secret for admin authentication | - | Generate with: `openssl rand -hex 32` |

## 📝 Example .env.local File

```bash
# Database Configuration
DATABASE_URL="postgresql://postgres.cihusfkffzabidekykmj:KARTIKpanwar12345@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"

# JWT Configuration
JWT_SECRET="7siHrFaTMZF85bGAzFuTDZErIzGTu76i9YNAD0wRhtk="
JWT_REFRESH_SECRET="vGZKF277gDjEYoGdvieuoYgWm+fjrzqKazpysOjuD1Y="
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"

# Password Hashing
BCRYPT_ROUNDS=12

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_RcM9bBHq7JgeFD
RAZORPAY_KEY_SECRET=y8JqNAyjUl63W7fc6as0q3Dw

# Admin Credentials
ADMIN_EMAIL="your-admin@email.com"
ADMIN_PASSWORD="YourSecurePassword123!"
ADMIN_JWT_SECRET="9649d0ad168b2fde8c99bccf244e21738a2d07acda925a667da66f49337bf8ea"
```

## 🔒 Security Best Practices

### Development Environment

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use test API keys** - Always use sandbox/test keys for Razorpay
3. **Share securely** - Use password managers or secure channels to share credentials

### Production Environment

1. **Use environment-specific secrets** - Generate new secrets for production
2. **Enable live payment keys** - Switch to Razorpay live keys
3. **Strong admin password** - Use a password manager to generate strong passwords
4. **Restrict database access** - Use IP whitelisting on your database
5. **HTTPS only** - Ensure `NEXT_PUBLIC_APP_URL` uses HTTPS in production
6. **Regular rotation** - Rotate JWT secrets and API keys periodically

## 🔧 Generating Secure Secrets

### JWT Secrets (Base64)
```bash
openssl rand -base64 32
```

### Admin JWT Secret (Hex)
```bash
openssl rand -hex 32
```

### Using Node.js
```javascript
// Run in Node.js console
require('crypto').randomBytes(32).toString('base64')  // For JWT
require('crypto').randomBytes(32).toString('hex')     // For Admin JWT
```

## 🚀 Getting Started

### 1. Database Setup (Supabase)

1. Create a project at [Supabase](https://supabase.com)
2. Go to **Settings** → **Database**
3. Copy the **Connection Pooling** string (port 6543)
4. Paste it as your `DATABASE_URL`

### 2. Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com)
2. Go to **Settings** → **API Keys**
3. Generate test keys for development
4. Copy **Key ID** and **Key Secret**

### 3. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed initial data
npm run seed
```

### 4. Start the Application

```bash
npm run dev
# or
bun dev
```

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Prisma Connection URLs](https://www.prisma.io/docs/reference/database-reference/connection-urls)
- [Razorpay API Documentation](https://razorpay.com/docs/api/)
- [Supabase Documentation](https://supabase.com/docs)

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test database connection
npx prisma db pull
```

**Common Issues:**
- ❌ Wrong port (use 6543 for pooling, 5432 for direct)
- ❌ IP not whitelisted in Supabase
- ❌ Incorrect password or username
- ❌ SSL mode issues (add `?sslmode=require` if needed)

### JWT Token Issues

- Ensure secrets are **at least 32 characters** long
- Don't include quotes inside the secret value
- Restart the server after changing JWT secrets

### Razorpay Issues

- Test keys work only in test mode
- Verify key format: `rzp_test_` or `rzp_live_`
- Check if API keys are active in dashboard

## 📞 Support

If you encounter issues:

1. Check the logs: `npm run dev` or `pm2 logs`
2. Verify all required variables are set
3. Ensure database is accessible
4. Review [Troubleshooting Guide](./SUPABASE_TROUBLESHOOTING.md)

---

**Last Updated:** November 2024  
**Version:** 1.0.0

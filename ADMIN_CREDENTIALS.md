# Admin Portal Access 🔐

## Current Admin Credentials

**Login URL:** `/admin/login`

```
Email: admin@kuberjitemple.org
Password: Admin@123
```

## Testing

**API Test (Terminal):**
```bash
curl -X POST http://localhost:3002/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kuberjitemple.org","password":"Admin@123"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "email": "admin@kuberjitemple.org",
    "role": "admin"
  }
}
```

## Environment Variables

These credentials are set in `.env.local`:

```env
ADMIN_EMAIL=admin@kuberjitemple.org
ADMIN_PASSWORD=Admin@123
ADMIN_JWT_SECRET=9649d0ad168b2fde8c99bccf244e21738a2d07acda925a667da66f49337bf8ea
```

## Important Notes

1. **No quotes needed** in .env.local for these values
2. Credentials are case-sensitive
3. After changing .env.local, restart the app: `pm2 restart repo-app`
4. In development, credentials are logged to console for debugging

## Security

⚠️ **Remember to change these default credentials in production!**

For production:
1. Set strong unique password
2. Use environment-specific secrets
3. Enable HTTPS
4. Consider 2FA implementation

## Troubleshooting

### Login Failed?

1. **Check environment variables are loaded:**
   ```bash
   pm2 logs repo-app | grep "Admin Login"
   ```

2. **Verify credentials in .env.local:**
   ```bash
   cat .env.local | grep ADMIN
   ```

3. **Test API directly:**
   ```bash
   curl -X POST http://localhost:3002/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@kuberjitemple.org","password":"Admin@123"}'
   ```

4. **Restart application:**
   ```bash
   pm2 restart repo-app
   ```

### Still Not Working?

- Clear browser cookies
- Try incognito/private mode
- Check console logs for JavaScript errors
- Verify API endpoint is accessible

---

**Last Updated:** November 13, 2024  
**Status:** ✅ Working (API tested successfully)

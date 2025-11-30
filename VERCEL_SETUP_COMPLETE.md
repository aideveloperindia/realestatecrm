# Vercel Deployment - Complete Setup Guide

## The 500 Error on Login - Root Cause

The 500 error happens because:
1. **Database is not seeded** - No admin user exists
2. **MongoDB connection might be failing** - Check environment variables

## Quick Fix for Vercel

### Step 1: Set Environment Variables in Vercel

Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

Add these **3 required variables**:

```
MONGODB_URI=mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm

JWT_SECRET=6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3

NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

**Important:**
- Select all environments: Production, Preview, Development
- Replace `your-app-name.vercel.app` with your actual Vercel URL after first deployment
- Make sure `MONGODB_URI` includes `/karimnagar_crm` (database name)

### Step 2: Check MongoDB Atlas

1. **IP Whitelist:**
   - MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Add `0.0.0.0/0` (allows all IPs - required for Vercel)
   - Or add specific Vercel IP ranges

2. **Database:**
   - Database `karimnagar_crm` will be created automatically on first write
   - Or create it manually if needed

### Step 3: Seed the Database

**Option A: Use the Seed API Route (Easiest)**

After deployment, call this endpoint once:

```bash
# Set a secret (optional but recommended)
# In Vercel, add: SEED_SECRET=your-random-secret

# Then call:
curl -X POST https://your-app.vercel.app/api/seed \
  -H "Authorization: Bearer your-random-secret"
```

Or use Postman/Thunder Client:
- Method: POST
- URL: `https://your-app.vercel.app/api/seed`
- Headers: `Authorization: Bearer your-random-secret`

**⚠️ IMPORTANT:** Delete `/app/api/seed/route.ts` after seeding for security!

**Option B: Use Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull env vars
vercel env pull .env.local

# Seed database
npm run seed
```

### Step 4: Test Login

1. Go to: `https://your-app.vercel.app/login`
2. Login with:
   - Email: `admin@karimnagar.properties`
   - Password: `Passw0rd!`
3. Change password immediately after first login!

## Troubleshooting 500 Errors

### Check Vercel Function Logs

1. Vercel Dashboard → Your Project
2. Go to "Deployments" tab
3. Click on latest deployment
4. Click "Functions" tab
5. Look for error messages

### Common Errors:

**"MONGODB_URI is not defined"**
- Solution: Add `MONGODB_URI` in Vercel environment variables
- Redeploy after adding

**"MongoServerError: Authentication failed"**
- Solution: Check MongoDB username/password in connection string
- Verify database user exists in MongoDB Atlas

**"MongoNetworkError"**
- Solution: Add `0.0.0.0/0` to MongoDB Atlas IP whitelist
- Check MongoDB Atlas cluster is running

**"User not found" or "Invalid credentials"**
- Solution: Database not seeded - run seed script
- Check admin email/password match environment variables

## Environment Variables Summary

### Required (3):
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Random secret for JWT tokens
- `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL

### Optional (for seed):
- `ADMIN_EMAIL` - Admin email (default: admin@karimnagar.properties)
- `ADMIN_PASSWORD` - Admin password (default: Passw0rd!)
- `SEED_SECRET` - Secret for seed API route

## After Successful Deployment

1. ✅ Seed the database (create admin user)
2. ✅ Test login
3. ✅ Change admin password
4. ✅ Delete `/app/api/seed/route.ts` (security)
5. ✅ Test all features

## Quick Test Checklist

- [ ] Environment variables set in Vercel
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Database seeded (admin user created)
- [ ] Can login with admin credentials
- [ ] Dashboard loads
- [ ] Can add/view properties, clients, customers
- [ ] WhatsApp links work

## Need Help?

Check Vercel logs for specific error messages. The improved error handling will now show more detailed errors in development mode.


# Vercel Deployment - Fixing 500 Errors

## Issue: 500 Error on Login

The 500 error on `/api/auth/login` is likely due to:

1. **Missing Environment Variables in Vercel**
2. **MongoDB Connection Issues**
3. **Database not seeded**

## Solution Steps

### Step 1: Verify Environment Variables in Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required Variables:**
```
MONGODB_URI=mongodb+srv://aideveloperindia_db_user:y3VndJC8SvQovBKY@realestatecrm.fiq02a1.mongodb.net/karimnagar_crm?retryWrites=true&w=majority&appName=realestatecrm

JWT_SECRET=6fa9e19fcca83be9b4eec7277bd48d171d07934c879bf67a3ba8fb2089a26ca3

NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

**Important:**
- Make sure `MONGODB_URI` includes the database name: `/karimnagar_crm`
- Set all three environments: Production, Preview, Development

### Step 2: Check MongoDB Atlas Settings

1. **IP Whitelist:**
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` to allow all IPs (or add Vercel IPs)
   - This is required for Vercel serverless functions

2. **Database User:**
   - Verify user `aideveloperindia_db_user` exists
   - Check password is correct
   - Ensure user has read/write permissions

3. **Database Name:**
   - Make sure database `karimnagar_crm` exists
   - Or create it (MongoDB creates on first write)

### Step 3: Seed the Database

After deployment, you need to seed the database. Options:

**Option A: Use Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run seed script
npm run seed
```

**Option B: Create a One-Time Seed API Route**

Create `app/api/seed/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    await connectDB();
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@karimnagar.properties';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Passw0rd!';
    
    // Check if admin exists
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      return NextResponse.json({ message: 'Admin user already exists' });
    }
    
    // Create admin
    const hashedPassword = await hashPassword(adminPassword);
    await User.create({ email: adminEmail, password: hashedPassword });
    
    return NextResponse.json({ 
      success: true,
      message: 'Admin user created',
      email: adminEmail,
      password: adminPassword
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

Then call: `POST https://your-app.vercel.app/api/seed`

**⚠️ IMPORTANT:** Delete this route after seeding for security!

### Step 4: Test Login

1. Go to your Vercel URL: `https://your-app.vercel.app/login`
2. Login with:
   - Email: `admin@karimnagar.properties`
   - Password: `Passw0rd!`

### Step 5: Check Vercel Logs

If still failing:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Go to "Functions" tab
4. Check logs for errors

Common errors:
- `MONGODB_URI is not defined` → Environment variable not set
- `MongoServerError: Authentication failed` → Wrong credentials
- `MongoNetworkError` → IP not whitelisted or network issue

## Quick Checklist

- [ ] MONGODB_URI set in Vercel (with database name)
- [ ] JWT_SECRET set in Vercel
- [ ] NEXT_PUBLIC_APP_URL set in Vercel
- [ ] MongoDB Atlas IP whitelist includes 0.0.0.0/0
- [ ] Database `karimnagar_crm` exists (or will be created)
- [ ] Admin user seeded in database
- [ ] Vercel deployment successful
- [ ] Checked Vercel function logs for errors

## Testing Locally

To test if environment variables work:
```bash
# Make sure .env file exists with correct values
npm run dev

# Try login
# Check terminal for any errors
```

## If Still Not Working

1. **Check Vercel Function Logs:**
   - Vercel Dashboard → Project → Deployments → Latest → Functions
   - Look for error messages

2. **Test MongoDB Connection:**
   ```bash
   # In Node.js
   const mongoose = require('mongoose');
   mongoose.connect(process.env.MONGODB_URI)
     .then(() => console.log('Connected'))
     .catch(err => console.error('Error:', err));
   ```

3. **Verify Environment Variables:**
   - In Vercel, check that variables are set for correct environment
   - Redeploy after adding variables

4. **Check Build Logs:**
   - Vercel Dashboard → Deployments → Build Logs
   - Look for any build-time errors


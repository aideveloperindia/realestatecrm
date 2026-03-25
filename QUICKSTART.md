# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Create `.env` file:
```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-random-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@karimnagar.properties
ADMIN_PASSWORD=Passw0rd!
```

### 3. Seed Database
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Login
- Go to http://localhost:3000
- Email: `admin@karimnagar.properties`
- Password: `Passw0rd!`

## First Steps After Login

1. **View Dashboard** - See overview of all data
2. **Add a Client** - Go to `/clients` and add a property seller
3. **Add a Property** - Go to `/properties` and add a property listing
4. **Add a Customer** - Go to `/customers` and add a buyer
5. **View Matches** - Click on a customer to see property matches
6. **Send WhatsApp** - Click "Send WhatsApp" on a match to generate a link

## Testing the Matching System

1. Create a customer with:
   - Budget: ₹20,00,000 - ₹50,00,000
   - Preferred types: apartment, house
   - Location: Karimnagar, Town Center

2. Create properties that match/don't match the criteria

3. View the customer's profile to see match scores

## CSV Import

1. Go to `/import`
2. Download example CSV from `examples/` folder
3. Modify with your data
4. Upload and review cleaning queue

## Important Notes

- **Change admin password** after first login!
- Phone numbers are auto-normalized to +91 format
- Customers must opt-in for WhatsApp (can be toggled in customer profile)
- Cleaning queue is stored in memory (will be lost on server restart)


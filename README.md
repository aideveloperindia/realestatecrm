# Karimnagar Properties CRM

A lean, production-ready CRM MVP for managing real estate properties, clients (sellers), and customers (buyers) with WhatsApp integration capabilities.

## Features

- **Single Admin Authentication**: Secure login with JWT stored in HttpOnly cookies
- **Client Management**: Manage property sellers (clients)
- **Customer Management**: Manage property buyers (customers) with opt-in tracking
- **Property Management**: List and manage properties with status tracking
- **Smart Matching**: Automatic property-to-customer matching based on type, location, and price
- **CSV Import**: Import clients, customers, and properties with data cleaning and normalization
- **WhatsApp Integration**: Generate wa.me links for manual messaging (ready for Cloud API integration)
- **Message Logging**: Audit trail of all message attempts
- **Data Cleaning**: Phone number normalization (E.164 format) and deduplication

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Authentication**: JWT with bcrypt password hashing
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB instance)
- Git

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd realestatecrm
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/karimnagar_crm?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin credentials (used by seed script only - change password after first login!)
ADMIN_EMAIL=admin@karimnagar.properties
ADMIN_PASSWORD=Passw0rd!
```

**Important**: 
- Replace `MONGODB_URI` with your MongoDB Atlas connection string
- Generate a strong random string for `JWT_SECRET`
- Change the admin password after first login!

### 3. Seed Database

Run the seed script to create an admin user and sample data:

```bash
npm run seed
```

This will create:
- Admin user (email: `admin@karimnagar.properties`, password: `Passw0rd!`)
- 2 sample clients (sellers)
- 3 sample customers (buyers)
- 5 sample properties

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Login with the admin credentials created by the seed script.

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key (same as local)
   - `NEXT_PUBLIC_APP_URL`: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
   - `ADMIN_EMAIL`: Admin email
   - `ADMIN_PASSWORD`: Admin password (for seed only)

### Step 3: Deploy

1. Click "Deploy"
2. Once deployed, run the seed script by:
   - Using Vercel CLI: `vercel env pull` then `npm run seed`
   - Or create a one-time API route to seed (not recommended for production)

### Step 4: Configure MongoDB Atlas

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is fine for MVP)
3. Create a database user
4. Whitelist IP addresses (or use `0.0.0.0/0` for Vercel)
5. Get your connection string and update `MONGODB_URI`

## Usage Guide

### Adding Data

#### Manual Entry
- **Clients**: Go to `/clients` and click "Add Client"
- **Customers**: Go to `/customers` and click "Add Customer"
- **Properties**: Go to `/properties` and click "Add Property"

#### CSV Import
1. Go to `/import`
2. Select import type (clients, customers, or properties)
3. Upload CSV file with expected columns
4. Review and resolve any flagged rows in the cleaning queue

### CSV Format

#### Clients CSV
Required columns: `name`, `phone`
Optional: `email`, `address`, `notes`

#### Customers CSV
Required columns: `name`, `phone`, `budget_min`, `budget_max`
Optional: `email`, `preferred_types` (comma-separated), `city`, `locality`, `district`

#### Properties CSV
Required columns: `title`, `type`, `price`, `city`
Optional: `locality`, `district`, `address`, `bedrooms`, `bathrooms`, `area`, `description`, `client_id`

### Matching Properties to Customers

1. Go to `/customers` and click on a customer
2. View the "Property Matches" section showing top 10 matches
3. Each match shows:
   - Match score (0-100)
   - Price score, location score, type match
   - Match reasons

### Sending WhatsApp Messages

1. Open a customer profile (`/customers/[id]`)
2. Scroll to property matches
3. Click "Send WhatsApp" on any property
4. A WhatsApp link will open in a new tab with a prefilled message
5. The message is logged in `/messages`

**Note**: The customer must have opted in for WhatsApp (or you'll get a confirmation prompt).

### Phone Number Normalization

The system automatically normalizes phone numbers to E.164 format:
- 10-digit numbers → `+91XXXXXXXXXX` (assumes India)
- Numbers starting with 0 → removes 0 and adds `+91`
- Numbers starting with 91 → adds `+`
- Already in E.164 format → kept as-is

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Clients
- `GET /api/clients` - List clients
- `POST /api/clients` - Create client
- `GET /api/clients/[id]` - Get client
- `PATCH /api/clients/[id]` - Update client
- `DELETE /api/clients/[id]` - Delete client

### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/customers/[id]` - Get customer
- `PATCH /api/customers/[id]` - Update customer
- `DELETE /api/customers/[id]` - Delete customer
- `GET /api/customers/[id]/matches` - Get property matches

### Properties
- `GET /api/properties` - List properties
- `POST /api/properties` - Create property
- `GET /api/properties/[id]` - Get property
- `PATCH /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Import
- `POST /api/import/csv` - Upload CSV file
- `GET /api/import/csv?queueId=...` - Get cleaning queue

### Messages
- `POST /api/messages/send` - Generate WhatsApp link and log message
- `GET /api/messages` - List messages

## Matching Algorithm

The matching score is calculated as:

```
finalScore = 100 * (0.5 * priceScore + 0.3 * locationScore + 0.2 * typeMatch)
```

- **Type Match**: 1 if property type matches customer preference, else 0
- **Location Score**: 
  - 1.0 for same locality
  - 0.7 for same city
  - 0.4 for same district
- **Price Score**: 
  - 1.0 if within budget range
  - Fuzzy match within ±20% of budget midpoint
  - Decreases beyond 20%

## Security Features

- Password hashing with bcrypt
- JWT tokens in HttpOnly cookies
- Rate limiting (50 messages per hour per user)
- Opt-in enforcement for WhatsApp messages
- Input validation and sanitization

## Next Steps / Future Enhancements

1. **WhatsApp Cloud API Integration**: Replace wa.me links with direct API sending
2. **Scheduled Messages**: Queue messages for later delivery
3. **Bulk Messaging**: Send to multiple customers at once
4. **Advanced Search**: Geolocation-based property search
5. **Analytics Dashboard**: Track conversion rates, popular properties
6. **Email Integration**: Send property details via email
7. **Document Management**: Upload property photos and documents
8. **Multi-user Support**: Add role-based access control
9. **Persistent Cleaning Queue**: Store in database instead of memory
10. **Export Functionality**: Export data to CSV/Excel

## Troubleshooting

### MongoDB Connection Issues
- Verify your `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

### Authentication Issues
- Clear browser cookies
- Check `JWT_SECRET` is set correctly
- Verify cookie settings match environment (http vs https)

### Import Issues
- Ensure CSV has correct column headers
- Check phone numbers are in valid format
- Review cleaning queue for flagged rows

## License

This project is proprietary software for Karimnagar Properties.

## Support

For issues or questions, please contact the development team.


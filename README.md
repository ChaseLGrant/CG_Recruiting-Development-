# CG Recruiting Platform

A professional recruiting and training platform for athletes, featuring subscription management, payment processing via Stripe, and comprehensive training packages.

## Features

- **Ultimate Athlete Package** - $399/month including:
  - 4 training sessions per month
  - Metric tracking
  - Full strength and conditioning program
  - Full recruiting advising
  - Social media building

- Stripe payment integration
- Subscription management
- PostgreSQL database
- Modern React frontend with TypeScript
- RESTful API with Node.js + Express

## Tech Stack

### Backend
- Node.js + Express + TypeScript
- PostgreSQL database
- Stripe API for payments
- JWT for authentication

### Frontend
- React 18
- TypeScript
- Vite
- Stripe Elements for payment UI

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Stripe account (test mode for development)

## Installation

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

Create a PostgreSQL database:

```bash
createdb cg_recruiting
```

### 3. Environment Configuration

#### Backend Environment

Copy the example environment file and configure it:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/cg_recruiting
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
```

**IMPORTANT SECURITY NOTE**: The Stripe API key provided should be stored in the `.env` file and NEVER committed to git. The `.gitignore` file is configured to prevent this.

#### Frontend Environment

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 4. Set Up Stripe Products and Prices

You need to create the Stripe products and prices that match your packages. You have two options:

#### Option A: Use the Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/products)
2. Create a new product named "Ultimate Athlete Package"
3. Add a price of $399/month
4. Copy the price ID (starts with `price_`) and update the seed data

#### Option B: Run the Setup Script

Create and run this script to automatically set up Stripe products:

```bash
cd backend
node -r ts-node/register scripts/setup-stripe.ts
```

The script will create the necessary products and prices in Stripe and update your database.

### 5. Run Database Migrations

Run the database migration to create tables and seed data:

```bash
cd backend
npm run migrate
```

This will:
- Create all necessary tables (athletes, packages, pricing, subscriptions, orders)
- Seed the Ultimate Athlete Package with $399/month pricing

### 6. Configure Stripe Webhook (Optional, for Production)

For local development, you can use the Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret and add it to your `backend/.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

## Running the Application

### Development Mode

Start both backend and frontend servers:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Health Check: http://localhost:3000/health

## API Endpoints

### Packages

- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get specific package
- `GET /api/packages/:id/pricing` - Get pricing for a package

### Payments

- `POST /api/payments/create-subscription` - Create a new subscription
- `POST /api/payments/cancel-subscription` - Cancel a subscription
- `GET /api/payments/subscription/:athleteId` - Get athlete's subscription

### Webhooks

- `POST /api/webhooks/stripe` - Stripe webhook endpoint

## Database Schema

### Athletes
- User accounts with authentication
- Stripe customer IDs
- Subscription status tracking

### Packages
- Training packages with features
- Stored as JSONB for flexibility

### Pricing
- Package pricing tiers
- Multiple billing periods (monthly/yearly)
- Links to Stripe price IDs

### Subscriptions
- Active subscriptions
- Stripe subscription management
- Period tracking

### Orders
- Payment history
- Transaction records

## Stripe Integration

The application uses Stripe for:

1. **Customer Management** - Creating and managing customer records
2. **Subscriptions** - Recurring monthly billing
3. **Payment Processing** - Secure card processing via Stripe Elements
4. **Webhooks** - Real-time subscription status updates

### Testing with Stripe

Use these test card numbers in development:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

Any future expiration date and any 3-digit CVC will work.

## Production Deployment

### Environment Variables

Update your production environment variables:

1. Use production Stripe keys (starts with `sk_live_` and `pk_live_`)
2. Set `NODE_ENV=production`
3. Use a secure `JWT_SECRET`
4. Configure production database URL
5. Set proper CORS origins

### Database

Run migrations in production:

```bash
npm run migrate
```

### Building

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

### Security Checklist

- [ ] All API keys stored in environment variables
- [ ] `.env` files excluded from git
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] Database credentials secured
- [ ] Stripe webhook signature verification enabled
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented

## Project Structure

```
CG_Recruiting-Development/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration & environment
│   │   ├── database/       # DB connection, migrations, seeds
│   │   ├── models/         # TypeScript interfaces
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   └── index.ts        # Main entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API clients
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
└── README.md
```

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT

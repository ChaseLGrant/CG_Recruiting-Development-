# CG Recruiting & Development

A modern, full-featured recruiting and development lessons platform with integrated Stripe payments.

## Features

- 🎨 **Beautiful UI/UX** - Modern, responsive design with Tailwind CSS
- 💼 **Recruiting Services** - Professional career placement services
- 📚 **Development Courses** - Comprehensive coding courses
- 💳 **Stripe Integration** - Secure payment processing
- 🌙 **Dark Mode** - Automatic dark/light theme support
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Next.js 14** - Built with the latest Next.js features
- 🔒 **Secure** - SSL encryption and PCI-compliant payments

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Payments:** Stripe
- **Icons:** Lucide React
- **Deployment Ready:** Vercel, Netlify, or any Node.js host

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Stripe account (free to create at [stripe.com](https://stripe.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CG_Recruiting-Development-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your Stripe keys:
   - Get your keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your publishable key (starts with `pk_`)
   - `STRIPE_SECRET_KEY` - Your secret key (starts with `sk_`)
   - `STRIPE_WEBHOOK_SECRET` - Your webhook secret (optional for local development)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── create-checkout-session/  # Stripe checkout API
│   │   └── webhook/                   # Stripe webhook handler
│   ├── about/                         # About page
│   ├── checkout/                      # Checkout page
│   ├── contact/                       # Contact page
│   ├── courses/                       # Courses listing
│   ├── recruiting/                    # Recruiting services
│   ├── success/                       # Payment success page
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Homepage
│   └── globals.css                    # Global styles
├── components/
│   ├── Navigation.tsx                 # Header navigation
│   └── Footer.tsx                     # Footer component
├── public/                            # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Stripe Setup

### Test Mode

For development, use Stripe's test mode:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle "Test mode" in the top right
3. Get your test API keys from Developers → API keys
4. Use test card numbers like `4242 4242 4242 4242`

### Production Setup

1. Complete your Stripe account setup
2. Switch to "Live mode" in the dashboard
3. Update your `.env.local` with live keys
4. Set up webhooks:
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy the webhook secret to your environment variables

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: { ... },
  secondary: { ... },
}
```

### Content

- Update service prices in `app/recruiting/page.tsx`
- Modify courses in `app/courses/page.tsx`
- Change contact information in `components/Footer.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## Security Notes

- Never commit `.env.local` or `.env` files
- Keep your `STRIPE_SECRET_KEY` secure
- Use environment variables for all sensitive data
- Enable webhook signature verification in production

## Support

For questions or issues, please contact:
- Email: info@cg-recruiting.com
- Phone: (123) 456-7890

## License

Private - All rights reserved

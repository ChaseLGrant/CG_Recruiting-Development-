/**
 * Setup Stripe Products and Prices
 *
 * This script creates the necessary Stripe products and prices for the CG Recruiting platform.
 * Run this once during initial setup to configure your Stripe account.
 *
 * Usage: node -r ts-node/register scripts/setup-stripe.ts
 */

import { stripe } from '../src/config/stripe';
import { query } from '../src/database/connection';

interface PackageConfig {
  name: string;
  description: string;
  priceAmount: number; // in cents
  currency: string;
  billingPeriod: 'month' | 'year';
}

const PACKAGES: PackageConfig[] = [
  {
    name: 'Ultimate Athlete Package',
    description: 'Complete training and recruiting solution for serious athletes. Includes 4 training sessions per month, metric tracking, full strength and conditioning program, full recruiting advising, and social media building.',
    priceAmount: 39900, // $399.00
    currency: 'usd',
    billingPeriod: 'month',
  },
];

async function setupStripeProducts() {
  console.log('🔧 Setting up Stripe products and prices...\n');

  try {
    for (const pkg of PACKAGES) {
      console.log(`Creating product: ${pkg.name}`);

      // Create Stripe product
      const product = await stripe.products.create({
        name: pkg.name,
        description: pkg.description,
        metadata: {
          source: 'cg_recruiting_setup',
        },
      });

      console.log(`✓ Product created: ${product.id}`);

      // Create Stripe price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: pkg.priceAmount,
        currency: pkg.currency,
        recurring: {
          interval: pkg.billingPeriod,
        },
        metadata: {
          package_name: pkg.name,
        },
      });

      console.log(`✓ Price created: ${price.id}`);
      console.log(`  Amount: $${(pkg.priceAmount / 100).toFixed(2)}/${pkg.billingPeriod}`);

      // Update database with Stripe price ID
      const result = await query(
        `UPDATE pricing
         SET stripe_price_id = $1
         WHERE package_id IN (
           SELECT id FROM packages WHERE name = $2
         )
         AND billing_period = $3`,
        [price.id, pkg.name, 'monthly']
      );

      if (result.rowCount && result.rowCount > 0) {
        console.log(`✓ Database updated with Stripe price ID\n`);
      } else {
        console.log(`⚠ Warning: Could not find package "${pkg.name}" in database. Make sure migrations have been run.\n`);
      }
    }

    console.log('✅ Stripe setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update your frontend .env with VITE_STRIPE_PUBLISHABLE_KEY');
    console.log('2. Start your backend server: npm run dev');
    console.log('3. Start your frontend server: npm run dev');
    console.log('4. Visit http://localhost:5173 to see the packages');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up Stripe:', error);
    process.exit(1);
  }
}

setupStripeProducts();

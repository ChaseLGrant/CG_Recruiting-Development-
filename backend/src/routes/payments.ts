import { Router, Request, Response } from 'express';
import { stripeService } from '../services/StripeService';
import { packageService } from '../services/PackageService';
import { query } from '../database/connection';

const router = Router();

/**
 * POST /api/payments/create-subscription
 * Create a new subscription for an athlete
 */
router.post('/create-subscription', async (req: Request, res: Response) => {
  try {
    const { athleteId, packageId, email, name } = req.body;

    if (!athleteId || !packageId || !email || !name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: athleteId, packageId, email, name',
      });
    }

    // Get package and pricing
    const pkg = await packageService.getPackageById(packageId);
    if (!pkg || pkg.pricing.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Package or pricing not found',
      });
    }

    // Get monthly pricing
    const monthlyPricing = pkg.pricing.find(p => p.billingPeriod === 'monthly');
    if (!monthlyPricing) {
      return res.status(400).json({
        success: false,
        error: 'Monthly pricing not available for this package',
      });
    }

    // Check if athlete already has a Stripe customer ID
    const athleteResult = await query(
      'SELECT stripe_customer_id FROM athletes WHERE id = $1',
      [athleteId]
    );

    let customerId: string;

    if (athleteResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Athlete not found',
      });
    }

    if (athleteResult.rows[0].stripe_customer_id) {
      customerId = athleteResult.rows[0].stripe_customer_id;
    } else {
      // Create Stripe customer
      const customer = await stripeService.createCustomer(email, name);
      customerId = customer.id;

      // Update athlete with customer ID
      await query(
        'UPDATE athletes SET stripe_customer_id = $1 WHERE id = $2',
        [customerId, athleteId]
      );
    }

    // Create Stripe subscription
    const subscription = await stripeService.createSubscription(
      customerId,
      monthlyPricing.stripePriceId!,
      athleteId,
      packageId
    );

    // Save subscription to database
    await query(
      `INSERT INTO subscriptions
       (athlete_id, package_id, stripe_subscription_id, current_period_start, current_period_end, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        athleteId,
        packageId,
        subscription.id,
        new Date(subscription.current_period_start * 1000),
        new Date(subscription.current_period_end * 1000),
        subscription.status,
      ]
    );

    // Update athlete subscription status
    await query(
      `UPDATE athletes
       SET subscription_package_id = $1, subscription_status = $2
       WHERE id = $3`,
      [packageId, subscription.status, athleteId]
    );

    // Extract client secret from latest invoice
    const latestInvoice: any = subscription.latest_invoice;
    const clientSecret = latestInvoice?.payment_intent?.client_secret;

    res.json({
      success: true,
      data: {
        subscriptionId: subscription.id,
        clientSecret,
        status: subscription.status,
      },
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create subscription',
    });
  }
});

/**
 * POST /api/payments/cancel-subscription
 * Cancel an athlete's subscription
 */
router.post('/cancel-subscription', async (req: Request, res: Response) => {
  try {
    const { athleteId, cancelAtPeriodEnd } = req.body;

    if (!athleteId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: athleteId',
      });
    }

    // Get athlete's subscription
    const result = await query(
      'SELECT stripe_subscription_id FROM subscriptions WHERE athlete_id = $1 AND status = $2',
      [athleteId, 'active']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No active subscription found',
      });
    }

    const { stripe_subscription_id } = result.rows[0];

    // Cancel subscription in Stripe
    const subscription = await stripeService.cancelSubscription(
      stripe_subscription_id,
      cancelAtPeriodEnd !== false
    );

    // Update subscription in database
    await query(
      `UPDATE subscriptions
       SET cancel_at_period_end = $1, status = $2, updated_at = CURRENT_TIMESTAMP
       WHERE stripe_subscription_id = $3`,
      [subscription.cancel_at_period_end, subscription.status, stripe_subscription_id]
    );

    res.json({
      success: true,
      data: {
        subscriptionId: subscription.id,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel subscription',
    });
  }
});

/**
 * GET /api/payments/subscription/:athleteId
 * Get athlete's subscription details
 */
router.get('/subscription/:athleteId', async (req: Request, res: Response) => {
  try {
    const { athleteId } = req.params;

    const result = await query(
      `SELECT s.*, p.name as package_name, p.features
       FROM subscriptions s
       JOIN packages p ON s.package_id = p.id
       WHERE s.athlete_id = $1
       ORDER BY s.created_at DESC
       LIMIT 1`,
      [athleteId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No subscription found',
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription',
    });
  }
});

export default router;

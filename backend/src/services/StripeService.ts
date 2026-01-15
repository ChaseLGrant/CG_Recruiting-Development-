import Stripe from 'stripe';
import { stripe, STRIPE_CONFIG } from '../config/stripe';
import { query } from '../database/connection';

export class StripeService {
  /**
   * Create a Stripe customer for an athlete
   */
  async createCustomer(email: string, name: string): Promise<Stripe.Customer> {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        source: 'cg_recruiting'
      }
    });

    return customer;
  }

  /**
   * Create a payment intent for one-time payments
   */
  async createPaymentIntent(
    amount: number,
    currency: string,
    customerId: string,
    packageId: string
  ): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      metadata: {
        packageId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent;
  }

  /**
   * Create a Stripe product for a package (if it doesn't exist)
   */
  async createProduct(
    packageName: string,
    description: string
  ): Promise<Stripe.Product> {
    const product = await stripe.products.create({
      name: packageName,
      description,
    });

    return product;
  }

  /**
   * Create a Stripe price for recurring subscriptions
   */
  async createPrice(
    productId: string,
    amount: number,
    currency: string,
    interval: 'month' | 'year'
  ): Promise<Stripe.Price> {
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: amount,
      currency,
      recurring: {
        interval,
      },
    });

    return price;
  }

  /**
   * Create a subscription for an athlete
   */
  async createSubscription(
    customerId: string,
    priceId: string,
    athleteId: string,
    packageId: string
  ): Promise<Stripe.Subscription> {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        athleteId,
        packageId,
      },
    });

    return subscription;
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = true
  ): Promise<Stripe.Subscription> {
    if (cancelAtPeriodEnd) {
      return await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    } else {
      return await stripe.subscriptions.cancel(subscriptionId);
    }
  }

  /**
   * Retrieve a subscription
   */
  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.retrieve(subscriptionId);
  }

  /**
   * Update subscription payment method
   */
  async updateSubscriptionPaymentMethod(
    subscriptionId: string,
    paymentMethodId: string
  ): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.update(subscriptionId, {
      default_payment_method: paymentMethodId,
    });
  }

  /**
   * Retrieve customer's payment methods
   */
  async getPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods.data;
  }

  /**
   * Construct webhook event from request
   */
  constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
    webhookSecret: string
  ): Stripe.Event {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }

  /**
   * Handle subscription updated webhook
   */
  async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
    const athleteId = subscription.metadata.athleteId;
    const status = subscription.status;

    if (!athleteId) {
      console.error('No athleteId in subscription metadata');
      return;
    }

    // Update athlete subscription status
    await query(
      `UPDATE athletes
       SET subscription_status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [status, athleteId]
    );

    // Update subscription record
    await query(
      `UPDATE subscriptions
       SET status = $1,
           current_period_start = $2,
           current_period_end = $3,
           cancel_at_period_end = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE stripe_subscription_id = $5`,
      [
        status,
        new Date(subscription.current_period_start * 1000),
        new Date(subscription.current_period_end * 1000),
        subscription.cancel_at_period_end,
        subscription.id,
      ]
    );
  }

  /**
   * Handle payment intent succeeded webhook
   */
  async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    // Update order status to completed
    await query(
      `UPDATE orders
       SET status = 'completed', updated_at = CURRENT_TIMESTAMP
       WHERE stripe_payment_intent_id = $1`,
      [paymentIntent.id]
    );
  }

  /**
   * Handle payment intent failed webhook
   */
  async handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    // Update order status to failed
    await query(
      `UPDATE orders
       SET status = 'failed', updated_at = CURRENT_TIMESTAMP
       WHERE stripe_payment_intent_id = $1`,
      [paymentIntent.id]
    );
  }
}

export const stripeService = new StripeService();

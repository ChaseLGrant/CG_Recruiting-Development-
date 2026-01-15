export interface Pricing {
  id: string;
  packageId: string;
  priceAmount: number; // in cents
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  stripePriceId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePricingInput {
  packageId: string;
  priceAmount: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  stripePriceId?: string;
}

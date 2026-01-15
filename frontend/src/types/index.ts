export interface PackageFeatures {
  trainingSessions: number;
  metricTracking: boolean;
  strengthConditioning: boolean;
  recruitingAdvising: boolean;
  socialMediaBuilding: boolean;
}

export interface Pricing {
  id: string;
  priceAmount: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  stripePriceId: string;
  isActive: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  features: PackageFeatures;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  pricing: Pricing[];
}

export interface Subscription {
  id: string;
  athleteId: string;
  packageId: string;
  stripeSubscriptionId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
  cancelAtPeriodEnd: boolean;
  packageName: string;
  features: PackageFeatures;
}

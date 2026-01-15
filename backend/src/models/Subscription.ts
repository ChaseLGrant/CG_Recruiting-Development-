export interface Subscription {
  id: string;
  athleteId: string;
  packageId: string;
  stripeSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  status: 'active' | 'past_due' | 'unpaid' | 'cancelled' | 'incomplete';
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubscriptionInput {
  athleteId: string;
  packageId: string;
  stripeSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  status: string;
}

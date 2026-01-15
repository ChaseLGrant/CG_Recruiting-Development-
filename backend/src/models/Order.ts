export interface Order {
  id: string;
  athleteId: string;
  packageId: string;
  stripePaymentIntentId: string;
  amount: number; // in cents
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderInput {
  athleteId: string;
  packageId: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
}

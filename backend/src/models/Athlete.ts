export interface Athlete {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  profileImage?: string;
  stripeCustomerId?: string;
  subscriptionPackageId?: string;
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'past_due';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAthleteInput {
  email: string;
  name: string;
  password: string;
}

export interface AthleteResponse {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  subscriptionPackageId?: string;
  subscriptionStatus: string;
  createdAt: Date;
}

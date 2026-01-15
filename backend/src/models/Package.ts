export interface PackageFeatures {
  trainingSessions: number;
  metricTracking: boolean;
  strengthConditioning: boolean;
  recruitingAdvising: boolean;
  socialMediaBuilding: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  features: PackageFeatures;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePackageInput {
  name: string;
  description: string;
  features: PackageFeatures;
}

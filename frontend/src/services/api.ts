import axios from 'axios';
import { Package, Subscription } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const packagesApi = {
  /**
   * Get all packages
   */
  getAll: async (): Promise<Package[]> => {
    const response = await api.get('/api/packages');
    return response.data.data;
  },

  /**
   * Get a specific package by ID
   */
  getById: async (id: string): Promise<Package> => {
    const response = await api.get(`/api/packages/${id}`);
    return response.data.data;
  },

  /**
   * Get pricing for a package
   */
  getPricing: async (id: string) => {
    const response = await api.get(`/api/packages/${id}/pricing`);
    return response.data.data;
  },
};

export const paymentsApi = {
  /**
   * Create a subscription
   */
  createSubscription: async (data: {
    athleteId: string;
    packageId: string;
    email: string;
    name: string;
  }) => {
    const response = await api.post('/api/payments/create-subscription', data);
    return response.data.data;
  },

  /**
   * Cancel a subscription
   */
  cancelSubscription: async (athleteId: string, cancelAtPeriodEnd: boolean = true) => {
    const response = await api.post('/api/payments/cancel-subscription', {
      athleteId,
      cancelAtPeriodEnd,
    });
    return response.data.data;
  },

  /**
   * Get subscription for an athlete
   */
  getSubscription: async (athleteId: string): Promise<Subscription> => {
    const response = await api.get(`/api/payments/subscription/${athleteId}`);
    return response.data.data;
  },
};

export default api;

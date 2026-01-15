/**
 * Format price in cents to dollar string
 */
export const formatPrice = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`;
};

/**
 * Format billing period
 */
export const formatBillingPeriod = (period: 'monthly' | 'yearly'): string => {
  return period === 'monthly' ? 'per month' : 'per year';
};

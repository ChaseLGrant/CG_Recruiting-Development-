import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PackageCard } from '../components/PackageCard';
import { CheckoutForm } from '../components/CheckoutForm';
import { Package } from '../types';
import { packagesApi, paymentsApi } from '../services/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export const PackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setLoading(true);

      // Use mock data for demo (comment out to use real API)
      const mockData: Package[] = [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Ultimate Athlete Package',
          description: 'Complete training and recruiting solution for serious athletes',
          features: {
            trainingSessions: 4,
            metricTracking: true,
            strengthConditioning: true,
            recruitingAdvising: true,
            socialMediaBuilding: true,
          },
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pricing: [
            {
              id: 'price-001',
              priceAmount: 39900, // $399.00
              currency: 'usd',
              billingPeriod: 'monthly',
              stripePriceId: 'price_demo',
              isActive: true,
            },
          ],
        },
      ];

      setPackages(mockData);

      // Uncomment below to use real API instead of mock data
      // const data = await packagesApi.getAll();
      // setPackages(data);
    } catch (err) {
      setError('Failed to load packages');
      console.error('Error loading packages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (pkg: Package) => {
    try {
      setError(null);
      setSelectedPackage(pkg);

      // DEMO MODE: Show a demo message instead of calling API
      alert(
        `🎯 Demo Mode\n\n` +
        `You selected: ${pkg.name}\n` +
        `Price: $${(pkg.pricing[0]?.priceAmount || 0) / 100}/month\n\n` +
        `In production, this would:\n` +
        `1. Create a Stripe customer\n` +
        `2. Start a subscription\n` +
        `3. Process payment via Stripe Elements\n\n` +
        `To enable full functionality:\n` +
        `- Set up PostgreSQL database\n` +
        `- Start the backend server\n` +
        `- Add your Stripe API keys`
      );

      // Reset after demo alert
      setSelectedPackage(null);

      // Uncomment below to use real API
      // const athleteId = 'demo-athlete-id';
      // const email = 'athlete@example.com';
      // const name = 'Demo Athlete';
      // const response = await paymentsApi.createSubscription({
      //   athleteId,
      //   packageId: pkg.id,
      //   email,
      //   name,
      // });
      // setClientSecret(response.clientSecret);
    } catch (err) {
      setError('Failed to create subscription');
      console.error('Error creating subscription:', err);
      setSelectedPackage(null);
    }
  };

  const handleSuccess = () => {
    alert('Subscription successful!');
    setSelectedPackage(null);
    setClientSecret(null);
  };

  const handleCancel = () => {
    setSelectedPackage(null);
    setClientSecret(null);
  };

  if (loading) {
    return <div className="loading">Loading packages...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="packages-page">
      <div className="page-header">
        <h1>Choose Your Training Package</h1>
        <p>Elevate your game with professional training and recruiting services</p>
      </div>

      {!selectedPackage ? (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      ) : (
        <div className="checkout-container">
          <h2>Complete Your Subscription</h2>
          <div className="selected-package-info">
            <h3>{selectedPackage.name}</h3>
            <p>{selectedPackage.description}</p>
          </div>

          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

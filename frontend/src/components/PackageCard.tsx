import React from 'react';
import { Package } from '../types';
import { formatPrice, formatBillingPeriod } from '../utils/formatters';

interface PackageCardProps {
  package: Package;
  onSubscribe: (pkg: Package) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, onSubscribe }) => {
  const monthlyPricing = pkg.pricing.find(p => p.billingPeriod === 'monthly');

  return (
    <div className="package-card">
      <div className="package-header">
        <h2>{pkg.name}</h2>
        {monthlyPricing && (
          <div className="package-price">
            <span className="price-amount">{formatPrice(monthlyPricing.priceAmount)}</span>
            <span className="price-period">{formatBillingPeriod(monthlyPricing.billingPeriod)}</span>
          </div>
        )}
      </div>

      <p className="package-description">{pkg.description}</p>

      <div className="package-features">
        <h3>What's Included:</h3>
        <ul>
          <li>
            <span className="feature-icon">✓</span>
            <strong>{pkg.features.trainingSessions} Training Sessions</strong> per month
          </li>
          {pkg.features.metricTracking && (
            <li>
              <span className="feature-icon">✓</span>
              <strong>Metric Tracking</strong> - Monitor your progress
            </li>
          )}
          {pkg.features.strengthConditioning && (
            <li>
              <span className="feature-icon">✓</span>
              <strong>Full Strength & Conditioning Program</strong>
            </li>
          )}
          {pkg.features.recruitingAdvising && (
            <li>
              <span className="feature-icon">✓</span>
              <strong>Full Recruiting Advising</strong> - Get recruited
            </li>
          )}
          {pkg.features.socialMediaBuilding && (
            <li>
              <span className="feature-icon">✓</span>
              <strong>Social Media Building</strong> - Build your brand
            </li>
          )}
        </ul>
      </div>

      <button
        className="subscribe-button"
        onClick={() => onSubscribe(pkg)}
      >
        Subscribe Now
      </button>
    </div>
  );
};

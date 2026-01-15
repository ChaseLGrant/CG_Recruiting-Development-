import { query } from '../database/connection';
import { Package, CreatePackageInput } from '../models/Package';
import { Pricing } from '../models/Pricing';

export class PackageService {
  /**
   * Get all active packages with their pricing
   */
  async getAllPackages(): Promise<(Package & { pricing: Pricing[] })[]> {
    const result = await query(`
      SELECT
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pr.id,
              'priceAmount', pr.price_amount,
              'currency', pr.currency,
              'billingPeriod', pr.billing_period,
              'stripePriceId', pr.stripe_price_id,
              'isActive', pr.is_active
            )
          ) FILTER (WHERE pr.id IS NOT NULL),
          '[]'
        ) as pricing
      FROM packages p
      LEFT JOIN pricing pr ON p.id = pr.package_id AND pr.is_active = true
      WHERE p.is_active = true
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      features: row.features,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      pricing: row.pricing,
    }));
  }

  /**
   * Get a package by ID with its pricing
   */
  async getPackageById(packageId: string): Promise<(Package & { pricing: Pricing[] }) | null> {
    const result = await query(`
      SELECT
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pr.id,
              'priceAmount', pr.price_amount,
              'currency', pr.currency,
              'billingPeriod', pr.billing_period,
              'stripePriceId', pr.stripe_price_id,
              'isActive', pr.is_active
            )
          ) FILTER (WHERE pr.id IS NOT NULL),
          '[]'
        ) as pricing
      FROM packages p
      LEFT JOIN pricing pr ON p.id = pr.package_id AND pr.is_active = true
      WHERE p.id = $1 AND p.is_active = true
      GROUP BY p.id
    `, [packageId]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      features: row.features,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      pricing: row.pricing,
    };
  }

  /**
   * Create a new package
   */
  async createPackage(input: CreatePackageInput): Promise<Package> {
    const result = await query(`
      INSERT INTO packages (name, description, features)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [input.name, input.description, JSON.stringify(input.features)]);

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      features: row.features,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Get pricing for a specific package
   */
  async getPricingForPackage(packageId: string): Promise<Pricing[]> {
    const result = await query(`
      SELECT * FROM pricing
      WHERE package_id = $1 AND is_active = true
      ORDER BY price_amount ASC
    `, [packageId]);

    return result.rows.map(row => ({
      id: row.id,
      packageId: row.package_id,
      priceAmount: row.price_amount,
      currency: row.currency,
      billingPeriod: row.billing_period,
      stripePriceId: row.stripe_price_id,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }
}

export const packageService = new PackageService();

import { readFileSync } from 'fs';
import { join } from 'path';
import { pool } from './connection';

async function migrate() {
  try {
    console.log('Starting database migration...');

    // Read schema SQL file
    const schemaSQL = readFileSync(
      join(__dirname, 'schema.sql'),
      'utf-8'
    );

    // Execute schema
    await pool.query(schemaSQL);
    console.log('✓ Schema created successfully');

    // Read seed SQL file
    const seedSQL = readFileSync(
      join(__dirname, 'seed.sql'),
      'utf-8'
    );

    // Execute seed data
    await pool.query(seedSQL);
    console.log('✓ Seed data inserted successfully');

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();

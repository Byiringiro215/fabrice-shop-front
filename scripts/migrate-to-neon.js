#!/usr/bin/env node

/**
 * Migration script to set up Neon PostgreSQL database
 * This script will create all tables and seed initial data
 */

import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.cyan}`);
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║                                                            ║');
console.log('║        Neon PostgreSQL Database Migration                 ║');
console.log('║                                                            ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log(colors.reset);

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

async function runMigration() {
  let client;
  
  try {
    // Test connection
    console.log(`${colors.yellow}📡 Connecting to Neon database...${colors.reset}`);
    client = await pool.connect();
    console.log(`${colors.green}✅ Connected successfully!${colors.reset}\n`);

    // Read schema file
    console.log(`${colors.yellow}📋 Reading schema file...${colors.reset}`);
    const schemaPath = path.join(__dirname, '../backend/database/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    console.log(`${colors.green}✅ Schema file loaded${colors.reset}\n`);

    // Execute schema
    console.log(`${colors.yellow}🔨 Creating database tables...${colors.reset}`);
    await client.query(schemaSQL);
    console.log(`${colors.green}✅ Tables created successfully!${colors.reset}\n`);

    // Read seed file
    console.log(`${colors.yellow}🌱 Reading seed data file...${colors.reset}`);
    const seedPath = path.join(__dirname, '../backend/database/seed.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf8');
    console.log(`${colors.green}✅ Seed file loaded${colors.reset}\n`);

    // Execute seed
    console.log(`${colors.yellow}🌱 Seeding database with initial data...${colors.reset}`);
    await client.query(seedSQL);
    console.log(`${colors.green}✅ Database seeded successfully!${colors.reset}\n`);

    // Verify data
    console.log(`${colors.yellow}🔍 Verifying migration...${colors.reset}`);
    
    const usersResult = await client.query('SELECT COUNT(*) FROM users');
    const productsResult = await client.query('SELECT COUNT(*) FROM products');
    const ordersResult = await client.query('SELECT COUNT(*) FROM orders');
    
    console.log(`${colors.cyan}  Users: ${usersResult.rows[0].count}${colors.reset}`);
    console.log(`${colors.cyan}  Products: ${productsResult.rows[0].count}${colors.reset}`);
    console.log(`${colors.cyan}  Orders: ${ordersResult.rows[0].count}${colors.reset}\n`);

    console.log(`${colors.bold}${colors.green}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.bold}${colors.green}║                                                            ║${colors.reset}`);
    console.log(`${colors.bold}${colors.green}║              🎉 Migration Complete! 🎉                     ║${colors.reset}`);
    console.log(`${colors.bold}${colors.green}║                                                            ║${colors.reset}`);
    console.log(`${colors.bold}${colors.green}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);

    console.log(`${colors.cyan}Database Details:${colors.reset}`);
    console.log(`  Host: ${process.env.DB_HOST}`);
    console.log(`  Database: ${process.env.DB_NAME}`);
    console.log(`  User: ${process.env.DB_USER}\n`);

    console.log(`${colors.cyan}Test Accounts:${colors.reset}`);
    console.log(`  Customer: customer@test.com / customer123`);
    console.log(`  Seller: seller@test.com / seller123`);
    console.log(`  Admin: admin@test.com / admin123\n`);

    console.log(`${colors.green}✅ Your application is now ready to use with Neon PostgreSQL!${colors.reset}\n`);

  } catch (error) {
    console.error(`\n${colors.red}${colors.bold}❌ Migration failed!${colors.reset}`);
    console.error(`${colors.red}Error: ${error.message}${colors.reset}\n`);
    
    if (error.code) {
      console.error(`${colors.yellow}Error Code: ${error.code}${colors.reset}`);
    }
    
    console.error(`\n${colors.yellow}Troubleshooting:${colors.reset}`);
    console.error(`  1. Check your .env file has correct Neon credentials`);
    console.error(`  2. Ensure Neon database is accessible`);
    console.error(`  3. Verify SSL connection is allowed\n`);
    
    process.exit(1);
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

// Run migration
runMigration();

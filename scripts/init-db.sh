#!/bin/bash

# Database initialization script for Render deployment
# This script will be run automatically after the database is created

echo "🚀 Initializing Fabrice E-Commerce Database..."

# Check if PGPASSWORD is set
if [ -z "$DB_PASSWORD" ]; then
    echo "❌ Error: DB_PASSWORD environment variable is not set"
    exit 1
fi

# Set PostgreSQL password for psql
export PGPASSWORD=$DB_PASSWORD

# Run schema
echo "📋 Creating database schema..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f backend/database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema created successfully"
else
    echo "❌ Error creating schema"
    exit 1
fi

# Run seed data
echo "🌱 Seeding database with initial data..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f backend/database/seed.sql

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully"
else
    echo "❌ Error seeding database"
    exit 1
fi

echo "🎉 Database initialization complete!"

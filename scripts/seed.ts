import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../lib/db';
import User from '../lib/models/User';
import Client from '../lib/models/Client';
import Customer from '../lib/models/Customer';
import Property from '../lib/models/Property';
import { hashPassword } from '../lib/auth';

async function seed() {
  try {
    console.log('🌱 Starting seed...');

    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Client.deleteMany({});
    await Customer.deleteMany({});
    await Property.deleteMany({});

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@karimnagar.properties';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Passw0rd!';

    console.log('Creating admin user...');
    const hashedPassword = await hashPassword(adminPassword);
    const admin = await User.create({
      email: adminEmail,
      password: hashedPassword,
    });
    console.log(`✅ Admin user created: ${adminEmail}`);

    // Create sample clients
    console.log('Creating sample clients...');
    const client1 = await Client.create({
      name: 'Rajesh Kumar',
      phone: '+919876543210',
      email: 'rajesh@example.com',
      address: 'Karimnagar, Telangana',
      notes: 'Property seller',
    });

    const client2 = await Client.create({
      name: 'Priya Sharma',
      phone: '+919876543211',
      email: 'priya@example.com',
      address: 'Karimnagar, Telangana',
      notes: 'Property seller',
    });

    console.log(`✅ Created ${2} clients`);

    // Create sample customers
    console.log('Creating sample customers...');
    const customer1 = await Customer.create({
      name: 'Amit Patel',
      phone: '+919876543220',
      email: 'amit@example.com',
      budget_min: 2000000,
      budget_max: 5000000,
      preferred_types: ['apartment', 'house'],
      preferred_locations: {
        city: 'Karimnagar',
        locality: 'Town Center',
      },
      opt_in_whatsapp: true,
      opt_in_timestamp: new Date(),
    });

    const customer2 = await Customer.create({
      name: 'Sneha Reddy',
      phone: '+919876543221',
      email: 'sneha@example.com',
      budget_min: 1000000,
      budget_max: 3000000,
      preferred_types: ['apartment'],
      preferred_locations: {
        city: 'Karimnagar',
        locality: 'Suburban Area',
      },
      opt_in_whatsapp: false,
    });

    const customer3 = await Customer.create({
      name: 'Vikram Singh',
      phone: '+919876543222',
      email: 'vikram@example.com',
      budget_min: 5000000,
      budget_max: 10000000,
      preferred_types: ['house', 'plot'],
      preferred_locations: {
        city: 'Karimnagar',
        district: 'Karimnagar District',
      },
      opt_in_whatsapp: true,
      opt_in_timestamp: new Date(),
    });

    console.log(`✅ Created ${3} customers`);

    // Create sample properties
    console.log('Creating sample properties...');
    const property1 = await Property.create({
      title: '2BHK Apartment in Town Center',
      type: 'apartment',
      price: 3500000,
      location: {
        city: 'Karimnagar',
        locality: 'Town Center',
        district: 'Karimnagar District',
        address: 'Main Road, Town Center',
      },
      client_id: client1._id,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      description: 'Beautiful 2BHK apartment in prime location',
      status: 'available',
    });

    const property2 = await Property.create({
      title: '3BHK House in Suburban Area',
      type: 'house',
      price: 4500000,
      location: {
        city: 'Karimnagar',
        locality: 'Suburban Area',
        district: 'Karimnagar District',
        address: 'Green Valley, Suburban Area',
      },
      client_id: client1._id,
      bedrooms: 3,
      bathrooms: 3,
      area: 2000,
      description: 'Spacious 3BHK house with garden',
      status: 'available',
    });

    const property3 = await Property.create({
      title: '1BHK Apartment - Budget Friendly',
      type: 'apartment',
      price: 1800000,
      location: {
        city: 'Karimnagar',
        locality: 'Suburban Area',
        district: 'Karimnagar District',
        address: 'Affordable Housing Complex',
      },
      client_id: client2._id,
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      description: 'Affordable 1BHK apartment',
      status: 'available',
    });

    const property4 = await Property.create({
      title: 'Luxury Villa in Prime Location',
      type: 'house',
      price: 8500000,
      location: {
        city: 'Karimnagar',
        locality: 'Town Center',
        district: 'Karimnagar District',
        address: 'Luxury Lane, Town Center',
      },
      client_id: client2._id,
      bedrooms: 4,
      bathrooms: 4,
      area: 3500,
      description: 'Premium 4BHK villa with modern amenities',
      status: 'available',
    });

    const property5 = await Property.create({
      title: 'Plot for Sale - 1200 sqft',
      type: 'plot',
      price: 2500000,
      location: {
        city: 'Karimnagar',
        district: 'Karimnagar District',
        address: 'Development Area',
      },
      client_id: client1._id,
      area: 1200,
      description: 'Prime plot ready for construction',
      status: 'available',
    });

    console.log(`✅ Created ${5} properties`);

    console.log('\n✅ Seed completed successfully!');
    console.log(`\nAdmin credentials:`);
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log(`\n⚠️  Please change the admin password after first login!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();


import 'dotenv/config';
import connectDB from '../lib/db';
import User from '../lib/models/User';
import { hashPassword } from '../lib/auth';

async function resetAdmin() {
  try {
    console.log('🔧 Resetting admin password...');

    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@realestatecrms';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Passw0rd!';

    // Check if user exists
    let user = await User.findOne({ email: adminEmail });

    if (!user) {
      console.log('❌ Admin user not found. Creating new admin user...');
      const hashedPassword = await hashPassword(adminPassword);
      user = await User.create({
        email: adminEmail,
        password: hashedPassword,
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
      console.log(`✅ Admin user found: ${adminEmail}`);
      console.log('🔄 Resetting password...');
      const hashedPassword = await hashPassword(adminPassword);
      user.password = hashedPassword;
      await user.save();
      console.log('✅ Password reset successfully');
    }

    console.log('\n✅ Admin credentials:');
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log('\n⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  }
}

resetAdmin();


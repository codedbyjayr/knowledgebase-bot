import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// You need the service role key for this to work
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_KEY not found in .env file');
  console.log('\nTo create an admin user directly, you need to:');
  console.log('1. Go to your Supabase project dashboard');
  console.log('2. Settings → API → Service role key (secret)');
  console.log('3. Add to .env file: SUPABASE_SERVICE_KEY=your-service-key');
  console.log('\nAlternatively, use the sign-up form and confirm via email.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  const email = 'admin@example.com';  // Change this!
  const password = 'admin123';        // Change this!

  console.log('Creating admin user...');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  try {
    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true  // Auto-confirm email
    });

    if (error) {
      console.error('❌ Error creating user:', error.message);
      return;
    }

    console.log('✅ Admin user created successfully!');
    console.log('\nYou can now log in at: http://localhost:5173/admin');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('\n⚠️  Remember to change these credentials after first login!');

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Run the setup
createAdminUser();

// This should be the Clerk user ID of your admin user
const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

if (!ADMIN_USER_ID) {
  console.error('ADMIN_USER_ID environment variable is not set!');
  process.exit(1);
}

module.exports = {
  ADMIN_USER_ID
}; 
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error('Missing CLERK_SECRET_KEY environment variable');
}

const clerkMiddleware = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
  // Add any additional Clerk configuration options here
});

module.exports = clerkMiddleware; 
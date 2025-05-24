const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');
const { ADMIN_USER_ID } = require('../config/constants');

// Clerk authentication middleware
const auth = ClerkExpressRequireAuth();

// Role check middleware
const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      // Get user from Clerk session
      const clerkUser = req.auth.userId;
      const clerkUserData = req.auth.user;
      
      console.log('Auth middleware - Clerk user data:', {
        userId: clerkUser,
        userData: clerkUserData
      });

      if (!clerkUser) {
        console.error('No Clerk user ID found');
        return res.status(401).json({ error: 'Not authenticated' });
      }

      // Find user in our database
      let user = await User.findOne({ clerkId: clerkUser });
      
      if (!user) {
        console.log('Creating new user record for:', clerkUser);
        // Create new user if not found
        user = new User({
          clerkId: clerkUser,
          email: clerkUserData?.emailAddresses?.[0]?.emailAddress || `${clerkUser}@example.com`,
          firstName: clerkUserData?.firstName || 'Unknown',
          lastName: clerkUserData?.lastName || 'Unknown',
          // Set role based on whether this is the admin user
          role: clerkUser === ADMIN_USER_ID ? 'admin' : 'farmer'
        });
        await user.save();
        console.log('New user created:', user);
      } else {
        console.log('Updating existing user:', user._id);
        // Update existing user's information
        if (clerkUserData?.emailAddresses?.[0]?.emailAddress) {
          user.email = clerkUserData.emailAddresses[0].emailAddress;
        }
        if (clerkUserData?.firstName) {
          user.firstName = clerkUserData.firstName;
        }
        if (clerkUserData?.lastName) {
          user.lastName = clerkUserData.lastName;
        }
        user.lastLogin = new Date();
        // Update role if this is the admin user
        if (clerkUser === ADMIN_USER_ID) {
          user.role = 'admin';
        }
        await user.save();
        console.log('User updated:', user);
      }

      if (!roles.includes(user.role)) {
        console.log('Access denied for user:', user._id, 'role:', user.role);
        return res.status(403).json({ error: 'Access denied.' });
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      console.error('Error in checkRole middleware:', error);
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = {
  auth,
  checkRole
}; 
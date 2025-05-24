const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');
const { auth, checkRole } = require('../middleware/auth');

// Get all notifications for current user
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching notifications for user:', req.auth.userId);
    
    // Find user in database
    const user = await User.findOne({ clerkId: req.auth.userId });
    
    if (!user) {
      console.error('User not found in database:', req.auth.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Found user:', user._id);

    const notifications = await Notification.find({ recipient: user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    console.log(`Found ${notifications.length} notifications for user ${user._id}`);

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.stack
    });
  }
});

// Mark notification as read
router.patch('/:notificationId/read', auth, async (req, res) => {
  try {
    console.log('Marking notification as read:', req.params.notificationId);
    
    // Find user in database
    const user = await User.findOne({ clerkId: req.auth.userId });
    
    if (!user) {
      console.error('User not found in database:', req.auth.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    const notification = await Notification.findOneAndUpdate(
      { 
        _id: req.params.notificationId,
        recipient: user._id 
      },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      console.error('Notification not found or not authorized:', req.params.notificationId);
      return res.status(404).json({ error: 'Notification not found or not authorized' });
    }

    console.log('Successfully marked notification as read:', notification._id);
    res.json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark all notifications as read
router.patch('/read-all', auth, async (req, res) => {
  try {
    console.log('Marking all notifications as read for user');
    
    // Find user in database
    const user = await User.findOne({ clerkId: req.auth.userId });
    
    if (!user) {
      console.error('User not found in database:', req.auth.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await Notification.updateMany(
      { 
        recipient: user._id,
        isRead: false 
      },
      { isRead: true }
    );

    console.log('Successfully marked notifications as read:', result);
    res.json({ 
      message: 'All notifications marked as read',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get unread notification count
router.get('/unread/count', auth, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Send weather or disease alert to farmers
router.post('/send-alert', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { title, message, type, region } = req.body;

    // Validate required fields
    if (!title || !message || !type) {
      return res.status(400).json({ error: 'Title, message, and type are required' });
    }

    // Validate alert type
    if (!['weather', 'regional'].includes(type)) {
      return res.status(400).json({ error: 'Invalid alert type. Must be either weather or regional' });
    }

    // If it's a regional alert, region is required
    if (type === 'regional' && !region) {
      return res.status(400).json({ error: 'Region is required for regional alerts' });
    }

    // Get all farmers
    const farmers = await User.find({ role: 'farmer' });

    if (!farmers.length) {
      return res.status(404).json({ error: 'No farmers found to send alerts to' });
    }

    console.log(`Found ${farmers.length} farmers to send alerts to`);

    // Create notifications for each farmer
    const notifications = farmers.map(farmer => ({
      recipient: farmer._id,
      title,
      content: message,
      type,
      region: type === 'regional' ? region : undefined,
      priority: 'high',
      createdAt: new Date()
    }));

    // Insert notifications into database
    const savedNotifications = await Notification.insertMany(notifications);

    console.log(`Successfully created ${savedNotifications.length} notifications`);

    res.status(201).json({ 
      message: 'Alert sent successfully',
      count: savedNotifications.length,
      notifications: savedNotifications
    });
  } catch (error) {
    console.error('Error sending alerts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get recent alerts for admin dashboard
router.get('/recent', auth, checkRole(['admin']), async (req, res) => {
  try {
    console.log('Fetching recent alerts for admin dashboard');
    
    // Get the most recent alerts, grouped by title and content to avoid duplicates
    const alerts = await Notification.aggregate([
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            title: '$title',
            content: '$content',
            type: '$type',
            region: '$region'
          },
          createdAt: { $first: '$createdAt' }
        }
      },
      {
        $project: {
          _id: 1,
          title: '$_id.title',
          content: '$_id.content',
          type: '$_id.type',
          region: '$_id.region',
          createdAt: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $limit: 10
      }
    ]);

    console.log(`Found ${alerts.length} recent alerts`);
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching recent alerts:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 
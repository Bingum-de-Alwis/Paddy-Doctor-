const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { ADMIN_USER_ID } = require('../config/constants');

// Helper function to get or create user
async function getOrCreateUser(clerkId, clerkUserData) {
  let user = await User.findOne({ clerkId });
  
  if (!user) {
    console.log('Creating new user in messages route:', clerkId);
    user = new User({
      clerkId,
      email: clerkUserData?.emailAddresses?.[0]?.emailAddress || `${clerkId}@example.com`,
      firstName: clerkUserData?.firstName || 'Unknown',
      lastName: clerkUserData?.lastName || 'Unknown',
      role: clerkId === ADMIN_USER_ID ? 'admin' : 'farmer'
    });
    await user.save();
    console.log('New user created in messages route:', user);
  }
  
  return user;
}

// Send a message
router.post('/', auth, async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Auth user:', req.auth);

    const { content, subject } = req.body;
    const senderId = req.auth.userId;
    const senderData = req.auth.user;

    if (!senderId) {
      console.error('No sender ID found in request');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!content || !subject) {
      console.error('Missing required fields:', { content, subject });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get or create sender and admin users
    const [sender, admin] = await Promise.all([
      getOrCreateUser(senderId, senderData),
      getOrCreateUser(ADMIN_USER_ID, { emailAddresses: [{ emailAddress: 'admin@example.com' }] })
    ]);

    if (!sender || !admin) {
      console.error('Failed to get or create users:', { sender, admin });
      return res.status(500).json({ message: 'Failed to process users' });
    }

    // For farmer messages, always send to admin
    const message = new Message({
      sender: sender._id,
      receiver: admin._id,
      content,
      subject
    });

    console.log('Attempting to save message:', message);
    await message.save();
    console.log('Message saved successfully:', message);

    // Create notification for the admin
    const notification = new Notification({
      recipient: admin._id,
      type: 'message_received',
      title: 'New Message from Farmer',
      content: `You have received a new message: ${subject}`,
      metadata: {
        messageId: message._id
      }
    });

    console.log('Attempting to save notification:', notification);
    await notification.save();
    console.log('Notification saved successfully:', notification);

    res.status(201).json(message);
  } catch (error) {
    console.error('Detailed error in POST /messages:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all messages for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = req.auth.user;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Get or create user
    const user = await getOrCreateUser(userId, userData);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const messages = await Message.find({
      $or: [{ sender: user._id }, { receiver: user._id }]
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'firstName lastName')
    .populate('receiver', 'firstName lastName');

    // Format the messages to include sender and receiver names
    const formattedMessages = messages.map(message => ({
      ...message.toObject(),
      senderName: message.sender ? `${message.sender.firstName} ${message.sender.lastName}` : 'Unknown',
      receiverName: message.receiver ? `${message.receiver.firstName} ${message.receiver.lastName}` : 'Unknown'
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error('Error in GET /messages:', error);
    res.status(500).json({ message: error.message });
  }
});

// Reply to a message
router.post('/:messageId/reply', auth, async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content, markAsResolved } = req.body;
    const userId = req.auth.userId;
    const userData = req.auth.user;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Get or create user
    const user = await getOrCreateUser(userId, userData);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the original message
    const originalMessage = await Message.findById(messageId).populate('sender receiver');
    if (!originalMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if the user is authorized to reply (must be the admin)
    if (userId !== ADMIN_USER_ID) {
      return res.status(403).json({ message: 'Only admin can reply to messages' });
    }

    // Create the reply message
    const reply = new Message({
      sender: user._id,
      receiver: originalMessage.sender._id,
      content,
      subject: `Re: ${originalMessage.subject}`,
      status: markAsResolved ? 'resolved' : 'replied'
    });

    await reply.save();

    // Update the original message's status
    originalMessage.status = markAsResolved ? 'resolved' : 'replied';
    originalMessage.isRead = true;
    await originalMessage.save();

    // Create notification for the farmer
    const notification = new Notification({
      recipient: originalMessage.sender._id,
      type: 'message_received',
      title: 'New Reply from Admin',
      content: `You have received a reply to your message: ${originalMessage.subject}`,
      metadata: {
        messageId: reply._id
      }
    });

    await notification.save();

    res.status(201).json(reply);
  } catch (error) {
    console.error('Error in POST /messages/:messageId/reply:', error);
    res.status(500).json({ message: error.message });
  }
});

// Mark message as read
router.patch('/:messageId/read', auth, async (req, res) => {
  try {
    console.log('Auth user:', req.auth);
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      console.error('Message not found:', req.params.messageId);
      return res.status(404).json({ message: 'Message not found' });
    }

    message.isRead = true;
    await message.save();
    console.log('Message marked as read:', message);

    res.json(message);
  } catch (error) {
    console.error('Error in PATCH /messages/:messageId/read:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
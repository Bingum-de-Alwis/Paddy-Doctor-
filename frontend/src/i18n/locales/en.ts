export default {
  common: {
    appName: 'Paddy Disease Detection Platform',
    loading: 'Loading...',
    error: 'An error occurred',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    back: 'Back',
    moreInfo: 'More Information',
    seeAll: 'See All',
    search: 'Search',
    home: 'Home',
    dashboard: 'Dashboard',
    detection: 'Disease Detection',
    diseaseInfo: 'Disease Information',
    recommendations: 'Recommendations',
    notifications: 'Notifications',
    feedback: 'Feedback',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    admin: 'Admin Dashboard'
  },
  
  home: {
    hero: {
      title: 'Protect Your Paddy Fields',
      subtitle: 'Detect diseases early and get expert recommendations',
      detectNow: 'Detect Now',
      learnMore: 'Learn More'
    },
    featuredDiseases: {
      title: 'Common Paddy Diseases',
      subtitle: 'Learn about the most frequent diseases affecting rice crops',
    },
    diseaseItems: {
      riceBlast: {
        name: 'Rice Blast',
        description: 'A severe fungal disease causing diamond-shaped, gray-centered lesions with brown borders on leaves, stems, and panicles.'
      },
      sheathBlight: {
        name: 'Sheath Blight',
        description: 'A fungal disease that forms oval or irregular lesions with gray centers and brown borders on the leaf sheath, often spreading to leaves and panicles.'
      },
      brownSpot: {
        name: 'Brown Spot',
        description: 'A common rice disease causing small, circular to oval brown lesions on leaves and grains, often with a yellow halo.'
      },
      bacterialLeafBlight: {
        name: 'Bacterial Leaf Blight',
        description: 'A serious bacterial disease that causes yellowing and drying of rice leaves, starting from the tips and margins, and can lead to significant yield loss.'
      }
    },
    howItWorks: {
      title: 'How It Works',
      step1: 'Take a photo of the affected plant',
      step2: 'Upload it to our detection system',
      step3: 'Get instant diagnosis results',
      step4: 'Follow recommended treatments'
    },
    recentAlerts: {
      title: 'Recent Alerts',
      viewAll: 'View All Alerts'
    }
  },
  
  detection: {
    title: 'Disease Detection',
    subtitle: 'Upload an image or take a photo of the affected rice plant',
    dragDrop: 'Drag and drop your image here',
    or: 'OR',
    browse: 'Browse files',
    takePhoto: 'Take Photo',
    imagePreview: 'Image Preview',
    analyzeImage: 'Analyze Image',
    tips: {
      title: 'Tips for better results',
      tip1: 'Ensure good lighting conditions',
      tip2: 'Focus clearly on the affected area',
      tip3: 'Include both healthy and diseased parts for comparison',
      tip4: 'Avoid shadows or glare on the plant'
    }
  },
  
  results: {
    title: 'Detection Results',
    disease: 'Detected Disease',
    confidence: 'Confidence Level',
    viewRecommendations: 'View Recommendations',
    saveResults: 'Save Results',
    newDetection: 'New Detection',
    shareFeedback: 'Was this diagnosis helpful?',
    diseaseInfo: 'About this disease'
  },
  
  recommendations: {
    title: 'Treatment Recommendations',
    organicSolutions: 'Organic Solutions',
    chemicalSolutions: 'Chemical Solutions',
    implementation: 'Implementation Guide',
    prevention: 'Prevention Measures'
  },
  
  diseaseInfo: {
    title: 'Paddy Disease Information',
    symptoms: 'Symptoms',
    causes: 'Causes',
    lifecycle: 'Disease Lifecycle',
    impact: 'Economic Impact',
    prevention: 'Prevention'
  },
  
  notifications: {
    title: 'Notifications & Alerts',
    regional: 'Regional Alerts',
    weather: 'Weather Alerts',
    government: 'Government Announcements',
    markRead: 'Mark as Read',
    clearAll: 'Clear All'
  },
  
  dashboard: {
    title: 'Farmer Dashboard',
    recentDetections: 'Recent Detections',
    viewAll: 'View All',
    downloadReport: 'Download Report',
    diseaseStatistics: 'Disease Statistics',
    fieldHealth: 'Field Health Status'
  },
  
  admin: {
    title: 'Admin Dashboard',
    userManagement: 'User Management',
    contentManagement: 'Content Management',
    statistics: {
      totalUsers: 'Total Users',
      totalScans: 'Total Scans',
      diseaseReports: 'Disease Reports',
      successRate: 'Success Rate',
      recentUsers: 'Recent Users',
      joinedDaysAgo: 'Joined {{days}} days ago',
      active: 'Active'
    },
    messages: {
      title: 'Farmer Messages',
      totalMessages: 'Total Messages',
      totalMessagesDesc: 'All messages from farmers',
      unreadMessages: 'Unread Messages',
      unreadMessagesDesc: 'Messages requiring attention',
      pendingMessages: 'Pending Messages',
      pendingMessagesDesc: 'Awaiting response',
      messages: 'Messages',
      search: 'Search messages...',
      all: 'All Messages',
      pending: 'Pending',
      replied: 'Replied',
      resolved: 'Resolved',
      selectMessage: 'Select a message to view details',
      replyPlaceholder: 'Type your reply here...',
      sendReply: 'Send Reply',
      markAsResolved: 'Mark as Resolved',
      status: {
        pending: 'Pending',
        replied: 'Replied',
        resolved: 'Resolved'
      }
    }
  },
  
  auth: {
    login: {
      title: 'Login to your account',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      noAccount: 'Don\'t have an account?',
      signUp: 'Sign up'
    },
    register: {
      title: 'Create an account',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      alreadyAccount: 'Already have an account?',
      signIn: 'Sign in'
    },
    farmer: {
      signIn: {
        title: 'Sign in to your farmer account',
        subtitle: 'Don\'t have an account?',
        createAccount: 'Create one now'
      },
      signUp: {
        title: 'Create a farmer account',
        subtitle: 'Already have an account?',
        signIn: 'Sign in'
      }
    },
    admin: {
      signIn: {
        title: 'Admin Sign In',
        subtitle: 'Please sign in to access the admin dashboard'
      }
    }
  },
  
  feedback: {
    title: 'Share Your Feedback',
    accuracy: 'Accuracy Rating',
    comments: 'Additional Comments',
    placeholder: 'Tell us about your experience with the diagnosis and recommendations...',
    thankYou: 'Thank you for your feedback!'
  },
  
  contact: {
    title: 'Contact & Support',
    subtitle: 'We\'re here to help with any questions or concerns',
    faq: 'Frequently Asked Questions',
    contactForm: 'Contact Form',
    name: 'Your Name',
    email: 'Email Address',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    callUs: 'Call Us',
    whatsapp: 'WhatsApp Support'
  },
  
  errors: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    passwordMatch: 'Passwords must match',
    passwordLength: 'Password must be at least 8 characters long',
    loginFailed: 'Invalid email or password',
    registrationFailed: 'Registration failed. Please try again.',
    uploadFailed: 'Failed to upload image. Please try again.',
    detectionFailed: 'Disease detection failed. Please try again.'
  }
};
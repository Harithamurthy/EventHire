const Application = require('../models/Application');
const Event = require('../models/Event');

// @desc    Create a new application
// @route   POST /api/applications
// @access  Private (Provider only)
exports.createApplication = async (req, res) => {
  try {
    // Add applicant to req.body
    req.body.applicant = req.user.id;
    
    // Check if event exists
    const event = await Event.findById(req.body.event);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Event not found with id of ${req.body.event}`
      });
    }
    
    // Check if user has already applied to this event
    const existingApplication = await Application.findOne({
      event: req.body.event,
      applicant: req.user.id
    });
    
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this event'
      });
    }
    
    const application = await Application.create(req.body);
    
    res.status(201).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private (Admin only)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: 'event',
        select: 'title date location category'
      })
      .populate({
        path: 'applicant',
        select: 'firstName lastName email'
      });
    
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get applications for a specific event
// @route   GET /api/applications/event/:eventId
// @access  Private (Organizer only)
exports.getEventApplications = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Event not found with id of ${req.params.eventId}`
      });
    }
    
    // Make sure user is event organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to view applications for this event`
      });
    }
    
    const applications = await Application.find({ event: req.params.eventId })
      .populate({
        path: 'applicant',
        select: 'firstName lastName email phoneNumber profileImage'
      });
    
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get applications made by the logged in user
// @route   GET /api/applications/my-applications
// @access  Private
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate({
        path: 'event',
        select: 'title date location category budget organizer',
        populate: {
          path: 'organizer',
          select: 'firstName lastName'
        }
      });
    
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (Organizer only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status (pending, accepted, or rejected)'
      });
    }
    
    let application = await Application.findById(req.params.id).populate({
      path: 'event',
      select: 'organizer'
    });
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: `Application not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is event organizer
    if (application.event.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this application`
      });
    }
    
    application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate({
      path: 'event',
      select: 'title date location category'
    }).populate({
      path: 'applicant',
      select: 'firstName lastName email'
    });
    
    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

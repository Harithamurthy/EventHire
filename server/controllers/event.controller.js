const Event = require('../models/Event');
const Application = require('../models/Application');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Organizer only)
exports.createEvent = async (req, res) => {
  try {
    // Add organizer to req.body
    req.body.organizer = req.user.id;
    
    console.log('Creating event with data:', req.body);
    
    // If requirements is a string, convert it to an array
    if (typeof req.body.requirements === 'string') {
      req.body.requirements = req.body.requirements.split(',').map(item => item.trim());
    }
    
    // Ensure time field exists
    if (!req.body.time) {
      req.body.time = '12:00';
    }
    
    const event = await Event.create(req.body);
    console.log('Event created successfully:', event);
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    
    // Provide more detailed error information
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }
    
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    console.log('Getting all events, query params:', req.query);
    
    // First, let's check if there are any events at all
    const totalEvents = await Event.countDocuments();
    console.log('Total events in database:', totalEvents);
    
    // If no events, return empty array early
    if (totalEvents === 0) {
      console.log('No events found in database');
      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }
    
    let query;
    
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    console.log('Query string after processing:', queryStr);
    
    // Finding resource
    query = Event.find(JSON.parse(queryStr)).populate({
      path: 'organizer',
      select: 'firstName lastName email'
    });
    
    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Event.countDocuments(JSON.parse(queryStr));
    
    console.log('Total events matching query:', total);
    
    query = query.skip(startIndex).limit(limit);
    
    // Executing query
    const events = await query;
    console.log('Events found:', events.length);
    if (events.length > 0) {
      console.log('First event sample:', {
        id: events[0]._id,
        title: events[0].title,
        organizer: events[0].organizer
      });
    }
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    console.log('Sending response with events count:', events.length);
    
    res.status(200).json({
      success: true,
      count: events.length,
      pagination,
      data: events
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate({
      path: 'organizer',
      select: 'firstName lastName email'
    });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Event not found with id of ${req.params.id}`
      });
    }
    
    // Increment view count
    event.viewCount += 1;
    await event.save();
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Organizer only)
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Event not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is event organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this event`
      });
    }
    
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Organizer only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Event not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is event organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this event`
      });
    }
    
    // Delete all applications for this event
    await Application.deleteMany({ event: req.params.id });
    
    // Delete the event
    await event.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get events created by logged in user
// @route   GET /api/events/my-events
// @access  Private
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id }).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

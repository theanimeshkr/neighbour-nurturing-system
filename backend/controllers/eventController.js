const Event = require('../models/Event');

// @route   POST /api/events
// @desc    Create a new event
// @access  Private
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location, category, organizerName } = req.body;

    if (!name || !description || !date || !location) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const event = await Event.create({
      name,
      description,
      date,
      location,
      category: category || 'Other',
      organizer: req.userId,
      organizerName: organizerName || 'Anonymous'
    });

    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/events
// @desc    Get all events
// @access  Public
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email street');

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email street').populate('attendees', 'name email');

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/events/:id/attend
// @desc    Attend an event
// @access  Private
exports.attendEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if already attending
    if (event.attendees.includes(req.userId)) {
      return res.status(400).json({ success: false, message: 'You are already attending this event' });
    }

    event.attendees.push(req.userId);
    event.attendeeCount = event.attendees.length;

    await event.save();

    res.status(200).json({
      success: true,
      message: 'Successfully joined event',
      event
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/events/:id/leave
// @desc    Leave an event
// @access  Private
exports.leaveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if attending
    if (!event.attendees.includes(req.userId)) {
      return res.status(400).json({ success: false, message: 'You are not attending this event' });
    }

    event.attendees = event.attendees.filter(id => id.toString() !== req.userId);
    event.attendeeCount = event.attendees.length;

    await event.save();

    res.status(200).json({
      success: true,
      message: 'Successfully left event',
      event
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check ownership
    if (event.organizer.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check ownership
    if (event.organizer.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Event deleted'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

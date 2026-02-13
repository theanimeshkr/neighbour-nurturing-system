const Resource = require('../models/Resource');

// @route   POST /api/resources
// @desc    Create a new resource
// @access  Private
exports.createResource = async (req, res) => {
  try {
    const { name, description, category, ownerName } = req.body;

    if (!name || !description) {
      return res.status(400).json({ success: false, message: 'Please provide name and description' });
    }

    const resource = await Resource.create({
      name,
      description,
      category: category || 'Other',
      owner: req.userId,
      ownerName: ownerName || 'Anonymous'
    });

    res.status(201).json({
      success: true,
      resource
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/resources
// @desc    Get all resources
// @access  Public
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('owner', 'name email street');

    res.status(200).json({
      success: true,
      count: resources.length,
      resources
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/resources/:id
// @desc    Get resource by ID
// @access  Public
exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('owner', 'name email street');

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    res.status(200).json({
      success: true,
      resource
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/resources/:id
// @desc    Update resource
// @access  Private
exports.updateResource = async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    // Check ownership
    if (resource.owner.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this resource' });
    }

    resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      resource
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/resources/:id
// @desc    Delete resource
// @access  Private
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    // Check ownership
    if (resource.owner.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this resource' });
    }

    await Resource.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Resource deleted'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

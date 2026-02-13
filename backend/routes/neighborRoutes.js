// Placeholder for neighbor routes - neighbors are essentially users
// This file can be used for neighbor-specific queries and operations
const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/neighbors
// @desc    Get all neighbors with location data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const neighbors = await User.find().select('name street skills interests latitude longitude -password');

    res.status(200).json({
      success: true,
      count: neighbors.length,
      neighbors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/neighbors/search
// @desc    Search neighbors by skills or interests
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { skill, interest } = req.query;

    let query = {};
    if (skill) {
      query.skills = { $in: [skill] };
    }
    if (interest) {
      query.interests = { $in: [interest] };
    }

    const neighbors = await User.find(query).select('name street skills interests latitude longitude -password');

    res.status(200).json({
      success: true,
      count: neighbors.length,
      neighbors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/neighbors/:id
// @desc    Get neighbor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const neighbor = await User.findById(req.params.id).select('-password');

    if (!neighbor) {
      return res.status(404).json({ success: false, message: 'Neighbor not found' });
    }

    res.status(200).json({
      success: true,
      neighbor
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

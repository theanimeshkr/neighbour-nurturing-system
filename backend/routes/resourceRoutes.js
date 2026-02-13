const express = require('express');
const { createResource, getAllResources, getResource, updateResource, deleteResource } = require('../controllers/resourceController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllResources);
router.get('/:id', getResource);

// Private routes
router.post('/', protect, createResource);
router.put('/:id', protect, updateResource);
router.delete('/:id', protect, deleteResource);

module.exports = router;

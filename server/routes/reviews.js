import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Get reviews
router.get('/', async (req, res) => {
  try {
    const { user_id, product_id } = req.query;

    let reviews;
    if (user_id) {
      reviews = await Review.findByUserId(user_id);
    } else if (product_id) {
      reviews = await Review.findByProductId(product_id);
    } else {
      return res.status(400).json({
        success: false,
        message: 'User ID or Product ID is required'
      });
    }

    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews'
    });
  }
});

// Create review
router.post('/', async (req, res) => {
  try {
    const { user_id, product_id, rating, comment } = req.body;

    // Validate required fields
    if (!user_id || !product_id || !rating) {
      return res.status(400).json({
        success: false,
        message: 'User ID, Product ID, and Rating are required'
      });
    }

    // Check if review already exists
    const existingReview = await Review.checkExists(user_id, product_id);
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating review'
    });
  }
});

// Update review
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.update(req.params.id, req.body);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating review'
    });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.delete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting review'
    });
  }
});

export default router;

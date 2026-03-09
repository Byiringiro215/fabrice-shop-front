import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get orders
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const orders = await Order.findByUserId(user_id);

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order'
    });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { user_id, items, total_amount, shipping_address, shipping_name, shipping_phone, payment_method } = req.body;

    // Validate required fields
    if (!user_id || !items || !shipping_address) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order_id: order.id
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to create order'
    });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const order = await Order.updateStatus(req.params.id, status);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
});

export default router;

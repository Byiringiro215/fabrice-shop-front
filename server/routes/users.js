import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user'
    });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    let user = null;

    // Update user data if there are fields to update
    if (Object.keys(updateData).length > 0) {
      user = await User.update(req.params.id, updateData);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    }

    // Update password if provided
    if (password) {
      await User.updatePassword(req.params.id, password);
      
      // If we didn't update other fields, fetch the user
      if (!user) {
        user = await User.findById(req.params.id);
      }
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user'
    });
  }
});

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const users = await User.getAll();

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

export default router;

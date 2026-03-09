import pool from '../config/database.js';

class Review {
  static async create(reviewData) {
    const { user_id, product_id, rating, comment } = reviewData;

    const query = `
      INSERT INTO reviews (user_id, product_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(query, [user_id, product_id, rating, comment]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT r.*, p.name as product_name, p.image_url as product_image
      FROM reviews r
      JOIN products p ON r.product_id = p.id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC
    `;

    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findByProductId(productId) {
    const query = `
      SELECT r.*, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC
    `;

    const result = await pool.query(query, [productId]);
    return result.rows;
  }

  static async update(id, reviewData) {
    const { rating, comment } = reviewData;

    const query = `
      UPDATE reviews 
      SET rating = $1, comment = $2
      WHERE id = $3
      RETURNING *
    `;

    const result = await pool.query(query, [rating, comment, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM reviews WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async checkExists(userId, productId) {
    const query = 'SELECT * FROM reviews WHERE user_id = $1 AND product_id = $2';
    const result = await pool.query(query, [userId, productId]);
    return result.rows[0];
  }
}

export default Review;

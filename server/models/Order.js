import pool from '../config/database.js';

class Order {
  static async create(orderData) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      const { user_id, items, total_amount, status, shipping_address, shipping_name, shipping_phone, payment_method } = orderData;
      
      // Generate order number
      const order_number = 'ORD-' + Date.now().toString(36).toUpperCase();

      // Insert order
      const orderQuery = `
        INSERT INTO orders (order_number, user_id, total_amount, status, shipping_address, shipping_name, shipping_phone, payment_method)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;

      const orderResult = await client.query(orderQuery, [
        order_number, user_id, total_amount, status || 'Pending',
        shipping_address, shipping_name, shipping_phone, payment_method
      ]);

      const order = orderResult.rows[0];

      // Insert order items
      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;

      for (const item of items) {
        await client.query(itemQuery, [
          order.id,
          item.product_id,
          item.product_name,
          item.product_price,
          item.quantity,
          item.subtotal
        ]);
      }

      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async findByUserId(userId) {
    const query = `
      SELECT o.*, 
        json_agg(json_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'product_name', oi.product_name,
          'product_price', oi.product_price,
          'quantity', oi.quantity,
          'subtotal', oi.subtotal
        )) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT o.*, 
        json_agg(json_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'product_name', oi.product_name,
          'product_price', oi.product_price,
          'quantity', oi.quantity,
          'subtotal', oi.subtotal
        )) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = $1
      GROUP BY o.id
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT o.*, u.name as customer_name, u.email as customer_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  static async updateStatus(id, status) {
    const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }
}

export default Order;

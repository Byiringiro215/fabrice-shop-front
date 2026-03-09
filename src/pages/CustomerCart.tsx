import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerLayout from "@/components/CustomerLayout";
import { useCart } from "@/contexts/CartContext";

export default function CustomerCart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <CustomerLayout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started!</p>
          <Link to="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </motion.div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold">Shopping Cart</h2>
          <button onClick={clearCart} className="text-sm text-red-600 hover:underline">
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-card rounded-xl border p-4 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-accent font-bold">${item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h3 className="font-display text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">$5.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl text-accent">
                    ${(cartTotal + 5 + cartTotal * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="btn-primary w-full mb-3">Proceed to Checkout</button>
              <Link to="/products" className="btn-outline w-full text-center block">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </CustomerLayout>
  );
}

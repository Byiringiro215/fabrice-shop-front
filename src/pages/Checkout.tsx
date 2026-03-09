import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { products } from "@/data/products";
import { useState } from "react";

export default function Checkout() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id)) || products[0];
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Layout>
      <div className="section-container py-8 max-w-4xl">
        <Link to={`/products/${product.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Product
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold mb-6">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="font-display font-semibold mb-4">Customer Details</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <input className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone Number</label>
                    <input className="input-field" placeholder="+250 7XX XXX XXX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Delivery Address</label>
                    <textarea className="input-field h-20 resize-none" placeholder="Full address..." />
                  </div>
                </form>
              </div>

              <div className="bg-card rounded-xl border p-6">
                <h2 className="font-display font-semibold mb-4">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "card", label: "Credit Card", icon: "💳" },
                    { id: "mobile", label: "Mobile Money", icon: "📱" },
                    { id: "cash", label: "Cash on Delivery", icon: "💵" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-4 rounded-xl border text-center transition-all ${paymentMethod === m.id ? "border-accent bg-accent/5 ring-2 ring-accent/20" : "hover:border-accent/50"}`}
                    >
                      <span className="text-2xl block mb-1">{m.icon}</span>
                      <span className="text-sm font-medium">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border p-6 sticky top-24">
                <h2 className="font-display font-semibold mb-4">Order Summary</h2>
                <div className="flex gap-4 mb-4">
                  <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.seller}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm border-t pt-4">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${product.price}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>$5.00</span></div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Total</span><span className="text-accent">${(product.price + 5).toFixed(2)}</span>
                  </div>
                </div>
                <button className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" /> Place Order
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

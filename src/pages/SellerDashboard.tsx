import { motion } from "framer-motion";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SellerLayout from "@/components/SellerLayout";
import { products, orders } from "@/data/products";

const stats = [
  { icon: Package, label: "My Products", value: "6", color: "bg-accent/10 text-accent" },
  { icon: ShoppingCart, label: "Total Orders", value: "42", color: "bg-accent/10 text-accent" },
  { icon: DollarSign, label: "Revenue", value: "$3,240", color: "bg-accent/10 text-accent" },
  { icon: TrendingUp, label: "Views", value: "1.2K", color: "bg-accent/10 text-accent" },
];

export default function SellerDashboard() {
  return (
    <SellerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Seller Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold font-display">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-card rounded-xl border overflow-hidden mb-6">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-display font-semibold">Recent Orders</h2>
            <Link to="/orders" className="text-sm text-accent hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Order</th>
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 3).map((o) => (
                  <tr key={o.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{o.id}</td>
                    <td className="p-4">{o.product}</td>
                    <td className="p-4"><span className={`badge-${o.status.toLowerCase()}`}>{o.status}</span></td>
                    <td className="p-4 font-semibold">${o.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/seller/upload" className="btn-primary text-center">Upload New Product</Link>
          <Link to="/seller/products" className="btn-outline text-center">View My Products</Link>
        </div>
      </motion.div>
    </SellerLayout>
  );
}

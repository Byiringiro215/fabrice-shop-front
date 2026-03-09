import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Layout from "@/components/Layout";
import { orders } from "@/data/products";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  return (
    <Layout>
      <div className="section-container py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-display text-2xl font-bold mb-6">Order History</h1>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-card rounded-xl border p-4 card-hover">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">{o.id}</span>
                  <span className={`badge-${o.status.toLowerCase()}`}>{o.status}</span>
                </div>
                <p className="text-sm">{o.product}</p>
                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="text-muted-foreground">{o.date}</span>
                  <span className="font-bold text-accent">${o.price}</span>
                </div>
                <Link to={`/products/1`} className="btn-outline text-xs mt-3 py-1.5 px-3 inline-flex items-center gap-1">
                  <Eye className="h-3 w-3" /> View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-card rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Order ID</th>
                    <th className="text-left p-4 font-medium">Product</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Price</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{o.id}</td>
                      <td className="p-4">{o.product}</td>
                      <td className="p-4 text-muted-foreground">{o.date}</td>
                      <td className="p-4 font-semibold">${o.price}</td>
                      <td className="p-4"><span className={`badge-${o.status.toLowerCase()}`}>{o.status}</span></td>
                      <td className="p-4">
                        <Link to={`/products/1`} className="btn-outline text-xs py-1.5 px-3 inline-flex items-center gap-1">
                          <Eye className="h-3 w-3" /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

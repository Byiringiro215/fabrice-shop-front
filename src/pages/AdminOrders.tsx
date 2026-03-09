import { motion } from "framer-motion";
import { Eye, Package, Calendar, User } from "lucide-react";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { orders } from "@/data/products";

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-card rounded-xl border">
          <div className="p-6 border-b">
            <h2 className="font-display text-2xl font-bold">All Orders</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage all customer orders</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Order ID</th>
                  <th className="text-left p-4 font-medium">Customer</th>
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Price</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{o.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-accent" />
                        </div>
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td className="p-4">{o.product}</td>
                    <td className="p-4 text-muted-foreground">{new Date(o.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`badge-${o.status.toLowerCase()}`}>{o.status}</span>
                    </td>
                    <td className="p-4 font-semibold">${o.price}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => setSelectedOrder(o)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" 
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-muted-foreground group-hover:text-blue-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* View Order Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-card rounded-xl border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-card">
              <h2 className="font-display text-2xl font-bold">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-muted rounded-lg">
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Package className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Order ID</p>
                    <p className="font-semibold">{selectedOrder.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Order Date</p>
                    <p className="font-semibold">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Product Information</h3>
                <p className="text-lg font-medium mb-2">{selectedOrder.product}</p>
                <div className="flex items-center gap-2">
                  <span className={`badge-${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">john@example.com</p>
                <p className="text-sm text-muted-foreground">+250 788 000 000</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-accent">${selectedOrder.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

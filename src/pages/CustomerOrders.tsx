import { motion, AnimatePresence } from "framer-motion";
import { Eye, Edit, Trash2, X, Package, MapPin, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";
import CustomerLayout from "@/components/CustomerLayout";
import { orders } from "@/data/products";

export default function CustomerOrders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editingOrder, setEditingOrder] = useState<any>(null);
  const [orderList, setOrderList] = useState(orders);

  const handleDelete = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrderList(orderList.filter(o => o.id !== orderId));
    }
  };

  const handleEdit = (order: any) => {
    setEditingOrder({ ...order });
  };

  const handleSaveEdit = () => {
    setOrderList(orderList.map(o => o.id === editingOrder.id ? editingOrder : o));
    setEditingOrder(null);
  };

  return (
    <CustomerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-card rounded-xl border">
          <div className="p-6 border-b">
            <h2 className="font-display text-2xl font-bold">My Orders</h2>
            <p className="text-sm text-muted-foreground mt-1">Track and manage your orders</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Order ID</th>
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Price</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((o) => (
                  <tr key={o.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{o.id}</td>
                    <td className="p-4">{o.product}</td>
                    <td className="p-4 text-muted-foreground">{new Date(o.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`badge-${o.status.toLowerCase()}`}>{o.status}</span>
                    </td>
                    <td className="p-4 font-semibold">${o.price}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedOrder(o)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" 
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground group-hover:text-blue-500" />
                        </button>
                        <button 
                          onClick={() => handleEdit(o)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors group" 
                          title="Edit Order"
                        >
                          <Edit className="h-4 w-4 text-muted-foreground group-hover:text-green-500" />
                        </button>
                        <button 
                          onClick={() => handleDelete(o.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors group" 
                          title="Delete Order"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* View Order Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-card">
                <h2 className="font-display text-2xl font-bold">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="h-5 w-5" />
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
                  <h3 className="font-semibold mb-3">Shipping Address</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">KG 123 St, Kigali</p>
                      <p className="text-sm text-muted-foreground">Rwanda</p>
                      <p className="text-sm text-muted-foreground">+250 788 000 000</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Payment Information</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">•••• •••• •••• 4242</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-accent">${selectedOrder.price}</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50/50">
                  <h3 className="font-semibold mb-2">Order Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">Order Placed</p>
                        <p className="text-xs text-muted-foreground">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {selectedOrder.status !== "Pending" && (
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div>
                          <p className="text-sm font-medium">Order Shipped</p>
                          <p className="text-xs text-muted-foreground">Processing</p>
                        </div>
                      </div>
                    )}
                    {selectedOrder.status === "Delivered" && (
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div>
                          <p className="text-sm font-medium">Order Delivered</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Order Modal */}
      <AnimatePresence>
        {editingOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setEditingOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl border max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold">Edit Order</h2>
                <button onClick={() => setEditingOrder(null)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Order ID</label>
                  <input 
                    className="input-field bg-muted" 
                    value={editingOrder.id} 
                    disabled 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Product Name</label>
                  <input 
                    className="input-field" 
                    value={editingOrder.product}
                    onChange={(e) => setEditingOrder({...editingOrder, product: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Order Date</label>
                  <input 
                    type="date"
                    className="input-field" 
                    value={editingOrder.date}
                    onChange={(e) => setEditingOrder({...editingOrder, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <select 
                    className="input-field" 
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Price</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="input-field" 
                    value={editingOrder.price}
                    onChange={(e) => setEditingOrder({...editingOrder, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={handleSaveEdit} className="btn-primary flex-1">Save Changes</button>
                  <button onClick={() => setEditingOrder(null)} className="btn-outline flex-1">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CustomerLayout>
  );
}

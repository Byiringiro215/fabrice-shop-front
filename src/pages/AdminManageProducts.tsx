import { motion } from "framer-motion";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { products } from "@/data/products";

export default function AdminManageProducts() {
  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="font-display text-2xl font-bold">Manage Products</h1>
          <div className="flex gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input className="input-field pl-10 py-2 text-sm" placeholder="Search products..." />
            </div>
            <button className="btn-primary py-2 px-4 flex items-center gap-2 text-sm shrink-0">
              <Plus className="h-4 w-4" /> Add Product
            </button>
          </div>
        </div>

        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Price</th>
                  <th className="text-left p-4 font-medium">Seller</th>
                  <th className="text-left p-4 font-medium">Rating</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{p.category}</td>
                    <td className="p-4 font-semibold text-accent">${p.price}</td>
                    <td className="p-4 text-muted-foreground">{p.seller}</td>
                    <td className="p-4">{p.rating} ⭐</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Edit">
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4 text-destructive" />
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
    </AdminLayout>
  );
}

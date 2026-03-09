import { motion } from "framer-motion";
import { Grid3X3, List, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import SellerLayout from "@/components/SellerLayout";
import { products } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";

export default function SellerMyProducts() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filter to show only seller's products (simulated - in real app, filter by seller ID)
  const sellerProducts = products.slice(0, 6);

  const handleEdit = (productId: number) => {
    toast.info("Edit functionality coming soon");
  };

  const handleDelete = (productId: number) => {
    toast.success("Product deleted successfully");
  };

  return (
    <SellerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold">My Products</h1>
          <div className="flex gap-2">
            <Link to="/seller/upload" className="btn-primary flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg border transition-colors ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}>
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg border transition-colors ${viewMode === "list" ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}>
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {sellerProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">You haven't added any products yet</p>
            <Link to="/seller/upload" className="btn-primary inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Product
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellerProducts.map((p) => (
              <div key={p.id} className="bg-card rounded-xl overflow-hidden border card-hover">
                <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                  <h3 className="font-display font-semibold line-clamp-1 mt-1">{p.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-accent font-bold">${p.price}</p>
                    <span className="text-xs text-muted-foreground">{p.reviews} sales</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => handleEdit(p.id)}
                      className="flex-1 btn-outline text-xs py-2 flex items-center justify-center gap-1"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 btn-outline text-xs py-2 flex items-center justify-center gap-1 text-red-600 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sellerProducts.map((p) => (
              <div key={p.id} className="bg-card rounded-xl border p-4 flex items-center gap-4 card-hover">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.category} • {p.location}</p>
                </div>
                <p className="text-accent font-bold shrink-0">${p.price}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(p.id)}
                    className="btn-outline text-xs py-2 px-3 flex items-center gap-1"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="btn-outline text-xs py-2 px-3 flex items-center gap-1 text-red-600 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </SellerLayout>
  );
}

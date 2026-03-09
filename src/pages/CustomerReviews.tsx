import { motion } from "framer-motion";
import { Star, Edit, Trash2 } from "lucide-react";
import CustomerLayout from "@/components/CustomerLayout";
import { reviews } from "@/data/products";

export default function CustomerReviews() {
  return (
    <CustomerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-card rounded-xl border">
          <div className="p-6 border-b">
            <h2 className="font-display text-2xl font-bold">My Reviews</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your product reviews</p>
          </div>
          <div className="p-6 space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold mb-1">{r.product}</h3>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">"{r.comment}"</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{new Date(r.date).toLocaleDateString()}</span>
                  <span>By {r.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </CustomerLayout>
  );
}

import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, User, Download, ArrowLeft, ShoppingCart } from "lucide-react";
import CustomerLayout from "@/components/CustomerLayout";
import { products, reviews } from "@/data/products";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function CustomerProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const productReviews = reviews.filter((r) => r.productId === Number(id));
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  if (!product) {
    return (
      <CustomerLayout>
        <div className="py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Product not found</h1>
          <Link to="/customer/products" className="btn-primary mt-4 inline-block">Back to Products</Link>
        </div>
      </CustomerLayout>
    );
  }

  const handleOrderNow = () => {
    navigate(`/checkout/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success("Added to cart!");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    toast.success("Review submitted successfully!");
    setNewComment("");
    setNewRating(5);
  };

  return (
    <CustomerLayout>
      <div className="py-8">
        <Link to="/customer/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border bg-card">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
          </div>

          {/* Details */}
          <div>
            <span className="text-sm text-accent font-medium">{product.category}</span>
            <h1 className="font-display text-3xl font-bold mt-1">{product.name}</h1>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {product.location}
              </div>
            </div>
            <p className="text-3xl font-bold text-accent mt-4">${product.price}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">{product.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <User className="h-4 w-4" /> Sold by <span className="font-medium text-foreground">{product.seller}</span>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button 
                onClick={handleOrderNow}
                className="btn-primary flex-1 text-center"
              >
                Order Now
              </button>
              <button 
                onClick={handleAddToCart}
                className="btn-outline flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button className="btn-outline flex items-center gap-2">
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4 mb-8">
            {productReviews.length > 0 ? productReviews.map((r) => (
              <div key={r.id} className="bg-card rounded-xl border p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-semibold text-sm">{r.user}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
              </div>
            )) : (
              <p className="text-muted-foreground text-sm">No reviews yet. Be the first to review!</p>
            )}
          </div>

          {/* Add Review */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="font-display font-semibold mb-4">Add a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button" onClick={() => setNewRating(s)}>
                      <Star className={`h-6 w-6 transition-colors ${s <= newRating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Comment</label>
                <textarea
                  className="input-field h-24 resize-none"
                  placeholder="Share your experience..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, MapPin, SlidersHorizontal, X, ShoppingCart, ShoppingBag as ShoppingBagIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { products, categories, locations } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function ProductListing() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = !category || p.category === category;
      const matchLoc = !location || p.location === location;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchCat && matchLoc && matchPrice;
    });
  }, [search, category, location, priceRange]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success("Added to cart!");
  };

  const handleBuyNow = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }
    
    navigate(`/checkout/${productId}`);
  };

  return (
    <Layout>
      <div className="section-container py-8">
        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              className="input-field pl-10"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="lg:hidden btn-outline px-4 flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <aside className={`${showFilters ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : "hidden"} lg:block lg:static lg:w-64 shrink-0`}>
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h3 className="font-display font-bold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-display font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  <button onClick={() => setCategory("")} className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${!category ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}>All Categories</button>
                  {categories.map((c) => (
                    <button key={c} onClick={() => setCategory(c)} className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${category === c ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold mb-3">Location</h4>
                <div className="space-y-2">
                  <button onClick={() => setLocation("")} className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${!location ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}>All Locations</button>
                  {locations.map((l) => (
                    <button key={l} onClick={() => setLocation(l)} className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${location === l ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold mb-3">Price Range</h4>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="input-field w-20 text-sm py-2"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  />
                  <span className="text-muted-foreground">—</span>
                  <input
                    type="number"
                    className="input-field w-20 text-sm py-2"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  />
                </div>
              </div>
              <button className="lg:hidden btn-primary w-full" onClick={() => setShowFilters(false)}>Apply Filters</button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl overflow-hidden border card-hover group"
                >
                  <Link to={`/products/${p.id}`} className="block">
                    <div className="aspect-square overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3" /> {p.location}
                      </div>
                      <h3 className="font-display font-semibold line-clamp-1">{p.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        <span className="text-sm">{p.rating}</span>
                        <span className="text-xs text-muted-foreground">({p.reviews})</span>
                      </div>
                      <p className="mt-2 text-lg font-bold text-accent">${p.price}</p>
                    </div>
                  </Link>
                  
                  {/* Action Buttons */}
                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick={(e) => handleAddToCart(e, p)}
                      className="flex-1 btn-outline text-xs py-2 flex items-center justify-center gap-1 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(e, p.id)}
                      className="flex-1 btn-primary text-xs py-2 flex items-center justify-center gap-1"
                    >
                      <ShoppingBagIcon className="h-3.5 w-3.5" />
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

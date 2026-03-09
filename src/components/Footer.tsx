import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold mb-4">
            <ShoppingBag className="h-6 w-6 text-accent" />
            Fabrice-E-Shopping
          </Link>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Your trusted marketplace for quality products from local sellers across Rwanda.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/products" className="hover:text-accent transition-colors">Products</Link></li>
            <li><Link to="/register" className="hover:text-accent transition-colors">Register</Link></li>
            <li><Link to="/login" className="hover:text-accent transition-colors">Login</Link></li>
            <li><Link to="/orders" className="hover:text-accent transition-colors">Order History</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/products" className="hover:text-accent transition-colors">Electronics</Link></li>
            <li><Link to="/products" className="hover:text-accent transition-colors">Fashion</Link></li>
            <li><Link to="/products" className="hover:text-accent transition-colors">Sports</Link></li>
            <li><Link to="/products" className="hover:text-accent transition-colors">Home & Garden</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Kigali, Rwanda</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +250 788 000 000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> info@fabrice-eshop.rw</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="section-container py-4 text-center text-sm text-primary-foreground/50">
          © 2026 Fabrice-E-Shopping. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

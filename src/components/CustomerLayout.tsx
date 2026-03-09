import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, MessageSquare, User, Settings, LogOut, Bell, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sideLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/customer" },
  { icon: ShoppingBag, label: "Products", path: "/customer/products" },
  { icon: ShoppingCart, label: "My Orders", path: "/customer/orders" },
  { icon: MessageSquare, label: "My Reviews", path: "/customer/reviews" },
  { icon: User, label: "Profile", path: "/customer/profile" },
  { icon: Settings, label: "Settings", path: "/customer/settings" },
];

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-accent" />
            <h1 className="font-display text-xl font-bold">Customer Portal</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/customer/cart")}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent rounded-full text-xs flex items-center justify-center text-white font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
                  {user?.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-card border rounded-lg shadow-xl overflow-hidden"
                  >
                    <div className="p-4 border-b bg-muted/30">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/customer"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="text-sm">Dashboard</span>
                      </Link>
                      <Link
                        to="/customer/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm">Profile</span>
                      </Link>
                      <Link
                        to="/customer/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span className="text-sm">Settings</span>
                      </Link>
                    </div>
                    <div className="border-t py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden lg:flex w-64 bg-sidebar flex-col border-r">
          <nav className="flex-1 px-3 py-4 space-y-1">
            {sideLinks.map((l) => (
              <Link key={l.label} to={l.path} className={`sidebar-link ${pathname === l.path ? "active" : ""}`}>
                <l.icon className="h-5 w-5" /> {l.label}
              </Link>
            ))}
          </nav>
          <div className="p-3 border-t">
            <button onClick={handleLogout} className="sidebar-link text-red-600 hover:text-red-700 hover:bg-red-50 w-full">
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        </aside>
        <div className="flex-1 p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}

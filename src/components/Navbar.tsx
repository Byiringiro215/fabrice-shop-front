import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingBag, User, Bell, LogOut, Settings, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "admin": return "/admin";
      case "seller": return "/seller";
      case "customer": return "/customer";
      default: return "/";
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="section-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground font-display text-xl font-bold tracking-tight">
          <ShoppingBag className="h-6 w-6 text-accent" />
          Fabrice-E-Shopping
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`nav-link text-primary-foreground/80 hover:text-primary-foreground pb-1 ${pathname === l.path ? "active text-primary-foreground" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <button className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
                    {user?.name.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-medium text-primary-foreground">{user?.name}</p>
                    <p className="text-xs text-primary-foreground/60 capitalize">{user?.role}</p>
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
                          to={getDashboardPath()}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                        >
                          <Package className="h-4 w-4" />
                          <span className="text-sm">Dashboard</span>
                        </Link>
                        <Link
                          to={`/${user?.role}/profile`}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span className="text-sm">Profile</span>
                        </Link>
                        <Link
                          to={`/${user?.role}/settings`}
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
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary text-sm py-2 px-4">Login</Link>
              <Link to="/register" className="btn-outline border-accent/60 text-primary-foreground text-sm py-2 px-4">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setOpen(false)}
                  className={`text-primary-foreground/80 hover:text-primary-foreground py-2 border-b border-primary-foreground/10 ${pathname === l.path ? "text-accent font-semibold" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="border-t border-primary-foreground/10 pt-3 mt-2">
                    <div className="flex items-center gap-3 mb-3 p-2">
                      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
                        {user?.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-foreground">{user?.name}</p>
                        <p className="text-xs text-primary-foreground/60 capitalize">{user?.role}</p>
                      </div>
                    </div>
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground py-2"
                    >
                      <Package className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      to={`/${user?.role}/profile`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground py-2"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to={`/${user?.role}/settings`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground py-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm py-2 px-4 text-center mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-primary text-sm py-2 px-4 text-center flex-1">Login</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-outline border-accent/60 text-primary-foreground text-sm py-2 px-4 text-center flex-1">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

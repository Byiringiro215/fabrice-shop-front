import { motion } from "framer-motion";
import { ShoppingCart, MessageSquare, User, Settings, LogOut, Star, LayoutDashboard, Package, TrendingUp, DollarSign, Clock, Bell, ShoppingBag } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { orders, reviews } from "@/data/products";

const sideLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/customer" },
  { icon: ShoppingCart, label: "My Orders", path: "/customer/orders" },
  { icon: MessageSquare, label: "My Reviews", path: "/customer/reviews" },
  { icon: User, label: "Profile", path: "/customer/profile" },
  { icon: Settings, label: "Settings", path: "/customer/settings" },
];

export default function CustomerDashboard() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;

  const monthlyData = [
    { month: "Jan", spent: 120 },
    { month: "Feb", spent: 250 },
    { month: "Mar", spent: totalSpent },
  ];

  const maxSpent = Math.max(...monthlyData.map(d => d.spent));

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

        <div className="flex-1 p-6 md:p-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
              <p className="text-muted-foreground">Here's what's happening with your account today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Package className="h-6 w-6 text-blue-500" />
                  </div>
                  <span className="text-xs text-green-500 font-medium">+12%</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{totalOrders}</h3>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>

              <div className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                  <span className="text-xs text-green-500 font-medium">+8%</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">${totalSpent.toFixed(2)}</h3>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>

              <div className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-500" />
                  </div>
                  <span className="text-xs text-orange-500 font-medium">{pendingOrders} pending</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{pendingOrders}</h3>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
              </div>

              <div className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                  </div>
                  <span className="text-xs text-green-500 font-medium">+{deliveredOrders}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{deliveredOrders}</h3>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Spending Chart */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="font-display text-xl font-bold mb-6">Monthly Spending</h2>
                <div className="space-y-4">
                  {monthlyData.map((data) => (
                    <div key={data.month}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{data.month}</span>
                        <span className="text-sm font-bold">${data.spent}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(data.spent / maxSpent) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Status Distribution */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="font-display text-xl font-bold mb-6">Order Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">Delivered</span>
                    </div>
                    <span className="text-2xl font-bold">{deliveredOrders}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="font-medium">Shipped</span>
                    </div>
                    <span className="text-2xl font-bold">{orders.filter(o => o.status === "Shipped").length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                      <span className="font-medium">Pending</span>
                    </div>
                    <span className="text-2xl font-bold">{pendingOrders}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="p-5 border-b flex justify-between items-center">
                <h2 className="font-display text-xl font-bold">Recent Orders</h2>
                <Link to="/customer/orders" className="text-sm text-accent hover:underline">View All</Link>
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
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 3).map((o) => (
                      <tr key={o.id} className="border-t hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium">{o.id}</td>
                        <td className="p-4">{o.product}</td>
                        <td className="p-4 text-muted-foreground">{new Date(o.date).toLocaleDateString()}</td>
                        <td className="p-4"><span className={`badge-${o.status.toLowerCase()}`}>{o.status}</span></td>
                        <td className="p-4 font-semibold">${o.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-card rounded-xl border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display text-xl font-bold">Recent Reviews</h2>
                <Link to="/customer/reviews" className="text-sm text-accent hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.slice(0, 2).map((r) => (
                  <div key={r.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">"{r.comment}"</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Users, TrendingUp, Activity, UserCheck, UserX, UserPlus, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";

const stats = [
  { icon: Users, label: "Total Users", value: "1,248", change: "+12%", color: "bg-blue-500/10 text-blue-500" },
  { icon: UserCheck, label: "Active Users", value: "1,089", change: "+8%", color: "bg-green-500/10 text-green-500" },
  { icon: UserPlus, label: "New Users (30d)", value: "156", change: "+23%", color: "bg-purple-500/10 text-purple-500" },
  { icon: UserX, label: "Inactive Users", value: "159", change: "-5%", color: "bg-orange-500/10 text-orange-500" },
];

const userGrowthData = [
  { month: "Jan", users: 850 },
  { month: "Feb", users: 920 },
  { month: "Mar", users: 1050 },
  { month: "Apr", users: 1120 },
  { month: "May", users: 1180 },
  { month: "Jun", users: 1248 },
];

const usersByRole = [
  { role: "Customers", count: 1089, percentage: 87, color: "bg-blue-500" },
  { role: "Sellers", count: 142, percentage: 11, color: "bg-green-500" },
  { role: "Admins", count: 17, percentage: 2, color: "bg-purple-500" },
];

const recentActivities = [
  { user: "John Doe", action: "Registered as Customer", time: "2 minutes ago" },
  { user: "Jane Smith", action: "Updated profile", time: "15 minutes ago" },
  { user: "Mike Johnson", action: "Registered as Seller", time: "1 hour ago" },
  { user: "Sarah Williams", action: "Account verified", time: "2 hours ago" },
  { user: "Tom Brown", action: "Password changed", time: "3 hours ago" },
];

export default function AdminDashboard() {
  const maxUsers = Math.max(...userGrowthData.map(d => d.users));

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold mb-2">System Analytics</h1>
          <p className="text-muted-foreground">Monitor user activity and system performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }} 
              className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <span className={`text-xs font-medium ${s.change.startsWith('+') ? 'text-green-500' : 'text-orange-500'}`}>
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold font-display mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Growth Chart */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-accent" />
              <h2 className="font-display text-xl font-bold">User Growth</h2>
            </div>
            <div className="space-y-4">
              {userGrowthData.map((data) => (
                <div key={data.month}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{data.month}</span>
                    <span className="text-sm font-bold">{data.users} users</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.users / maxUsers) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Users by Role */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-accent" />
              <h2 className="font-display text-xl font-bold">Users by Role</h2>
            </div>
            <div className="space-y-4">
              {usersByRole.map((item) => (
                <div key={item.role} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.role}</span>
                    <span className="text-sm text-muted-foreground">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border mb-6">
          <div className="p-6 border-b flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-bold">Recent User Activity</h2>
          </div>
          <div className="divide-y">
            {recentActivities.map((activity, i) => (
              <div key={i} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/admin/users" className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Manage Users</h3>
                <p className="text-sm text-muted-foreground">View and manage all system users</p>
              </div>
            </div>
          </Link>
          <Link to="/admin/settings" className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">System Settings</h3>
                <p className="text-sm text-muted-foreground">Configure system preferences</p>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </AdminLayout>
  );
}

import { motion } from "framer-motion";
import { Bell, Globe, Lock, Palette } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Admin Settings</h1>

        <div className="space-y-6">
          {/* General */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display font-semibold text-lg">General Settings</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium mb-1 block">Site Name</label>
                <input className="input-field" defaultValue="Fabrice-E-Shopping" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Contact Email</label>
                <input className="input-field" defaultValue="admin@fabrice-eshop.rw" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Currency</label>
                <select className="input-field">
                  <option>USD ($)</option>
                  <option>RWF (FRw)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Timezone</label>
                <select className="input-field">
                  <option>Africa/Kigali (CAT)</option>
                  <option>UTC</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="font-display font-semibold text-lg">Notifications</h2>
            </div>
            <div className="space-y-3">
              {["Email notifications for new orders", "Email notifications for new users", "SMS alerts for low stock"].map((label, i) => (
                <label key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer">
                  <span className="text-sm">{label}</span>
                  <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 accent-accent" />
                </label>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="font-display font-semibold text-lg">Security</h2>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium mb-1 block">Current Password</label>
                <input type="password" className="input-field" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">New Password</label>
                <input type="password" className="input-field" placeholder="••••••••" />
              </div>
              <button type="submit" className="btn-primary">Update Password</button>
            </form>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}

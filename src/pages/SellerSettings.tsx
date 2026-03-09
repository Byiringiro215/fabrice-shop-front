import { motion } from "framer-motion";
import { User, Lock, Bell } from "lucide-react";
import SellerLayout from "@/components/SellerLayout";

export default function SellerSettings() {
  return (
    <SellerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Seller Settings</h1>

        <div className="space-y-6">
          {/* Profile */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <User className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display font-semibold text-lg">Store Profile</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium mb-1 block">Store Name</label>
                <input className="input-field" defaultValue="My Store" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Contact Email</label>
                <input className="input-field" defaultValue="store@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone Number</label>
                <input className="input-field" defaultValue="+250 788 000 000" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <input className="input-field" defaultValue="Kigali, Rwanda" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">Store Description</label>
                <textarea className="input-field h-20 resize-none" defaultValue="We sell quality products..." />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="btn-primary">Save Profile</button>
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
              {["Email me when I get a new order", "Email me for product reviews", "Weekly sales summary"].map((label, i) => (
                <label key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer">
                  <span className="text-sm">{label}</span>
                  <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 accent-accent" />
                </label>
              ))}
            </div>
          </div>

          {/* Password */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="font-display font-semibold text-lg">Change Password</h2>
            </div>
            <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
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
    </SellerLayout>
  );
}

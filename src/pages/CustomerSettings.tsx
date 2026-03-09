import { motion } from "framer-motion";
import { Lock, Bell, CreditCard } from "lucide-react";
import CustomerLayout from "@/components/CustomerLayout";

export default function CustomerSettings() {
  return (
    <CustomerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Security Settings */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-accent" />
            <h2 className="font-display text-xl font-bold">Security</h2>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium mb-1 block">Current Password</label>
              <input type="password" className="input-field" placeholder="Enter current password" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">New Password</label>
              <input type="password" className="input-field" placeholder="Enter new password" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Confirm New Password</label>
              <input type="password" className="input-field" placeholder="Confirm new password" />
            </div>
            <button type="submit" className="btn-primary">Update Password</button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-accent" />
            <h2 className="font-display text-xl font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Order Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about your order status</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Promotional Emails</p>
                <p className="text-sm text-muted-foreground">Receive special offers and discounts</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">New Products</p>
                <p className="text-sm text-muted-foreground">Be the first to know about new arrivals</p>
              </div>
              <input type="checkbox" className="h-5 w-5" />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Review Reminders</p>
                <p className="text-sm text-muted-foreground">Reminders to review your purchases</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="h-6 w-6 text-accent" />
            <h2 className="font-display text-xl font-bold">Payment Methods</h2>
          </div>
          <div className="space-y-3 mb-4">
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <button className="text-sm text-red-500 hover:underline">Remove</button>
            </div>
          </div>
          <button className="btn-outline text-sm">Add Payment Method</button>
        </div>
      </motion.div>
    </CustomerLayout>
  );
}

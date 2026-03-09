import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminProfile() {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Admin Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-accent" />
                </div>
                <h2 className="font-display text-xl font-bold mb-1">{user?.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Shield className="h-4 w-4" />
                  <span className="capitalize">{user?.role}</span>
                </div>
                <button className="btn-primary w-full text-sm">Change Photo</button>
              </div>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+250 788 000 000</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Kigali, Rwanda</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined March 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-display text-xl font-bold mb-6">Profile Information</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    <input className="input-field" defaultValue="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    <input className="input-field" defaultValue="Doe" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <input type="email" className="input-field" defaultValue={user?.email} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Phone</label>
                  <input className="input-field" defaultValue="+250 788 000 000" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Address</label>
                  <input className="input-field" defaultValue="Kigali, Rwanda" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Bio</label>
                  <textarea className="input-field min-h-24" defaultValue="System administrator with full access to manage users and monitor system analytics." />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary">Save Changes</button>
                  <button type="button" className="btn-outline">Cancel</button>
                </div>
              </form>
            </div>

            {/* Admin Permissions */}
            <div className="bg-card rounded-xl border p-6 mt-6">
              <h3 className="font-display text-xl font-bold mb-4">Admin Permissions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">User Management</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Full Access</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">System Analytics</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Full Access</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">System Settings</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Full Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}

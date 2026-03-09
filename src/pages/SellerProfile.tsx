import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Store, Package, TrendingUp } from "lucide-react";
import SellerLayout from "@/components/SellerLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function SellerProfile() {
  const { user } = useAuth();

  return (
    <SellerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Seller Profile</h1>

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
                  <Store className="h-4 w-4" />
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

            {/* Seller Stats */}
            <div className="bg-card rounded-xl border p-6 mt-6">
              <h3 className="font-semibold mb-4">Seller Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Total Products</span>
                  </div>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Total Sales</span>
                  </div>
                  <span className="font-bold">$12,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <span className="font-bold">4.8 ⭐</span>
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
                  <label className="text-sm font-medium mb-1 block">Store Name</label>
                  <input className="input-field" defaultValue="TechStore Rwanda" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Store Location</label>
                  <input className="input-field" defaultValue="Kigali, Rwanda" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Store Description</label>
                  <textarea className="input-field min-h-24" defaultValue="We sell quality electronics and gadgets at affordable prices. Fast delivery across Rwanda." />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary">Save Changes</button>
                  <button type="button" className="btn-outline">Cancel</button>
                </div>
              </form>
            </div>

            {/* Business Information */}
            <div className="bg-card rounded-xl border p-6 mt-6">
              <h3 className="font-display text-xl font-bold mb-4">Business Information</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium mb-1 block">Business Registration Number</label>
                  <input className="input-field" defaultValue="RW-BUS-2024-001234" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tax ID</label>
                  <input className="input-field" defaultValue="TAX-123456789" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Bank Account</label>
                  <input className="input-field" defaultValue="•••• •••• •••• 5678" />
                </div>
                <button type="submit" className="btn-outline text-sm">Update Business Info</button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </SellerLayout>
  );
}

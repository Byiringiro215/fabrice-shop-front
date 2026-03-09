import { motion } from "framer-motion";
import { User } from "lucide-react";
import CustomerLayout from "@/components/CustomerLayout";

export default function CustomerProfile() {
  return (
    <CustomerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-card rounded-xl border p-6 max-w-2xl">
          <h2 className="font-display text-2xl font-bold mb-6">Profile Information</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center gap-6 mb-6">
              <div className="h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="h-12 w-12 text-accent" />
              </div>
              <div>
                <button type="button" className="btn-primary text-sm">Change Photo</button>
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB</p>
              </div>
            </div>

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
              <input type="email" className="input-field" defaultValue="john@example.com" />
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
              <textarea className="input-field min-h-24" defaultValue="I love shopping online!" />
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" className="btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      </motion.div>
    </CustomerLayout>
  );
}

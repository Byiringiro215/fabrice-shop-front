import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Layout from "@/components/Layout";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("Customer");

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4 bg-card rounded-2xl shadow-xl border p-8"
        >
          <h1 className="font-display text-2xl font-bold text-center">Create Account</h1>
          <p className="text-muted-foreground text-sm text-center mt-1 mb-6">Join Fabrice-E-Shopping today</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              <input type="text" className="input-field" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input type="email" className="input-field" placeholder="john@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone Number</label>
              <input type="tel" className="input-field" placeholder="+250 7XX XXX XXX" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {["Customer", "Seller", "Admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-all ${role === r ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border hover:border-accent/50"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input type={showPass ? "text" : "password"} className="input-field pr-10" placeholder="••••••••" />
              <button type="button" className="absolute right-3 top-9 text-muted-foreground" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Confirm Password</label>
              <input type="password" className="input-field" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-primary w-full mt-2">Create Account</button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-accent font-medium hover:underline">Login</Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}

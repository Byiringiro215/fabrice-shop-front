import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const redirectMap: Record<string, string> = {
    admin: "/admin",
    seller: "/seller",
    customer: "/customer",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    // Login with auth context
    login(email, password, role as "customer" | "seller" | "admin");
    toast.success(`Logged in as ${role}`);
    navigate(redirectMap[role]);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4 bg-card rounded-2xl shadow-xl border p-8"
        >
          <h1 className="font-display text-2xl font-bold text-center">Welcome Back</h1>
          <p className="text-muted-foreground text-sm text-center mt-1 mb-6">Login to your account</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input type="email" className="input-field" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "customer", label: "Customer" },
                  { value: "seller", label: "Seller" },
                  { value: "admin", label: "Admin" }
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-all ${role === r.value ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border hover:border-accent/50"}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input type={showPass ? "text" : "password"} className="input-field pr-10" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="absolute right-3 top-9 text-muted-foreground" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <button type="button" className="text-sm text-accent hover:underline">Forgot password?</button>
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <LogIn className="h-4 w-4" /> Login
            </button>
          </form>

          <div className="mt-4 p-3 bg-muted rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              As <span className="font-semibold text-accent capitalize">{role}</span>, you'll be redirected to the{" "}
              <span className="text-accent font-medium capitalize">{role} Dashboard</span>
            </p>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <Link to="/register" className="text-accent font-medium hover:underline">Register</Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}

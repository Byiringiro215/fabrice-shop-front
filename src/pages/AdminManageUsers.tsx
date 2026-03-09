import { motion } from "framer-motion";
import { Users, Shield, Trash2, Search, MoreHorizontal } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const users = [
  { id: 1, name: "Alice Mukamana", email: "alice@example.com", role: "Customer", status: "Active", joined: "2026-01-15" },
  { id: 2, name: "Jean Pierre", email: "jean@example.com", role: "Seller", status: "Active", joined: "2026-02-01" },
  { id: 3, name: "Marie Claire", email: "marie@example.com", role: "Customer", status: "Suspended", joined: "2025-11-20" },
  { id: 4, name: "David Kamanzi", email: "david@example.com", role: "Seller", status: "Active", joined: "2026-01-28" },
  { id: 5, name: "Grace Uwimana", email: "grace@example.com", role: "Customer", status: "Active", joined: "2026-03-01" },
  { id: 6, name: "Patrick Habimana", email: "patrick@example.com", role: "Admin", status: "Active", joined: "2025-06-10" },
];

export default function AdminManageUsers() {
  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="font-display text-2xl font-bold">Manage Users</h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input className="input-field pl-10 py-2 text-sm" placeholder="Search users..." />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{users.filter(u => u.status === "Active").length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{users.filter(u => u.status === "Suspended").length}</p>
                <p className="text-sm text-muted-foreground">Suspended</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Joined</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-muted-foreground">{u.email}</td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${u.role === "Admin" ? "bg-accent/10 text-accent" : u.role === "Seller" ? "bg-blue-100 text-blue-800" : "bg-muted text-muted-foreground"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${u.status === "Active" ? "bg-green-100 text-green-800" : "bg-destructive/10 text-destructive"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{u.joined}</td>
                    <td className="p-4">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}

import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useState } from "react";
import SellerLayout from "@/components/SellerLayout";
import { categories, locations } from "@/data/products";
import { toast } from "sonner";

export default function SellerUploadProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: categories[0],
    location: locations[0],
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    // Simulate product upload
    toast.success("Product uploaded successfully!");
    
    // Reset form
    setFormData({
      name: "",
      price: "",
      category: categories[0],
      location: locations[0],
      description: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SellerLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Upload New Product</h1>

        <div className="bg-card rounded-xl border p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field" 
                placeholder="Product name" 
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input 
                name="price"
                type="number" 
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="input-field" 
                placeholder="0.00" 
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <select 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
              >
                {locations.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1 block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field h-24 resize-none" 
                placeholder="Product description..." 
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Upload Photo</label>
              <label className="input-field flex items-center justify-center h-28 border-dashed cursor-pointer hover:border-accent/50 transition-colors">
                <input type="file" accept="image/*" className="hidden" />
                <div className="text-center">
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              </label>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Upload Document</label>
              <label className="input-field flex items-center justify-center h-28 border-dashed cursor-pointer hover:border-accent/50 transition-colors">
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                <div className="text-center">
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                  <span className="text-sm text-muted-foreground">Click to upload document</span>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC up to 10MB</p>
                </div>
              </label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">Publish Product</button>
              <button 
                type="button" 
                onClick={() => setFormData({
                  name: "",
                  price: "",
                  category: categories[0],
                  location: locations[0],
                  description: "",
                })}
                className="btn-outline"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </SellerLayout>
  );
}

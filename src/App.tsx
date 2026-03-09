import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageUsers from "./pages/AdminManageUsers";
import AdminSettings from "./pages/AdminSettings";
import AdminProfile from "./pages/AdminProfile";
import SellerDashboard from "./pages/SellerDashboard";
import SellerMyProducts from "./pages/SellerMyProducts";
import SellerUploadProduct from "./pages/SellerUploadProduct";
import SellerSettings from "./pages/SellerSettings";
import SellerProfile from "./pages/SellerProfile";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProducts from "./pages/CustomerProducts";
import CustomerProductDetail from "./pages/CustomerProductDetail";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerReviews from "./pages/CustomerReviews";
import CustomerProfile from "./pages/CustomerProfile";
import CustomerSettings from "./pages/CustomerSettings";
import CustomerCart from "./pages/CustomerCart";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminManageUsers />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/seller/products" element={<SellerMyProducts />} />
              <Route path="/seller/upload" element={<SellerUploadProduct />} />
              <Route path="/seller/profile" element={<SellerProfile />} />
              <Route path="/seller/settings" element={<SellerSettings />} />
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/products" element={<CustomerProducts />} />
              <Route path="/customer/products/:id" element={<CustomerProductDetail />} />
              <Route path="/customer/orders" element={<CustomerOrders />} />
              <Route path="/customer/reviews" element={<CustomerReviews />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/settings" element={<CustomerSettings />} />
              <Route path="/customer/cart" element={<CustomerCart />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

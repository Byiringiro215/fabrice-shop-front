// Sample Product Data (matching React version exactly)
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        category: "Electronics",
        location: "Kigali",
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        seller: "TechStore Rwanda",
        description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior comfort for all-day wear."
    },
    {
        id: 2,
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        category: "Fashion",
        location: "Butare",
        rating: 4.2,
        reviews: 86,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        seller: "AfriWear",
        description: "100% organic cotton t-shirt, available in multiple colors. Ethically sourced and sustainably produced."
    },
    {
        id: 3,
        name: "Smart Watch Pro",
        price: 199.99,
        category: "Electronics",
        location: "Kigali",
        rating: 4.7,
        reviews: 245,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        seller: "GadgetHub",
        description: "Advanced smartwatch with health monitoring, GPS tracking, and water resistance up to 50 meters."
    },
    {
        id: 4,
        name: "Handcrafted Leather Bag",
        price: 149.99,
        category: "Fashion",
        location: "Musanze",
        rating: 4.8,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        seller: "ArtisanCraft",
        description: "Beautiful handcrafted leather bag made by local artisans. Each piece is unique with traditional patterns."
    },
    {
        id: 5,
        name: "Running Shoes Ultra",
        price: 129.99,
        category: "Sports",
        location: "Kigali",
        rating: 4.4,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        seller: "SportZone",
        description: "Lightweight running shoes with advanced cushioning technology for maximum comfort and performance."
    },
    {
        id: 6,
        name: "Organic Coffee Beans",
        price: 18.99,
        category: "Food & Beverage",
        location: "Gisenyi",
        rating: 4.9,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
        seller: "Rwanda Coffee Co.",
        description: "Premium single-origin coffee beans from the hills of Rwanda. Medium roast with notes of chocolate and citrus."
    },
    {
        id: 7,
        name: "Ceramic Plant Pot Set",
        price: 34.99,
        category: "Home & Garden",
        location: "Butare",
        rating: 4.3,
        reviews: 54,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
        seller: "HomeDecor Plus",
        description: "Set of 3 beautiful ceramic plant pots in varying sizes. Perfect for indoor plants and home decoration."
    },
    {
        id: 8,
        name: "Yoga Mat Premium",
        price: 45.99,
        category: "Sports",
        location: "Kigali",
        rating: 4.6,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
        seller: "FitLife",
        description: "Extra thick premium yoga mat with non-slip surface. Perfect for yoga, pilates, and floor exercises."
    }
];

const categories = ["Electronics", "Fashion", "Sports", "Food & Beverage", "Home & Garden"];
const locations = ["Kigali", "Butare", "Musanze", "Gisenyi"];

// Sample Orders
const orders = [
    { id: "ORD-001", product: "Wireless Bluetooth Headphones", date: "2026-03-01", status: "Delivered", price: 79.99 },
    { id: "ORD-002", product: "Smart Watch Pro", date: "2026-03-03", status: "Shipped", price: 199.99 },
    { id: "ORD-003", product: "Running Shoes Ultra", date: "2026-03-05", status: "Pending", price: 129.99 },
    { id: "ORD-004", product: "Organic Coffee Beans", date: "2026-02-28", status: "Delivered", price: 18.99 },
    { id: "ORD-005", product: "Handcrafted Leather Bag", date: "2026-03-06", status: "Pending", price: 149.99 }
];

// Sample Reviews
const reviews = [
    { id: 1, user: "Alice M.", rating: 5, comment: "Amazing quality! Will definitely buy again.", date: "2026-02-20", productId: 1, product: "Wireless Bluetooth Headphones" },
    { id: 2, user: "Jean P.", rating: 4, comment: "Good product, fast delivery.", date: "2026-02-22", productId: 1, product: "Wireless Bluetooth Headphones" },
    { id: 3, user: "Marie C.", rating: 5, comment: "Exceeded my expectations. Love it!", date: "2026-03-01", productId: 3, product: "Smart Watch Pro" },
    { id: 4, user: "David K.", rating: 4, comment: "Great value for money.", date: "2026-03-02", productId: 5, product: "Running Shoes Ultra" }
];

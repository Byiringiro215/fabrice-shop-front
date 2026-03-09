import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowRight, ShieldCheck, Truck, Headphones } from "lucide-react";
import Layout from "@/components/Layout";
import { products, categories } from "@/data/products";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const testimonials = [
  { name: "Alice M.", text: "Best shopping experience in Rwanda! Fast delivery and great products.", rating: 5 },
  { name: "Jean P.", text: "Love the variety of local products. The quality is always outstanding.", rating: 5 },
  { name: "Marie C.", text: "Easy to use platform. Found exactly what I was looking for.", rating: 4 },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-navy to-navy-dark opacity-90" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="section-container relative py-20 md:py-32 flex flex-col items-center text-center">
          <motion.h1 {...fadeUp()} className="font-display text-4xl md:text-6xl font-bold text-primary-foreground max-w-3xl leading-tight">
            Discover Amazing Products from <span className="text-accent">Local Sellers</span>
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="mt-6 text-lg text-primary-foreground/70 max-w-xl">
            Shop quality products from trusted sellers across Rwanda. Electronics, fashion, food & more — all in one place.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Shop Now <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/register" className="btn-outline border-primary-foreground/30 text-primary-foreground text-lg px-8 py-4">
              Join Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-card border-b">
        <div className="section-container py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "Quick & reliable shipping" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected transactions" },
            { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
          ].map((f, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <f.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-display font-semibold">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-2">Handpicked quality items from our best sellers</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} {...fadeUp(i * 0.1)}>
                <Link to={`/products/${p.id}`} className="block bg-card rounded-xl overflow-hidden border card-hover group">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                    <h3 className="font-display font-semibold mt-1 line-clamp-1">{p.name}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{p.rating}</span>
                      <span className="text-xs text-muted-foreground">({p.reviews})</span>
                    </div>
                    <p className="mt-2 text-lg font-bold text-accent">${p.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="section-container">
          <motion.h2 {...fadeUp()} className="font-display text-3xl font-bold text-center mb-10">Shop by Category</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat} {...fadeUp(i * 0.08)}>
                <Link to="/products" className="block bg-card rounded-xl p-6 text-center border card-hover">
                  <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <span className="text-2xl">{["💻", "👕", "⚽", "☕", "🏠"][i]}</span>
                  </div>
                  <p className="font-display font-semibold text-sm">{cat}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <motion.h2 {...fadeUp()} className="font-display text-3xl font-bold text-center mb-10">What Our Customers Say</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-card rounded-xl p-6 border card-hover">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="font-display font-semibold text-sm">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

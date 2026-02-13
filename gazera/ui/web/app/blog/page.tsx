"use client";

import { useEffect, useState } from "react";

const featuredPost = {
  title: "Introducing Gazi 2.0: Arabic Reasoning at Scale",
  excerpt: "Today we're releasing our most capable Arabic language model yet — with enhanced dialect support, improved reasoning, and enterprise-ready RAG capabilities.",
  date: "Jan 15, 2026",
  readTime: "8 min read",
  category: "Product",
  image: "🚀",
};

const posts = [
  {
    title: "How We Evaluate Arabic Dialect Understanding",
    excerpt: "A deep dive into our evaluation methodology for measuring dialect comprehension across 22+ Arabic varieties.",
    date: "Jan 10, 2026",
    readTime: "12 min read",
    category: "Research",
    image: "🔬",
  },
  {
    title: "Building Trustworthy RAG for Arabic Content",
    excerpt: "Our approach to retrieval-augmented generation that provides accurate answers with verifiable citations.",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    category: "Engineering",
    image: "📚",
  },
  {
    title: "The Challenge of Arabic Tokenization",
    excerpt: "Why standard tokenizers fail for Arabic and how we built a morphology-aware solution.",
    date: "Dec 28, 2025",
    readTime: "7 min read",
    category: "Research",
    image: "🧩",
  },
  {
    title: "Announcing Our Seed Round",
    excerpt: "Gazera raises $12M to accelerate Arabic AI development and expand our team.",
    date: "Dec 20, 2025",
    readTime: "4 min read",
    category: "Company",
    image: "💰",
  },
  {
    title: "Safety in Arabic AI: Our Approach",
    excerpt: "How we ensure Gazi is helpful, harmless, and honest across cultural contexts.",
    date: "Dec 15, 2025",
    readTime: "9 min read",
    category: "Safety",
    image: "🛡️",
  },
  {
    title: "From Research to Production: Lessons Learned",
    excerpt: "The journey of taking our Arabic LLM from academic research to enterprise deployment.",
    date: "Dec 8, 2025",
    readTime: "11 min read",
    category: "Engineering",
    image: "🏗️",
  },
];

const categories = ["All", "Product", "Research", "Engineering", "Company", "Safety"];

export default function BlogPage() {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setVisible(true);
  }, []);

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <main className="blog-page" dir="ltr" lang="en">
      <div className="blog-shell">
        {/* Hero Section */}
        <section className={`blog-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">📝</span>
            Gazera Blog
          </div>
          <h1>
            Stories, Research &
            <span className="gradient-text"> Updates</span>
          </h1>
          <p className="hero-subtitle">
            Insights from the team building the future of Arabic AI. 
            Product updates, research papers, and engineering deep-dives.
          </p>
        </section>

        {/* Featured Post */}
        <section className={`featured-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="featured-card">
            <div className="featured-image">{featuredPost.image}</div>
            <div className="featured-content">
              <div className="post-meta">
                <span className="category-tag">{featuredPost.category}</span>
                <span className="post-date">{featuredPost.date}</span>
                <span className="read-time">{featuredPost.readTime}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <a href="#" className="read-more">
                Read Article <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className={`category-filter ${visible ? "fade-in delay-2" : ""}`}>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        {/* Posts Grid */}
        <section className={`posts-grid ${visible ? "fade-in delay-3" : ""}`}>
          {filteredPosts.map((post, i) => (
            <article key={i} className="post-card">
              <div className="post-image">{post.image}</div>
              <div className="post-content">
                <div className="post-meta">
                  <span className="category-tag small">{post.category}</span>
                  <span className="post-date">{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-footer">
                  <span className="read-time">{post.readTime}</span>
                  <a href="#" className="read-link">Read →</a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Newsletter Section */}
        <section className={`newsletter-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="newsletter-card">
            <div className="newsletter-icon">📬</div>
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates on Arabic AI research and product news delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
            <span className="newsletter-note">No spam. Unsubscribe anytime.</span>
          </div>
        </section>
      </div>
    </main>
  );
}

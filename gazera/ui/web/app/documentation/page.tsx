"use client";

import { useEffect, useState } from "react";

const quickLinks = [
  { icon: "🚀", title: "Quick Start", desc: "Get up and running in 5 minutes", time: "5 min" },
  { icon: "🔑", title: "Authentication", desc: "API keys and security setup", time: "3 min" },
  { icon: "💬", title: "Chat API", desc: "Build conversational interfaces", time: "10 min" },
  { icon: "📚", title: "RAG Setup", desc: "Add your documents as context", time: "15 min" },
];

const sections = [
  {
    category: "Getting Started",
    icon: "🎯",
    items: [
      { title: "Introduction to Gazi", link: "#", new: false },
      { title: "Quick Start Guide", link: "#", new: false },
      { title: "Installation & Setup", link: "#", new: false },
      { title: "Your First API Call", link: "#", new: true },
    ],
  },
  {
    category: "Core Concepts",
    icon: "💡",
    items: [
      { title: "Understanding Arabic NLP", link: "#", new: false },
      { title: "Dialect Support", link: "#", new: false },
      { title: "System Prompts", link: "#", new: false },
      { title: "Streaming Responses", link: "#", new: false },
    ],
  },
  {
    category: "RAG & Citations",
    icon: "📖",
    items: [
      { title: "RAG Architecture Overview", link: "#", new: false },
      { title: "Document Ingestion", link: "#", new: false },
      { title: "Vector Store Setup", link: "#", new: true },
      { title: "Citation Formatting", link: "#", new: false },
    ],
  },
  {
    category: "API Reference",
    icon: "⚡",
    items: [
      { title: "Chat Completions", link: "#", new: false },
      { title: "Embeddings", link: "#", new: false },
      { title: "RAG Endpoints", link: "#", new: false },
      { title: "Error Handling", link: "#", new: false },
    ],
  },
  {
    category: "Deployment",
    icon: "🚢",
    items: [
      { title: "Docker Deployment", link: "#", new: false },
      { title: "Kubernetes Guide", link: "#", new: false },
      { title: "GPU Configuration", link: "#", new: false },
      { title: "Scaling & Performance", link: "#", new: true },
    ],
  },
  {
    category: "Advanced Topics",
    icon: "🔬",
    items: [
      { title: "Fine-tuning Guide", link: "#", new: true },
      { title: "Safety Configuration", link: "#", new: false },
      { title: "Evaluation Metrics", link: "#", new: false },
      { title: "Model Comparison", link: "#", new: false },
    ],
  },
];

const resources = [
  { icon: "💻", title: "GitHub", desc: "Source code & examples", link: "https://github.com/gazera" },
  { icon: "💬", title: "Discord", desc: "Community support", link: "#" },
  { icon: "📺", title: "YouTube", desc: "Video tutorials", link: "#" },
  { icon: "📝", title: "Blog", desc: "Technical articles", link: "/blog" },
];

export default function DocumentationPage() {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="docs-page" dir="ltr" lang="en">
      <div className="docs-shell">
        {/* Hero Section */}
        <section className={`docs-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">📚</span>
            Documentation
          </div>
          <h1>
            Learn to Build with
            <span className="gradient-text"> Gazi</span>
          </h1>
          <p className="hero-subtitle">
            Comprehensive guides, API references, and tutorials to help you 
            integrate Arabic AI into your applications.
          </p>
          
          {/* Search Bar */}
          <div className="docs-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-shortcut">⌘K</span>
          </div>
        </section>

        {/* Quick Links */}
        <section className={`quick-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="quick-grid">
            {quickLinks.map((link, i) => (
              <a key={i} href="#" className="quick-card">
                <span className="quick-icon">{link.icon}</span>
                <div className="quick-content">
                  <h3>{link.title}</h3>
                  <p>{link.desc}</p>
                </div>
                <span className="quick-time">{link.time}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Main Documentation Grid */}
        <section className={`sections-grid ${visible ? "fade-in delay-2" : ""}`}>
          {sections.map((section, i) => (
            <div key={i} className="section-card">
              <div className="section-header">
                <span className="section-icon">{section.icon}</span>
                <h2>{section.category}</h2>
              </div>
              <ul className="section-list">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a href={item.link}>
                      {item.title}
                      {item.new && <span className="new-badge">New</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Code Example Preview */}
        <section className={`example-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="example-header">
            <span className="section-tag">Quick Example</span>
            <h2>Start in Under a Minute</h2>
          </div>
          <div className="example-card">
            <div className="example-tabs">
              <button className="tab active">Python</button>
              <button className="tab">JavaScript</button>
              <button className="tab">cURL</button>
            </div>
            <pre className="code-block">
              <code>{`from gazera import Gazi

client = Gazi(api_key="your-api-key")

response = client.chat.completions.create(
    model="gazi-7b",
    messages=[
        {"role": "system", "content": "أنت مساعد عربي موثوق"},
        {"role": "user", "content": "مرحباً! كيف يمكنك مساعدتي؟"}
    ]
)

print(response.choices[0].message.content)`}</code>
            </pre>
          </div>
        </section>

        {/* Resources */}
        <section className={`resources-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="section-header centered">
            <span className="section-tag">Resources</span>
            <h2>More Ways to Learn</h2>
          </div>
          <div className="resources-grid">
            {resources.map((resource, i) => (
              <a key={i} href={resource.link} className="resource-card" target={resource.link.startsWith("http") ? "_blank" : undefined}>
                <span className="resource-icon">{resource.icon}</span>
                <h4>{resource.title}</h4>
                <p>{resource.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className={`help-section ${visible ? "fade-in delay-5" : ""}`}>
          <div className="help-card">
            <div className="help-content">
              <h2>Need Help?</h2>
              <p>Can't find what you're looking for? Our team is here to help you succeed with Gazi.</p>
            </div>
            <div className="help-actions">
              <a href="/contact" className="btn-primary">Contact Support</a>
              <a href="#" className="btn-secondary">Join Discord</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

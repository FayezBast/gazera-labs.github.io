"use client";

import { useEffect, useState } from "react";

const pressReleases = [
  {
    date: "Jan 15, 2026",
    title: "Gazera Launches Gazi 2.0 with Enhanced Arabic Dialect Support",
    excerpt: "New model delivers 40% improvement in dialect understanding across 22+ Arabic varieties.",
    tag: "Product",
  },
  {
    date: "Dec 20, 2025",
    title: "Gazera Raises $12M Seed Round to Scale Arabic AI",
    excerpt: "Funding led by top regional VCs to accelerate model development and team expansion.",
    tag: "Funding",
  },
  {
    date: "Nov 10, 2025",
    title: "Gazera Partners with Leading MENA Enterprises",
    excerpt: "Strategic partnerships bring Arabic AI to banking, healthcare, and government sectors.",
    tag: "Partnership",
  },
  {
    date: "Oct 5, 2025",
    title: "Gazera Announces Open Arabic Benchmark Suite",
    excerpt: "Industry-first comprehensive evaluation framework for Arabic language models.",
    tag: "Research",
  },
];

const mediaFeatures = [
  { outlet: "TechCrunch", logo: "📰", title: "The startup bringing sovereign AI to the Arab world" },
  { outlet: "Wired Middle East", logo: "🌐", title: "How Gazera is solving Arabic AI's hardest problems" },
  { outlet: "Arab News", logo: "📺", title: "Meet the team building Arabic-first artificial intelligence" },
  { outlet: "Forbes MENA", logo: "💼", title: "Gazera: One of the top AI startups to watch in 2026" },
];

const brandAssets = [
  { icon: "🎨", name: "Logo Package", format: "SVG, PNG", desc: "Primary and secondary logos" },
  { icon: "📸", name: "Product Screenshots", format: "PNG", desc: "UI and demo images" },
  { icon: "📖", name: "Brand Guidelines", format: "PDF", desc: "Colors, typography, usage" },
  { icon: "👤", name: "Team Photos", format: "JPG", desc: "Leadership headshots" },
];

export default function PressPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="press-page" dir="ltr" lang="en">
      <div className="press-shell">
        {/* Hero Section */}
        <section className={`press-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">📢</span>
            Press & Media
          </div>
          <h1>
            Gazera in the
            <span className="gradient-text"> News</span>
          </h1>
          <p className="hero-subtitle">
            Press releases, media coverage, and brand assets. 
            For press inquiries, contact our media team.
          </p>
          <a href="mailto:press@gazera.ai" className="btn-primary">
            <span>✉️</span> Contact Press Team
          </a>
        </section>

        {/* Press Releases */}
        <section className={`releases-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Latest News</span>
            <h2>Press Releases</h2>
          </div>
          <div className="releases-list">
            {pressReleases.map((release, i) => (
              <article key={i} className="release-card">
                <div className="release-meta">
                  <span className="release-date">{release.date}</span>
                  <span className="release-tag">{release.tag}</span>
                </div>
                <h3>{release.title}</h3>
                <p>{release.excerpt}</p>
                <a href="#" className="release-link">Read More →</a>
              </article>
            ))}
          </div>
        </section>

        {/* Media Coverage */}
        <section className={`coverage-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">In The Press</span>
            <h2>Media Coverage</h2>
          </div>
          <div className="coverage-grid">
            {mediaFeatures.map((feature, i) => (
              <a key={i} href="#" className="coverage-card">
                <span className="coverage-logo">{feature.logo}</span>
                <div className="coverage-content">
                  <span className="coverage-outlet">{feature.outlet}</span>
                  <h4>{feature.title}</h4>
                </div>
                <span className="coverage-arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* Brand Assets */}
        <section className={`assets-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Media Kit</span>
            <h2>Brand Assets</h2>
          </div>
          <div className="assets-grid">
            {brandAssets.map((asset, i) => (
              <div key={i} className="asset-card">
                <span className="asset-icon">{asset.icon}</span>
                <div className="asset-info">
                  <h4>{asset.name}</h4>
                  <p>{asset.desc}</p>
                  <span className="asset-format">{asset.format}</span>
                </div>
                <button className="download-btn">Download</button>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className={`press-cta ${visible ? "fade-in delay-4" : ""}`}>
          <div className="cta-content">
            <h2>Media Inquiries</h2>
            <p>For interviews, comments, or press kit requests, our communications team is ready to help.</p>
          </div>
          <div className="cta-contacts">
            <div className="cta-contact">
              <span className="contact-icon">📧</span>
              <div>
                <span className="contact-label">Email</span>
                <a href="mailto:press@gazera.ai">press@gazera.ai</a>
              </div>
            </div>
            <div className="cta-contact">
              <span className="contact-icon">⏰</span>
              <div>
                <span className="contact-label">Response Time</span>
                <span>Within 24 hours</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

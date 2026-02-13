"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "🎙️",
    title: "Transcription",
    description: "Convert Arabic audio and video to text with 95%+ accuracy across all dialects.",
  },
  {
    icon: "🌐",
    title: "Translation",
    description: "Translate between Arabic dialects and to/from 100+ languages while preserving nuance.",
  },
  {
    icon: "📄",
    title: "Summarization",
    description: "Generate concise summaries of news articles, broadcasts, and documents in seconds.",
  },
  {
    icon: "🛡️",
    title: "Content Moderation",
    description: "Automatically detect and flag inappropriate content in Arabic text, audio, and video.",
  },
  {
    icon: "✍️",
    title: "Content Generation",
    description: "Draft headlines, social posts, and article outlines in journalistic Arabic style.",
  },
  {
    icon: "🔍",
    title: "Archive Search",
    description: "Make decades of Arabic content searchable and discoverable with AI indexing.",
  },
];

const useCases = [
  {
    icon: "📺",
    title: "Broadcast News",
    description: "Real-time transcription and translation for live Arabic broadcasts.",
    stat: "Live",
    statLabel: "Processing",
  },
  {
    icon: "📰",
    title: "Digital Publishing",
    description: "Scale content production with AI-assisted writing and editing.",
    stat: "10x",
    statLabel: "Faster",
  },
  {
    icon: "🎬",
    title: "Video Production",
    description: "Auto-generate subtitles, descriptions, and metadata for Arabic video.",
    stat: "22+",
    statLabel: "Dialects",
  },
  {
    icon: "📱",
    title: "Social Media",
    description: "Monitor, moderate, and respond to Arabic social content at scale.",
    stat: "24/7",
    statLabel: "Monitoring",
  },
];

const integrations = [
  { name: "Adobe Premiere", icon: "🎬" },
  { name: "Final Cut Pro", icon: "🍎" },
  { name: "WordPress", icon: "📝" },
  { name: "Custom API", icon: "⚡" },
];

const testimonial = {
  quote: "Gazi has transformed our newsroom. We can now cover breaking stories across the Arab world in real-time, with accurate transcription and translation that our editors trust.",
  author: "News Director",
  org: "Major Arabic Broadcaster",
};

export default function MediaPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="media-page" dir="ltr" lang="en">
      <div className="media-shell">
        {/* Hero Section */}
        <section className={`media-hero ${visible ? "fade-in" : ""}`}>
          <Link href="/solutions" className="back-link">← All Solutions</Link>
          <div className="hero-badge media-badge">
            <span className="badge-icon">📺</span>
            Media
          </div>
          <h1>
            Arabic Content at
            <span className="gradient-text"> The Speed of News</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered transcription, translation, summarization, and moderation 
            for Arabic media production at any scale.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary">Request Demo</Link>
            <Link href="/api-reference" className="btn-secondary">API Access</Link>
          </div>
        </section>

        {/* Features */}
        <section className={`media-features-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Capabilities</span>
            <h2>End-to-End Media AI</h2>
          </div>
          <div className="media-features-grid">
            {features.map((feature, i) => (
              <div key={i} className="media-feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className={`media-usecases-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Use Cases</span>
            <h2>Built for Media Workflows</h2>
          </div>
          <div className="media-usecases-grid">
            {useCases.map((useCase, i) => (
              <div key={i} className="media-usecase-card">
                <div className="usecase-header">
                  <span className="usecase-icon">{useCase.icon}</span>
                  <div className="usecase-stat">
                    <span className="stat-value">{useCase.stat}</span>
                    <span className="stat-label">{useCase.statLabel}</span>
                  </div>
                </div>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className={`testimonial-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="testimonial-card">
            <span className="quote-icon">"</span>
            <blockquote>{testimonial.quote}</blockquote>
            <div className="testimonial-author">
              <span className="author-name">{testimonial.author}</span>
              <span className="author-org">{testimonial.org}</span>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className={`integrations-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="section-header centered">
            <span className="section-tag">Integrations</span>
            <h2>Works With Your Tools</h2>
          </div>
          <div className="integrations-grid">
            {integrations.map((integration, i) => (
              <div key={i} className="integration-card">
                <span className="integration-icon">{integration.icon}</span>
                <span className="integration-name">{integration.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Speed Banner */}
        <section className={`speed-section ${visible ? "fade-in delay-5" : ""}`}>
          <div className="speed-card">
            <div className="speed-content">
              <h3>Real-Time Processing</h3>
              <p>
                Process hours of Arabic audio in minutes. Our infrastructure is optimized 
                for the speed demands of modern newsrooms and production studios.
              </p>
            </div>
            <div className="speed-stats">
              <div className="speed-stat">
                <span className="speed-value">{"<"}2s</span>
                <span className="speed-label">Latency</span>
              </div>
              <div className="speed-stat">
                <span className="speed-value">95%+</span>
                <span className="speed-label">Accuracy</span>
              </div>
              <div className="speed-stat">
                <span className="speed-value">22+</span>
                <span className="speed-label">Dialects</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`media-cta ${visible ? "fade-in delay-6" : ""}`}>
          <h2>Ready to Accelerate Your Production?</h2>
          <p>See how leading Arabic media organizations use Gazi to stay ahead.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn-primary">Request Demo</Link>
            <a href="mailto:media@gazera.ai" className="btn-secondary">media@gazera.ai</a>
          </div>
        </section>
      </div>
    </main>
  );
}

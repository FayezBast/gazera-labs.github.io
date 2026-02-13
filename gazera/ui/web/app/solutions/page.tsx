"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const solutions = [
  {
    icon: "🏢",
    title: "Enterprise",
    tagline: "AI that scales with your business",
    description: "Deploy Arabic AI across your organization with enterprise-grade security, custom integrations, and dedicated support.",
    features: ["Custom Model Training", "SSO & SCIM", "99.9% SLA", "Dedicated Support"],
    href: "/solutions/enterprise",
    color: "primary",
  },
  {
    icon: "🏛️",
    title: "Government",
    tagline: "Sovereign AI for public sector",
    description: "On-premise deployment options, data residency compliance, and Arabic-first AI for citizen services.",
    features: ["On-Premise Deployment", "Data Sovereignty", "Compliance Ready", "Arabic Dialects"],
    href: "/solutions/government",
    color: "accent",
  },
  {
    icon: "🎓",
    title: "Education",
    tagline: "Transform learning experiences",
    description: "AI-powered tutoring, content generation, and accessibility tools for Arabic-speaking students.",
    features: ["AI Tutoring", "Content Generation", "Accessibility", "Multi-Dialect"],
    href: "/solutions/education",
    color: "success",
  },
  {
    icon: "📺",
    title: "Media",
    tagline: "Content at the speed of news",
    description: "Automated transcription, translation, summarization, and content moderation for Arabic media.",
    features: ["Transcription", "Translation", "Summarization", "Moderation"],
    href: "/solutions/media",
    color: "warning",
  },
];

const stats = [
  { value: "50+", label: "Enterprise Clients" },
  { value: "22", label: "Arabic Dialects" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support" },
];

export default function SolutionsPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="solutions-page" dir="ltr" lang="en">
      <div className="solutions-shell">
        {/* Hero Section */}
        <section className={`solutions-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">💡</span>
            Solutions
          </div>
          <h1>
            Arabic AI for
            <span className="gradient-text"> Every Industry</span>
          </h1>
          <p className="hero-subtitle">
            Purpose-built solutions for organizations that need reliable, 
            culturally-aware Arabic AI at scale.
          </p>
          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="stat-num">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions Grid */}
        <section className={`solutions-grid-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="solutions-grid">
            {solutions.map((solution, i) => (
              <Link key={i} href={solution.href} className={`solution-card solution-${solution.color}`}>
                <div className="solution-header">
                  <span className="solution-icon">{solution.icon}</span>
                  <span className="solution-arrow">→</span>
                </div>
                <h2>{solution.title}</h2>
                <p className="solution-tagline">{solution.tagline}</p>
                <p className="solution-desc">{solution.description}</p>
                <div className="solution-features">
                  {solution.features.map((feature, j) => (
                    <span key={j} className="solution-feature">{feature}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={`solutions-cta ${visible ? "fade-in delay-2" : ""}`}>
          <h2>Not Sure Which Solution Fits?</h2>
          <p>Our team will help you find the right Arabic AI solution for your organization.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn-primary">Talk to Sales</Link>
            <Link href="/documentation" className="btn-secondary">View Documentation</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

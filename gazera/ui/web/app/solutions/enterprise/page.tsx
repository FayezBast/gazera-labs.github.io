"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "🔐",
    title: "Enterprise Security",
    description: "SOC 2 Type II compliance, SSO/SAML integration, role-based access control, and audit logging.",
  },
  {
    icon: "⚡",
    title: "High Performance",
    description: "Dedicated infrastructure with guaranteed throughput, low latency, and 99.9% uptime SLA.",
  },
  {
    icon: "🔧",
    title: "Custom Integration",
    description: "RESTful APIs, webhooks, and pre-built connectors for Salesforce, SAP, and Microsoft.",
  },
  {
    icon: "🎯",
    title: "Fine-Tuned Models",
    description: "Train custom models on your data for industry-specific terminology and use cases.",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    description: "Real-time usage metrics, cost tracking, and performance monitoring.",
  },
  {
    icon: "🤝",
    title: "Dedicated Support",
    description: "Named account manager, priority support queue, and quarterly business reviews.",
  },
];

const useCases = [
  {
    title: "Customer Support Automation",
    description: "Deploy Arabic-speaking AI agents that handle 70% of support tickets automatically.",
    metric: "70%",
    metricLabel: "Ticket Deflection",
  },
  {
    title: "Document Processing",
    description: "Extract insights from Arabic contracts, reports, and correspondence at scale.",
    metric: "10x",
    metricLabel: "Faster Processing",
  },
  {
    title: "Internal Knowledge Base",
    description: "Let employees query company knowledge in Arabic with accurate, cited answers.",
    metric: "85%",
    metricLabel: "Query Resolution",
  },
];

const logos = ["🏦", "🛢️", "✈️", "🏥", "🛒", "📱"];

const pricing = [
  { feature: "API Calls", value: "Unlimited" },
  { feature: "Custom Models", value: "Up to 5" },
  { feature: "Team Members", value: "Unlimited" },
  { feature: "Support", value: "24/7 Priority" },
  { feature: "SLA", value: "99.9%" },
  { feature: "Data Retention", value: "Custom" },
];

export default function EnterprisePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="enterprise-page" dir="ltr" lang="en">
      <div className="enterprise-shell">
        {/* Hero Section */}
        <section className={`enterprise-hero ${visible ? "fade-in" : ""}`}>
          <Link href="/solutions" className="back-link">← All Solutions</Link>
          <div className="hero-badge enterprise-badge">
            <span className="badge-icon">🏢</span>
            Enterprise
          </div>
          <h1>
            Arabic AI That
            <span className="gradient-text"> Scales With You</span>
          </h1>
          <p className="hero-subtitle">
            Deploy Gazi across your organization with enterprise-grade security, 
            custom integrations, and the reliability your business demands.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary">Request Demo</Link>
            <Link href="/api-reference" className="btn-secondary">API Documentation</Link>
          </div>
        </section>

        {/* Trusted By */}
        <section className={`trusted-section ${visible ? "fade-in delay-1" : ""}`}>
          <p className="trusted-label">Trusted by leading enterprises across MENA</p>
          <div className="trusted-logos">
            {logos.map((logo, i) => (
              <div key={i} className="trusted-logo">{logo}</div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className={`features-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Capabilities</span>
            <h2>Built for Enterprise</h2>
          </div>
          <div className="enterprise-features-grid">
            {features.map((feature, i) => (
              <div key={i} className="enterprise-feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className={`usecases-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Use Cases</span>
            <h2>How Enterprises Use Gazi</h2>
          </div>
          <div className="usecases-grid">
            {useCases.map((useCase, i) => (
              <div key={i} className="usecase-card">
                <div className="usecase-metric">
                  <span className="metric-value">{useCase.metric}</span>
                  <span className="metric-label">{useCase.metricLabel}</span>
                </div>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Preview */}
        <section className={`pricing-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="pricing-card">
            <div className="pricing-header">
              <h2>Enterprise Plan</h2>
              <p>Custom pricing based on your needs</p>
            </div>
            <div className="pricing-features">
              {pricing.map((item, i) => (
                <div key={i} className="pricing-item">
                  <span className="pricing-feature">{item.feature}</span>
                  <span className="pricing-value">{item.value}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary full-width">Get Custom Quote</Link>
          </div>
        </section>

        {/* CTA */}
        <section className={`enterprise-cta ${visible ? "fade-in delay-5" : ""}`}>
          <h2>Ready to Transform Your Business?</h2>
          <p>See how Gazi can power your Arabic AI initiatives with a personalized demo.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn-primary">Schedule Demo</Link>
            <a href="mailto:enterprise@gazera.ai" className="btn-secondary">enterprise@gazera.ai</a>
          </div>
        </section>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

const sections = [
  {
    icon: "📊",
    title: "Information We Collect",
    items: [
      { label: "Account Information", desc: "Email address, name, and organization details when you sign up." },
      { label: "Usage Data", desc: "Prompts, responses, and interaction patterns to improve our service." },
      { label: "Technical Data", desc: "Device type, browser version, IP address, and access timestamps." },
      { label: "Payment Information", desc: "Billing details processed securely through our payment providers." },
    ],
  },
  {
    icon: "⚙️",
    title: "How We Use Your Data",
    items: [
      { label: "Service Delivery", desc: "Provide, maintain, and improve the Gazi experience." },
      { label: "Safety & Security", desc: "Monitor for abuse, fraud, and policy violations." },
      { label: "Communications", desc: "Send product updates, security alerts, and support messages." },
      { label: "Research", desc: "Improve our models with aggregated, anonymized data." },
    ],
  },
  {
    icon: "🤝",
    title: "Information Sharing",
    items: [
      { label: "No Data Sales", desc: "We never sell your personal information to third parties." },
      { label: "Service Providers", desc: "Share with vendors who help operate our infrastructure." },
      { label: "Legal Requirements", desc: "Disclose when required by law or to protect rights." },
      { label: "Business Transfers", desc: "May transfer data in mergers or acquisitions." },
    ],
  },
  {
    icon: "🔐",
    title: "Data Security",
    items: [
      { label: "Encryption", desc: "Data encrypted in transit and at rest using industry standards." },
      { label: "Access Controls", desc: "Strict access limited to authorized personnel only." },
      { label: "Regular Audits", desc: "Security reviews and penetration testing." },
      { label: "Incident Response", desc: "Comprehensive plan for security incidents." },
    ],
  },
];

const rights = [
  { icon: "👁️", title: "Access", desc: "Request a copy of your personal data" },
  { icon: "✏️", title: "Correction", desc: "Update inaccurate information" },
  { icon: "🗑️", title: "Deletion", desc: "Request erasure of your data" },
  { icon: "📦", title: "Portability", desc: "Export your data in a standard format" },
  { icon: "🚫", title: "Opt-Out", desc: "Unsubscribe from marketing emails" },
  { icon: "⚖️", title: "Object", desc: "Object to certain data processing" },
];

export default function PrivacyPolicyPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="privacy-page" dir="ltr" lang="en">
      <div className="privacy-shell">
        {/* Hero Section */}
        <section className={`privacy-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">🔒</span>
            Legal
          </div>
          <h1>
            Privacy
            <span className="gradient-text"> Policy</span>
          </h1>
          <p className="hero-subtitle">
            Your privacy matters to us. This policy explains how we collect, use, 
            and protect your information when you use Gazera services.
          </p>
          <div className="policy-meta">
            <span className="meta-item">
              <span className="meta-icon">📅</span>
              Last Updated: January 1, 2026
            </span>
            <span className="meta-item">
              <span className="meta-icon">✅</span>
              GDPR Compliant
            </span>
          </div>
        </section>

        {/* Quick Summary */}
        <section className={`summary-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="summary-card">
            <h3>🎯 Privacy at a Glance</h3>
            <div className="summary-points">
              <div className="summary-point">
                <span className="point-icon good">✓</span>
                <span>We never sell your personal data</span>
              </div>
              <div className="summary-point">
                <span className="point-icon good">✓</span>
                <span>Your data is encrypted and secure</span>
              </div>
              <div className="summary-point">
                <span className="point-icon good">✓</span>
                <span>You can request deletion anytime</span>
              </div>
              <div className="summary-point">
                <span className="point-icon good">✓</span>
                <span>We minimize data collection</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Sections */}
        <section className={`policy-sections ${visible ? "fade-in delay-2" : ""}`}>
          {sections.map((section, i) => (
            <div key={i} className="policy-section">
              <div className="policy-section-header">
                <span className="policy-section-icon">{section.icon}</span>
                <h2>{section.title}</h2>
              </div>
              <div className="policy-items">
                {section.items.map((item, j) => (
                  <div key={j} className="policy-item">
                    <h4>{item.label}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Your Rights */}
        <section className={`rights-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Your Rights</span>
            <h2>Control Your Data</h2>
          </div>
          <div className="rights-grid">
            {rights.map((right, i) => (
              <div key={i} className="right-card">
                <span className="right-icon">{right.icon}</span>
                <h4>{right.title}</h4>
                <p>{right.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className={`privacy-contact ${visible ? "fade-in delay-4" : ""}`}>
          <h2>Questions About Your Privacy?</h2>
          <p>Our Data Protection Officer is available to address your concerns.</p>
          <div className="contact-options">
            <a href="mailto:privacy@gazera.ai" className="btn-primary">
              <span>📧</span> privacy@gazera.ai
            </a>
            <a href="/contact" className="btn-secondary">Contact Form</a>
          </div>
        </section>
      </div>
    </main>
  );
}

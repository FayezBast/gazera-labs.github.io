"use client";

import { useEffect, useState } from "react";

const sections = [
  {
    icon: "📋",
    title: "Acceptance of Terms",
    content: [
      "By accessing or using Gazera services, you agree to be bound by these Terms of Service.",
      "If you disagree with any part of these terms, you may not access the service.",
      "We may update these terms from time to time. Continued use constitutes acceptance.",
    ],
  },
  {
    icon: "✅",
    title: "Permitted Use",
    content: [
      "Use Gazi for lawful purposes in compliance with all applicable laws and regulations.",
      "Maintain the confidentiality of your account credentials and API keys.",
      "Report any unauthorized use or security vulnerabilities promptly.",
      "Respect rate limits and usage quotas associated with your plan.",
    ],
  },
  {
    icon: "🚫",
    title: "Prohibited Activities",
    content: [
      "Attempting to reverse engineer, decompile, or extract model weights.",
      "Using the service to generate harmful, illegal, or abusive content.",
      "Circumventing security measures or accessing unauthorized areas.",
      "Reselling or redistributing API access without written permission.",
      "Automated scraping or bulk data extraction beyond API limits.",
    ],
  },
  {
    icon: "📝",
    title: "Content & Intellectual Property",
    content: [
      "You retain ownership of the content you submit to Gazera.",
      "We may use anonymized, aggregated data to improve our services.",
      "Generated outputs may require human review and verification.",
      "Our models, APIs, and documentation remain Gazera's intellectual property.",
    ],
  },
  {
    icon: "💳",
    title: "Billing & Payments",
    content: [
      "Paid plans are billed in advance on a monthly or annual basis.",
      "Usage-based charges are calculated and billed at the end of each period.",
      "Refunds are provided in accordance with our refund policy.",
      "We may suspend service for overdue accounts after notice.",
    ],
  },
  {
    icon: "⚡",
    title: "Service Availability",
    content: [
      "We strive for high availability but do not guarantee uninterrupted access.",
      "Scheduled maintenance will be communicated in advance when possible.",
      "We may modify, suspend, or discontinue features with reasonable notice.",
      "Enterprise SLAs provide guaranteed uptime commitments.",
    ],
  },
  {
    icon: "⚠️",
    title: "Limitation of Liability",
    content: [
      "The service is provided 'as is' without warranties of any kind.",
      "We are not liable for indirect, incidental, or consequential damages.",
      "Our total liability is limited to fees paid in the preceding 12 months.",
      "Some jurisdictions do not allow liability limitations; these may not apply.",
    ],
  },
  {
    icon: "⚖️",
    title: "Dispute Resolution",
    content: [
      "These terms are governed by the laws of the United Arab Emirates.",
      "Disputes shall be resolved through binding arbitration in Dubai.",
      "Class action waiver applies to the extent permitted by law.",
      "You may opt out of arbitration within 30 days of account creation.",
    ],
  },
];

const highlights = [
  { icon: "✓", text: "You own your content" },
  { icon: "✓", text: "Transparent billing" },
  { icon: "✓", text: "Enterprise SLAs available" },
  { icon: "✓", text: "Clear usage guidelines" },
];

export default function TermsOfServicePage() {
  const [visible, setVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="terms-page" dir="ltr" lang="en">
      <div className="terms-shell">
        {/* Hero Section */}
        <section className={`terms-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">📜</span>
            Legal
          </div>
          <h1>
            Terms of
            <span className="gradient-text"> Service</span>
          </h1>
          <p className="hero-subtitle">
            Please read these terms carefully before using Gazera services. 
            They establish the rules and guidelines for using our platform.
          </p>
          <div className="policy-meta">
            <span className="meta-item">
              <span className="meta-icon">📅</span>
              Effective: January 1, 2026
            </span>
            <span className="meta-item">
              <span className="meta-icon">🔄</span>
              Version 2.0
            </span>
          </div>
        </section>

        {/* Highlights */}
        <section className={`highlights-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="highlights-card">
            <h3>📌 Key Points</h3>
            <div className="highlights-grid">
              {highlights.map((item, i) => (
                <div key={i} className="highlight-item">
                  <span className="highlight-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className={`terms-sections ${visible ? "fade-in delay-2" : ""}`}>
          {sections.map((section, i) => (
            <div 
              key={i} 
              className={`terms-section ${expandedSection === i ? "expanded" : ""}`}
            >
              <button 
                type="button"
                className="terms-section-header"
                onClick={() => setExpandedSection(expandedSection === i ? null : i)}
              >
                <span className="terms-section-icon">{section.icon}</span>
                <h2>{section.title}</h2>
                <span className="expand-indicator">{expandedSection === i ? "−" : "+"}</span>
              </button>
              <div className="terms-section-content">
                <ul>
                  {section.content.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className={`terms-contact ${visible ? "fade-in delay-3" : ""}`}>
          <h2>Questions About These Terms?</h2>
          <p>Our legal team is available to clarify any aspect of our Terms of Service.</p>
          <div className="cta-buttons">
            <a href="mailto:legal@gazera.ai" className="btn-primary">
              <span>📧</span> legal@gazera.ai
            </a>
            <a href="/contact" className="btn-secondary">Contact Us</a>
          </div>
        </section>
      </div>
    </main>
  );
}

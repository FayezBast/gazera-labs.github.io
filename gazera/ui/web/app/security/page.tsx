"use client";

import { useEffect, useState } from "react";

const securityFeatures = [
  {
    icon: "🔐",
    title: "Encryption Everywhere",
    description: "All data encrypted in transit (TLS 1.3) and at rest (AES-256). Your conversations stay private.",
  },
  {
    icon: "🏰",
    title: "Infrastructure Security",
    description: "Deployed on enterprise-grade cloud with network isolation, WAF, and DDoS protection.",
  },
  {
    icon: "🔑",
    title: "Access Control",
    description: "Role-based access, MFA enforcement, and audit logs for all administrative actions.",
  },
  {
    icon: "🔍",
    title: "Continuous Monitoring",
    description: "24/7 threat detection, anomaly monitoring, and automated incident response.",
  },
];

const certifications = [
  { icon: "✅", name: "SOC 2 Type II", status: "In Progress", desc: "Security, availability, and confidentiality" },
  { icon: "🇪🇺", name: "GDPR", status: "Compliant", desc: "European data protection regulation" },
  { icon: "🏛️", name: "ISO 27001", status: "Planned", desc: "Information security management" },
  { icon: "🔒", name: "HIPAA", status: "Available", desc: "Healthcare data compliance (Enterprise)" },
];

const practices = [
  { icon: "🧪", title: "Penetration Testing", desc: "Regular third-party security assessments" },
  { icon: "🔄", title: "Security Reviews", desc: "Code review for all changes to sensitive systems" },
  { icon: "📋", title: "Vulnerability Management", desc: "Rapid patching of identified vulnerabilities" },
  { icon: "🎓", title: "Security Training", desc: "Ongoing training for all team members" },
  { icon: "📊", title: "Incident Response", desc: "Documented procedures for security events" },
  { icon: "🗄️", title: "Data Retention", desc: "Minimal data retention with secure deletion" },
];

export default function SecurityPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="security-page" dir="ltr" lang="en">
      <div className="security-shell">
        {/* Hero Section */}
        <section className={`security-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">🛡️</span>
            Security
          </div>
          <h1>
            Enterprise-Grade
            <span className="gradient-text"> Security</span>
          </h1>
          <p className="hero-subtitle">
            Security is foundational to everything we build. Learn how we protect 
            your data and maintain the trust you place in Gazera.
          </p>
          <div className="policy-meta">
            <span className="meta-item">
              <span className="meta-icon">📅</span>
              Last Updated: January 1, 2026
            </span>
            <span className="meta-item">
              <span className="meta-icon">🔒</span>
              SOC 2 In Progress
            </span>
          </div>
        </section>

        {/* Security Features */}
        <section className={`features-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="features-grid">
            {securityFeatures.map((feature, i) => (
              <div key={i} className="security-feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className={`certifications-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Compliance</span>
            <h2>Certifications & Standards</h2>
          </div>
          <div className="certifications-grid">
            {certifications.map((cert, i) => (
              <div key={i} className="certification-card">
                <span className="cert-icon">{cert.icon}</span>
                <div className="cert-info">
                  <h4>{cert.name}</h4>
                  <p>{cert.desc}</p>
                </div>
                <span className={`cert-status ${cert.status.toLowerCase().replace(" ", "-")}`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Security Practices */}
        <section className={`practices-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Our Approach</span>
            <h2>Security Practices</h2>
          </div>
          <div className="practices-grid">
            {practices.map((practice, i) => (
              <div key={i} className="practice-card">
                <span className="practice-icon">{practice.icon}</span>
                <h4>{practice.title}</h4>
                <p>{practice.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bug Bounty */}
        <section className={`bounty-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="bounty-card">
            <div className="bounty-content">
              <span className="bounty-icon">🐛</span>
              <h2>Responsible Disclosure</h2>
              <p>
                Found a security vulnerability? We appreciate responsible disclosure 
                and will work with you to address issues promptly.
              </p>
            </div>
            <div className="bounty-details">
              <div className="bounty-item">
                <span className="bounty-label">Report To</span>
                <a href="mailto:security@gazera.ai">security@gazera.ai</a>
              </div>
              <div className="bounty-item">
                <span className="bounty-label">PGP Key</span>
                <span>Available on request</span>
              </div>
              <div className="bounty-item">
                <span className="bounty-label">Response Time</span>
                <span>Within 48 hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className={`security-cta ${visible ? "fade-in delay-5" : ""}`}>
          <h2>Need Enterprise Security?</h2>
          <p>Custom deployments, dedicated infrastructure, and enhanced compliance options available.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">Talk to Sales</a>
            <a href="mailto:security@gazera.ai" className="btn-secondary">Security Questions</a>
          </div>
        </section>
      </div>
    </main>
  );
}

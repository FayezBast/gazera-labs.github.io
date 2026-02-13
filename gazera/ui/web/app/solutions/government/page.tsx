"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "🏠",
    title: "On-Premise Deployment",
    description: "Full air-gapped deployment within your data centers. No data ever leaves your infrastructure.",
  },
  {
    icon: "🗺️",
    title: "Data Sovereignty",
    description: "Complete control over data residency with regional deployment options across MENA.",
  },
  {
    icon: "📜",
    title: "Compliance Ready",
    description: "Built for government security standards with comprehensive audit trails and certifications.",
  },
  {
    icon: "🗣️",
    title: "All Arabic Dialects",
    description: "Understand citizens from every region with support for 22+ Arabic dialect variants.",
  },
  {
    icon: "♿",
    title: "Accessibility",
    description: "WCAG 2.1 compliant interfaces ensuring AI services are available to all citizens.",
  },
  {
    icon: "🔒",
    title: "Security Clearance",
    description: "Team members available with security clearances for classified deployments.",
  },
];

const useCases = [
  {
    icon: "🏛️",
    title: "Citizen Services",
    description: "AI-powered chatbots that help citizens navigate government services in their local dialect.",
  },
  {
    icon: "📄",
    title: "Document Processing",
    description: "Automate processing of applications, permits, and official documents in Arabic.",
  },
  {
    icon: "🔍",
    title: "Policy Analysis",
    description: "Analyze public feedback, social sentiment, and policy documents at scale.",
  },
  {
    icon: "📞",
    title: "Call Center Support",
    description: "Augment government call centers with AI that understands regional accents.",
  },
];

const certifications = [
  { name: "ISO 27001", status: "Certified" },
  { name: "SOC 2 Type II", status: "In Progress" },
  { name: "GDPR", status: "Compliant" },
  { name: "Local Standards", status: "Available" },
];

export default function GovernmentPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="government-page" dir="ltr" lang="en">
      <div className="government-shell">
        {/* Hero Section */}
        <section className={`government-hero ${visible ? "fade-in" : ""}`}>
          <Link href="/solutions" className="back-link">← All Solutions</Link>
          <div className="hero-badge government-badge">
            <span className="badge-icon">🏛️</span>
            Government
          </div>
          <h1>
            Sovereign Arabic AI for
            <span className="gradient-text"> Public Sector</span>
          </h1>
          <p className="hero-subtitle">
            On-premise deployment, complete data sovereignty, and AI that speaks 
            every Arabic dialect — built for government requirements.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary">Request Briefing</Link>
            <Link href="/security" className="btn-secondary">Security Overview</Link>
          </div>
        </section>

        {/* Sovereignty Banner */}
        <section className={`sovereignty-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="sovereignty-card">
            <div className="sovereignty-content">
              <span className="sovereignty-icon">🛡️</span>
              <div>
                <h3>Complete Data Sovereignty</h3>
                <p>Your data never leaves your jurisdiction. Deploy on-premise or in your approved cloud.</p>
              </div>
            </div>
            <div className="sovereignty-badges">
              {certifications.map((cert, i) => (
                <div key={i} className="cert-badge">
                  <span className="cert-name">{cert.name}</span>
                  <span className={`cert-status ${cert.status.toLowerCase().replace(" ", "-")}`}>{cert.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={`gov-features-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Capabilities</span>
            <h2>Built for Government</h2>
          </div>
          <div className="gov-features-grid">
            {features.map((feature, i) => (
              <div key={i} className="gov-feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className={`gov-usecases-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Applications</span>
            <h2>Transform Citizen Services</h2>
          </div>
          <div className="gov-usecases-grid">
            {useCases.map((useCase, i) => (
              <div key={i} className="gov-usecase-card">
                <span className="usecase-icon">{useCase.icon}</span>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deployment Options */}
        <section className={`deployment-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="section-header centered">
            <span className="section-tag">Deployment</span>
            <h2>Flexible Deployment Options</h2>
          </div>
          <div className="deployment-grid">
            <div className="deployment-card">
              <span className="deployment-icon">🏠</span>
              <h3>On-Premise</h3>
              <p>Full deployment within your data centers with no external connectivity required.</p>
              <ul>
                <li>Air-gapped option</li>
                <li>Your hardware</li>
                <li>Full control</li>
              </ul>
            </div>
            <div className="deployment-card featured">
              <span className="deployment-icon">☁️</span>
              <h3>Private Cloud</h3>
              <p>Dedicated infrastructure in your approved government cloud provider.</p>
              <ul>
                <li>Regional residency</li>
                <li>Managed by Gazera</li>
                <li>Isolated tenant</li>
              </ul>
            </div>
            <div className="deployment-card">
              <span className="deployment-icon">🔗</span>
              <h3>Hybrid</h3>
              <p>Sensitive workloads on-premise with cloud scaling for non-sensitive tasks.</p>
              <ul>
                <li>Best of both</li>
                <li>Flexible routing</li>
                <li>Cost optimized</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`gov-cta ${visible ? "fade-in delay-5" : ""}`}>
          <h2>Ready to Modernize Citizen Services?</h2>
          <p>Schedule a classified briefing with our government solutions team.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn-primary">Request Briefing</Link>
            <a href="mailto:government@gazera.ai" className="btn-secondary">government@gazera.ai</a>
          </div>
        </section>
      </div>
    </main>
  );
}

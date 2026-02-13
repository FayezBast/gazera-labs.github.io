"use client";

import { useEffect, useState } from "react";

const contactOptions = [
  {
    icon: "💼",
    title: "Enterprise Sales",
    description: "Custom deployments, SLAs, and dedicated support for your organization.",
    email: "enterprise@gazera.ai",
    cta: "Talk to Sales",
  },
  {
    icon: "🤝",
    title: "Partnerships",
    description: "Explore strategic partnerships, integrations, and reseller opportunities.",
    email: "partners@gazera.ai",
    cta: "Partner with Us",
  },
  {
    icon: "📰",
    title: "Press & Media",
    description: "Interview requests, press kits, and media inquiries.",
    email: "press@gazera.ai",
    cta: "Media Inquiry",
  },
  {
    icon: "🛠️",
    title: "Technical Support",
    description: "API issues, documentation questions, and developer support.",
    email: "support@gazera.ai",
    cta: "Get Help",
  },
];

const offices = [
  { city: "Dubai", country: "UAE", flag: "🇦🇪", timezone: "GMT+4" },
  { city: "Riyadh", country: "Saudi Arabia", flag: "🇸🇦", timezone: "GMT+3" },
  { city: "Cairo", country: "Egypt", flag: "🇪🇬", timezone: "GMT+2" },
];

export default function ContactPage() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page" dir="ltr" lang="en">
      <div className="contact-shell">
        {/* Hero Section */}
        <section className={`contact-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">💬</span>
            Get in Touch
          </div>
          <h1>
            Let's Build Something
            <span className="gradient-text"> Amazing Together</span>
          </h1>
          <p className="hero-subtitle">
            Whether you're exploring Arabic AI for your enterprise, looking to partner, 
            or just want to say hello — we'd love to hear from you.
          </p>
        </section>

        {/* Contact Options */}
        <section className={`options-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="options-grid">
            {contactOptions.map((option, i) => (
              <div key={i} className="option-card">
                <span className="option-icon">{option.icon}</span>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <a href={`mailto:${option.email}`} className="option-link">
                  {option.cta} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className={`form-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="form-grid">
            {/* Form */}
            <div className="form-card">
              <div className="form-header">
                <h2>Send a Message</h2>
                <p>Fill out the form and we'll get back within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="success-message">
                  <span className="success-icon">✅</span>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="enterprise">Enterprise Sales</option>
                        <option value="partnership">Partnership</option>
                        <option value="support">Technical Support</option>
                        <option value="press">Press & Media</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project or question..."
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message
                    <span>→</span>
                  </button>
                </form>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="info-sidebar">
              <div className="info-card">
                <h3>Quick Contact</h3>
                <div className="info-item">
                  <span className="info-icon">📧</span>
                  <div>
                    <span className="info-label">Email</span>
                    <a href="mailto:hello@gazera.ai">hello@gazera.ai</a>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">𝕏</span>
                  <div>
                    <span className="info-label">Twitter</span>
                    <a href="https://twitter.com/gazeraAI" target="_blank">@GazeraAI</a>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">💼</span>
                  <div>
                    <span className="info-label">LinkedIn</span>
                    <a href="https://linkedin.com/company/gazera" target="_blank">Gazera</a>
                  </div>
                </div>
              </div>

              <div className="offices-card">
                <h3>Our Offices</h3>
                {offices.map((office, i) => (
                  <div key={i} className="office-item">
                    <span className="office-flag">{office.flag}</span>
                    <div>
                      <span className="office-city">{office.city}</span>
                      <span className="office-details">{office.country} • {office.timezone}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="response-card">
                <span className="response-icon">⚡</span>
                <p>Average response time</p>
                <span className="response-time">Under 24 hours</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

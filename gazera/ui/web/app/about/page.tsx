"use client";

import { useEffect, useState } from "react";

const stats = [
  { value: "22+", label: "Arabic Dialects", icon: "🗣️" },
  { value: "99.2%", label: "Accuracy Rate", icon: "🎯" },
  { value: "500M+", label: "Tokens Trained", icon: "🧠" },
  { value: "24/7", label: "Enterprise Support", icon: "⚡" },
];

const values = [
  {
    icon: "🌍",
    title: "Sovereignty First",
    description: "Arabic AI built in the region, for the region. Your data stays where it belongs.",
  },
  {
    icon: "🔬",
    title: "Research-Driven",
    description: "Cutting-edge NLP research focused on Arabic linguistics and cultural nuance.",
  },
  {
    icon: "🤝",
    title: "Open Collaboration",
    description: "We believe in open science. Our benchmarks, datasets, and findings are shared with the community.",
  },
  {
    icon: "🛡️",
    title: "Safety & Trust",
    description: "Every model ships with comprehensive safety evaluations and content policies.",
  },
];

const team = [
  { name: "Dr. Fatima Al-Hassan", role: "CEO & Co-founder", emoji: "👩‍💼" },
  { name: "Omar Khalil", role: "CTO & Co-founder", emoji: "👨‍💻" },
  { name: "Layla Mansour", role: "Head of Research", emoji: "👩‍🔬" },
  { name: "Yusuf Ahmed", role: "VP Engineering", emoji: "🧑‍💻" },
];

export default function AboutPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="about-page" dir="ltr" lang="en">
      <div className="about-shell">
        {/* Hero Section */}
        <section className={`about-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            Pioneering Arabic AI
          </div>
          <h1>
            Building the Future of
            <span className="gradient-text"> Arabic Intelligence</span>
          </h1>
          <p className="hero-subtitle">
            Gazera is on a mission to create AI that truly understands Arabic — its dialects, 
            its culture, and its people. We're not just translating technology; we're reimagining it.
          </p>
        </section>

        {/* Stats Section */}
        <section className={`stats-grid ${visible ? "fade-in delay-1" : ""}`}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* Story Section */}
        <section className={`story-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Our Story</span>
            <h2>From Research Lab to Production AI</h2>
          </div>
          <div className="story-content">
            <p>
              Founded in 2024, Gazera emerged from a simple observation: the Arabic-speaking world 
              deserves AI that speaks their language — not just literally, but culturally.
            </p>
            <p>
              Our team of researchers, engineers, and linguists came together with a shared vision: 
              to build Arabic AI that doesn't just translate English models, but understands the 
              unique richness of Arabic expression across 22+ dialects.
            </p>
            <p>
              Today, Gazi powers conversations for enterprises across the MENA region, delivering 
              answers that are accurate, culturally appropriate, and backed by verifiable sources.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className={`values-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Our Values</span>
            <h2>What Drives Us Forward</h2>
          </div>
          <div className="values-grid">
            {values.map((value, i) => (
              <div key={i} className="value-card">
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className={`team-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Leadership</span>
            <h2>Meet the Team</h2>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar">{member.emoji}</div>
                <h4>{member.name}</h4>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={`about-cta ${visible ? "fade-in delay-5" : ""}`}>
          <h2>Ready to Experience Arabic AI?</h2>
          <p>Join the hundreds of organizations already using Gazi to connect with their Arabic-speaking audiences.</p>
          <div className="cta-buttons">
            <a href="/" className="btn-primary">Try Gazi Now</a>
            <a href="/contact" className="btn-secondary">Contact Sales</a>
          </div>
        </section>
      </div>
    </main>
  );
}

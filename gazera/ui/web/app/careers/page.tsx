"use client";

import { useEffect, useState } from "react";

const perks = [
  { icon: "💰", title: "Competitive Pay", desc: "Top-tier salaries + equity" },
  { icon: "🏠", title: "Remote First", desc: "Work from anywhere" },
  { icon: "🏥", title: "Health Benefits", desc: "Full medical coverage" },
  { icon: "📚", title: "Learning Budget", desc: "$3,000/year for growth" },
  { icon: "🌴", title: "Unlimited PTO", desc: "Take the time you need" },
  { icon: "🖥️", title: "Equipment", desc: "Latest Mac + peripherals" },
];

const openRoles = [
  {
    title: "Senior ML Engineer",
    team: "Research",
    location: "Remote / Dubai",
    type: "Full-time",
    level: "Senior",
    description: "Train and optimize our Arabic language models. Experience with transformers and distributed training required.",
  },
  {
    title: "Applied AI Engineer",
    team: "Engineering",
    location: "Remote / Riyadh",
    type: "Full-time",
    level: "Mid-Senior",
    description: "Build production AI systems. Strong Python skills and experience with LLM serving infrastructure.",
  },
  {
    title: "Arabic Linguistics Researcher",
    team: "Research",
    location: "Remote",
    type: "Full-time",
    level: "PhD Preferred",
    description: "Shape how Gazi understands Arabic dialects and cultural nuance. Native Arabic speaker required.",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote / Dubai",
    type: "Full-time",
    level: "Senior",
    description: "Design beautiful, intuitive interfaces for Arabic AI products. RTL design experience a plus.",
  },
  {
    title: "Developer Relations Engineer",
    team: "Growth",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Senior",
    description: "Help developers build with Gazi. Create docs, tutorials, and engage with our community.",
  },
  {
    title: "Site Reliability Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    description: "Keep Gazi running at scale. Experience with Kubernetes, observability, and GPU infrastructure.",
  },
];

const values = [
  { emoji: "🎯", title: "Impact First", desc: "We optimize for real-world outcomes, not vanity metrics." },
  { emoji: "🔬", title: "Scientific Rigor", desc: "We test hypotheses, measure results, and iterate." },
  { emoji: "🤝", title: "Radical Candor", desc: "We give honest feedback with kindness and clarity." },
  { emoji: "🚀", title: "Ship Fast", desc: "Perfect is the enemy of good. We learn by shipping." },
];

export default function CareersPage() {
  const [visible, setVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("All");

  useEffect(() => {
    setVisible(true);
  }, []);

  const teams = ["All", ...new Set(openRoles.map((r) => r.team))];
  const filteredRoles = selectedTeam === "All" 
    ? openRoles 
    : openRoles.filter((r) => r.team === selectedTeam);

  return (
    <main className="careers-page" dir="ltr" lang="en">
      <div className="careers-shell">
        {/* Hero Section */}
        <section className={`careers-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">🚀</span>
            We're Hiring
          </div>
          <h1>
            Build the Future of
            <span className="gradient-text"> Arabic AI</span>
          </h1>
          <p className="hero-subtitle">
            Join a world-class team on a mission to bring sovereign AI to 400+ million 
            Arabic speakers. We're well-funded, remote-first, and moving fast.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-num">{openRoles.length}</span>
              <span className="stat-label">Open Roles</span>
            </div>
            <div className="hero-stat">
              <span className="stat-num">12</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="hero-stat">
              <span className="stat-num">$12M</span>
              <span className="stat-label">Raised</span>
            </div>
          </div>
        </section>

        {/* Perks Section */}
        <section className={`perks-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Benefits</span>
            <h2>Why Join Gazera?</h2>
          </div>
          <div className="perks-grid">
            {perks.map((perk, i) => (
              <div key={i} className="perk-card">
                <span className="perk-icon">{perk.icon}</span>
                <h4>{perk.title}</h4>
                <p>{perk.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Culture Section */}
        <section className={`culture-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Culture</span>
            <h2>How We Work</h2>
          </div>
          <div className="values-grid">
            {values.map((value, i) => (
              <div key={i} className="value-card">
                <span className="value-emoji">{value.emoji}</span>
                <h4>{value.title}</h4>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Roles Section */}
        <section className={`roles-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Open Positions</span>
            <h2>Find Your Role</h2>
          </div>
          
          {/* Team Filter */}
          <div className="team-filter">
            {teams.map((team) => (
              <button
                key={team}
                className={`team-btn ${selectedTeam === team ? "active" : ""}`}
                onClick={() => setSelectedTeam(team)}
              >
                {team}
              </button>
            ))}
          </div>

          {/* Roles List */}
          <div className="roles-list">
            {filteredRoles.map((role, i) => (
              <div key={i} className="role-card">
                <div className="role-header">
                  <h3>{role.title}</h3>
                  <span className="role-level">{role.level}</span>
                </div>
                <p className="role-desc">{role.description}</p>
                <div className="role-meta">
                  <span className="role-tag">{role.team}</span>
                  <span className="role-tag">{role.location}</span>
                  <span className="role-tag">{role.type}</span>
                </div>
                <a href="/contact" className="apply-btn">Apply Now →</a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={`careers-cta ${visible ? "fade-in delay-4" : ""}`}>
          <h2>Don't See Your Role?</h2>
          <p>We're always looking for exceptional talent. Send us your resume and tell us how you'd contribute.</p>
          <a href="mailto:careers@gazera.ai" className="btn-primary">Get in Touch</a>
        </section>
      </div>
    </main>
  );
}

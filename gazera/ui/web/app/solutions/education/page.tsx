"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "🤖",
    title: "AI Tutoring",
    description: "Personalized Arabic-speaking tutors that adapt to each student's learning pace and style.",
  },
  {
    icon: "📝",
    title: "Content Generation",
    description: "Generate quizzes, lesson plans, and educational materials in Modern Standard or dialectal Arabic.",
  },
  {
    icon: "📖",
    title: "Reading Assistant",
    description: "Help students read and comprehend Arabic texts with explanations and vocabulary support.",
  },
  {
    icon: "✍️",
    title: "Writing Feedback",
    description: "Instant feedback on Arabic writing with grammar, style, and content suggestions.",
  },
  {
    icon: "♿",
    title: "Accessibility",
    description: "Text-to-speech, speech-to-text, and simplified explanations for diverse learners.",
  },
  {
    icon: "📊",
    title: "Learning Analytics",
    description: "Track student progress, identify knowledge gaps, and personalize learning paths.",
  },
];

const benefits = [
  {
    metric: "40%",
    label: "Improved Comprehension",
    description: "Students using AI tutoring show significant gains in reading comprehension.",
  },
  {
    metric: "3x",
    label: "More Practice",
    description: "AI enables unlimited practice opportunities with instant feedback.",
  },
  {
    metric: "24/7",
    label: "Always Available",
    description: "Students can learn anytime, getting help when teachers aren't available.",
  },
];

const audiences = [
  {
    icon: "🏫",
    title: "K-12 Schools",
    description: "Arabic language learning and subject tutoring for primary and secondary students.",
    features: ["Safe for students", "Teacher dashboard", "Curriculum aligned"],
  },
  {
    icon: "🎓",
    title: "Universities",
    description: "Research assistance, writing support, and course material generation.",
    features: ["Research tools", "Citation support", "Academic writing"],
  },
  {
    icon: "🌐",
    title: "Language Learners",
    description: "Arabic as a foreign language with dialect options and cultural context.",
    features: ["Dialect choice", "Cultural notes", "Pronunciation"],
  },
];

export default function EducationPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="education-page" dir="ltr" lang="en">
      <div className="education-shell">
        {/* Hero Section */}
        <section className={`education-hero ${visible ? "fade-in" : ""}`}>
          <Link href="/solutions" className="back-link">← All Solutions</Link>
          <div className="hero-badge education-badge">
            <span className="badge-icon">🎓</span>
            Education
          </div>
          <h1>
            Transform Learning with
            <span className="gradient-text"> Arabic AI</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered tutoring, content generation, and accessibility tools 
            designed for Arabic-speaking students and educators.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary">Get Started</Link>
            <Link href="/documentation" className="btn-secondary">For Developers</Link>
          </div>
        </section>

        {/* Benefits */}
        <section className={`edu-benefits-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="edu-benefits-grid">
            {benefits.map((benefit, i) => (
              <div key={i} className="edu-benefit-card">
                <span className="benefit-metric">{benefit.metric}</span>
                <span className="benefit-label">{benefit.label}</span>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className={`edu-features-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2>AI-Powered Learning Tools</h2>
          </div>
          <div className="edu-features-grid">
            {features.map((feature, i) => (
              <div key={i} className="edu-feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Audiences */}
        <section className={`audiences-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Who It's For</span>
            <h2>Solutions for Every Learner</h2>
          </div>
          <div className="audiences-grid">
            {audiences.map((audience, i) => (
              <div key={i} className="audience-card">
                <span className="audience-icon">{audience.icon}</span>
                <h3>{audience.title}</h3>
                <p>{audience.description}</p>
                <div className="audience-features">
                  {audience.features.map((feature, j) => (
                    <span key={j} className="audience-feature">✓ {feature}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Banner */}
        <section className={`safety-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="safety-card">
            <span className="safety-icon">🛡️</span>
            <div className="safety-content">
              <h3>Built with Student Safety in Mind</h3>
              <p>
                Content filtering, age-appropriate responses, and no data retention 
                for student conversations. COPPA and FERPA considerations built in.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className={`edu-pricing-section ${visible ? "fade-in delay-5" : ""}`}>
          <div className="section-header centered">
            <span className="section-tag">Pricing</span>
            <h2>Affordable for Education</h2>
          </div>
          <div className="edu-pricing-cards">
            <div className="edu-pricing-card">
              <h3>Classroom</h3>
              <p className="pricing-desc">For individual teachers</p>
              <div className="pricing-amount">Free</div>
              <ul>
                <li>Up to 30 students</li>
                <li>Basic tutoring features</li>
                <li>Community support</li>
              </ul>
              <Link href="/contact" className="btn-secondary">Get Started</Link>
            </div>
            <div className="edu-pricing-card featured">
              <span className="popular-badge">Most Popular</span>
              <h3>School</h3>
              <p className="pricing-desc">For schools and districts</p>
              <div className="pricing-amount">Custom</div>
              <ul>
                <li>Unlimited students</li>
                <li>Admin dashboard</li>
                <li>LMS integration</li>
                <li>Priority support</li>
              </ul>
              <Link href="/contact" className="btn-primary">Contact Sales</Link>
            </div>
            <div className="edu-pricing-card">
              <h3>University</h3>
              <p className="pricing-desc">For higher education</p>
              <div className="pricing-amount">Custom</div>
              <ul>
                <li>Research features</li>
                <li>API access</li>
                <li>Custom models</li>
                <li>Dedicated support</li>
              </ul>
              <Link href="/contact" className="btn-secondary">Contact Sales</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`edu-cta ${visible ? "fade-in delay-6" : ""}`}>
          <h2>Ready to Transform Your Classroom?</h2>
          <p>See how Gazi can support Arabic language learning and beyond.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn-primary">Request Pilot</Link>
            <a href="mailto:education@gazera.ai" className="btn-secondary">education@gazera.ai</a>
          </div>
        </section>
      </div>
    </main>
  );
}

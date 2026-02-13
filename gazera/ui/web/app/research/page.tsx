"use client";

import { useEffect, useState } from "react";

const papers = [
  {
    title: "Gazi: A Foundation Model for Arabic Reasoning and Retrieval",
    authors: "Al-Hassan F., Khalil O., Mansour L., et al.",
    venue: "ACL 2026",
    date: "Jan 2026",
    tags: ["LLM", "Arabic NLP", "RAG"],
    abstract: "We present Gazi, a 7B parameter language model optimized for Arabic reasoning and retrieval-augmented generation.",
  },
  {
    title: "ArabicBench: A Comprehensive Evaluation Suite for Arabic LLMs",
    authors: "Mansour L., Ahmed Y., Al-Hassan F.",
    venue: "EMNLP 2025",
    date: "Nov 2025",
    tags: ["Benchmarks", "Evaluation"],
    abstract: "We introduce ArabicBench, covering 22 dialects across reasoning, comprehension, and generation tasks.",
  },
  {
    title: "Dialect-Aware Tokenization for Modern Standard and Colloquial Arabic",
    authors: "Khalil O., Nour S., Al-Hassan F.",
    venue: "NAACL 2025",
    date: "Jun 2025",
    tags: ["Tokenization", "Dialects"],
    abstract: "A morphology-aware tokenizer that improves compression and downstream performance for Arabic variants.",
  },
  {
    title: "Faithful Citations in Arabic RAG Systems",
    authors: "Ahmed Y., Mansour L., Khalil O.",
    venue: "SIGIR 2025",
    date: "Jul 2025",
    tags: ["RAG", "Citations"],
    abstract: "Methods for generating verifiable citations in retrieval-augmented Arabic question answering.",
  },
];

const researchAreas = [
  {
    icon: "🧠",
    title: "Arabic Language Modeling",
    description: "Training foundation models that understand Modern Standard Arabic and regional dialects.",
    topics: ["Pre-training", "Instruction Tuning", "RLHF", "Scaling Laws"],
  },
  {
    icon: "📚",
    title: "Retrieval & Grounding",
    description: "Building RAG systems that provide accurate, cited answers from Arabic documents.",
    topics: ["Dense Retrieval", "Citation Generation", "Hallucination Reduction"],
  },
  {
    icon: "🗣️",
    title: "Dialect Understanding",
    description: "Modeling the rich diversity of Arabic dialects across the MENA region.",
    topics: ["Dialect Detection", "Code-Switching", "Cultural Context"],
  },
  {
    icon: "⚖️",
    title: "Safety & Alignment",
    description: "Ensuring Arabic AI is helpful, harmless, and honest across cultural contexts.",
    topics: ["Content Safety", "Bias Mitigation", "Value Alignment"],
  },
];

const stats = [
  { value: "12", label: "Publications" },
  { value: "5", label: "Open Datasets" },
  { value: "3", label: "Benchmarks" },
  { value: "8", label: "Researchers" },
];

export default function ResearchPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="research-page" dir="ltr" lang="en">
      <div className="research-shell">
        {/* Hero Section */}
        <section className={`research-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">🔬</span>
            Research
          </div>
          <h1>
            Advancing Arabic
            <span className="gradient-text"> AI Science</span>
          </h1>
          <p className="hero-subtitle">
            Our research team publishes peer-reviewed work on Arabic NLP, 
            contributes open datasets, and pushes the boundaries of what's possible.
          </p>
          <div className="stats-row">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Research Areas */}
        <section className={`areas-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Focus Areas</span>
            <h2>What We're Working On</h2>
          </div>
          <div className="areas-grid">
            {researchAreas.map((area, i) => (
              <div key={i} className="area-card">
                <span className="area-icon">{area.icon}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <div className="area-topics">
                  {area.topics.map((topic, j) => (
                    <span key={j} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className={`papers-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Publications</span>
            <h2>Recent Papers</h2>
          </div>
          <div className="papers-list">
            {papers.map((paper, i) => (
              <article key={i} className="paper-card">
                <div className="paper-header">
                  <span className="paper-venue">{paper.venue}</span>
                  <span className="paper-date">{paper.date}</span>
                </div>
                <h3>{paper.title}</h3>
                <p className="paper-authors">{paper.authors}</p>
                <p className="paper-abstract">{paper.abstract}</p>
                <div className="paper-footer">
                  <div className="paper-tags">
                    {paper.tags.map((tag, j) => (
                      <span key={j} className="paper-tag">{tag}</span>
                    ))}
                  </div>
                  <a href="#" className="paper-link">Read Paper →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section className={`opensource-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="opensource-card">
            <div className="opensource-content">
              <span className="opensource-icon">💻</span>
              <h2>Open Source & Datasets</h2>
              <p>We believe in open science. Our benchmarks, evaluation code, and selected datasets are available on GitHub.</p>
            </div>
            <div className="opensource-actions">
              <a href="https://github.com/gazera" className="btn-primary" target="_blank">
                <span>⭐</span> View on GitHub
              </a>
              <a href="https://huggingface.co/gazera" className="btn-secondary" target="_blank">
                🤗 Hugging Face
              </a>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className={`research-cta ${visible ? "fade-in delay-4" : ""}`}>
          <h2>Join Our Research Team</h2>
          <p>We're looking for talented researchers passionate about Arabic NLP and AI safety.</p>
          <a href="/careers" className="btn-primary">View Open Positions</a>
        </section>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

const endpoints = [
  {
    method: "POST",
    path: "/v1/chat/completions",
    description: "Standard chat completions with streaming support",
    badge: "Core",
  },
  {
    method: "POST",
    path: "/v1/rag/chat",
    description: "RAG-enhanced chat with source citations",
    badge: "RAG",
  },
  {
    method: "POST",
    path: "/v1/embeddings",
    description: "Generate embeddings for Arabic text",
    badge: "Embeddings",
  },
  {
    method: "GET",
    path: "/v1/models",
    description: "List available Gazi models",
    badge: "Models",
  },
];

const codeExample = `curl -X POST https://api.gazera.ai/v1/chat/completions \\
  -H "Authorization: Bearer $GAZI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gazi-7b",
    "messages": [
      {"role": "system", "content": "أنت مساعد عربي موثوق"},
      {"role": "user", "content": "ما هي عاصمة السعودية؟"}
    ],
    "stream": true
  }'`;

const responseExample = `{
  "id": "chat-abc123",
  "object": "chat.completion",
  "created": 1706140800,
  "model": "gazi-7b",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "عاصمة المملكة العربية السعودية هي الرياض."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 12,
    "total_tokens": 36
  }
}`;

const sdks = [
  { name: "Python", icon: "🐍", status: "Available" },
  { name: "JavaScript", icon: "📦", status: "Available" },
  { name: "Go", icon: "🔵", status: "Coming Soon" },
  { name: "REST", icon: "🌐", status: "Available" },
];

export default function ApiReferencePage() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"request" | "response">("request");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab === "request" ? codeExample : responseExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="api-page" dir="ltr" lang="en">
      <div className="api-shell">
        {/* Hero Section */}
        <section className={`api-hero ${visible ? "fade-in" : ""}`}>
          <div className="hero-badge">
            <span className="badge-icon">⚡</span>
            Developer Docs
          </div>
          <h1>
            Gazi API
            <span className="gradient-text"> Reference</span>
          </h1>
          <p className="hero-subtitle">
            Build powerful Arabic AI applications with our OpenAI-compatible API. 
            Simple integration, enterprise reliability.
          </p>
          <div className="quick-links">
            <a href="#endpoints" className="quick-link">
              <span>📡</span> Endpoints
            </a>
            <a href="#authentication" className="quick-link">
              <span>🔑</span> Authentication
            </a>
            <a href="#examples" className="quick-link">
              <span>💻</span> Examples
            </a>
          </div>
        </section>

        {/* SDK Cards */}
        <section className={`sdk-section ${visible ? "fade-in delay-1" : ""}`}>
          <div className="sdk-grid">
            {sdks.map((sdk, i) => (
              <div key={i} className="sdk-card">
                <span className="sdk-icon">{sdk.icon}</span>
                <span className="sdk-name">{sdk.name}</span>
                <span className={`sdk-status ${sdk.status === "Available" ? "available" : ""}`}>
                  {sdk.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Endpoints Section */}
        <section id="endpoints" className={`endpoints-section ${visible ? "fade-in delay-2" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Endpoints</span>
            <h2>Available API Routes</h2>
          </div>
          <div className="endpoints-list">
            {endpoints.map((endpoint, i) => (
              <div key={i} className="endpoint-card">
                <div className="endpoint-method-wrap">
                  <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  <code className="endpoint-path">{endpoint.path}</code>
                </div>
                <p className="endpoint-desc">{endpoint.description}</p>
                <span className="endpoint-badge">{endpoint.badge}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Authentication Section */}
        <section id="authentication" className={`auth-section ${visible ? "fade-in delay-3" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Authentication</span>
            <h2>Securing Your Requests</h2>
          </div>
          <div className="auth-content">
            <div className="auth-card">
              <div className="auth-icon">🔐</div>
              <h3>API Key Authentication</h3>
              <p>Include your API key in the Authorization header for all requests.</p>
              <code className="auth-example">Authorization: Bearer gazi_sk_xxxx...</code>
            </div>
            <div className="auth-info">
              <div className="info-item">
                <span className="info-icon">📊</span>
                <div>
                  <h4>Rate Limits</h4>
                  <p>10,000 requests/min for Pro plans, unlimited for Enterprise</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🔄</span>
                <div>
                  <h4>Key Rotation</h4>
                  <p>Generate and rotate keys from your dashboard</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🌐</span>
                <div>
                  <h4>IP Whitelisting</h4>
                  <p>Optional IP restrictions for enhanced security</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples Section */}
        <section id="examples" className={`examples-section ${visible ? "fade-in delay-4" : ""}`}>
          <div className="section-header">
            <span className="section-tag">Examples</span>
            <h2>Quick Start Code</h2>
          </div>
          <div className="code-container">
            <div className="code-tabs">
              <button
                className={`code-tab ${activeTab === "request" ? "active" : ""}`}
                onClick={() => setActiveTab("request")}
              >
                Request
              </button>
              <button
                className={`code-tab ${activeTab === "response" ? "active" : ""}`}
                onClick={() => setActiveTab("response")}
              >
                Response
              </button>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
            </div>
            <pre className="code-block">
              <code>{activeTab === "request" ? codeExample : responseExample}</code>
            </pre>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`api-cta ${visible ? "fade-in delay-5" : ""}`}>
          <h2>Ready to Build?</h2>
          <p>Get your API key and start building Arabic AI applications in minutes.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-primary">Get API Key</a>
            <a href="/documentation" className="btn-secondary">Full Documentation</a>
          </div>
        </section>
      </div>
    </main>
  );
}

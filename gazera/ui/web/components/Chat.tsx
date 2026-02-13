"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Citation = {
  title: string;
  chunk_id: string;
  quote: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SUGGESTIONS = [
  "ما هي أهم المعالم السياحية في السعودية؟",
  "اشرح لي مفهوم الذكاء الاصطناعي",
  "كيف أتعلم البرمجة بالعربي؟",
  "ما هي فوائد القراءة اليومية؟",
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [useRag, setUseRag] = useState(true);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [expandedCitations, setExpandedCitations] = useState<Set<number>>(new Set());
  
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const send = useCallback(async (customMessage?: string) => {
    const messageText = customMessage || input.trim();
    if (!messageText) return;
    
    const newMessage: ChatMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setCitations([]);
    setError(null);

    try {
      const endpoint = useRag ? "/rag/chat" : "/chat";
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: newMessages.map(m => ({ role: m.role, content: m.content })) 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`خطأ في الخادم: ${response.status}`);
      }
      
      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
      };
      setMessages([...newMessages, assistantMessage]);
      setCitations(data.citations || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }, [input, messages, useRag, apiBase]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const copyMessage = async (content: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  const toggleCitation = (idx: number) => {
    setExpandedCitations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  const clearChat = () => {
    setMessages([]);
    setCitations([]);
    setError(null);
    textareaRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const charCount = input.length;
  const maxChars = 2000;

  return (
    <section className="panel">
      <div className="controls">
        <label className="toggle">
          <input
            type="checkbox"
            checked={useRag}
            onChange={() => setUseRag(!useRag)}
          />
          <span className="toggle-slider" />
          تفعيل RAG مع المصادر
          {useRag && <span className="rag-badge">نشط</span>}
        </label>
        <div className="controls-actions">
          {messages.length > 0 && (
            <span className="message-count">{messages.length} رسالة</span>
          )}
          <button 
            className="secondary" 
            onClick={clearChat}
            disabled={messages.length === 0}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            مسح المحادثة
          </button>
        </div>
      </div>

      <div className="chat-window" ref={chatWindowRef}>
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                <path d="M8 10h.01M12 10h.01M16 10h.01" />
              </svg>
            </div>
            <h3>ابدأ محادثة جديدة</h3>
            <p>اطرح سؤالك بالعربية وسأساعدك بإجابة موثقة</p>
            <div className="suggestions">
              <span className="suggestions-label">جرّب أحد هذه الأسئلة:</span>
              <div className="suggestion-chips">
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className="suggestion-chip"
                    onClick={() => send(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-header">
                <span className="message-role">
                  {msg.role === "user" ? "أنت" : "غازي"}
                </span>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="message-content">{msg.content}</div>
              <button
                className="copy-btn"
                onClick={() => copyMessage(msg.content, idx)}
                title="نسخ الرسالة"
              >
                {copiedIdx === idx ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
              </button>
            </div>
          ))
        )}
        
        {loading && (
          <div className="message assistant loading-message">
            <div className="message-header">
              <span className="message-role">غازي</span>
            </div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
            <button className="retry-btn" onClick={() => send()}>إعادة المحاولة</button>
          </div>
        )}
      </div>

      <div className="input-row">
        <div className="textarea-wrapper">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, maxChars))}
            onKeyDown={handleKeyDown}
            placeholder="اكتب سؤالك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)"
            disabled={loading}
          />
          <span className={`char-count ${charCount > maxChars * 0.9 ? "warning" : ""}`}>
            {charCount}/{maxChars}
          </span>
        </div>
        <button 
          onClick={() => send()} 
          disabled={loading || !input.trim()}
          className="send-btn"
        >
          {loading ? (
            <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
          إرسال
        </button>
      </div>

      {useRag && citations.length > 0 && (
        <div className="citations">
          <div className="citations-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <strong>المصادر ({citations.length})</strong>
          </div>
          <div className="citations-list">
            {citations.map((c, idx) => (
              <div 
                key={idx} 
                className={`citation ${expandedCitations.has(idx) ? "expanded" : ""}`}
                onClick={() => toggleCitation(idx)}
              >
                <div className="citation-header">
                  <span className="citation-number">{idx + 1}</span>
                  <span className="citation-title">{c.title}</span>
                  <span className="citation-id">{c.chunk_id}</span>
                  <svg 
                    className="expand-icon" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                {expandedCitations.has(idx) && (
                  <div className="citation-quote">"{c.quote}"</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

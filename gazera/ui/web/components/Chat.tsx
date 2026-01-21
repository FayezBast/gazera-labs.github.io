"use client";

import { useState } from "react";

type Citation = {
  title: string;
  chunk_id: string;
  quote: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [useRag, setUseRag] = useState(true);
  const [citations, setCitations] = useState<Citation[]>([]);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  const send = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setCitations([]);

    const endpoint = useRag ? "/rag/chat" : "/chat";
    const response = await fetch(`${apiBase}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    });
    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.answer }]);
    setCitations(data.citations || []);
    setLoading(false);
  };

  return (
    <section className="panel">
      <div className="controls">
        <label className="toggle">
          <input
            type="checkbox"
            checked={useRag}
            onChange={() => setUseRag(!useRag)}
          />
          تفعيل RAG مع المصادر
        </label>
        <button className="secondary" onClick={() => setMessages([])}>
          مسح المحادثة
        </button>
      </div>

      <div className="chat-window">
        {messages.length === 0 && <div>ابدأ بسؤال عربي.</div>}
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message assistant">جاري التفكير...</div>}
      </div>

      <div className="input-row">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك هنا"
        />
        <button onClick={send}>إرسال</button>
      </div>

      {useRag && citations.length > 0 && (
        <div className="citations">
          <strong>المصادر</strong>
          {citations.map((c, idx) => (
            <div key={idx} className="citation">
              {c.title} — {c.chunk_id}: {c.quote}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

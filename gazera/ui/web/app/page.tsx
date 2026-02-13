import Chat from "../components/Chat";

export default function Page() {
  return (
    <main className="chat-page">
      <div className="chat-shell">
        <section className="chat-hero">
          <div className="chat-badge">
            <span className="pulse-dot" />
            Gazi Interactive
          </div>
          <h1>Gazera — مساعد عربي موثوق مع مصادر</h1>
          <p>جرّب الدردشة مع نمط RAG للحصول على إجابات موثقة بالمراجع. تحدث بالعربية واحصل على ردود ذكية مدعومة بالمصادر.</p>
        </section>
        <Chat />
        <footer className="chat-footer">
          <p>
            <span>مدعوم بـ</span>
            <strong>Gazera AI</strong>
            <span className="separator">•</span>
            <span>نموذج لغوي عربي متقدم</span>
          </p>
        </footer>
      </div>
    </main>
  );
}

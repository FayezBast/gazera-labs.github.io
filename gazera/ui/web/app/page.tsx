import Chat from "../components/Chat";

export default function Page() {
  return (
    <main>
      <div className="container">
        <section className="hero">
          <h1>Gazera — مساعد عربي موثوق مع مصادر</h1>
          <p>جرّب الدردشة مع نمط RAG للحصول على إجابات موثقة بالمراجع.</p>
        </section>
        <Chat />
      </div>
    </main>
  );
}

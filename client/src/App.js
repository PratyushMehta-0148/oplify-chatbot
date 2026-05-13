import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── Chatbot Component ───────────────────────────────────────────────
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! 👋 Welcome to Oplify. I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Tell me about your services",
    "I want to book a demo",
    "How much does it cost?",
    "Contact details",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msgText = text || input;
    if (!msgText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: msgText }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgText }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "Sorry, I couldn't get a response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting. Please try again or email us at contact@oplify.in",
        },
      ]);
    }
    setLoading(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowBadge(false);
  };

  return (
    <>
      {/* Launcher */}
      <button
        className={`chat-launcher ${isOpen ? "open" : ""}`}
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        )}
        {showBadge && !isOpen && <span className="chat-badge">1</span>}
      </button>

      {/* Popup */}
      <div className={`chat-popup ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chat-popup-header">
          <div className="chat-popup-brand">
            <div className="chat-popup-avatar">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a9 9 0 110 18A9 9 0 0112 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>
            </div>
            <div>
              <h4>Oplify Assistant</h4>
              <p><span className="online-dot" />Online · Replies instantly</p>
            </div>
          </div>
          <button className="chat-popup-close" onClick={() => setIsOpen(false)} aria-label="Close">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-popup-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg-row ${msg.sender}`}>
              {msg.sender === "bot" && (
                <div className="chat-msg-avatar">
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>
                </div>
              )}
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}

          {/* Quick replies only after first message */}
          {messages.length === 1 && (
            <div className="quick-replies">
              {quickReplies.map((q) => (
                <button key={q} className="quick-chip" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="chat-msg-row bot">
              <div className="chat-msg-avatar">
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <div className="chat-bubble typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-popup-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
          />
          <button onClick={() => sendMessage()} aria-label="Send">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
        <div className="chat-powered">Powered by <span>Oplify AI</span></div>
      </div>
    </>
  );
}

// ─── Main App ────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site">
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <div className="logo-mark">O</div>
            <span className="logo-text"><b>Opl</b>ify</span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/services">Services</a>
            <a href="/case-studies">Case Studies</a>
            <a href="/careers">Careers</a>
            <a href="/contact" className="nav-contact-btn">Contact Us</a>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Transforming Your Operations
            </div>
            <h1>Simplify your<br />Operations with <span>Oplify</span></h1>
            <p>Our software solutions boost growth by improving efficiency, performance, and creating new opportunities for your business.</p>
            <div className="hero-btns">
              <a href="/contact" className="btn-primary">Contact Us</a>
              <a href="/services" className="btn-outline">Our Services</a>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>24+</strong><span>Projects Finished</span></div>
              <div className="stat-divider" />
              <div className="stat"><strong>15+</strong><span>Clients Served</span></div>
              <div className="stat-divider" />
              <div className="stat"><strong>99%</strong><span>Satisfaction Rate</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card card-1">
              <div className="hcard-icon blue">
                <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
              </div>
              <div><p className="hcard-title">Web App Development</p><p className="hcard-sub">Custom solutions for your business</p></div>
            </div>
            <div className="hero-card card-2">
              <div className="hcard-icon green">
                <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
              </div>
              <div><p className="hcard-title">Mobile App Development</p><p className="hcard-sub">iOS & Android with React Native</p></div>
            </div>
            <div className="hero-card card-3">
              <div className="hcard-icon purple">
                <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3"/></svg>
              </div>
              <div><p className="hcard-title">IoT Solutions</p><p className="hcard-sub">Smart integrations & real-time data</p></div>
            </div>
            <div className="hero-glow" />
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="section what-we-do">
        <div className="container">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Comprehensive IT Solutions<br />for Modern Businesses</h2>
          <p className="section-sub">At Oplify, our strong values form the foundation of our success and guide every aspect of our operations.</p>
          <div className="services-grid">
            {[
              {
                icon: (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
                ),
                color: "blue",
                title: "Web App & E-Commerce Development",
                desc: "We create custom web and e-commerce solutions that enhance your online presence. Our team delivers user-friendly, secure platforms tailored to your business needs.",
              },
              {
                icon: (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
                ),
                color: "green",
                title: "Mobile App Development",
                desc: "High-performance, user-friendly apps for iOS and Android using Swift, Kotlin, and React Native. Focused on seamless UX, performance, and robust security.",
              },
              {
                icon: (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M2 20s2-4 10-4 10 4 10 4"/></svg>
                ),
                color: "orange",
                title: "UI & UX Design",
                desc: "Intuitive, visually appealing interfaces designed at Oplify. Our focus on user experience ensures your digital products are engaging and easy to use.",
              },
              {
                icon: (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>
                ),
                color: "purple",
                title: "IoT Solutions",
                desc: "Customized IoT design, development, and prototyping services. Seamless integration, real-time data analytics, and improved efficiency for the digital age.",
              },
              {
                icon: (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                ),
                color: "blue",
                title: "AI Chatbot Integration",
                desc: "AI-powered chatbots for your website and WhatsApp. Automate customer support, capture leads, and deliver instant responses 24/7.",
              },
              {
                icon: (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17v-.08z"/></svg>
                ),
                color: "green",
                title: "WhatsApp API Automation",
                desc: "Handle customer communication automatically via WhatsApp. Automated responses, lead follow-up, appointment notifications, and marketing workflows.",
              },
            ].map((s) => (
              <div className="service-card" key={s.title}>
                <div className={`svc-icon ${s.color}`}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OPLIFY ── */}
      <section className="section why-oplify">
        <div className="container">
          <div className="why-inner">
            <div className="why-left">
              <div className="section-label">Why Oplify?</div>
              <h2>Expertise You Can<br />Trust. Results You<br />Can Measure.</h2>
              <p>Opt for our IT solutions to experience unparalleled expertise and customized service. We combine advanced technology with dedicated support to meet your unique needs.</p>
              <a href="/contact" className="btn-primary">Get Started</a>
            </div>
            <div className="why-right">
              {[
                { emoji: "💡", title: "Innovation Through Creativity", desc: "We embrace new ideas and inventive solutions to drive progress and stay ahead of the curve." },
                { emoji: "🤝", title: "Integrity in Every Action", desc: "We act honestly and ethically in all our interactions and decisions." },
                { emoji: "🚀", title: "Collaboration for Success", desc: "We work together, sharing knowledge and skills to achieve common goals." },
                { emoji: "⭐", title: "Commitment to Excellence", desc: "We strive for the highest quality and continuous improvement in everything we do." },
              ].map((item) => (
                <div className="why-card" key={item.title}>
                  <div className="why-emoji">{item.emoji}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-inner">
            <div>
              <h2>Walk through the world with us</h2>
              <p>Kickstart your project with us — expert IT solutions tailored to your needs, ensuring success from start.</p>
            </div>
            <a href="/contact" className="btn-white">Contact Us →</a>
          </div>
        </div>
      </section>

      {/* ── CUSTOMERS ── */}
      <section className="section customers">
        <div className="container">
          <div className="section-label">Our Customers</div>
          <h2 className="section-title">Companies of all sizes trust us<br />for their growth and innovation</h2>
          <div className="customers-strip">
            {["SafeRef", "Transmonk", "Trumaxx", "Safe InvoTec", "ViryBike", "Flair N Frillz", "29i Digital", "BhadePay"].map((c) => (
              <div className="customer-logo" key={c}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-mark">O</div>
                <span className="logo-text"><b>Opl</b>ify</span>
              </div>
              <p>Transforming Your Operations with Simplified Digital Products.</p>
            </div>
            <div className="footer-col">
              <h5>Navigation</h5>
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/services">Services</a>
              <a href="/case-studies">Case Studies</a>
              <a href="/careers">Careers</a>
            </div>
            <div className="footer-col">
              <h5>Work Inquiry</h5>
              <a href="mailto:contact@oplify.in">contact@oplify.in</a>
              <a href="tel:+918806047133">+91 880 60 47133</a>
            </div>
            <div className="footer-col">
              <h5>Location</h5>
              <p>Ganga Trueno Business Park,<br />VIP Airport Road, Viman Nagar,<br />Pune, Maharashtra 411014</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright ©2026 Oplify Solutions Pvt Ltd</p>
            <div className="footer-links">
              <a href="#">Terms &amp; Conditions</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── CHATBOT ── */}
      <Chatbot />
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import LogoKemenPU from './assets/logo-kemenpu.png';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // --- LOGIKA BOT ---
  const botResponses = {
    'informasi layanan bpjn': 'BPJN (Balai Pelaksana Jalan Nasional) menyediakan berbagai layanan terkait infrastruktur jalan, antara lain:\n\n📋 Pembangunan dan pemeliharaan jalan nasional\n📋 Pengawasan proyek infrastruktur\n📋 Konsultasi teknis jalan dan jembatan\n📋 Informasi status proyek\n\nApakah ada layanan spesifik yang ingin Anda ketahui lebih lanjut?',
    'cara mengajukan permohonan': 'Untuk mengajukan permohonan di BPJN, Anda dapat mengikuti langkah-langkah berikut:\n\n1️⃣ Siapkan dokumen persyaratan\n2️⃣ Kunjungi kantor BPJN terdekat atau akses portal online\n3️⃣ Isi formulir permohonan\n4️⃣ Serahkan dokumen dan formulir\n5️⃣ Tunggu proses verifikasi\n\nPerlu bantuan dengan jenis permohonan tertentu?',
    'kontak dan lokasi kantor': 'Berikut informasi kontak BPJN:\n\n📍 Alamat: Jl. Raya BPJN No. 1\n📞 Telepon: (021) 1234-5678\n📧 Email: info@bpjn.go.id\n🕐 Jam Operasional: Senin-Jumat, 08.00-16.00 WIB\n\nAnda juga dapat mengunjungi website resmi untuk informasi lebih lengkap.'
  };

  const getBotResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    for (const key in botResponses) {
      if (lowerText.includes(key)) return botResponses[key];
    }
    return `Terima kasih atas pertanyaannya mengenai "${userText}". Untuk informasi lebih akurat, silakan hubungi layanan pelanggan kami atau kunjungi kantor BPJN terdekat.`;
  };

  // --- ACTIONS ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulasi Delay Bot
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const clearChat = () => {
    if (window.confirm("Hapus semua percakapan?")) {
      setMessages([]);
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-white">
      
      {/* --- LANDING PAGE --- */}
      {!isChatOpen && (
        <div id="landing-page" className="w-full h-full overflow-y-auto fade-in">
          {/* Navigation */}
          <nav className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto sticky top-0 z-50 bg-white shadow-sm">
            <div className="flex items-center">
              <img 
                src={LogoKemenPU} 
                alt="Logo KemenPU" 
                className="h-10 sm:h-14 w-auto object-contain" 
              />
            </div>
            <button 
              onClick={() => setIsChatOpen(true)} 
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-white text-sm transition-all hover:shadow-lg hover:scale-105 bg-[#1e3a5f]"
            >
              Chat
            </button>
          </nav>

          {/* Hero Section */}
          <section className="px-4 sm:px-6 py-8 sm:py-16 max-w-7xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 text-center lg:text-left w-full">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm bg-[#f7c948]/20">
                  <span className="w-2 h-2 rounded-full bg-[#f7c948]"></span>
                  <span className="font-medium text-[#1e3a5f]">Online 24/7</span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-[#1e3a5f]">
                  Asisten Virtual BPJN Siap Membantu Anda
                </h1>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed text-[#64748b]">
                  Dapatkan informasi dan bantuan seputar layanan BPJN dengan cepat dan mudah melalui chat assistant kami.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-white text-sm transition-all hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 bg-[#1e3a5f]"
                  >
                    <span>Mulai Chat Sekarang</span>
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm transition-all hover:bg-gray-100 flex items-center justify-center gap-2 text-[#1e3a5f] border-2 border-[#e2e8f0]">
                    Pelajari Layanan
                  </button>
                </div>
              </div>
              
              {/* Illustration (Desktop Only) */}
              <div className="hidden lg:flex flex-1 justify-center w-full">
                <div className="relative floating-animation max-w-sm w-full">
                  <div className="w-full max-w-sm h-96 rounded-3xl shadow-2xl p-4 bg-white border border-slate-50">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-50 p-4">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-10 h-10 rounded-full bg-white p-1 shadow-sm">
                              <img src={LogoKemenPU} alt="Logo" className="w-full h-full object-contain" />
                           </div>
                           <div className="h-4 w-24 bg-slate-200 rounded"></div>
                        </div>
                        <div className="space-y-3">
                           <div className="h-12 w-3/4 bg-white rounded-xl shadow-sm"></div>
                           <div className="h-12 w-2/3 bg-[#1e3a5f]/10 rounded-xl ml-auto"></div>
                           <div className="h-12 w-3/4 bg-white rounded-xl shadow-sm"></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-4 sm:px-6 py-8 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto w-full text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-[#1e3a5f]">Mengapa Memilih Kami?</h2>
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-10">
                {[
                  { title: 'Respons Cepat', icon: '⚡', desc: 'Dapatkan jawaban instan untuk setiap pertanyaan Anda.' },
                  { title: '24/7 Online', icon: '🕒', desc: 'Layanan tersedia sepanjang waktu, kapanpun Anda butuh.' },
                  { title: 'Informasi Akurat', icon: '📍', desc: 'Informasi terpercaya sesuai kebijakan terbaru.' }
                ].map((feat, i) => (
                  <div key={i} className="p-6 sm:p-8 rounded-2xl border border-[#e2e8f0] hover:shadow-xl transition-all hover:-translate-y-2 bg-slate-50/50">
                    <div className="text-3xl mb-4">{feat.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-[#1e3a5f]">{feat.title}</h3>
                    <p className="text-sm text-[#64748b]">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-4 sm:px-6 py-8 border-t border-[#e2e8f0]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748b] text-sm">
              <p>© 2024 BPJN. Semua Hak Dilindungi.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:underline">Privasi</a>
                <a href="#" className="hover:underline">Syarat</a>
                <a href="#" className="hover:underline">Kontak</a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* --- CHAT PAGE --- */}
      {isChatOpen && (
        <div id="chat-page" className="w-full h-full flex flex-col bg-[#f8fafc] slide-up">
          {/* Chat Header */}
          <div className="w-full px-3 sm:px-4 py-3 flex items-center gap-3 bg-[#1e3a5f] safe-area-top shadow-lg z-10">
            <button 
              onClick={() => setIsChatOpen(false)} 
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19L5 12L12 5"/></svg>
            </button>
            
            <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0">
               <img src={LogoKemenPU} alt="Logo" className="w-full h-auto object-contain" />
            </div>

            <div className="flex-1 min-w-0 text-white">
              <h2 className="font-semibold text-sm sm:text-base truncate">BPJN Assistant</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-white/70">Online</span>
              </div>
            </div>

            <button 
              onClick={clearChat} 
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              title="Hapus Chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Bot Welcome */}
            <div className="flex gap-3 fade-in">
              <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden p-1">
                <img src={LogoKemenPU} alt="Bot" className="w-full h-auto object-contain filter invert brightness-200" />
              </div>
              <div className="chat-bubble-bot rounded-2xl rounded-tl-sm p-3 sm:p-4 max-w-[85%] sm:max-w-[70%] shadow-sm text-sm text-[#1e3a5f]">
                Halo! 👋 Selamat datang di BPJN Chat Assistant. Saya siap membantu Anda dengan informasi seputar layanan BPJN. Ada yang bisa saya bantu?
              </div>
            </div>

            {/* List Pesan */}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} slide-up`}>
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0 mr-3 p-1">
                    <img src={LogoKemenPU} alt="Bot" className="w-full h-auto object-contain filter invert brightness-200" />
                  </div>
                )}
                <div className={`
                  ${msg.sender === 'user' ? 'chat-bubble-user text-white rounded-tr-sm' : 'chat-bubble-bot text-[#1e3a5f] rounded-tl-sm shadow-sm'} 
                  rounded-2xl p-3 sm:p-4 max-w-[85%] sm:max-w-[70%] text-sm whitespace-pre-line
                `}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 slide-up">
                <div className="w-8 h-8 rounded-full bg-[#1e3a5f] p-1 flex-shrink-0">
                   <img src={LogoKemenPU} alt="Bot" className="w-full h-auto object-contain filter invert brightness-200" />
                </div>
                <div className="chat-bubble-bot rounded-2xl rounded-tl-sm p-3 shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f]/40 rounded-full pulse-dot"></span>
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f]/40 rounded-full pulse-dot" style={{animationDelay: '0.2s'}}></span>
                  <span className="w-1.5 h-1.5 bg-[#1e3a5f]/40 rounded-full pulse-dot" style={{animationDelay: '0.4s'}}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-sm">
            {Object.keys(botResponses).map((key, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSendMessage(key)}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-[#f7c948]/20 text-[#1e3a5f] text-xs font-semibold hover:bg-[#f7c948]/40 transition-all border border-[#f7c948]/30"
              >
                {key === 'informasi layanan bpjn' ? '📋 Layanan' : key === 'cara mengajukan permohonan' ? '📝 Pengajuan' : '📍 Lokasi'}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#e2e8f0] safe-area-bottom">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} 
              className="flex gap-2 sm:gap-3"
            >
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis pesan Anda..." 
                className="flex-1 px-4 py-3 rounded-xl border-2 border-[#e2e8f0] focus:border-[#1e3a5f] focus:outline-none transition-all text-sm bg-slate-50"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="bg-[#1e3a5f] text-white px-4 sm:px-6 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
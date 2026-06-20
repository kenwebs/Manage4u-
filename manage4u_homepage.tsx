import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Smile, 
  Music, 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Star, 
  CheckCircle, 
  Play, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Reveal = ({ children, delay = 0, direction = 'up', className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Unobserves once visible so it stays visible
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getDirectionClass = () => {
    if (direction === 'up') return 'translate-y-16';
    if (direction === 'down') return '-translate-y-16';
    if (direction === 'left') return '-translate-x-16';
    if (direction === 'right') return 'translate-x-16';
    return 'translate-y-0';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getDirectionClass()}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleUnderDevelopment = (e) => {
    e.preventDefault();
    alert("Nettsiden er under utvikling");
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profiles = [
    {
      name: "Tor-Håkon G. Håvardsen",
      role: "Foredrag & Forfatter",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Aina Thunem",
      role: "Foredragsholder & Konferansier",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ronny Torsteinsen",
      role: "Standup & Konferansier",
      image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Electric Linda",
      role: "Foredrag & Workshops",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div className="min-h-screen font-sans text-[#1A1D20] bg-[#F4F5F7] overflow-x-hidden selection:bg-[#FF5A5F] selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1A1D20]/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF5A5F] to-[#ff7e82] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#FF5A5F]/30 transform rotate-3">
              M
            </div>
            <span className={`text-2xl font-black tracking-tight ${isScrolled ? 'text-white' : 'text-white'}`}>
              Manage<span className="text-[#FF5A5F]">4u</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white font-medium transition-colors">Hjem</a>
            <a href="#about" className="text-gray-300 hover:text-white font-medium transition-colors">Om oss</a>
            <a href="#services" className="text-gray-300 hover:text-white font-medium transition-colors">Tjenester</a>
            <a href="#profiles" className="text-gray-300 hover:text-white font-medium transition-colors">Profiler</a>
            <a href="#contact" className="bg-[#FF5A5F] hover:bg-[#e0484d] text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,90,95,0.4)]">
              Kontakt Oss
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#1A1D20] z-40 flex flex-col items-center justify-center space-y-8 text-2xl text-white">
          <a href="#" onClick={() => setMobileMenuOpen(false)}>Hjem</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>Om oss</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Tjenester</a>
          <a href="#profiles" onClick={() => setMobileMenuOpen(false)}>Profiler</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#FF5A5F] font-bold">Kontakt Oss</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 lg:pt-48 lg:pb-64 bg-[#1A1D20] overflow-hidden">
        {/* Background glow effects for 3D depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF5A5F] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center">
          
          {/* Left Text */}
          <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
            <Reveal delay={100} direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#FF5A5F]"></span>
                <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">Premium Talentbyrå</span>
              </div>
            </Reveal>
            <Reveal delay={200} direction="up">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                Book Norges beste <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A5F] to-[#ff9e9e]">
                  foredragsholdere, komikere,
                </span><br />
                og underholdere.
              </h1>
            </Reveal>
            <Reveal delay={300} direction="up">
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Skap uforglemmelige arrangementer. Vi kobler deg med talenter i toppklasse for bedriftsarrangementer, seminarer, fester og konferanser.
              </p>
            </Reveal>
            <Reveal delay={400} direction="up">
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a href="#contact" className="w-full sm:w-auto bg-[#FF5A5F] hover:bg-[#e0484d] text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,90,95,0.4)] flex items-center justify-center gap-2">
                  Book Talent <ArrowRight size={20} />
                </a>
                <a href="#profiles" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2">
                  <Play size={20} className="fill-white" /> Se Profiler
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right 3D Image Composition */}
          <div className="lg:w-1/2 relative h-[400px] lg:h-[600px] w-full perspective-1000">
            {/* Main Center Image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 lg:w-80 h-80 lg:h-[450px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 border border-white/10 transition-transform duration-500 hover:scale-105">
              <img src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Speaker" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-bold text-xl">Engasjerende Foredrag</p>
              </div>
            </div>
            {/* Left Back Image */}
            <div className="absolute top-1/4 left-0 lg:left-10 transform -rotate-6 w-48 lg:w-56 h-64 lg:h-72 rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10 opacity-80 blur-[1px] hover:blur-none hover:opacity-100 transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1585699324551-f6c309eedeca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Standup" className="w-full h-full object-cover" />
            </div>
            {/* Right Back Image */}
            <div className="absolute bottom-1/4 right-0 lg:right-10 transform rotate-6 w-56 lg:w-64 h-64 lg:h-80 rounded-3xl overflow-hidden shadow-2xl z-30 border border-white/10 hover:-translate-y-4 transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1501281668745-f7f5792203b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Event" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-gray-900">Toppvurdert</span>
              </div>
            </div>
          </div>

        </div>

        {/* Elegant Curved Divider SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 transform translate-y-[1px]">
          <svg className="relative block w-full h-[100px] lg:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.9,122.9,191.89,109.11,236.4,99.23,281.34,75.47,321.39,56.44Z" className="fill-[#F4F5F7]"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#F4F5F7] relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal delay={100} className="text-center mb-16">
            <h4 className="text-[#FF5A5F] font-bold tracking-wider uppercase text-sm mb-2">Hva vi gjør</h4>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1D20]">Våre Tjenester</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <Reveal delay={200} className="h-full">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl group border border-gray-100 h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#F4F5F7] text-[#1A1D20] group-hover:bg-[#FF5A5F] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <Mic size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Foredrag</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Inspirerende foredragsholdere for motivasjon, forretningsvekst, mental helse og spesialiserte workshops.
                </p>
                <a href="#" onClick={handleUnderDevelopment} className="inline-flex items-center text-sm font-bold text-[#1A1D20] group-hover:text-[#FF5A5F] transition-colors">
                  Les mer <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </Reveal>

            {/* Service 2 */}
            <Reveal delay={300} className="h-full">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl group border border-gray-100 h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#F4F5F7] text-[#1A1D20] group-hover:bg-[#FF5A5F] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <Smile size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Standup</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Norges morsomste komikere klare for å bringe energi og latter til ditt firmaarrangement eller fest.
                </p>
                <a href="#" onClick={handleUnderDevelopment} className="inline-flex items-center text-sm font-bold text-[#1A1D20] group-hover:text-[#FF5A5F] transition-colors">
                  Les mer <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </Reveal>

            {/* Service 3 */}
            <Reveal delay={400} className="h-full">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl group border border-gray-100 h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#F4F5F7] text-[#1A1D20] group-hover:bg-[#FF5A5F] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Konferansier</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Profesjonelle møteledere og konferansierer som holder programmet i rute og publikum engasjert.
                </p>
                <a href="#" onClick={handleUnderDevelopment} className="inline-flex items-center text-sm font-bold text-[#1A1D20] group-hover:text-[#FF5A5F] transition-colors">
                  Les mer <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </Reveal>

            {/* Service 4 */}
            <Reveal delay={500} className="h-full">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl group border border-gray-100 h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#F4F5F7] text-[#1A1D20] group-hover:bg-[#FF5A5F] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                  <Music size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Musikk</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Live-band, artister og musikalsk underholdning for å skape den perfekte atmosfæren.
                </p>
                <a href="#" onClick={handleUnderDevelopment} className="inline-flex items-center text-sm font-bold text-[#1A1D20] group-hover:text-[#FF5A5F] transition-colors">
                  Les mer <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Talent Section */}
      <section id="profiles" className="py-24 bg-[#F4F5F7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal delay={100}>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h4 className="text-[#FF5A5F] font-bold tracking-wider uppercase text-sm mb-2">Vår Roster</h4>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1D20]">Utvalgte Profiler</h2>
              </div>
              <a href="#" onClick={handleUnderDevelopment} className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-[#1A1D20] border-b-2 border-[#1A1D20] pb-1 hover:text-[#FF5A5F] hover:border-[#FF5A5F] transition-colors">
                Se alle profiler <ArrowRight size={20} />
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map((profile, index) => (
              <Reveal key={index} delay={index * 150 + 200}>
                <div className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  <div className="h-80 w-full overflow-hidden">
                    <img 
                      src={profile.image} 
                      alt={profile.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D20] via-[#1A1D20]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[#FF5A5F] font-bold text-xs uppercase tracking-wider mb-1 block">
                      {profile.role}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{profile.name}</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <button onClick={handleUnderDevelopment} className="text-white text-sm font-semibold flex items-center gap-1">
                        Les biografi <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Stats Section - Dark Mode */}
      <section className="relative py-24 bg-[#1A1D20] text-white">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/3">
              <Reveal delay={100} direction="left">
                <div className="relative inline-block">
                  <h2 className="text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">
                    10<span className="text-[#FF5A5F]">+</span>
                  </h2>
                  <p className="text-2xl font-bold mt-2 text-gray-300">Års Erfaring</p>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:w-2/3">
              <Reveal delay={200} direction="right">
                <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                  Erfaring som bygger <span className="text-[#FF5A5F]">tillit</span>
                </h3>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl">
                  Manage4u har levert enestående underholdning og profesjonelle taler til hundrevis av vellykkede arrangementer. Fra konsept til applaus, vi bringer ekspertise, åpenhet og topptalenter til din scene.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-[#FF5A5F]">
                      <CheckCircle size={24} />
                      <span className="text-3xl font-bold text-white">20+</span>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Eksklusive Profiler</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-[#FF5A5F]">
                      <Star size={24} />
                      <span className="text-3xl font-bold text-white">98%</span>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Kundetilfredshet</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-[#FF5A5F]">
                      <UserPlus size={24} />
                      <span className="text-3xl font-bold text-white">500+</span>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Arrangementer</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-[#FF5A5F]">
                      <Mic size={24} />
                      <span className="text-3xl font-bold text-white">100%</span>
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Kvalitetssikret</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section / Footer */}
      <footer id="contact" className="bg-[#F4F5F7] pt-24 pb-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden mb-16 transform -translate-y-32 relative z-20 border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Side: Form */}
              <div className="lg:w-3/5 p-12 lg:p-16">
                <h3 className="text-4xl font-bold text-[#1A1D20] mb-2">La oss bygge noe fantastisk</h3>
                <p className="text-gray-500 mb-8">Har du et arrangement i tankene? La oss diskutere hvordan vi kan realisere din visjon.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Fullt navn</label>
                      <input type="text" className="w-full bg-[#F4F5F7] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF5A5F] focus:bg-white transition-colors" placeholder="Ola Nordmann" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrift</label>
                      <input type="text" className="w-full bg-[#F4F5F7] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF5A5F] focus:bg-white transition-colors" placeholder="Din Bedrift" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">E-postadresse</label>
                      <input type="email" className="w-full bg-[#F4F5F7] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF5A5F] focus:bg-white transition-colors" placeholder="ola@eksempel.no" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Arrangementstype</label>
                      <select className="w-full bg-[#F4F5F7] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF5A5F] focus:bg-white transition-colors text-gray-500">
                        <option>Velg et alternativ</option>
                        <option>Foredrag / Seminar</option>
                        <option>Standup / Comedy</option>
                        <option>Konferansier / Host</option>
                        <option>Musikk / Band</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Melding</label>
                    <textarea rows="4" className="w-full bg-[#F4F5F7] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FF5A5F] focus:bg-white transition-colors" placeholder="Fortell oss om dato for arrangementet, forventet antall gjester, osv."></textarea>
                  </div>
                  <button type="button" className="bg-[#1A1D20] hover:bg-[#2c3136] text-white px-8 py-4 rounded-xl font-bold w-full transition-colors flex items-center justify-center gap-2">
                    Send forespørsel <ArrowRight size={20} />
                  </button>
                </form>
              </div>

              {/* Right Side: Contact Info */}
              <div className="lg:w-2/5 bg-[#1A1D20] p-12 lg:p-16 text-white relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A5F] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 transform translate-x-1/2 -translate-y-1/2"></div>
                
                <h3 className="text-3xl font-bold mb-8 relative z-10">Kontaktinfo</h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="text-[#FF5A5F]" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Ring oss direkte</p>
                      <p className="text-xl font-bold">+47 455 69 975</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="text-[#FF5A5F]" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Send oss en e-post</p>
                      <p className="text-lg font-bold">wendy@manage-4-u.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="text-[#FF5A5F]" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Vårt kontor</p>
                      <p className="text-lg font-bold">Rådyrveien 3A<br/>0595 Oslo, Norge</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                  <p className="text-sm text-gray-400">Org.nr: <span className="text-white font-semibold">934 529 960</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Text */}
          <div className="flex flex-col md:flex-row justify-between items-center -mt-16 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Manage4u. Alle rettigheter reservert.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#FF5A5F] transition-colors">Personvern</a>
              <a href="#" className="hover:text-[#FF5A5F] transition-colors">Vilkår</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
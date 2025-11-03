import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Instagram, Youtube, FileText, ExternalLink, Menu, X, Sun, Moon, Download, Code2, Sparkles, Zap, Camera, Cpu, Blocks } from 'lucide-react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(true);
  const [sparkles, setSparkles] = useState([]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    'Pursuing Masters in Computer Science',
    'F1 Enthusiast',
    'Chess Player',
    'Photographer',
    "YouTuber",
    'Tech Writer',
    'Blockchain Researcher'
  ];

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (typewriterIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(currentPhrase.slice(0, typewriterIndex + 1));
        setTypewriterIndex(typewriterIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypewriterIndex(0);
        setTypewriterText('');
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typewriterIndex, currentPhraseIndex]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-section');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['hero', 'about', 'gallery', 'skills', 'projects', 'connect'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        life: 1
      };
      
      setSparkles(prev => [...prev.slice(-20), newSparkle]);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => prev.filter(s => s.life > 0).map(s => ({
        ...s,
        life: s.life - 0.05
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const handleEmailClick = (e) => {
    // attempt to open mail client and also copy email to clipboard as a fallback
    if (e && e.preventDefault) e.preventDefault();
    const email = 'tanisha.fonseca2807@gmail.com';
    const mailto = `mailto:${email}`;
    try {
      // try opening mail client
      window.location.href = mailto;
    } catch (err) {
      // ignore
    }
    // copy to clipboard so user can paste if mailto is blocked
    try {
      navigator.clipboard.writeText(email).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 3000);
      }).catch(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 3000);
      });
    } catch (err) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef(null);

  // Extract YouTube video ID from common URL formats (embed, watch, short youtu.be)
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  const projects = [
    {
      title: "Sleep Apnea Predictor",
      desc: "A machine learning project built in Jupyter Notebook that predicts sleep apnea using your daily heart rate, accelerometer data and PPG signals from a smartwatch. This project combines data preprocessing, time-series modeling, and predictive analytics to provide personalized health insights.",
      tags: [
        "Python",
        "Jupyter Notebook",
        "LSTM",
        "Data Analysis",
        "Time-Series Modeling",
        "ML Workflow"
      ],
      link: "https://github.com/tanishaf28/ML_Dataset/tree/master?tab=readme-ov-file",
      images: ['/images/ML.png'],
      icon: Cpu,
      color: "from-blue-500 to-purple-600",
      bgPattern: "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15), transparent 50%)"
    },
    {
      title: "Food Supply Chain Management (Hyperledger Fabric)",
      desc: "A blockchain-based solution for managing and modifying food supply chain operations. Built on Hyperledger Fabric (v2.x), with smart contracts (Chaincode) in Go, LevelDB as the database, and Fabric CA for certificate management. This project demonstrates secure, transparent, and efficient supply chain tracking.",
      tags: [
        "Blockchain",
        "Hyperledger Fabric",
        "Go (Chaincode)",
        "Smart Contracts",
        "LevelDB",
        "Decentralized Systems"
      ],
      link: "https://github.com/tanishaf28/FoodSupplyChain",
      images: ['/images/go.png'],
      icon: Blocks,
      color: "from-emerald-500 to-teal-600",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15), transparent 50%)"
    },
    {
      title: "Java Codes",
      desc: "This repository features a variety of Java programs showcasing key programming concepts, encryption techniques, and small utility tools. It serves as a hands-on space for learning and refining Java skills.",
      tags: [
        "Java",
        "Programming Concepts",
        "Encryption",
        "Utility Tools",
        "Algorithms"
      ],
      link: "https://github.com/tanishaf28/JavaCodes",
      images: ['/images/java.jpg'],
      icon: Code2,
      color: "from-orange-500 to-red-600",
      bgPattern: "radial-gradient(circle at 50% 80%, rgba(249, 115, 22, 0.15), transparent 50%)"
    },
    {
      title: "YouTube Channel",
      desc: "I love talking but am a bit camera shy which is why I started my YouTube channel. I create content about travel, lifestyle, daily rants, and F1 obsession, sharing my thoughts in a fun and personal way.",
      tags: [
        "Video Editing",
        "Content Creation",
        "Public Speaking",
        "Lifestyle & Travel",
        "F1"
      ],
      link: "https://www.youtube.com/channel/UCupfpoB_Uu8H1FASH1VGr7A",
      featuredVideo: "https://www.youtube.com/embed/-Bp8TffP7to",
      icon: Youtube,
      color: "from-red-500 to-rose-600",
      bgPattern: "radial-gradient(circle at 60% 40%, rgba(239, 68, 68, 0.15), transparent 50%)"
    },
    {
      title: "Medium Articles",
      desc: "When I’m not coding, I write about tech in the simplest or occasionally sarcastic way on Medium. My articles cover topics from AI and machine learning to Go programming, making complex tech accessible and fun.",
      articles: [
        "What If ChatGPT Took a Day Off",
        "The Lazy Human's Guide to Understanding Machine Learning",
        "Go Methods and Interfaces: The Drama You Didn’t Know You Needed"
      ],
      tags: [
        "Technical Writing",
        "Writing",
        "Humor in Tech",
        "AI",
        "Machine Learning",
        "Go"
      ],
      link: "https://medium.com/@tanisha.fonseca2807",
      images: ['/images/medium.png'],
      icon: Sparkles,
      color: "from-amber-500 to-orange-600",
      bgPattern: "radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.15), transparent 50%)"
    }
  ];

  const socials = [
    { name: 'GitHub', icon: Github, link: 'https://github.com/tanishaf28', color: 'hover:text-purple-400' },
    { name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/tanisha-fonseca-0748a5193/', color: 'hover:text-blue-400' },
    { name: 'Email', icon: Mail, link: 'mailto:tanisha.fonseca2807@gmail.com', color: 'hover:text-red-400' },
    { name: 'Instagram', icon: Instagram, link: 'https://www.instagram.com/snap_elixir/', color: 'hover:text-pink-400' },
    { name: 'Medium', icon: FileText, link: 'https://medium.com/@tanisha.fonseca2807', color: 'hover:text-green-400' }
  ];

  const galleryImages = [
    { src: '/images/create.jpg', word: 'CREATE', rotate: 'rotate-2' },
    { src: '/images/accelerate.jpg', word: 'ACCELERATE', rotate: '-rotate-2' },
    { src: '/images/connect.jpg', word: 'CONNECT', rotate: 'rotate-2' },
    { src: '/images/reflect.jpg', word: 'REFLECT', rotate: '-rotate-2' },
    { src: '/images/wander.jpg', word: 'WANDER', rotate: 'rotate-2' }
  ];

  const skillsData = {
    platforms: [
      { name: 'AWS', color: '#FF9900' },
      { name: 'ServiceNow', color: '#62D84E' },
      { name: 'Anylogic', color: '#FF6B35' }
    ],
    programming: [
      { name: 'C++', color: '#00599C' },
      { name: 'C#', color: '#239120' },
      { name: 'Java', color: '#007396' },
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'Python', color: '#3776AB' },
      { name: 'Go', color: '#00ADD8' },
      { name: 'HTML', color: '#E34F26' },
      { name: 'CSS', color: '#1572B6' },
      { name: 'Bootstrap', color: '#7952B3' },
      { name: 'Django', color: '#092E20' },
      { name: 'Angular', color: '#DD0031' },
      { name: 'Spring Boot', color: '#6DB33F' }
    ],
    databases: [
      { name: 'SQL Server', color: '#CC2927' },
      { name: 'MySQL', color: '#4479A1' },
      { name: 'Oracle', color: '#F80000' },
      { name: 'MongoDB', color: '#47A248' }
    ]
  };

  return (
    <div className={`min-h-screen font-sans relative transition-colors duration-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Video Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isDark ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
              <source src="/aurora-background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900/80"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-pink-50"></div>
          </>
        )}
      </div>

      {/* Sparkle Cursor Trail */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            opacity: sparkle.life,
          }}
        />
      ))}

      {/* Navigation  */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? (isDark ? 'bg-gray-900/95' : 'bg-white/95') + ' backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
  <div className={`max-w-7xl mx-auto px-6 ${activeSection === 'hero' && scrollY <= 50 ? 'py-6' : 'py-4'}`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              TF
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {['hero', 'about', 'gallery', 'skills', 'projects', 'connect'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative px-4 py-2 text-base md:text-lg font-medium transition-colors ${
                    activeSection === section 
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section === 'hero' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
                  {activeSection === section && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2.5 rounded-lg transition-all ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/10 hover:bg-gray-900/20'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${isDark ? 'bg-gray-900/95 border-white/10' : 'bg-white/95 border-gray-200'} backdrop-blur-md`}>
            <div className="flex flex-col p-6 space-y-2">
              {['hero', 'about', 'gallery', 'skills', 'projects', 'connect'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section
                      ? isDark ? 'bg-white/10 text-white' : 'bg-gray-900/10 text-gray-900'
                      : isDark ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-900/5 hover:text-gray-900'
                  }`}
                >
                  {section === 'hero' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

       {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" style={!isDark ? {
        background: 'linear-gradient(315deg, rgba(255,251,235,1) 0%, rgba(254,240,220,1) 15%, rgba(255,237,213,1) 30%, rgba(255,228,230,1) 45%, rgba(252,231,243,1) 60%, rgba(237,233,254,1) 75%, rgba(224,242,254,1) 90%, rgba(240,253,244,1) 100%)',
        animation: 'gradient 18s ease infinite',
        backgroundSize: '400% 400%',
        backgroundAttachment: 'fixed'
      } : {}}>

        {isDark && (
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-conic from-purple-500/30 via-pink-500/30 to-blue-500/30 animate-spin-slow"></div>
            <div className="absolute inset-0 backdrop-blur-3xl"></div>
          </div>
        )}
        
        {/* Animated Gradient Waves - Light Mode Only */}
        {!isDark && (
          <>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </>
        )}
        
       <div className="relative z-10 max-w-4xl w-full text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
              <span className="hero-text-1 block mb-4 drop-shadow-2xl">Hey there</span>
              <span className={`${isDark ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} bg-clip-text text-transparent hero-text-2 block drop-shadow-2xl`}>
                I'm Tanisha Fonseca
              </span>
            </h1>
            
            <div className="text-2xl md:text-3xl max-w-3xl mx-auto h-16 flex items-center justify-center hero-text-3">
              <span className={`typewriter-text ${isDark ? 'text-white' : 'gradient-text'}`}>
                 {typewriterText}
                <span className="typewriter-cursor">|</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 hero-text-4">
              <div className="flex gap-4">
                {socials.slice(0, 3).map(social => (
                  social.name === 'Email' ? (
                    <a
                      key={social.name}
                      href={social.link}
                      onClick={handleEmailClick}
                      className={`p-3 rounded-full border transition-all hover:scale-110 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'} ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon size={26} />
                    </a>
                  ) : (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full border transition-all hover:scale-110 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'} ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon size={26} />
                    </a>
                  )
                ))}
              </div>
              
              <a
                href="/Tanisha_Fonseca_Resume.pdf"
                download="Tanisha_Fonseca_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // open resume in a new tab as a fallback to ensure it loads in the browser
                  e.preventDefault();
                  window.open('/Tanisha_Fonseca_Resume.pdf', '_blank');
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all hover:scale-105 font-semibold ${isDark ? 'bg-purple-500/20 border-purple-400/30 text-purple-300 hover:bg-purple-500/30' : 'bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-200'}`}
              >
                <Download size={22} />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${isDark ? 'border-white/30' : 'border-gray-400'}`}>
            <div className={`w-1 h-3 rounded-full ${isDark ? 'bg-white/50' : 'bg-gray-600'}`}></div>
          </div>
        </div>
      </section>
      
      
      {/* About Section with Image */}
       <section id="about" className="min-h-screen flex items-center px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="fade-in-section text-center mb-16">
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="text-4xl md:text-5xl font-bold reveal-text font-serif">
                <span className={`${isDark ? 'bg-gradient-to-r from-white via-pink-200 to-pink-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} bg-clip-text text-transparent`}>A Little About Me</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center fade-in-section">
            {/* Left - Image */}
            <div className="flex justify-center">
              <div className="relative floating-image">
                <div className={`absolute inset-0 blur-3xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-300/20'}`}></div>
                <img 
                  src="/images/image.jpeg" 
                  alt="Tanisha Fonseca"
                  className="relative w-72 h-72 md:w-96 md:h-96 object-cover shadow-2xl rounded-2xl magnetic-element"
                />
              </div>
            </div>

            {/* Right - Text - Changed font to sans-serif */}
            <div className="space-y-6 font-serif">
              <p className={`text-lg md:text-xl leading-relaxed reveal-text ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hey, I'm <span className="font-semibold">Tanisha </span>, a blockchain researcher with a curious mind, a creative heart, and an unhealthy obsession with <span className={`font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>Ferrari F1</span>.
              </p>
              
              <p className={`text-lg md:text-xl leading-relaxed reveal-text ${isDark ? 'text-white' : 'text-gray-900'}`}>
                When I'm not exploring decentralized systems or writing about AI on <span className={`font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>Medium</span>, you'll find me sketching doodles, snapping photos, or making YouTube videos that occasionally make sense.
              </p>
              
              <p className={`text-lg md:text-xl leading-relaxed reveal-text ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Basically, I'm a tech geek with an artsy soul… and a <span className={`font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>panda</span> at heart, because naps are non-negotiable. 🐼
              </p>
            </div>
          </div>
        </div>
      </section>

      {copiedEmail && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
          Email copied to clipboard
        </div>
      )}

      {/* Gallery Section */}
      <section id="gallery" className="mt-16 sm:mt-20 relative z-10 fade-in-section">
        <div className="text-center mb-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold reveal-text font-serif">
              <span className={`${isDark ? 'bg-gradient-to-r from-white via-pink-200 to-pink-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} bg-clip-text text-transparent`}>Through My Lens</span>
            </h2>
          </div>
        </div>
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {galleryImages.map((img, i) => (
            <div key={i} className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl group magnetic-element ${img.rotate} ${isDark ? 'bg-zinc-800' : 'bg-gray-200'}`}>
              <img 
                src={img.src}
                alt={img.word}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-3xl font-bold tracking-widest transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  {img.word}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-section">
            <h2 className="text-4xl md:text-5xl font-bold reveal-text font-serif">
              <span className={`${isDark ? 'bg-gradient-to-r from-white via-pink-200 to-pink-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} bg-clip-text text-transparent`}>Skills In Action</span>
            </h2>
          </div>

          <div className="space-y-4 fade-in-section">
            <div className="relative overflow-hidden py-2">
              <div 
                className="flex gap-6 whitespace-nowrap"
                style={{
                  animation: 'scroll 25s linear infinite'
                }}
              >
                {[...skillsData.platforms, ...skillsData.platforms, ...skillsData.platforms].map((skill, i) => (
                  <div
                    key={`plat-${i}`}
                    className={`flex-shrink-0 flex items-center gap-4 px-8 py-4 rounded-full transition-all group backdrop-blur-sm magnetic-element ${isDark ? 'bg-white/5 border-2 border-gray-800 hover:bg-white/10 hover:border-gray-700' : 'bg-white border-2 border-pink-300 shadow-sm hover:shadow-md hover:border-pink-300'}`}
                  >
                    <div 
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className={`text-sm md:text-base font-semibold ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden py-2">
              <div 
                className="flex gap-6 whitespace-nowrap"
                style={{
                  animation: 'scroll-reverse 35s linear infinite'
                }}
              >
                {[...skillsData.programming, ...skillsData.programming].map((skill, i) => (
                  <div
                    key={`prog-${i}`}
                    className={`flex-shrink-0 flex items-center gap-4 px-8 py-4 rounded-full transition-all group backdrop-blur-sm magnetic-element ${isDark ? 'bg-white/5 border-2 border-gray-800 hover:bg-white/10 hover:border-gray-700' : 'bg-white border-2 border-pink-300 shadow-sm hover:shadow-md hover:border-pink-300'}`}
                  >
                    <div 
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className={`text-sm md:text-base font-semibold ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden py-2">
              <div 
                className="flex gap-6 whitespace-nowrap"
                style={{
                  animation: 'scroll 28s linear infinite'
                }}
              >
                {[...skillsData.databases, ...skillsData.databases, ...skillsData.databases].map((skill, i) => (
                  <div
                    key={`db-${i}`}
                    className={`flex-shrink-0 flex items-center gap-4 px-8 py-4 rounded-full transition-all group backdrop-blur-sm magnetic-element ${isDark ? 'bg-white/5 border-2 border-gray-800 hover:bg-white/10 hover:border-gray-700' : 'bg-white border-2 border-pink-300 shadow-sm hover:shadow-md hover:border-pink-300'}`}
                  >
                    <div 
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className={`text-sm md:text-base font-semibold ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center justify-center gap-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight reveal-text font-serif">
                <span className={`${isDark ? 'bg-gradient-to-r from-white via-pink-200 to-pink-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} bg-clip-text text-transparent`}>Code & Canvas</span>
              </h2>
            </div>
          </div>

          {/* 3D Carousel Style Projects */}
          <div className="relative mb-12">
            {/* Main Project Display */}
            <div className="flex items-center justify-center mb-12">
              <div 
                className={`relative w-full max-w-4xl h-[440px] md:h-[480px] rounded-lg overflow-hidden transition-all duration-700 transform perspective-1000 ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10' 
                    : 'bg-gradient-to-br from-pink-50 via-blue-50 to-white backdrop-blur-xl border border-purple-200 shadow-2xl'
                }`}
                style={{
                  transform: 'rotateX(2deg)',
                  boxShadow: isDark 
                    ? '0 25px 50px -12px rgba(139, 92, 246, 0.25)' 
                    : '0 25px 50px -12px rgba(168, 85, 247, 0.4)'
                }}
              >
                    <div className="absolute inset-0 opacity-30"
                         style={{ background: projects[activeProject].bgPattern }} />
                    {!isDark && (
                      <div className="absolute inset-0 pointer-events-none light-glitter" />
                    )}
                
                {/* Floating particles/glitter */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 rounded-full ${
                        isDark ? 'bg-white/20' : 'bg-purple-400/30'
                      }`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${projects[activeProject].color} flex items-center justify-center shadow-lg animate-bounce`}
                           style={{ animationDuration: '3s' }}>
                        {React.createElement(projects[activeProject].icon, { className: "text-white", size: 24 })}
                      </div>
                      <div className={`text-xs uppercase tracking-widest font-mono ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        Featured
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {projects[activeProject].title}
                        </h3>
                        
                        <p className={`text-sm md:text-base leading-relaxed max-w-xl mb-2 ${
                          isDark ? 'text-gray-300' : 'text-slate-600'
                        }`}>
                          {projects[activeProject].desc}
                        </p>

                        {projects[activeProject].articles && Array.isArray(projects[activeProject].articles) && (
                          <ul className={`list-disc pl-5 space-y-0.5 mb-3 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {projects[activeProject].articles.map((item, idx) => {
                              // Map article titles to URLs if known
                              let url = null;
                              if (item.includes('ChatGPT')) url = 'https://medium.com/@tanisha.fonseca2807/what-if-chatgpt-took-a-day-off-2e2e2e2e2e2e';
                              else if (item.includes('Lazy Human')) url = 'https://medium.com/@tanisha.fonseca2807/the-lazy-humans-guide-to-understanding-machine-learning-123456789abc';
                              else if (item.includes('Go Methods')) url = 'https://medium.com/@tanisha.fonseca2807/go-methods-and-interfaces-the-drama-you-didnt-know-you-needed-abcdef123456';
                              return (
                                <li key={idx} className="text-xs">
                                  {url ? (
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500 transition-colors">{item}</a>
                                  ) : item}
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {/* Removed small image strip below description; preview is now only on the right side */}

                        <div className="flex flex-wrap gap-2 mb-4">
                          {projects[activeProject].tags.map((tag, j) => (
                            <span 
                              key={j} 
                              className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                                isDark 
                                  ? 'bg-white/10 text-purple-200 border border-white/20' 
                                  : 'bg-white/60 text-purple-700 border border-purple-200 shadow-sm'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3 flex-wrap">
                          <a 
                            href={projects[activeProject].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:gap-3 w-fit ${
                              isDark 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/50' 
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-xl'
                            }`}
                          >
                            View Project <ExternalLink size={16} />
                          </a>
                          
                          {projects[activeProject].featuredVideo && (
                            <a 
                              href={projects[activeProject].featuredVideo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:gap-3 w-fit ${
                                isDark 
                                  ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/50' 
                                  : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 shadow-xl'
                              }`}
                            >
                              Watch Video <Youtube size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right-side media preview for all projects */}
                      <div className={`flex-shrink-0 w-80 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ${isDark ? 'shadow-xl bg-slate-800/40 border border-white/10' : 'bg-gradient-to-br from-white/90 via-pink-50 to-blue-50 ring-1 ring-purple-100/60 shadow-lg'}`}>
                        {projects[activeProject].featuredVideo ? (() => {
                          const vid = getYouTubeId(projects[activeProject].featuredVideo);
                          const watchUrl = vid
                            ? `https://www.youtube.com/watch?v=${vid}`
                            : projects[activeProject].featuredVideo;
                          const thumbnail = vid
                            ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
                            : null;
                          return (
                            <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="relative block group">
                              {thumbnail ? (
                                <>
                                  <img src={thumbnail} alt="YouTube preview" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-red-500/80 text-white' : 'bg-red-600 text-white'} shadow-lg`}>
                                      <Youtube size={18} />
                                      <span className="text-sm font-semibold">Watch on YouTube</span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className={`w-full h-40 flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                  <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Open video</span>
                                </div>
                              )}
                            </a>
                          );
                        })() :
                        (Array.isArray(projects[activeProject].images) && projects[activeProject].images.length > 0 ? (
                          <img
                            src={projects[activeProject].images[0]}
                            alt={projects[activeProject].title + ' preview'}
                            className="w-full h-full object-cover aspect-square"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <div className={`w-full h-40 flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>No preview</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Navigation Thumbnails */}
            <div className="flex justify-center gap-6">
              {projects.map((project, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProject(idx)}
                  className={`group relative overflow-hidden rounded-lg transition-all duration-500 ${
                    activeProject === idx 
                      ? 'w-80 h-36 scale-110' 
                      : 'w-64 h-32 opacity-50 hover:opacity-75'
                  } ${
                    isDark 
                      ? 'bg-slate-800/50 border border-white/10' 
                      : 'bg-gradient-to-br from-purple-100/60 via-pink-100/50 to-blue-100/60 border border-purple-200/70 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div 
                    className="absolute inset-0 opacity-40"
                    style={{ background: project.bgPattern }}
                  />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                    {React.createElement(project.icon, { 
                      className: `mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`,
                      size: activeProject === idx ? 32 : 24 
                    })}
                    <h4 className={`text-sm font-bold text-center ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {project.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

       {/* Connect Section */}
      <section id="connect" className="min-h-screen flex items-center px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center fade-in-section">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 reveal-text font-serif">
            <span className={`${isDark ? 'bg-gradient-to-r from-white via-pink-200 to-pink-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} bg-clip-text text-transparent`}>Ready to Build Something</span>
            <span className={`${isDark ? 'bg-gradient-to-r from-white via-pink-200 to-pink-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} bg-clip-text text-transparent`}> Extraordinary?</span>
            <br />
            <span className={`block text-2xl md:text-3xl lg:text-4xl mt-1 mb-12 md:mb-16 ${isDark ? 'bg-gradient-to-r from-white via-pink-200 to-pink-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} bg-clip-text text-transparent`}>Let's Connect</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {socials.filter(social => social.name !== 'GitHub').map(social => (
              social.name === 'Email' ? (
                <a
                  key={social.name}
                  href={social.link}
                  onClick={handleEmailClick}
                  className={`flex items-center gap-3 px-8 py-4 text-base rounded-full border transition-all hover:scale-105 ${
                    isDark 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800'
                  } ${isDark ? social.color : ''}`}
                >
                  <social.icon size={24} />
                  <span className="font-medium">{social.name}</span>
                </a>
              ) : (
                <a 
                  key={social.name} 
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-8 py-4 text-base rounded-full border transition-all hover:scale-105 ${
                    isDark 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800'
                  } ${isDark ? social.color : ''}`}
                >
                  <social.icon size={24} />
                  <span className="font-medium">{social.name}</span>
                </a>
              )
            ))}
          </div>
          <div className={`border-t pt-8 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              © 2025 Tanisha Fonseca. Built with React & way too much coffee.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Gradient color changing text */
        .gradient-text {
          background: linear-gradient(
            90deg,
            #a855f7,
            #ec4899,
            #3b82f6,
            #a855f7
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Typewriter effect */
        .typewriter-text {
          display: inline-block;
          font-family: 'Courier New', monospace;
        }

        .typewriter-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        /* Floating animation for profile image */
        .floating-image {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .magnetic-element {
          position: relative;
          transition: transform 0.3s ease-out;
        }

        .magnetic-element:hover {
          transform: translate(
            calc((var(--mouse-x, 0px) - 50%) * 0.05),
            calc((var(--mouse-y, 0px) - 50%) * 0.05)
          );
        }

        .reveal-text {
          display: inline-block;
          animation: revealText 1s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .reveal-text:nth-child(1) {
          animation-delay: 0.1s;
        }

        .reveal-text:nth-child(2) {
          animation-delay: 0.2s;
        }

        .reveal-text:nth-child(3) {
          animation-delay: 0.3s;
        }

        /* Hero Page Cool Entrance Animations */
        .hero-text-1,
        .hero-text-2,
        .hero-text-3,
        .hero-text-4 {
          opacity: 0;
          animation: heroSlideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-text-1 {
          animation-delay: 0.2s;
          transform: translateY(60px) scale(0.9);
        }

        .hero-text-2 {
          animation-delay: 0.5s;
          transform: translateY(80px) scale(0.95);
        }

        .hero-text-3 {
          animation-delay: 0.8s;
          transform: translateY(50px);
        }

        .hero-text-4 {
          animation-delay: 1.1s;
          transform: translateY(40px);
        }

        @keyframes heroSlideUp {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.95);
            filter: blur(10px);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes revealText {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
        }

        .fade-in-section.animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: calc(var(--animation-order, 0) * 100ms);
        }

        .parallax {
          transform: translateY(calc(var(--scroll-offset, 0) * -0.5px));
          will-change: transform;
          transition: transform 0.1s linear;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes aurora {
          0%, 100% {
            transform: translateX(-50%) translateY(0) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translateX(-40%) translateY(-20px) rotate(5deg);
            opacity: 0.8;
          }
        }

        .aurora-light {
          position: absolute;
          width: 150%;
          height: 80%;
          filter: blur(40px);
        }

        .aurora-light-1 {
          top: -20%;
          animation: aurora 12s ease-in-out infinite;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(139, 92, 246, 0.15), 
            rgba(236, 72, 153, 0.15), 
            transparent
          );
        }

        .aurora-light-2 {
          top: -10%;
          animation: aurora 18s ease-in-out infinite reverse;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(59, 130, 246, 0.1), 
            rgba(139, 92, 246, 0.1), 
            transparent
          );
        }



        .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .sparkle {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 1) 0%, rgba(236, 72, 153, 0.8) 50%, transparent 100%);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.8);
          animation: sparkle-fade 0.8s ease-out forwards;
        }

        .light-glitter {
          background-image: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.7) 2px, transparent 6px),
                            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 1.5px, transparent 5px),
                            radial-gradient(circle at 70% 20%, rgba(255,255,255,0.5) 2px, transparent 6px),
                            radial-gradient(circle at 85% 70%, rgba(255,255,255,0.6) 1.5px, transparent 5px);
          background-size: 120% 120%, 90% 90%, 110% 110%, 100% 100%;
          opacity: 0.65;
          mix-blend-mode: overlay;
          animation: glitter-float 8s linear infinite;
        }

        .light-particles {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20% 30%, rgba(99,102,241,0.08) 0px, transparent 25%),
                            radial-gradient(circle at 80% 60%, rgba(236,72,153,0.07) 0px, transparent 30%),
                            radial-gradient(circle at 50% 20%, rgba(59,130,246,0.06) 0px, transparent 35%);
          background-repeat: no-repeat;
          mix-blend-mode: screen;
          filter: blur(24px);
          opacity: 0.9;
          animation: particles-drift 14s linear infinite;
          pointer-events: none;
        }

        @keyframes particles-drift {
          0% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        /* Add gradient animation keyframes */
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Gradient color changing text */
        .gradient-text {
          background: linear-gradient(
            90deg,
            #a855f7,
            #ec4899,
            #3b82f6,
            #a855f7
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .light-mesh-gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(at 10% 20%, rgba(147, 51, 234, 0.08) 0px, transparent 50%),
            radial-gradient(at 90% 30%, rgba(236, 72, 153, 0.07) 0px, transparent 50%),
            radial-gradient(at 30% 80%, rgba(59, 130, 246, 0.06) 0px, transparent 50%),
            radial-gradient(at 70% 70%, rgba(168, 85, 247, 0.05) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(139, 92, 246, 0.04) 0px, transparent 50%);
          background-size: 200% 200%, 180% 180%, 220% 220%, 190% 190%, 210% 210%;
          background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%, 50% 50%;
          animation: mesh-move 20s ease-in-out infinite;
          opacity: 0.95;
          filter: blur(40px);
          mix-blend-mode: normal;
        }

        @keyframes mesh-move {
          0%, 100% {
            background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%, 50% 50%;
          }
          25% {
            background-position: 50% 25%, 75% 50%, 25% 75%, 90% 80%, 60% 40%;
          }
          50% {
            background-position: 100% 50%, 50% 100%, 50% 50%, 80% 60%, 40% 60%;
          }
          75% {
            background-position: 25% 75%, 75% 25%, 75% 25%, 70% 40%, 55% 45%;
          }
        }

        @keyframes glitter-float {
          0% { transform: translateY(0) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-6px) translateX(4px); opacity: 0.8; }
          100% { transform: translateY(0) translateX(0px); opacity: 0.6; }
        }



        @keyframes subtleGradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        } 


        * {
          cursor: none !important;
        }

        body::after {
          content: '';
          position: fixed;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(139, 92, 246, 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          left: var(--mouse-x, 0);
          top: var(--mouse-y, 0);
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, border-color 0.2s;
        }
      `}</style>
    </div>
  );
}
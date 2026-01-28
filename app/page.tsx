'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/firebaseAuth';

export default function Home() {
  const { user, signOut, hasPaidAccess } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showToast, setShowToast] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'products', 'blogs', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Snow animation effect
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
      snowflake.style.animationDelay = Math.random() * 2 + 's';
      snowflake.style.opacity = String(Math.random() * 0.4 + 0.6); // Increased opacity
      snowflake.style.setProperty('--snow-drift', (Math.random() * 100 - 50) + 'px');
      snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';

      document.body.appendChild(snowflake);

      setTimeout(() => {
        if (document.body.contains(snowflake)) {
          snowflake.remove();
        }
      }, 5000);
    };

    // Create initial snowflakes - Increased frequency
    const interval = setInterval(createSnowflake, 200);

    return () => {
      clearInterval(interval);
      // Clean up any remaining snowflakes
      document.querySelectorAll('.snowflake').forEach((flake) => flake.remove());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductClick = (productName: string) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavButtonClass = (section: string) => {
    const baseClass =
      "transition-all duration-200 font-medium relative px-4 py-2 rounded-full";
    const isActive = activeSection === section;

    if (isActive) {
      return `${baseClass} bg-white text-slate-900 shadow-sm`;
    }

    return `${baseClass} text-gray-700 hover:text-slate-900 hover:bg-white/80 hover:shadow-sm`;
  };

  const blogs = [
    {
      id: 'hidden-price-pretty',
      title: 'The Hidden Price of "Pretty": How Social Media Is Reshaping Confidence, Childhood, and Emotional Health',
      description: 'Pretty has a price. And no one is talking about who pays it. Explore how social media is reshaping confidence, childhood, and emotional health.',
      gradient: 'from-rose-400 via-pink-400 to-purple-400',
      imageGradient: 'from-rose-100 via-pink-100 to-purple-100',
      slug: 'hidden-price-pretty',
      imageUrl: '/blog1.png'
    },
    {
      id: 'perfection-to-presence',
      title: 'From Perfection to Presence: How We Protect Confidence in a World Obsessed With Beauty',
      description: 'Confidence doesn\'t disappear overnight. It erodes quietly—through pressure, comparison, and fear. Discover how to protect confidence in a world obsessed with beauty.',
      gradient: 'from-teal-400 via-cyan-400 to-blue-400',
      imageGradient: 'from-teal-100 via-cyan-100 to-blue-100',
      slug: 'perfection-to-presence',
      imageUrl: '/blog2.png'
    },
    {
      id: 'gen-z-anxiety-guide',
      title: 'Gen Z Guide to Understanding Anxiety Responses',
      description: 'A deep dive into how anxiety feels like an emergency and ways to calm the nervous system.',
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      imageGradient: 'from-blue-100 via-cyan-100 to-teal-100',
      slug: 'gen-z-anxiety-guide',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'history-of-bedsheets',
      title: 'From Ancient Cloth to Modern Calm: The History of Bedsheets',
      description: 'Explore how the history of bedsheets connects to modern calming practices and anxiety relief.',
      gradient: 'from-slate-400 via-stone-400 to-teal-400',
      imageGradient: 'from-slate-100 via-stone-100 to-teal-100',
      slug: 'history-of-bedsheets',
      imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'matcha-whisk-chasen',
      title: 'The Matcha Whisk (Chasen): A Sacred Japanese Tool for Calm',
      description: 'Discover the benefits of the bamboo matcha whisk for grounding and anxiety relief.',
      gradient: 'from-purple-400 via-pink-400 to-rose-400',
      imageGradient: 'from-purple-100 via-pink-100 to-rose-100',
      slug: 'matcha-whisk-chasen',
      imageUrl: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'calm-bedroom-anxiety-relief',
      title: 'Create a Calm Bedroom for Anxiety Relief',
      description: 'Tips on transforming your bedroom into a sanctuary for mental tranquility.',
      gradient: 'from-sky-400 via-blue-400 to-indigo-400',
      imageGradient: 'from-sky-100 via-blue-100 to-indigo-100',
      slug: 'calm-bedroom-anxiety-relief',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'morning-rituals-anxiety',
      title: '7 Simple Morning Rituals That Make Anxiety Easier to Handle',
      description: 'Effective morning rituals to reduce anxiety and promote calm throughout your day.',
      gradient: 'from-amber-400 via-orange-400 to-yellow-400',
      imageGradient: 'from-amber-100 via-orange-100 to-yellow-100',
      slug: 'morning-rituals-anxiety',
      imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'modern-pressure-anxiety',
      title: 'Why We Feel More Pressure & Anxiety Than Ever',
      description: 'Understanding the increasing pressure in modern life and how emotional intelligence can help.',
      gradient: 'from-violet-400 via-purple-400 to-fuchsia-400',
      imageGradient: 'from-violet-100 via-purple-100 to-fuchsia-100',
      slug: 'modern-pressure-anxiety',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'anxiety-protection',
      title: 'Your Anxiety Is Trying to Protect You—Not Ruin You!',
      description: 'Reframe how we perceive anxiety and learn how it\'s trying to protect us.',
      gradient: 'from-rose-400 via-pink-400 to-red-400',
      imageGradient: 'from-rose-100 via-pink-100 to-red-100',
      slug: 'anxiety-protection',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'daily-calm-rituals',
      title: 'Daily Calm Rituals (That Actually Work)',
      description: 'Simple, science-backed daily rituals to calm your mind and reduce stress.',
      gradient: 'from-teal-400 via-cyan-400 to-blue-400',
      imageGradient: 'from-teal-100 via-cyan-100 to-blue-100',
      slug: 'daily-calm-rituals',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'emotional-intelligence-modern-life',
      title: 'Emotional Intelligence for Modern Life',
      description: 'Learn why emotional intelligence is more important than ever for managing modern stress.',
      gradient: 'from-indigo-400 via-blue-400 to-purple-400',
      imageGradient: 'from-indigo-100 via-blue-100 to-purple-100',
      slug: 'emotional-intelligence-modern-life',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'anxiety-unsupported',
      title: 'You\'re Not Anxious. You\'re Unsupported.',
      description: 'Understanding that anxiety often stems from emotional isolation and how 8 minutes a day of support can help.',
      gradient: 'from-slate-400 via-teal-400 to-cyan-400',
      imageGradient: 'from-slate-100 via-teal-100 to-cyan-100',
      slug: 'anxiety-unsupported',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&q=80&auto=format'
    },
    {
      id: 'science-of-calm',
      title: 'The Science of Calm: Understanding Your Nervous System',
      description: 'A comprehensive guide to how your nervous system works and practical ways to find calm.',
      gradient: 'from-blue-400 via-indigo-400 to-purple-400',
      imageGradient: 'from-blue-100 via-indigo-100 to-purple-100',
      slug: 'science-of-calm',
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop&q=80&auto=format'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-emerald-50">
      {/* Header Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100/50' : 'bg-transparent'
        }`}>
        <nav className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 relative">
        <Image
                  src="/moodwiser.jpeg"
                  alt="Moodwiser Logo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
          priority
        />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-sky-400 via-slate-400 to-emerald-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                Moodwiser
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`${getNavButtonClass('home')} cursor-pointer`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className={`${getNavButtonClass('products')} cursor-pointer`}
              >
                Calm Pick
              </button>
              <Link
                href="/program"
                className="transition-all duration-200 font-medium relative px-4 py-2 rounded-full text-gray-700 hover:text-slate-900 hover:bg-white/80 hover:shadow-sm cursor-pointer"
              >
                Program
              </Link>
              <button
                onClick={() => scrollToSection('blogs')}
                className={`${getNavButtonClass('blogs')} cursor-pointer`}
              >
                Blogs
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`${getNavButtonClass('about')} cursor-pointer`}
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`${getNavButtonClass('contact')} cursor-pointer`}
              >
                Contact Us
              </button>
              
              {/* User Menu */}
              {user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-slate-100 hover:from-sky-200 hover:to-slate-200 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-slate-400 flex items-center justify-center text-white font-bold text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.email?.split('@')[0]}</span>
                    {hasPaidAccess && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">✓ Paid</span>
                    )}
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user.email}</p>
                        {hasPaidAccess ? (
                          <p className="text-xs text-green-600 mt-1">✓ Program Access</p>
                        ) : (
                          <p className="text-xs text-gray-500 mt-1">No active subscription</p>
                        )}
                      </div>
                      {hasPaidAccess && (
                        <Link
                          href="/course"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setShowUserMenu(false)}
                        >
                          🎓 Access Course
                        </Link>
                      )}
                      <button
                        onClick={async () => {
                          await signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-slate-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="p-3 rounded-full bg-white/80 shadow-md border border-slate-200 text-gray-700 cursor-pointer active:scale-95 transition-all"
                aria-label="Open navigation"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile navigation drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-lg">
          <nav className="px-6 py-4 space-y-2">
            <button
              onClick={() => {
                scrollToSection('home');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-xl text-slate-800 font-medium hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection('products');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-xl text-slate-800 font-medium hover:bg-slate-50"
            >
              Calm Pick
            </button>
            <Link
              href="/program"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full px-4 py-2 rounded-xl text-slate-800 font-medium hover:bg-slate-50"
            >
              Program
            </Link>
            <button
              onClick={() => {
                scrollToSection('blogs');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-xl text-slate-800 font-medium hover:bg-slate-50"
            >
              Blogs
            </button>
            <button
              onClick={() => {
                scrollToSection('about');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-xl text-slate-800 font-medium hover:bg-slate-50"
            >
              About Us
            </button>
            <button
              onClick={() => {
                scrollToSection('contact');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-xl text-slate-800 font-medium hover:bg-slate-50"
            >
              Contact Us
            </button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="pt-24 pb-20 px-6 relative overflow-hidden min-h-[80vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://media.istockphoto.com/id/509111694/photo/sea-to-sky-highway-or-highway-99.jpg?b=1&s=1024x1024&w=0&k=20&c=PYruydjDzULoHogYevacKxaFTdpcw8c0dsrCTz1uwRU=")',
        }}
      >
        {/* Soft overlay: keep text readable but let the lake/mountains show strongly */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] gap-16 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left space-y-5 fade-in max-w-xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/70">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </span>
                <span className="text-[11px] md:text-xs font-semibold text-slate-600 tracking-[0.2em] uppercase">
                  Emotions Are Wisdom
                </span>
              </div>

              <h1 className="font-extrabold leading-[1.08] tracking-tight text-slate-900">
                <span className="block mb-1 text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px]">
                  Emotions Are Wisdom.
                </span>
                <span className="block text-[26px] sm:text-[32px] md:text-[36px] lg:text-[42px] bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  Understand Your Anxiety Instead of Fighting It.
                </span>
          </h1>

              <p className="text-[13px] sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Stop fighting anxiety. MoodWiser helps you understand emotions, calm your mind, and build emotional clarity in just 8 minutes a day.
              </p>

              <p className="text-[12px] sm:text-[13px] md:text-sm text-slate-700 leading-relaxed font-medium">
                MoodWiser is a daily emotional wellness app designed to help you calm your nervous system, reduce overthinking, and respond with clarity—one moment at a time.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 fade-in-delay lg:ml-0 pt-4">
                <Link
                  href="/program"
                  className="group relative flex items-center gap-3.5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-7 py-4.5 rounded-2xl hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-[260px] h-[76px] justify-center cursor-pointer overflow-hidden border border-slate-700/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>
                  <span className="text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">🎓</span>
                  <div className="text-left relative z-10">
                    <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-slate-300/90 leading-tight mb-0.5 whitespace-nowrap">Start Journey</div>
                    <div className="text-[15px] font-bold leading-tight text-white whitespace-nowrap">21-Day Program</div>
                  </div>
                </Link>
                <a
                  href="https://apps.apple.com/pk/app/moodwiser/id6755422630"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3.5 bg-white text-slate-900 border-2 border-slate-200/80 px-7 py-4.5 rounded-2xl hover:border-slate-300 hover:bg-slate-50/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-[260px] h-[76px] justify-center cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-7 h-7 text-black relative z-10 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left relative z-10">
                    <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-slate-500 leading-tight mb-0.5 whitespace-nowrap">Download on</div>
                    <div className="text-[15px] font-bold leading-tight text-slate-900 whitespace-nowrap">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.moodwiser.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3.5 bg-white text-slate-900 border-2 border-slate-200/80 px-7 py-4.5 rounded-2xl hover:border-slate-300 hover:bg-slate-50/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-[260px] h-[76px] justify-center cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#4285F4" />
                    <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#34A853" />
                    <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.19 15.22L14.54 12.85L17.19 10.47L20.16 10.81Z" fill="#FBBC04" />
                    <path d="M16.81 8.88L14.54 11.15L6.05 2.66L16.81 8.88Z" fill="#EA4335" />
                  </svg>
                  <div className="text-left relative z-10">
                    <div className="text-[10px] uppercase tracking-[0.08em] font-bold text-slate-500 leading-tight mb-0.5 whitespace-nowrap">Get it on</div>
                    <div className="text-[15px] font-bold leading-tight text-slate-900 whitespace-nowrap">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right column left intentionally light/empty so background image breathes */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Experience MoodWiser Section - Dark Premium Theme */}
      <section className="py-32 px-6 bg-gradient-to-b from-sky-950 via-slate-950 to-slate-900 relative overflow-hidden text-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-24 fade-in-on-scroll">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-200 to-teal-200">
              Experience MoodWiser
            </h2>

            {/* Emotional Story / Manifesto */}
            <div className="max-w-3xl mx-auto space-y-8 font-light leading-relaxed text-slate-300 text-base md:text-base">
              <p>
                We live in a world that never seems to slow&nbsp;down.
              </p>
              <p>
                Every scroll. Every notification.
              </p>
              <p>
                Every moment is pulling at your attention.
              </p>
              <p className="font-medium text-white border-l-4 border-indigo-500 pl-6 my-8">
                MoodWiser was created for those moments when you pause —
              </p>
              <p className="font-medium text-white border-l-4 border-indigo-500 pl-6">
                to breathe, notice, and understand what you're actually feeling.
              </p>
              <p>
                Return to calm—on your own terms.
              </p>
              <p className="block mt-4 text-sky-200 italic font-normal">
                No pressure. No judgment. Just clarity.
              </p>
            </div>
          </div>

          <div className="space-y-32">
            {/* Feature 1: Track Your Mood */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative group perspective-1000 flex justify-center">
                {/* Shrink primary dashboard phone mockup to match others */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-4 border border-white/10 shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-2 group-hover:scale-105 max-w-[220px] w-full">
                  <div className="relative h-[360px] w-full bg-slate-950 rounded-[2rem] overflow-hidden border-[6px] border-slate-900 shadow-inner">
                    <Image
                      src="/app-dashboard-hd.png"
                      alt="Mood Tracking Interface"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-[7.8%] left-[7.5%] bg-white px-2 py-1 z-10 rounded-sm">
                      <span className="text-[#3B82F6] font-[600] text-[1rem] tracking-tight">MoodWiser</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 text-left space-y-8 fade-in-on-scroll">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-200 text-sm font-bold uppercase tracking-wider">
                  <span>📊</span>
                  <span>Insightful Tracking</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Track Your Mood</h3>
                <p className="text-base text-slate-300 leading-relaxed font-light">
                  Understand your emotional patterns with our intuitive mood tracker. Log your feelings, identify triggers, and see your progress over time with beautiful visualizations.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    'Daily mood logging with detailed emotions',
                    'Identify triggers and patterns',
                    'Visualize your emotional journey'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-base text-slate-200">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-300">
                        ✓
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 2: View Insights & Activities */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="text-left space-y-8 fade-in-on-scroll">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/20 rounded-full border border-teal-500/30 text-teal-200 text-sm font-bold uppercase tracking-wider">
                  <span>🧘</span>
                  <span>Calming Tools</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Quick Activities</h3>
                <p className="text-base text-slate-300 leading-relaxed font-light">
                  Access a library of quick tools to calm your mind and body. From breathing exercises to relaxing games, find what works best for you in moments of stress.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    'Instant breathing exercises',
                    'Relaxing mini-games',
                    'Guided reflection and journaling'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-base text-slate-200">
                      <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-300">
                        ✓
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative group perspective-1000 flex justify-center">
                {/* Shrink feature phone mockup ~2x */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-4 border border-white/10 shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-2 group-hover:scale-105 max-w-[220px] w-full">
                  <div className="relative h-[360px] w-full bg-slate-950 rounded-[2rem] overflow-hidden border-[6px] border-slate-900 shadow-inner">
                    <Image
                      src="/mobile-activities.png"
                      alt="Activities Interface"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Library */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative group perspective-1000 flex justify-center">
                {/* Shrink library phone mockup ~2x */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-4 border border-white/10 shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-2 group-hover:scale-105 max-w-[220px] w-full">
                  <div className="relative h-[360px] w-full bg-slate-950 rounded-[2rem] overflow-hidden border-[6px] border-slate-900 shadow-inner">
                    <Image
                      src="/mobile-library.png"
                      alt="Resource Library Interface"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 text-left space-y-8 fade-in-on-scroll">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/20 rounded-full border border-sky-500/30 text-sky-200 text-sm font-bold uppercase tracking-wider">
                  <span>📚</span>
                  <span>Knowledge Hub</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white">Growth Library</h3>
                <p className="text-base text-slate-300 leading-relaxed font-light">
                  Explore our comprehensive collection of guides, workbooks, and resources designed to support your emotional journey and personal growth.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    'Expert-curated guides on anxiety & stress',
                    'Interactive workbooks for self-reflection',
                    'Daily learning and growth paths'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-base text-slate-200">
                      <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-300">
                        ✓
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* New Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              { title: 'AI Stress Companion', icon: '🤖', desc: 'Chat with our empathetic AI to instantly release stress and find clarity.', color: 'from-indigo-500/20 to-emerald-500/20' },
              { title: 'Calm Points', icon: '💎', desc: 'Earn rewards for taking care of your mental health.', color: 'from-sky-500/20 to-teal-500/20' },
              { title: 'Daily Streak', icon: '🔥', desc: 'Build lasting habits with our motivating streak system.', color: 'from-orange-500/20 to-red-500/20' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden max-w-[320px] mx-auto`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                  <p className="text-slate-300 text-base leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section >

      {/* Ready to Start Journey Section - Comparison Layout */}
      <section className="py-8 px-4 bg-slate-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] -z-10"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 tracking-tight">
              Choose Your Path to Calm
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Whether you need a deep emotional reset or daily maintenance, we have the right tool for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Option 1: The Program - Premium Highlight */}
            <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-md shadow-indigo-100/60 flex flex-col relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-[10px] font-semibold px-3 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-md">Recommended for Change</div>

              {/* Gradient Header BG */}
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-50/60 to-transparent -z-10"></div>

              <div className="mb-3 text-center relative">
                <div className="w-12 h-12 mx-auto rounded-3xl bg-white shadow-md shadow-indigo-100 flex items-center justify-center text-xl mb-2 text-indigo-600 border border-indigo-50 group-hover:scale-110 transition-transform duration-500">🎓</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">21-Day Program</h3>
                <p className="text-indigo-600 font-semibold tracking-wide uppercase text-xs">Deep Emotional Reset</p>
              </div>

              <ul className="space-y-1.5 mb-3 flex-1 px-1">
                {[
                  { t: "Step-by-step 3 week course", d: "Structured daily guidance." },
                  { t: "Heal the root cause", d: "Understand why you feel this way." },
                  { t: "Trauma & Trigger work", d: "Resolve past emotional wounds." },
                  { t: "Build Unshakeable Choice", d: "Stop seeking external validation." },
                  { t: "Master Relationships", d: "Set boundaries without guilt." },
                  { t: "Permanent Mindset Shift", d: "Rewire how you respond to stress." },
                  { t: "Lifetime Access", d: "Revisit the content forever." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 text-[11px] font-bold">✓</div>
                    <div>
                      <span className="block text-slate-800 font-semibold text-[13px] leading-snug">{item.t}</span>
                      <span className="block text-slate-500 text-xs mt-1">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/program"
                className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-slate-300/40 transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                <span className="relative">Start Program • $27 one-time</span>
                <span className="relative group-hover/btn:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Option 2: The App */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-md shadow-slate-200/60 flex flex-col relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-50/80 to-transparent -z-10"></div>

              <div className="mb-3 text-center relative">
                <div className="w-12 h-12 mx-auto rounded-3xl bg-white shadow-md shadow-slate-100 flex items-center justify-center text-xl mb-2 text-slate-600 border border-slate-50 group-hover:scale-110 transition-transform duration-500">📱</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">MoodWiser App</h3>
                <p className="text-slate-500 font-semibold tracking-wide uppercase text-xs">Daily Maintenance</p>
              </div>

              <ul className="space-y-1.5 mb-3 flex-1 px-1">
                {[
                  { t: "Panic Button Relief", d: "Instant calm in < 2 minutes." },
                  { t: "Daily Mood Tracking", d: "See your emotional patterns." },
                  { t: "Sleep Stories & Sounds", d: "Drift off effortlessly." },
                  { t: "Guided Meditations", d: "For anxiety, focus, and sleep." },
                  { t: "Journaling Prompts", d: "Get thoughts out of your head." },
                  { t: "Breathing Exercises", d: "Regulate your nervous system." },
                  { t: "Pocket Companion", d: "Support wherever you go." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 text-[11px] font-bold">✓</div>
                    <div>
                      <span className="block text-slate-800 font-semibold text-[13px] leading-snug">{item.t}</span>
                      <span className="block text-slate-500 text-xs mt-1">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <a
                  href="https://apps.apple.com/pk/app/moodwiser/id6755422630"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-black text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:opacity-80 transition-opacity shadow-md"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span>App Store ($11/mo)</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.moodwiser.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-slate-900 border border-slate-200 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#4285F4" />
                    <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#34A853" />
                    <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.19 15.22L14.54 12.85L17.19 10.47L20.16 10.81Z" fill="#FBBC04" />
                    <path d="M16.81 8.88L14.54 11.15L6.05 2.66L16.81 8.88Z" fill="#EA4335" />
                  </svg>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-gradient-to-b from-white via-slate-50/20 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12 fade-in-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-sky-400 via-slate-400 to-emerald-500 bg-clip-text text-transparent">
              Stories of Transformation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'Software Engineer',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80&auto=format',
                text: 'Moodwiser helped me understand my anxiety patterns. The daily check-ins became my anchor in chaotic days.',
                rating: 5
              },
              {
                name: 'Marcus Johnson',
                role: 'Teacher',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80&auto=format',
                text: 'I never realized how much stress I was carrying. The insights feature opened my eyes to what truly affects my mood.',
                rating: 5
              },
              {
                name: 'Emma Rodriguez',
                role: 'Student',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80&auto=format',
                text: 'The breathing exercises and calm games are my go-to when I feel overwhelmed. This app changed my life.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-glow transition-all duration-500 transform hover:-translate-y-3 fade-in-on-scroll border border-gray-100/50 relative overflow-hidden group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-200 to-slate-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-sky-100 shadow-lg group-hover:ring-sky-200 transition-all duration-300">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl drop-shadow-sm">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic text-base">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calm Picks Section */}
      <section id="products" className="py-20 px-6 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 fade-in-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-slate-400 bg-clip-text text-transparent">
              Calm Pick
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Hand-picked tools we genuinely love for nervous system calm and emotional reset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calm Pick 1: Weighted Cuddle Pillow */}
            <a
              href="https://www.onequietmind.com/products/original-weighted-pillow?ref=justine_sinclair"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 fade-in-on-scroll border border-gray-100/70 cursor-pointer"
            >
              <div className="h-72 relative overflow-hidden">
                <Image
                  src="/PHOTO-2026-01-26-16-23-49.jpg"
                  alt="Weighted Cuddle Pillow"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 text-xs font-semibold text-slate-700 shadow-sm">
                  Calm Tool
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-slate-600 group-hover:bg-clip-text transition-all duration-300">
                  Weighted Cuddle Pillow
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A weighted hug you can actually hold. Helps calm the nervous system and create a sense of safety.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    <span className="text-sm">🌿</span> Nervous System Calm
                  </span>
                  <span className="text-sm font-semibold text-sky-600 flex items-center gap-1">
                    View Calm Pick
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            {/* Calm Pick 2: YCZ Cologne */}
            <a
              href="https://www.yczfragrance.com/?source=aw&utm_source=awin&awc=121156_1769504294_4d042b0488b23085ea4616f976cd87d5"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 fade-in-on-scroll border border-gray-100/70 cursor-pointer"
            >
              <div className="h-72 relative overflow-hidden">
                <Image
                  src="/PHOTO-2026-01-26-16-24-00.jpg"
                  alt="YCZ Cologne"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/10 to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 text-xs font-semibold text-slate-700 shadow-sm">
                  Calm Ritual
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-slate-600 group-hover:bg-clip-text transition-all duration-300">
                  YCZ Cologne
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  One spray, one breath, instant reset. A grounding scent ritual to mark the moment you choose calm.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <span className="text-sm">💨</span> Scent Reset
                  </span>
                  <span className="text-sm font-semibold text-sky-600 flex items-center gap-1">
                    View Calm Pick
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose MoodWiser Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50/80 via-sky-50/80 to-emerald-50/80 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop&q=80&auto=format"
            alt="Peaceful nature"
            fill
            className="object-cover opacity-5"
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-400 via-sky-400 to-emerald-500 bg-clip-text text-transparent">
              Why Choose MoodWiser?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A holistic approach to emotional wellness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Science-Backed',
                description: 'Every feature is built on neuroscience and psychology research',
                icon: '🔬',
                gradient: 'from-blue-400 to-cyan-400'
              },
              {
                title: 'Always Available',
                description: '24/7 support through AI companion and community',
                icon: '🤝',
                gradient: 'from-slate-400 to-teal-400'
              },
              {
                title: 'Privacy First',
                description: 'Your data is encrypted and never shared',
                icon: '🔒',
                gradient: 'from-purple-400 to-pink-400'
              },
              {
                title: 'Beautiful Design',
                description: 'Calming interface designed to reduce stress, not add to it',
                icon: '✨',
                gradient: 'from-sky-400 to-blue-400'
              },
              {
                title: 'Personalized',
                description: 'AI learns your patterns and adapts to your needs',
                icon: '🎯',
                gradient: 'from-pink-400 to-rose-400'
              },
              {
                title: 'Community Support',
                description: 'Connect with others on similar wellness journeys',
                icon: '💙',
                gradient: 'from-teal-400 to-slate-400'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-glow transition-all duration-500 transform hover:-translate-y-3 fade-in-on-scroll border border-gray-100/50 relative overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-4xl mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-slate-600 group-hover:bg-clip-text transition-all duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-white via-slate-50/10 to-white relative overflow-hidden">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12 fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-400 to-emerald-500 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <p className="text-lg text-gray-700">
              Or email us directly at:{' '}
              <a href="mailto:app@moodwiser.com" className="text-slate-600 hover:text-slate-700 font-semibold transition-colors cursor-pointer">
                app@moodwiser.com
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl fade-in-on-scroll border border-gray-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-200 to-slate-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-sky-400 focus:outline-none transition-colors duration-200 bg-gray-50 text-lg"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:outline-none transition-colors duration-200 bg-gray-50 text-lg"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-3 text-lg">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors duration-200 bg-gray-50 resize-none text-lg"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-400 via-slate-400 to-emerald-500 text-white font-bold py-6 rounded-xl hover:from-sky-500 hover:via-slate-500 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* About Us Section - Moved to End */}
      <section id="about" className="py-20 px-6 bg-gradient-to-b from-white via-sky-50/30 to-slate-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20 fade-in-on-scroll">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-500 via-sky-400 to-slate-400 bg-clip-text text-transparent">
              About Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering your emotional wellness journey with innovative technology and compassionate design
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-12 shadow-2xl fade-in-on-scroll border border-gray-100/50 hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-sky-200 to-slate-200 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-400 to-slate-400 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-slate-600 group-hover:bg-clip-text transition-all duration-300">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                  At Moodwiser, we believe in the power of mindfulness and emotional wellness. Our mission is to help you find balance, peace, and happiness in your daily life through innovative technology and thoughtful design.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We understand that mental health is not a destination, but a journey. That's why we've created tools that grow with you, adapt to your needs, and support you every step of the way.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-12 shadow-2xl fade-in-on-scroll border border-gray-100/50 hover:shadow-glow-purple transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-4xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-500 group-hover:bg-clip-text transition-all duration-300">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                  We envision a world where emotional wellness is accessible to everyone, where technology serves humanity's deepest needs, and where people feel empowered to understand and manage their mental health.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Through cutting-edge app development and serene, nature-inspired products, we're building a holistic ecosystem that supports your well-being from every angle.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl fade-in-on-scroll border border-gray-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-200 to-slate-200 rounded-full blur-3xl opacity-10"></div>
            <div className="relative z-10">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Makes Us Different</h3>

                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-slate-100 flex items-center justify-center">
                      <span className="text-xl">🧠</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Science-Backed Approach</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Every feature in Moodwiser is built on research from neuroscience, psychology, and behavioral science. We don't just track your mood—we help you understand the patterns and triggers that affect your emotional well-being.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <span className="text-xl">💚</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Compassionate Design</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We know that dealing with anxiety and stress can be overwhelming. That's why every interaction with Moodwiser is designed to be gentle, supportive, and non-judgmental. You're not broken—you're human, and we're here to help.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-teal-100 flex items-center justify-center">
                      <span className="text-xl">🌱</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Holistic Wellness</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We combine cutting-edge app development with serene, nature-inspired products to create a complete wellness ecosystem. From daily mood tracking to calming products, every element is designed with your mental health and tranquility in mind.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                      <span className="text-xl">🤝</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Community & Support</h4>
                      <p className="text-gray-600 leading-relaxed">
                        You're not alone on this journey. Moodwiser connects you with a community of people who understand what you're going through. Our AI companion is always available to provide personalized support, guidance, and encouragement when you need it most.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-200">
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    <span className="font-semibold text-gray-800">Our Promise:</span> We're committed to creating tools that don't just manage symptoms, but help you build lasting emotional resilience. Every feature, every product, every interaction is crafted with one goal in mind—helping you find your inner peace and live your best life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {
        showToast && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up-toast">
            <div className="bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-slate-400 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Launching Soon!</p>
                <p className="text-sm text-gray-600">This product will be available soon. Stay tuned!</p>
              </div>
            </div>
          </div>
        )
      }

      {/* Blogs Section - Moved to Bottom */}
      <section id="blogs" className="py-20 px-6 bg-gradient-to-b from-white via-sky-50/10 to-white relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-500 via-sky-400 to-slate-400 bg-clip-text text-transparent">
              Blogs
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Explore our collection of calming insights, ancient wisdom, and modern wellness practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Show only latest 6 blogs on homepage - can easily scale to 100-1000+ with pagination */}
            {blogs.slice(0, 6).map((blog, index) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-glow transition-all duration-500 transform hover:-translate-y-4 fade-in-on-scroll border border-gray-100/50 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Blog Image */}
                <div className="h-72 relative overflow-hidden bg-gray-100">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-115 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient Overlay - Reduced opacity for better image visibility */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-15 group-hover:opacity-8 transition-opacity duration-500`}></div>
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-24 h-24 bg-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 w-20 h-20 bg-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xl">📖</span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-slate-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 min-h-[3.5rem]">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-base mb-8 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                  <div className="flex items-center text-sky-500 font-bold text-base group-hover:text-sky-600 transition-colors">
                    Read More
                    <svg className="w-6 h-6 ml-2 transform group-hover:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Note: This structure can easily handle 100-1000+ blogs with pagination */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Company Bio */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl hover:scale-110 transition-transform duration-300 relative">
            <Image
                    src="/moodwiser.jpeg"
                    alt="Moodwiser Logo"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-slate-400 to-emerald-500 bg-clip-text text-transparent animate-gradient">
                  Moodwiser
                </div>
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                Your companion for mindfulness and emotional wellness. We help you find balance, peace, and happiness through innovative technology and thoughtful design.
              </p>
              <p className="text-gray-400 text-base italic font-light">
                "Where Emotions Meet Wisdom"
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-6 text-xl">Quick Links</h3>
              <div className="flex flex-col space-y-3">
                <a href="#home" className="text-gray-300 hover:text-sky-400 transition-all duration-300 text-base font-medium hover:translate-x-2 transform inline-block cursor-pointer">Home</a>
                <a href="#products" className="text-gray-300 hover:text-slate-400 transition-all duration-300 text-base font-medium hover:translate-x-2 transform inline-block cursor-pointer">Calm Pick</a>
                <a href="#blogs" className="text-gray-300 hover:text-purple-400 transition-all duration-300 text-base font-medium hover:translate-x-2 transform inline-block cursor-pointer">Blogs</a>
                <a href="#about" className="text-gray-300 hover:text-sky-400 transition-all duration-300 text-base font-medium hover:translate-x-2 transform inline-block cursor-pointer">About Us</a>
                <a href="#contact" className="text-gray-300 hover:text-slate-400 transition-all duration-300 text-base font-medium hover:translate-x-2 transform inline-block cursor-pointer">Contact Us</a>
              </div>
            </div>

            {/* Legal & Social */}
            <div>
              <h3 className="text-white font-bold mb-6 text-xl">Connect</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <a href="https://www.instagram.com/moodwiserapp" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer" aria-label="Instagram - MoodWiser App">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/wealthxspire" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer" aria-label="Instagram - WealthXSpire">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@moodwiser" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer" aria-label="TikTok">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/justine-sinclair-a8387315b/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer" aria-label="LinkedIn">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/moodwiser/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer" aria-label="Facebook">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Email us:</p>
                <a href="mailto:app@moodwiser.com" className="text-sky-400 hover:text-sky-300 transition-colors duration-200 text-base font-medium cursor-pointer">app@moodwiser.com</a>
              </div>
              <div className="flex flex-col space-y-3">
                <a href="#" className="text-gray-300 hover:text-sky-400 transition-all duration-300 text-base font-medium hover:translate-x-2 transform inline-block cursor-pointer">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-slate-400 transition-all duration-300 text-base font-medium hover:translate-x-2 transform inline-block cursor-pointer">Terms & Conditions</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-all duration-300 text-base font-medium hover:translate-x-2 transform inline-block cursor-pointer">Support</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700/50 pt-10 text-center">
            <p className="text-gray-400 text-base">© 2024 Moodwiser. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-2">Made with ❤️ for your emotional wellness</p>
          </div>
        </div>
      </footer>
    </div >
  );
}

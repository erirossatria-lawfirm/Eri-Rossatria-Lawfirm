/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useForm, ValidationError } from '@formspree/react';
import { motion, useScroll, useTransform } from "motion/react";
import React, { useState, useEffect } from "react";
import { translations } from "./translations";
import { 
  Scale, 
  Shield, 
  Users, 
  FileText, 
  Briefcase, 
  Gavel, 
  HeartHandshake, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Menu,
  X
} from "lucide-react";

const SectionHeading = ({ children, light = false, subtitle = "" }: { children: React.ReactNode, light?: boolean, subtitle?: string }) => (
  <div className="mb-16 text-center">
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-sm uppercase tracking-[0.3em] mb-4 font-sans font-semibold ${light ? 'text-gold/80' : 'text-gold'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-5xl font-serif ${light ? 'text-white' : 'text-navy'}`}
    >
      {children}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "80px" }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="h-px bg-gold mx-auto mt-8"
    />
  </div>
);

const Nav = ({ lang, setLang }: { lang: 'id' | 'en', setLang: (l: 'id' | 'en') => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: "#home" },
    { name: t.about, href: "#about" },
    { name: t.practice, href: "#practice" },
    { name: t.trackRecord, href: "#track-record" },
    { name: t.transparency, href: "#transparency" },
    { name: "Artikel", href: "/edukasi/bisnis-korporasi" }, // INI YANG DITAMBAHKAN
    { name: t.contact, href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-navy/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-serif text-white tracking-tight">ERI ROSSATRIA</span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-sans font-semibold">Law Firm</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-widest text-white/80 hover:text-gold transition-colors font-sans font-medium"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center space-x-2 border-l border-white/20 pl-8 ml-4">
            <button 
              onClick={() => setLang('id')}
              className={`text-[10px] font-bold tracking-widest transition-colors ${lang === 'id' ? 'text-gold' : 'text-white/40 hover:text-white'}`}
            >
              ID
            </button>
            <span className="text-white/20 text-[10px]">/</span>
            <button 
              onClick={() => setLang('en')}
              className={`text-[10px] font-bold tracking-widest transition-colors ${lang === 'en' ? 'text-gold' : 'text-white/40 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <button className="bg-gold text-navy px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-all duration-300">
            {t.consultation}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-navy border-t border-white/10 p-6 flex flex-col space-y-4"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-white hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex space-x-4 pt-4 border-t border-white/10">
            <button onClick={() => { setLang('id'); setIsMobileMenuOpen(false); }} className={`text-xs font-bold ${lang === 'id' ? 'text-gold' : 'text-white/40'}`}>INDONESIA</button>
            <button onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }} className={`text-xs font-bold ${lang === 'en' ? 'text-gold' : 'text-white/40'}`}>ENGLISH</button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  // Hook Formspree dipasang di sini
  const [state, handleSubmit] = useForm('xlgawjnv');

  return (
    <div className="min-h-screen selection:bg-gold selection:text-navy">
      <Nav lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-navy">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-navy/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
            alt="Legal Authority" 
            className="w-full h-full object-cover grayscale opacity-40"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
              Eri Rossatria <br />
              <span className="serif-italic text-gold">Law Firm</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 font-sans font-light leading-relaxed">
              {t.hero.tagline}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="bg-gold text-navy px-10 py-4 text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-500 shadow-2xl">
                {t.hero.cta}
              </button>
              <button className="text-white border border-white/30 px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-all duration-500">
                {t.hero.trackRecord}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Our Heritage Section */}
      <section id="about" className="py-24 md:py-32 bg-champagne relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-6">{t.heritage.subtitle}</p>
              <h2 className="text-4xl md:text-5xl font-serif text-navy mb-8 leading-tight">
                {t.heritage.title} <br />
                <span className="serif-italic">{t.heritage.titleItalic}</span>
              </h2>
              <div className="space-y-6 text-navy/80 font-sans leading-relaxed text-lg">
                <p>{t.heritage.p1}</p>
                <p className="font-medium text-navy">{t.heritage.p2}</p>
                <p>{t.heritage.p3}</p>
                <p>{t.heritage.p4}</p>
              </div>
              <div className="mt-12 flex items-center space-x-8">
                <div>
                  <p className="text-4xl font-serif text-gold">20+</p>
                  <p className="text-xs uppercase tracking-widest text-navy/60 font-bold">{t.heritage.years}</p>
                </div>
                <div className="w-px h-12 bg-navy/10" />
                <div>
                  <p className="text-4xl font-serif text-gold">1200+</p>
                  <p className="text-xs uppercase tracking-widest text-navy/60 font-bold">{t.heritage.workers}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden shadow-2xl border-[12px] border-white">
                <img 
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1000" 
                  alt="Heritage" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-navy p-8 text-white shadow-2xl hidden md:block">
                <p className="font-serif text-2xl mb-2">DR. (c) ERI ROSSATRIA AZ, S.H,, M.H.</p>
                <p className="text-gold text-xs uppercase tracking-widest font-bold">Managing Partner</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle={t.value.subtitle}>{t.value.title}</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.value.cards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-ice bg-ice/30 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                  {idx === 0 && <FileText className="text-gold" size={32} />}
                  {idx === 1 && <Shield className="text-gold" size={32} />}
                  {idx === 2 && <Users className="text-gold" size={32} />}
                  {idx === 3 && <Scale className="text-gold" size={32} />}
                </div>
                <h3 className="text-xl font-serif text-navy mb-4">{item.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice" className="py-24 md:py-32 bg-ice">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle={t.practice.subtitle}>{t.practice.title}</SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-12">
            {t.practice.areas.map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 shadow-sm hover:shadow-xl transition-all duration-500 border-l-4 border-gold"
              >
                <h3 className="text-2xl font-serif text-navy mb-4">{area.title}</h3>
                <p className="text-navy/60 mb-8 leading-relaxed">{area.desc}</p>
                <div className="pl-6 border-l border-gold/30 italic text-navy/40 text-sm">
                  "{area.quote}"
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Highlights */}
      <section id="track-record" className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle={t.trackRecord.subtitle}>{t.trackRecord.title}</SectionHeading>
          
          <div className="space-y-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-serif text-navy mb-6">{t.trackRecord.corpTitle}</h3>
                <ul className="space-y-6">
                  {t.trackRecord.corpItems.map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="mt-1 text-gold"><ChevronRight size={20} /></div>
                      <div>
                        <p className="font-bold text-navy">{item.name}</p>
                        <p className="text-sm text-navy/60">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-navy p-12 text-white relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />
                <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">{t.trackRecord.winTitle}</h4>
                <p className="text-4xl font-serif mb-6 italic">"{t.trackRecord.winLabel}"</p>
                <p className="text-white/70 leading-relaxed mb-8">
                  {t.trackRecord.winDesc}
                </p>
                <div className="h-px bg-white/10 w-full mb-8" />
                <p className="text-sm text-gold font-medium uppercase tracking-widest">{t.trackRecord.winFooter}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Fees */}
      <section id="transparency" className="py-24 md:py-32 bg-champagne">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle={t.transparency.subtitle}>{t.transparency.title}</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.transparency.plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 shadow-xl border border-gold/10 flex flex-col"
              >
                <p className="text-gold text-xs uppercase tracking-widest font-bold mb-2">{plan.type}</p>
                <h3 className="text-2xl font-serif text-navy mb-6">{plan.title}</h3>
                <p className="text-navy/60 text-sm mb-8 leading-relaxed flex-grow">{plan.desc}</p>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center text-xs text-navy/80 font-medium">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full mr-3" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 border border-navy text-navy text-xs uppercase tracking-widest font-bold hover:bg-navy hover:text-white transition-all duration-300">
                  {t.transparency.learnMore}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-6">{t.contact.subtitle}</p>
              <h2 className="text-4xl md:text-5xl font-serif text-navy mb-8">
                {t.contact.title} <br />
                <span className="serif-italic">{t.contact.titleItalic}</span>
              </h2>
              <p className="text-navy/60 mb-12 leading-relaxed">
                {t.contact.desc}
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-ice flex items-center justify-center text-gold shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-navy mb-1">{t.contact.office1}</p>
                    <p className="text-sm text-navy/60">Jalan Kemanggisan Raya No. 1 - Jakarta Barat</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-ice flex items-center justify-center text-gold shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-navy mb-1">WhatsApp</p>
                    <p className="text-sm text-navy/60">0811 8892 378 / 0811 1005 129</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-ice flex items-center justify-center text-gold shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-navy mb-1">Email</p>
                    <p className="text-sm text-navy/60">erirossatria.lawfirm@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-ice flex items-center justify-center text-gold shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-navy mb-1">{t.contact.hours}</p>
                    <p className="text-sm text-navy/60">{t.contact.monFri}</p>
                    <p className="text-sm text-navy/60">{t.contact.sat}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-ice p-12 shadow-2xl"
            >
              {/* === LOGIKA FORMSPREE DIMULAI DI SINI === */}
              {state.succeeded ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HeartHandshake className="text-gold" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-navy mb-4">Terima Kasih</h3>
                  <p className="text-navy/60 leading-relaxed">
                    Pesan Anda telah kami terima dengan baik. Tim Eri Rossatria Law Firm akan segera menganalisa dan menghubungi Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-navy/40">{t.contact.form.name}</label>
                      <input 
                        id="name"
                        name="name"
                        type="text" 
                        required
                        className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none" 
                        placeholder={t.contact.form.placeholderName} 
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-navy/40">{t.contact.form.email}</label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        required
                        className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none" 
                        placeholder={t.contact.form.placeholderEmail} 
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-navy/40">{t.contact.form.matter}</label>
                    <select 
                      id="matter"
                      name="matter"
                      className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none appearance-none"
                    >
                      <option value="PT PMA / Corporate Defense">PT PMA / Corporate Defense</option>
                      <option value="Labor Law">Labor Law</option>
                      <option value="Criminal / Tipikor">Criminal / Tipikor</option>
                      <option value="Family Law">Family Law</option>
                      <option value="Other">Other</option>
                    </select>
                    <ValidationError prefix="Matter" field="matter" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-navy/40">{t.contact.form.message}</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4} 
                      required
                      className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-gold outline-none resize-none" 
                      placeholder={t.contact.form.placeholderMessage}
                    ></textarea>
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  <button 
                    type="submit" 
                    disabled={state.submitting}
                    className="w-full bg-navy text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all duration-500 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? "MENGIRIM..." : t.contact.form.send}
                  </button>
                </form>
              )}
              {/* === LOGIKA FORMSPREE SELESAI === */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy pt-24 pb-12 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-8 max-w-4xl mx-auto leading-tight">
                {t.footer.quote}
              </h2>
              <div className="w-24 h-px bg-gold mx-auto mb-8" />
              <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold">Eri Rossatria Law Firm</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-12 border-t border-white/10 pt-12 mb-12">
            <div className="col-span-2">
              <div className="flex flex-col mb-6">
                <span className="text-2xl font-serif text-white tracking-tight">ERI ROSSATRIA</span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-sans font-semibold">Law Firm</span>
              </div>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">{t.footer.navTitle}</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#home" className="hover:text-white transition-colors">{t.nav.home}</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a></li>
                <li><a href="#practice" className="hover:text-white transition-colors">{t.nav.practice}</a></li>
                <li><a href="#track-record" className="hover:text-white transition-colors">{t.nav.trackRecord}</a></li>
                <li><a href="/edukasi/" className="hover:text-white transition-colors">Publikasi & Artikel</a></li> {/* INI YANG DITAMBAHKAN */}
              </ul>
            </div>
            <div>
              <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">{t.footer.legalTitle}</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                <li><a href="#transparency" className="hover:text-white transition-colors">{t.nav.transparency}</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-12 text-[10px] uppercase tracking-widest text-white/20 font-bold">
            <p>© 2026 Eri Rossatria Law Firm. {t.footer.rights}</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-gold transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-gold transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

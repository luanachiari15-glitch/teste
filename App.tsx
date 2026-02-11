
import React, { useState } from 'react';
import { 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Star, 
  ShieldCheck, 
  BookOpen, 
  UtensilsCrossed, 
  Calendar, 
  Heart,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { translations, Language } from './translations';

// --- Sub-components ---

const Badge = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-primaryRose/10 text-primaryRose ${className}`}>
    {children}
  </span>
);

const SectionTitle = ({ children, accent = "" }: { children?: React.ReactNode, accent?: string }) => (
  <h2 className="text-3xl md:text-5xl font-poppins font-bold leading-tight mb-6">
    {children} <span className="italic font-playfair font-black text-primaryRose block md:inline">{accent}</span>
  </h2>
);

const PainCard = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="bg-white p-8 rounded-4xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
    <div className="bg-red-50 p-4 rounded-full mb-6">
      <Icon className="w-8 h-8 text-primaryRose" />
    </div>
    <p className="text-lg font-semibold">{title}</p>
  </div>
);

const TestimonialCard = ({ name, role, text, img }: { name: string, role: string, text: string, img: string }) => (
  <div className="min-w-[300px] md:min-w-[400px] bg-white p-8 rounded-4xl shadow-lg snap-center hover:scale-[1.02] transition-transform duration-300 mx-4">
    <div className="flex items-center gap-4 mb-6">
      <img src={img} alt={name} className="w-16 h-16 rounded-full object-cover border-4 border-bgHighlight" />
      <div>
        <h4 className="font-bold text-xl">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
    </div>
    <p className="italic text-gray-600 leading-relaxed">"{text}"</p>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold group-hover:text-primaryRose transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('FR');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  const handleLangChange = (l: Language) => {
    setLang(l);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* 1️⃣ NAVBAR */}
      <nav className="sticky top-0 z-50 bg-navyDark text-white px-6 md:px-12 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primaryRose rounded-full flex items-center justify-center">
              <UtensilsCrossed className="text-white w-6 h-6" />
            </div>
            <span className="font-poppins font-bold text-lg hidden sm:block">SANS STRESS</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#programme" className="hover:text-primaryRose transition-colors">Programme</a>
            <a href="#temoignages" className="hover:text-primaryRose transition-colors">Avis</a>
            <a href="#faq" className="hover:text-primaryRose transition-colors">FAQ</a>
            
            <div className="flex items-center gap-4 border-l border-white/20 pl-8">
              <button onClick={() => setLang('FR')} className={`flex items-center gap-1 text-sm ${lang === 'FR' ? 'text-primaryRose font-bold' : 'opacity-70 hover:opacity-100'}`}>
                <span>🇫🇷</span> FR
              </button>
              <button onClick={() => setLang('PT')} className={`flex items-center gap-1 text-sm ${lang === 'PT' ? 'text-primaryRose font-bold' : 'opacity-70 hover:opacity-100'}`}>
                <span>🇧🇷</span> PT
              </button>
              <button onClick={() => setLang('EN')} className={`flex items-center gap-1 text-sm ${lang === 'EN' ? 'text-primaryRose font-bold' : 'opacity-70 hover:opacity-100'}`}>
                <span>🇺🇸</span> EN
              </button>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-navyDark p-8 md:hidden flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            <a href="#programme" onClick={() => setIsMenuOpen(false)}>Programme</a>
            <a href="#temoignages" onClick={() => setIsMenuOpen(false)}>Avis</a>
            <div className="flex gap-4">
              <button onClick={() => handleLangChange('FR')}>🇫🇷 FR</button>
              <button onClick={() => handleLangChange('PT')}>🇧🇷 PT</button>
              <button onClick={() => handleLangChange('EN')}>🇺🇸 EN</button>
            </div>
          </div>
        )}
      </nav>

      {/* 2️⃣ HERO SECTION */}
      <section className="relative px-6 pt-16 pb-24 md:pt-32 md:pb-48 bg-bgLight overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 text-center md:text-left">
            <Badge className="mb-6">{t.hero.badge}</Badge>
            <h1 className="font-poppins font-extrabold text-4xl md:text-6xl text-textPrimary leading-tight mb-4">
              {t.hero.title}
            </h1>
            <div className="font-playfair italic font-black text-6xl md:text-9xl text-primaryRose leading-none mb-8">
              {t.hero.stress}
            </div>
            <p className="text-xl md:text-2xl text-gray-600 font-medium mb-4 max-w-xl mx-auto md:mx-0">
              {t.hero.subtitle}
            </p>
            <p className="text-gray-500 mb-10 max-w-md mx-auto md:mx-0">
              {t.hero.support}
            </p>
            
            <a href="#offre" className="inline-block bg-primaryRose text-white font-bold py-5 px-8 md:px-12 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 animate-pulse-custom">
              {t.hero.cta}
            </a>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-4 text-sm font-semibold text-gray-400">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/100/100?random=${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="maman" />
                ))}
              </div>
              <span>{t.hero.social}</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-bgHighlight rounded-4xl -rotate-2 scale-105"></div>
            <img 
              src="https://picsum.photos/800/1000?baby" 
              alt="Baby eating" 
              className="relative w-full rounded-4xl shadow-2xl z-10 object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white p-4 md:p-6 rounded-3xl shadow-2xl z-20 animate-bounce delay-700">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Confiance</p>
                  <p className="font-bold">100% Sécurisé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ SECTION – LES DOULEURS */}
      <section className="bg-bgHighlight px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Réalité</Badge>
            <SectionTitle>{t.pain.title}</SectionTitle>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <PainCard icon={AlertCircle} title={t.pain.p1} />
            <PainCard icon={BookOpen} title={t.pain.p2} />
            <PainCard icon={Clock} title={t.pain.p3} />
            <PainCard icon={UtensilsCrossed} title={t.pain.p4} />
            <PainCard icon={Heart} title={t.pain.p5} />
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl md:text-2xl italic font-playfair text-gray-600 max-w-2xl mx-auto">
              "{t.pain.closure}"
            </p>
          </div>
        </div>
      </section>

      {/* 4️⃣ COMMENT LA MÉTHODE RÉSOUT CES PROBLÈMES */}
      <section className="px-6 py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://picsum.photos/700/700?baby2" className="rounded-4xl shadow-xl" alt="Baby smiling" />
          </div>
          <div>
            <SectionTitle>{t.solution.title}</SectionTitle>
            <ul className="space-y-6 mt-10">
              {[t.solution.i1, t.solution.i2, t.solution.i3, t.solution.i4, t.solution.i5].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-primaryRose/10 p-1 rounded-full">
                    <CheckCircle2 className="text-primaryRose w-6 h-6" />
                  </div>
                  <span className="text-lg font-medium text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12 p-8 bg-bgHighlight rounded-4xl border-2 border-dashed border-primaryRose/30">
              <p className="text-xl font-bold text-center">
                {t.solution.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ TÉMOIGNAGES */}
      <section id="temoignages" className="bg-bgLight py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <Badge className="mb-4">Maman & Bébé</Badge>
          <SectionTitle>Ils ont adoré la <span className="italic font-playfair">méthode</span></SectionTitle>
        </div>
        
        <div className="flex overflow-x-auto gap-8 pb-12 px-6 no-scrollbar snap-x snap-mandatory">
          <TestimonialCard 
            name="Camille" 
            role="Maman de Léo (6 mois)" 
            text="J'avais tellement peur des morceaux et des allergies. Cette método me deu a segurança que eu precisava."
            img="https://picsum.photos/200/200?women=1"
          />
          <TestimonialCard 
            name="Sophie" 
            role="Maman iniciante" 
            text="Informações claras e organizadas. Recomendo para todas as mães!"
            img="https://picsum.photos/200/200?women=2"
          />
        </div>
      </section>

      <footer className="bg-white px-6 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primaryRose rounded-full flex items-center justify-center">
              <UtensilsCrossed className="text-white w-5 h-5" />
            </div>
            <span className="font-poppins font-bold">SANS STRESS</span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} - Dr. Marie Dupont. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

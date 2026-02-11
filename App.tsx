
import React, { useState, useEffect } from 'react';
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

// Fix: Change children type to React.ReactNode and make it optional to resolve "missing children" TS errors
const Badge = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-primaryRose/10 text-primaryRose ${className}`}>
    {children}
  </span>
);

// Fix: Change children type to React.ReactNode and make it optional to allow non-string children (like spans) and resolve "missing children" TS errors
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

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('FR');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  // Language cycling for demo / selection
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

        {/* Mobile Menu */}
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
            {/* Floating Social Proof Card */}
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
            text="J'avais tellement peur des morceaux et des allergies. Cette méthode m'a donné le cadre qu'il me fallait pour me lancer avec sérénité."
            img="https://picsum.photos/200/200?women=1"
          />
          <TestimonialCard 
            name="Sophie" 
            role="Première fois" 
            text="Enfin des informations claires ! On lit tout et son contraire sur internet. Ici, tout est organisé et très pratique."
            img="https://picsum.photos/200/200?women=2"
          />
          <TestimonialCard 
            name="Laura" 
            role="Maman d'Emma (9 mois)" 
            text="Les recettes sont simples et adaptées à mon emploi du temps chargé. Ma fille adore découvrir de nouvelles saveurs."
            img="https://picsum.photos/200/200?women=3"
          />
          <TestimonialCard 
            name="Julie" 
            role="Maman de Noah (5 mois)" 
            text="Un guide indispensable. Les bonus sont géniaux, surtout le planner de menus qui me fait gagner un temps fou."
            img="https://picsum.photos/200/200?women=4"
          />
        </div>
      </section>

      {/* 6️⃣ CONTENU & CURRICULUM */}
      <section id="programme" className="px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionTitle>{t.curriculum.title}</SectionTitle>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Lado Esquerdo - Cursos */}
            <div className="bg-white p-8 md:p-12 rounded-4xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="bg-primaryRose p-2 rounded-lg"><BookOpen className="text-white w-6 h-6" /></div>
                {t.curriculum.courseTitle}
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {t.curriculum.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-bgLight rounded-2xl hover:bg-bgHighlight transition-colors">
                    <ArrowRight className="w-4 h-4 text-primaryRose flex-shrink-0" />
                    <span className="font-semibold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-dashed border-gray-200">
                <div className="flex items-center gap-3 text-primaryRose font-bold">
                  <UtensilsCrossed className="w-6 h-6" />
                  <span>👉 {t.curriculum.courseTitle}</span>
                </div>
              </div>
            </div>

            {/* Lado Direito - BONUS */}
            <div className="space-y-6">
              <div className="bg-navyDark text-white p-8 md:p-12 rounded-4xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-white text-navyDark">{t.curriculum.bonusBadge}</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Star className="text-yellow-400 w-6 h-6 fill-yellow-400" />
                  {t.curriculum.bonusTitle}
                </h3>
                <div className="space-y-6">
                  <div className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/20 transition-all cursor-default">
                    <h4 className="font-bold text-lg mb-2">🎁 {t.curriculum.bonus1}</h4>
                    <p className="text-sm opacity-70">Des infographies claires pour ne plus jamais douter sur les textures.</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/20 transition-all cursor-default">
                    <h4 className="font-bold text-lg mb-2">📅 {t.curriculum.bonus2}</h4>
                    <p className="text-sm opacity-70">Gagnez du temps chaque semaine avec des menus équilibrés déjà prêts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ OFFRE / CHECKOUT */}
      <section id="offre" className="bg-bgHighlight px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-4xl shadow-2xl p-8 md:p-16 text-center border-4 border-primaryRose">
            <Badge className="mb-6">{t.offer.title}</Badge>
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-8">{t.curriculum.courseTitle}</h2>
            
            <div className="flex flex-col items-center gap-2 mb-10">
              <span className="text-2xl text-gray-400 line-through font-semibold">{t.offer.priceFrom}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-8xl font-black text-textPrimary">{t.offer.priceTo}</span>
                <span className="text-xl font-bold text-gray-400 uppercase">Total</span>
              </div>
            </div>

            <a href="#" className="block w-full bg-primaryRose text-white font-bold py-6 px-8 rounded-full text-xl md:text-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-pulse-custom">
              {t.offer.cta}
            </a>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>{t.offer.security}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{t.offer.guarantee}</span>
              </div>
            </div>
          </div>

          {/* 8️⃣ GARANTIE */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldCheck className="w-12 h-12 text-primaryRose" />
              <h3 className="text-2xl font-bold">{t.offer.guarantee}</h3>
            </div>
            <p className="text-gray-600 max-w-lg mx-auto">
              Testez le programme pendant 7 jours. Si vous ne vous sentez pas plus confiante et sereine, nous vous remboursons intégralement. Sans questions.
            </p>
          </div>
        </div>
      </section>

      {/* 9️⃣ AUTORITÉ – BIOGRAPHIE */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-4xl shadow-xl p-8 md:p-16 grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <img 
                src="https://picsum.photos/600/800?doctor" 
                className="rounded-3xl shadow-lg w-full aspect-[3/4] object-cover" 
                alt="Dr. Marie Dupont" 
              />
            </div>
            <div className="md:col-span-7">
              <Badge className="mb-4">Votre Guide</Badge>
              <h2 className="text-4xl font-poppins font-bold mb-2">{t.bio.name}</h2>
              <p className="text-xl text-primaryRose font-bold italic font-playfair mb-8">{t.bio.role}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="bg-bgHighlight p-3 rounded-full"><Clock className="w-5 h-5 text-primaryRose" /></div>
                  <span className="font-semibold">{t.bio.exp}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-bgHighlight p-3 rounded-full"><Heart className="w-5 h-5 text-primaryRose" /></div>
                  <span className="font-semibold">{t.bio.target}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-bgHighlight p-3 rounded-full"><Globe className="w-5 h-5 text-primaryRose" /></div>
                  <span className="font-semibold">{t.bio.origin}</span>
                </div>
              </div>

              <div className="p-8 bg-bgLight rounded-3xl italic text-gray-700 leading-relaxed border-l-4 border-primaryRose">
                "{t.bio.mission}"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10️⃣ FAQ */}
      <section id="faq" className="bg-bgHighlight px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionTitle>Questions <span className="italic font-playfair">Fréquentes</span></SectionTitle>
          </div>
          
          <div className="bg-white rounded-4xl p-8 md:p-12 shadow-lg">
            <FAQItem 
              question="À quel âge commencer ?" 
              answer="Les recommandations françaises et de l'OMS suggèrent de commencer vers 6 mois, mais certains bébés sont prêts dès 4 mois. Notre méthode vous apprend à identifier les signes de préparation de votre enfant." 
            />
            <FAQItem 
              question="Est-ce adapté aux mamans débutantes ?" 
              answer="Absolument ! La méthode a été conçue pour être la plus simple possible, avec des étapes claires et aucun jargon compliqué." 
            />
            <FAQItem 
              question="Quel est le rythme du programme ?" 
              answer="Vous avancez à votre propre rythme. L'accès est à vie, vous pouvez donc revenir sur les modules quand vous en avez besoin, même pour votre deuxième enfant !" 
            />
            <FAQItem 
              question="Les recettes sont-elles simples ?" 
              answer="Oui, chaque recette prend moins de 15 minutes à préparer. Nous savons que votre temps est précieux." 
            />
          </div>
        </div>
      </section>

      {/* 11️⃣ CTA FINAL */}
      <section className="px-6 py-24 md:py-32 bg-navyDark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primaryRose rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-8">Prête à transformer vos repas ?</h2>
          <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-2xl mx-auto">
            Rejoignez plus de 2.000 mamans qui ont choisi la sérénité et le plaisir partagé.
          </p>
          <a href="#offre" className="inline-block bg-primaryRose text-white font-bold py-6 px-12 rounded-full text-xl md:text-2xl shadow-2xl hover:bg-white hover:text-navyDark transition-all animate-pulse-custom">
            {t.offer.cta}
          </a>
        </div>
      </section>

      {/* 12️⃣ FOOTER */}
      <footer className="bg-white px-6 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primaryRose rounded-full flex items-center justify-center">
              <UtensilsCrossed className="text-white w-5 h-5" />
            </div>
            <span className="font-poppins font-bold">SANS STRESS</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-primaryRose transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-primaryRose transition-colors">CGV</a>
            <a href="#" className="hover:text-primaryRose transition-colors">Confidentialité</a>
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} - Dr. Marie Dupont. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

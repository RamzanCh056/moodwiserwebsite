'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/firebaseAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer';

interface AudioDay {
  day: number;
  titleEnglish: string;
  titleSpanish: string;
  descriptionEnglish: string;
  descriptionSpanish: string;
  english: string;
  spanish: string;
}

const audioDays: AudioDay[] = [
  { day: 1, titleEnglish: 'Why You\'re Not Weak', titleSpanish: 'Por Qué No Eres Débil', descriptionEnglish: 'Anxiety is overload, not failure. Understand the mechanism behind your feelings.', descriptionSpanish: 'La ansiedad es sobrecarga, no fracaso. Comprende el mecanismo detrás de tus sentimientos.', english: '/21 days program/Day 1.mp3', spanish: '/21 days program/Day-1-Spanish.mp3' },
  { day: 2, titleEnglish: 'Social Media & Comparison', titleSpanish: 'Redes Sociales y Comparación', descriptionEnglish: 'Your brain vs infinite scroll. Learn how comparison affects your emotional state.', descriptionSpanish: 'Tu cerebro vs el scroll infinito. Aprende cómo la comparación afecta tu estado emocional.', english: '/21 days program/Day 2.mp3', spanish: '/21 days program/Day-2-Spanish.mp3' },
  { day: 3, titleEnglish: 'Beauty & Appearance', titleSpanish: 'Belleza y Apariencia', descriptionEnglish: 'How shame forms anxiety. Break free from appearance-based pressure.', descriptionSpanish: 'Cómo la vergüenza forma ansiedad. Libérate de la presión basada en la apariencia.', english: '/21 days program/Day 3.mp3', spanish: '/21 days program/Day-3-Spanish.mp3' },
  { day: 4, titleEnglish: 'Silent Bullying', titleSpanish: 'Acoso Silencioso', descriptionEnglish: 'Subtle control and disrespect. Recognize and respond to emotional manipulation.', descriptionSpanish: 'Control sutil y falta de respeto. Reconoce y responde a la manipulación emocional.', english: '/21 days program/Day 4.mp3', spanish: '/21 days program/Day-4-Spanish.mp3' },
  { day: 5, titleEnglish: 'Unrealistic Expectations', titleSpanish: 'Expectativas Irreales', descriptionEnglish: 'Why "doing more" backfires. Find balance without burning out.', descriptionSpanish: 'Por qué "hacer más" sale mal. Encuentra equilibrio sin agotarte.', english: '/21 days program/Day 5.mp3', spanish: '/21 days program/Day-5-Spanish.mp3' },
  { day: 6, titleEnglish: 'Why Motivation Fails', titleSpanish: 'Por Qué Falla la Motivación', descriptionEnglish: 'Discipline without calm breaks you. Build sustainable habits with emotional awareness.', descriptionSpanish: 'La disciplina sin calma te rompe. Construye hábitos sostenibles con conciencia emocional.', english: '/21 days program/Day 6.mp3', spanish: '/21 days program/Day-6-Spanish.mp3' },
  { day: 7, titleEnglish: 'Emotional Reset', titleSpanish: 'Reinicio Emocional', descriptionEnglish: 'Reflection & grounding. Create space for clarity and inner peace.', descriptionSpanish: 'Reflexión y conexión a tierra. Crea espacio para claridad y paz interior.', english: '/21 days program/Day 7.mp3', spanish: '/21 days program/Day-7-Spanish.mp3' },
  { day: 8, titleEnglish: 'Calm Is Not Weakness', titleSpanish: 'La Calma No Es Debilidad', descriptionEnglish: 'Calm = clarity + power. Discover the strength in emotional regulation.', descriptionSpanish: 'Calma = claridad + poder. Descubre la fuerza en la regulación emocional.', english: '/21 days program/Day 8.mp3', spanish: '/21 days program/Day-8-Spanish.mp3' },
  { day: 9, titleEnglish: 'Nervous System 101', titleSpanish: 'Sistema Nervioso 101', descriptionEnglish: 'Fight/flight explained simply. Understand your body\'s stress response.', descriptionSpanish: 'Lucha/huida explicado simplemente. Comprende la respuesta al estrés de tu cuerpo.', english: '/21 days program/Day 9.mp3', spanish: '/21 days program/Day-9-Spanish.mp3' },
  { day: 10, titleEnglish: 'Emotional Boundaries', titleSpanish: 'Límites Emocionales', descriptionEnglish: 'Stop absorbing others\' emotions. Protect your energy and maintain healthy limits.', descriptionSpanish: 'Deja de absorber las emociones de otros. Protege tu energía y mantén límites saludables.', english: '/21 days program/Day 10.mp3', spanish: '/21 days program/Day-10-Spanish.mp3' },
  { day: 11, titleEnglish: 'Reframing Shame', titleSpanish: 'Replanteando la Vergüenza', descriptionEnglish: 'Shame vs responsibility. Transform guilt into growth and self-compassion.', descriptionSpanish: 'Vergüenza vs responsabilidad. Transforma la culpa en crecimiento y autocompasión.', english: '/21 days program/Day 11.mp3', spanish: '/21 days program/Day-11-Spanish.mp3' },
  { day: 12, titleEnglish: 'Real Confidence', titleSpanish: 'Confianza Real', descriptionEnglish: 'Internal safety over performance. Build confidence that doesn\'t depend on others.', descriptionSpanish: 'Seguridad interna sobre rendimiento. Construye confianza que no depende de otros.', english: '/21 days program/Day 12.mp3', spanish: '/21 days program/Day-12-Spanish.mp3' },
  { day: 13, titleEnglish: 'Respect & Self-Worth', titleSpanish: 'Respeto y Autoestima', descriptionEnglish: 'Internal vs external validation. Know your value without seeking approval.', descriptionSpanish: 'Validación interna vs externa. Conoce tu valor sin buscar aprobación.', english: '/21 days program/Day 13.mp3', spanish: '/21 days program/Day-13-Spanish.mp3' },
  { day: 14, titleEnglish: 'Strength Checkpoint', titleSpanish: 'Punto de Control de Fortaleza', descriptionEnglish: 'Reinforce habits. Celebrate progress and solidify your new patterns.', descriptionSpanish: 'Refuerza hábitos. Celebra el progreso y solidifica tus nuevos patrones.', english: '/21 days program/Day 14.mp3', spanish: '/21 days program/Day-14-Spanish.mp3' },
  { day: 15, titleEnglish: 'Emotional Discipline', titleSpanish: 'Disciplina Emocional', descriptionEnglish: 'Consistency beats chaos. Maintain your practice through challenges.', descriptionSpanish: 'La consistencia vence al caos. Mantén tu práctica a través de desafíos.', english: '/21 days program/Day 15.mp3', spanish: '/21 days program/Day-15-Spanish.mp3' },
  { day: 16, titleEnglish: 'Handling Triggers', titleSpanish: 'Manejando Desencadenantes', descriptionEnglish: 'What to do when anxiety hits. Practical tools for difficult moments.', descriptionSpanish: 'Qué hacer cuando golpea la ansiedad. Herramientas prácticas para momentos difíciles.', english: '/21 days program/Day 16.mp3', spanish: '/21 days program/Day-16-Spanish.mp3' },
  { day: 17, titleEnglish: 'Pressure Resilience', titleSpanish: 'Resiliencia ante la Presión', descriptionEnglish: 'Training without collapsing. Build capacity for life\'s demands.', descriptionSpanish: 'Entrenamiento sin colapsar. Construye capacidad para las demandas de la vida.', english: '/21 days program/Day 17.mp3', spanish: '/21 days program/Day-17-Spanish.mp3' },
  { day: 18, titleEnglish: 'Redefining Success', titleSpanish: 'Redefiniendo el Éxito', descriptionEnglish: 'Psychological freedom. Create your own definition of achievement.', descriptionSpanish: 'Libertad psicológica. Crea tu propia definición de logro.', english: '/21 days program/Day 18.mp3', spanish: '/21 days program/Day-18-Spanish.mp3' },
  { day: 19, titleEnglish: 'Relationships & Safety', titleSpanish: 'Relaciones y Seguridad', descriptionEnglish: 'Choosing peace. Navigate relationships with emotional intelligence.', descriptionSpanish: 'Eligiendo paz. Navega relaciones con inteligencia emocional.', english: '/21 days program/Day 19.mp3', spanish: '/21 days program/Day-19-Spanish.mp3' },
  { day: 20, titleEnglish: 'New Emotional Identity', titleSpanish: 'Nueva Identidad Emocional', descriptionEnglish: 'Strength without hardness. Become who you\'re meant to be.', descriptionSpanish: 'Fuerza sin dureza. Conviértete en quien estás destinado a ser.', english: '/21 days program/Day 20.mp3', spanish: '/21 days program/Day-20-Spanish.mp3' },
  { day: 21, titleEnglish: 'Calm Power Commitment', titleSpanish: 'Compromiso de Poder Calmado', descriptionEnglish: 'Transition to daily practice. Make this your new way of being.', descriptionSpanish: 'Transición a la práctica diaria. Haz de esto tu nueva forma de ser.', english: '/21 days program/Day 21.mp3', spanish: '/21 days program/Day-21-Spanish.mp3' },
];

export default function CoursePage() {
  const { user, loading, hasPaidAccess } = useAuth();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'spanish'>('english');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!hasPaidAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-purple-50 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-400 to-purple-400 flex items-center justify-center">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Required</h1>
          <p className="text-xl text-gray-600 mb-8">
            You need to purchase the 21-Day Program to access this course content.
          </p>
          <Link
            href="/program"
            className="inline-block bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-slate-300/50 transition-all transform hover:scale-105 cursor-pointer"
          >
            Purchase Program ($27)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/moodwiser.jpeg"
                alt="Moodwiser Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-sky-400 via-slate-400 to-purple-400 bg-clip-text text-transparent">
              Moodwiser
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">{user.email}</span>
            <Link
              href="/"
              className="text-gray-600 hover:text-sky-500 transition-colors cursor-pointer text-sm font-medium"
            >
              Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sky-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-700">{selectedLanguage === 'english' ? '21-Day Journey' : 'Viaje de 21 Días'}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent leading-tight">
            {selectedLanguage === 'english' ? '21-Day Anxiety Program' : 'Programa de Ansiedad de 21 Días'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {selectedLanguage === 'english' ? 'Your journey to emotional wellness and inner peace' : 'Tu viaje hacia el bienestar emocional y la paz interior'}
          </p>
          
          {/* Language Selector */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedLanguage('english')}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                selectedLanguage === 'english'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-xl shadow-sky-300/50'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-md'
              } cursor-pointer`}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => setSelectedLanguage('spanish')}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                selectedLanguage === 'spanish'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-xl shadow-sky-300/50'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-md'
              } cursor-pointer`}
            >
              🇪🇸 Español
            </button>
          </div>

          {/* PDF Options */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="/21 days program/MoodWiser.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-indigo-300/50 transition-all transform hover:scale-105 cursor-pointer"
            >
              <span className="text-xl">👁️</span>
              <span>{selectedLanguage === 'english' ? 'Open PDF' : 'Abrir PDF'}</span>
            </a>
            <a
              href="/21 days program/MoodWiser.pdf"
              download
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-300/50 transition-all transform hover:scale-105 cursor-pointer"
            >
              <span className="text-xl">📥</span>
              <span>{selectedLanguage === 'english' ? 'Download PDF' : 'Descargar PDF'}</span>
            </a>
          </div>
        </div>

        {/* Visual overview of the 21-day journey */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-sky-50 to-white border border-emerald-100 shadow-md p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-sm">
              1
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                Week 1
              </p>
              <p className="text-sm font-bold text-slate-900">
                Calm & Safety
              </p>
              <p className="text-xs text-slate-500">
                Foundations of anxiety, nervous system & feeling safe.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-emerald-50 to-white border border-sky-100 shadow-md p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-2xl shadow-sm">
              2
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                Week 2
              </p>
              <p className="text-sm font-bold text-slate-900">
                Strength & Boundaries
              </p>
              <p className="text-xs text-slate-500">
                Confidence, relationships, and emotional limits.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-slate-50 to-white border border-slate-100 shadow-md p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center text-2xl shadow-sm">
              3
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                Week 3
              </p>
              <p className="text-sm font-bold text-slate-900">
                Identity & Calm Power
              </p>
              <p className="text-xs text-slate-500">
                Long-term habits and your new emotional identity.
              </p>
            </div>
          </div>
        </div>

        {/* Audio Players Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {audioDays.map((audioDay) => (
            <AudioPlayer
              key={audioDay.day}
              src={selectedLanguage === 'english' ? audioDay.english : audioDay.spanish}
              title={selectedLanguage === 'english' ? audioDay.titleEnglish : audioDay.titleSpanish}
              description={selectedLanguage === 'english' ? audioDay.descriptionEnglish : audioDay.descriptionSpanish}
              day={audioDay.day}
              englishSrc={audioDay.english}
              spanishSrc={audioDay.spanish}
              language={selectedLanguage}
              onLanguageChange={() => {
                // Force re-render when language changes
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

const blogContent: Record<string, {
  title: string;
  author: string;
  date: string;
  content: string[];
  category: string;
}> = {
  'gen-z-anxiety-guide': {
    title: 'Gen Z Guide to Understanding Anxiety Responses',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Mental Health',
    content: [
      'Your brain isn\'t broken—it is overactive.',
      'If you\'ve ever felt your heart race because someone took too long to text back, or you panicked over a tiny mistake at work, or your brain whispered "everything is falling apart" over the smallest thing...',
      'You\'re not weak. You\'re not unstable. You\'re not "too emotional."',
      'You\'re experiencing something ancient, biological, and totally normal: Your fight-or-flight system is overreacting to modern stress.',
      'Your brain was designed for tigers—not unread messages, deadlines, or social pressure.',
      'Inside your brain sits a small almond-shaped structure called the amygdala. Its job is simple: detect danger.',
      'But here\'s the catch: The amygdala cannot tell the difference between a real physical threat and a social or emotional stressor.',
      'To the brain: A tiger is charging at you. A text that says, "We need to talk." A boss using "..." in an email. Someone\'s tone is sounding off... all produce the same survival reaction.',
      'This is why your heart pounds, your stomach flips, or your chest tightens even when "nothing is going wrong."',
      'Research shows Gen Z experiences higher baseline anxiety due to digital overstimulation, social comparison, economic pressure, emotional awareness, and chronic uncertainty.',
      'Your nervous system is working overtime—not because you\'re fragile, but because your environment is loud.',
      'With consistent habits, your brain learns to stop treating every stressor like an emergency. This is called neuroplasticity, the brain\'s ability to rewire over time.',
      'MoodWiser helps you retrain your emotional patterns through gentle mood check-ins, cozy lifestyle ideas, thoughtful reflection prompts, daily grounding habits, and emotional awareness tools.',
      'Your emotions aren\'t your enemy — They\'re your map. MoodWiser helps you read it.'
    ]
  },
  'history-of-bedsheets': {
    title: 'From Ancient Cloth to Modern Calm: The History of Bedsheets',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Wellness',
    content: [
      'Bedsheets are one of the oldest emotional wellness tools humans have ever created.',
      'They were invented not just for comfort but for safety, purity, healing, warmth, and emotional protection.',
      'The moment you pull a soft sheet over your body, your nervous system reacts exactly the way ancient civilizations intended: Your breath slows. Your shoulders drop. Your mind softens.',
      'Even in 3000 BC, humans were the same. Nothing has changed except the thread count.',
      'Egyptians were obsessed with linen. Not for fashion, not for luxury, but because linen symbolized purity and spiritual cleanliness.',
      'They believed linen protected the body and soul—that a clean sheet kept your spirit calm, balanced, and safe for dreaming.',
      'Modern science shows that clean, soft sheets lower cortisol (the stress hormone) and help the body shift into the parasympathetic nervous system—also known as the "rest and relax" mode.',
      'When you wash your sheets, you\'re not cleaning your bed. You\'re cleansing your mind.',
      'Greeks used bedding woven by hand—cotton, flax, or wool—depending on what they could afford. But here\'s what they knew: A soft bed = a regulated mood. A regulated mood = a more rational brain.',
      'Soft textures ease overstimulation. When life feels loud, your nervous system loves anything that feels predictable and gentle.',
      'Warmth signals safety. Your body evolved to sleep only when safe. Warm sheets mimic shelter → your brain stops scanning for danger.',
      'Clean sheets = psychological reset. A fresh sheet signals a "new beginning," which helps anxious minds release yesterday\'s chaos.',
      'Color psychology: Cool tones (sage, dusty blue, and cloud white) reduce emotional intensity. Bright reds cause mental alertness and stress.',
      'The "cocoon effect": Light pressure reduces heart rate—similar to weighted blankets. Your ancestors discovered this instinctively.',
      'If you make your sheets part of a ritual, your brain learns to associate the fabric with calm. Your room becomes an emotional sanctuary.',
      'There is nothing in life that a clean, soft, warm sheet cannot improve—except maybe taxes.',
      'Your bedsheet is where your nervous system finally whispers: "I can rest now."'
    ]
  },
  'matcha-whisk-chasen': {
    title: 'The Matcha Whisk (Chasen): A Sacred Japanese Tool for Calm',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Mindfulness',
    content: [
      'The matcha whisk, or chasen, is more than a kitchen tool—it\'s a meditation instrument.',
      'For centuries, Japanese tea ceremonies have used the rhythmic whisking motion as a form of active meditation.',
      'The repetitive, circular motion required to whisk matcha creates a meditative state that calms the nervous system.',
      'This ancient practice teaches us that even simple, everyday actions can become rituals of peace.',
      'The bamboo whisk connects us to nature, to tradition, and to the present moment.',
      'Each stroke is intentional, each movement mindful—a practice in slowing down in our fast-paced world.',
      'The sound of the whisk against the bowl, the visual of the green foam forming, the warmth of the tea—all engage the senses in a grounding experience.',
      'Modern research shows that ritualistic behaviors, like the tea ceremony, can significantly reduce anxiety and stress.',
      'You don\'t need a formal ceremony to benefit. Simply taking time to prepare your matcha mindfully can create moments of calm.',
      'The chasen teaches us that peace isn\'t found in avoiding life, but in fully engaging with simple, beautiful moments.',
      'In our digital age, the physical act of whisking grounds us back into our bodies and the present moment.',
      'This is the essence of MoodWiser: finding tranquility in the ordinary, transforming routine into ritual.'
    ]
  },
  'calm-bedroom-anxiety-relief': {
    title: 'Create a Calm Bedroom for Anxiety Relief',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Wellness',
    content: [
      'Your bedroom should be a sanctuary, not a source of stress.',
      'The environment you sleep in directly impacts your mental health and anxiety levels.',
      'Start with color: Soft, muted tones like sage green, dusty blue, or lavender create a calming atmosphere.',
      'Remove clutter. A messy room can increase anxiety. Keep only what brings you peace.',
      'Invest in quality bedding. Soft, breathable fabrics signal safety to your nervous system.',
      'Control the lighting. Use warm, dimmable lights in the evening to prepare your body for sleep.',
      'Add plants. Houseplants purify air and create a connection to nature, reducing stress.',
      'Create a "no screens" zone. Keep phones and laptops out of the bedroom to protect your sleep.',
      'Use aromatherapy. Lavender, chamomile, or eucalyptus can help calm your mind before sleep.',
      'Make your bed daily. This small ritual signals order and control, reducing anxiety.',
      'Your bedroom should be a place where your nervous system can finally relax and reset.'
    ]
  },
  'morning-rituals-anxiety': {
    title: '7 Simple Morning Rituals That Make Anxiety Easier to Handle',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Wellness',
    content: [
      'How you start your morning sets the tone for your entire day.',
      '1. Wake up slowly. Give yourself 10 minutes before checking your phone. Let your nervous system ease into the day.',
      '2. Hydrate first. Drink a glass of water before coffee. Your body needs hydration after sleep.',
      '3. Move your body gently. Stretching or a short walk signals your body that it\'s safe to be awake.',
      '4. Practice gratitude. Write down three things you\'re grateful for. This shifts your focus from anxiety to appreciation.',
      '5. Breathe intentionally. Take five deep breaths before starting your day. This activates your parasympathetic nervous system.',
      '6. Set one intention. Instead of a long to-do list, choose one thing you want to accomplish. This reduces overwhelm.',
      '7. Create a morning ritual you actually enjoy. If you hate meditation, don\'t force it. Find what works for you.',
      'These rituals don\'t need to be long or complicated. Even 5-10 minutes can transform your relationship with anxiety.',
      'Consistency matters more than perfection. Start with one ritual and build from there.'
    ]
  },
  'modern-pressure-anxiety': {
    title: 'Why We Feel More Pressure & Anxiety Than Ever',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Mental Health',
    content: [
      'We\'re living in an age of unprecedented pressure.',
      'Digital connectivity means we\'re never truly "off." Work follows us home, social media creates constant comparison, and news cycles feed our anxiety.',
      'Economic uncertainty, climate change, and social pressures create a perfect storm for anxiety.',
      'Our brains weren\'t designed for this level of constant stimulation and threat perception.',
      'The good news? Understanding why we feel this way is the first step to managing it.',
      'Emotional intelligence—the ability to recognize, understand, and manage our emotions—is more crucial than ever.',
      'We need tools to navigate this new reality, not just survive it.',
      'MoodWiser helps you build emotional intelligence through daily check-ins and mindful reflection.',
      'You\'re not broken. You\'re human, responding to a world that moves faster than our evolution.',
      'The pressure is real, but so is your capacity to find peace within it.'
    ]
  },
  'anxiety-protection': {
    title: 'Your Anxiety Is Trying to Protect You—Not Ruin You!',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Mental Health',
    content: [
      'Anxiety gets a bad reputation, but it\'s actually trying to help you.',
      'Your anxiety is your brain\'s way of saying, "Hey, something might be important here. Pay attention."',
      'The problem isn\'t anxiety itself—it\'s when anxiety becomes chronic and misdirected.',
      'When your brain treats every email, text, or social interaction as a potential threat, that\'s when anxiety becomes problematic.',
      'But anxiety, in its healthy form, is a valuable signal. It tells you when something matters, when you need to prepare, when you care.',
      'The goal isn\'t to eliminate anxiety—it\'s to understand it, work with it, and redirect it productively.',
      'When you feel anxious, ask yourself: "What is this anxiety trying to tell me? What do I need right now?"',
      'Often, anxiety is masking other emotions: fear of rejection, need for connection, desire for control.',
      'By understanding what your anxiety is really about, you can address the root cause instead of just managing symptoms.',
      'Your anxiety isn\'t your enemy. It\'s a messenger. Learn to listen to what it\'s trying to say.'
    ]
  },
  'daily-calm-rituals': {
    title: 'Daily Calm Rituals (That Actually Work)',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Wellness',
    content: [
      'Calm isn\'t something you achieve—it\'s something you practice.',
      'Science-backed daily rituals can significantly reduce anxiety and improve your overall well-being.',
      '1. Box Breathing: Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 4 times. This activates your parasympathetic nervous system.',
      '2. Grounding Technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This brings you back to the present.',
      '3. Progressive Muscle Relaxation: Tense and release each muscle group from toes to head. This releases physical tension.',
      '4. Journaling: Write for 5 minutes without stopping. Don\'t edit, just let thoughts flow. This clears mental clutter.',
      '5. Nature Connection: Spend 10 minutes outside, even if it\'s just sitting. Nature has a proven calming effect.',
      '6. Gratitude Practice: Write down three specific things you\'re grateful for. This shifts your focus from problems to blessings.',
      '7. Digital Detox: Set aside 30 minutes without screens. Your nervous system needs breaks from constant stimulation.',
      'The key is consistency, not perfection. Even 5 minutes a day can make a difference.',
      'Start with one ritual that feels manageable, and build from there. Your future self will thank you.'
    ]
  },
  'emotional-intelligence-modern-life': {
    title: 'Emotional Intelligence for Modern Life',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Mental Health',
    content: [
      'Emotional intelligence isn\'t just a buzzword—it\'s a survival skill for modern life.',
      'In a world of constant change and pressure, understanding your emotions is more important than ever.',
      'Emotional intelligence has four components: self-awareness, self-regulation, empathy, and social skills.',
      'Self-awareness means recognizing your emotions as they happen, not after they\'ve taken over.',
      'Self-regulation is the ability to manage your emotional responses, not suppress them.',
      'Empathy allows you to understand others\' emotions, creating deeper connections.',
      'Social skills help you navigate relationships and communicate effectively.',
      'The good news? Emotional intelligence can be developed. It\'s not fixed—it\'s a muscle you can strengthen.',
      'MoodWiser helps you build emotional intelligence through daily check-ins, reflection prompts, and awareness tools.',
      'Start by simply noticing your emotions without judgment. "I feel anxious" instead of "I shouldn\'t feel anxious."',
      'The more you understand your emotional patterns, the more power you have to change them.',
      'Emotional intelligence isn\'t about being perfect—it\'s about being aware, responsive, and compassionate with yourself and others.'
    ]
  },
  'anxiety-unsupported': {
    title: 'You\'re Not Anxious. You\'re Unsupported.',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Mental Health',
    content: [
      'Sometimes anxiety isn\'t a disorder—it\'s a signal that you need more support.',
      'We\'re social creatures. We evolved to live in communities, to share burdens, to feel connected.',
      'Modern life has isolated us. We\'re more connected digitally but less connected emotionally.',
      'When you feel anxious, ask yourself: "What do I need right now? What kind of support am I missing?"',
      'Often, anxiety is your body\'s way of saying, "I\'m carrying too much alone."',
      'Support doesn\'t have to be dramatic. It can be:',
      '- A friend who listens without trying to fix',
      '- A therapist who helps you understand yourself',
      '- A community that shares your struggles',
      '- An app like MoodWiser that provides daily emotional check-ins',
      '- 8 minutes a day of self-reflection and self-compassion',
      'You don\'t need to handle everything alone. Asking for support isn\'t weakness—it\'s wisdom.',
      'Sometimes the bravest thing you can do is admit you need help.',
      'Your anxiety might be trying to tell you that you\'re not meant to do this alone.'
    ]
  },
  'science-of-calm': {
    title: 'The Science of Calm: Understanding Your Nervous System',
    author: 'Justine Sinclair',
    date: 'December 2, 2025',
    category: 'Mental Health',
    content: [
      'Calm isn\'t just a feeling—it\'s a physiological state you can learn to access.',
      'Your nervous system has two main branches: the sympathetic (fight-or-flight) and parasympathetic (rest-and-digest).',
      'When you\'re anxious, your sympathetic nervous system is activated. Your heart rate increases, muscles tense, and your mind races.',
      'The parasympathetic nervous system is your body\'s "brake." It slows your heart rate, relaxes your muscles, and calms your mind.',
      'You can activate your parasympathetic nervous system through specific techniques:',
      '1. Deep, slow breathing (especially longer exhales)',
      '2. Gentle movement or stretching',
      '3. Cold water on your face or wrists',
      '4. Humming or singing (activates the vagus nerve)',
      '5. Progressive muscle relaxation',
      '6. Meditation or mindfulness practices',
      '7. Social connection and feeling safe',
      'Understanding how your nervous system works gives you power over your anxiety.',
      'You\'re not at the mercy of your emotions—you have tools to regulate them.',
      'The more you practice these techniques, the easier it becomes to access calm, even in stressful situations.',
      'This is the science behind MoodWiser\'s approach: giving you practical, evidence-based tools to regulate your nervous system and find peace.'
    ]
  }
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = blogContent[resolvedParams.slug];

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-emerald-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/" className="text-sky-500 hover:text-sky-600">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-emerald-50 to-purple-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-sky-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Moodwiser
          </Link>
        </nav>
      </header>

      {/* Blog Content */}
      <article className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link 
            href="/#blogs" 
            className="inline-flex items-center text-gray-600 hover:text-sky-500 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-sky-100 to-emerald-100 rounded-full mb-6">
              <span className="text-sm font-semibold text-gray-700">{blog.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <span className="font-semibold">{blog.author}</span>
              <span>•</span>
              <span>{blog.date}</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="prose prose-lg max-w-none">
              {blog.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-sky-50 to-emerald-50 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Journey?</h3>
              <p className="text-gray-600 mb-6">Download MoodWiser today and begin your path to emotional wellness.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://apps.apple.com/pk/app/moodwiser/id6755422630"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold border-2 border-gray-200 cursor-pointer"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#000000">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Download on App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.moodwiser.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold border-2 border-gray-200 cursor-pointer"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#4285F4"/>
                    <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#34A853"/>
                    <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.19 15.22L14.54 12.85L17.19 10.47L20.16 10.81Z" fill="#FBBC04"/>
                    <path d="M16.81 8.88L14.54 11.15L6.05 2.66L16.81 8.88Z" fill="#EA4335"/>
                  </svg>
                  Get it on Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}


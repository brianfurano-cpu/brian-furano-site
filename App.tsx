import React, { useState, useRef, useEffect } from 'react';
import { PsychedelicKaleidoscope } from './components/PsychedelicKaleidoscope';
import { RevealContent } from './components/RevealContent';
import { ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  // Auto scroll when revealed
  useEffect(() => {
    if (isRevealed && scrollRef.current) {
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
  }, [isRevealed]);

  return (
    <div className="min-h-screen w-full bg-fillmore-black relative overflow-hidden flex flex-col items-center">
      
      {/* Background Music/Audio Control could go here, omitting for simplicity/autoplay rules */}

      {/* Main Poster Section */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center p-4">
        
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <PsychedelicKaleidoscope />
        </div>

        {/* Center Static Content - The "Eye" of the storm */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          
          {/* Central Name Badge */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-fillmore-cream rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(245,230,202,0.3)] border-4 border-fillmore-sepia animate-pulse-slow">
            <div className="space-y-1 z-20">
                <h1 className="font-clean font-light text-2xl md:text-3xl text-fillmore-charcoal tracking-widest uppercase">
                    Brian
                </h1>
                <h1 className="font-clean font-semibold text-2xl md:text-3xl text-fillmore-charcoal tracking-widest uppercase">
                    Furano
                </h1>
            </div>
            
            {/* Inner decorative ring inside the badge */}
            <div className="absolute inset-4 border border-fillmore-moss/30 rounded-full pointer-events-none"></div>
            <div className="absolute inset-3 border border-fillmore-orange/20 rounded-full pointer-events-none"></div>
          </div>

          {/* Interactive Trigger */}
          <div className="mt-12 md:mt-16 relative">
            <button 
              onClick={handleReveal}
              className={`
                group relative px-8 py-3 bg-transparent border-2 border-fillmore-cream text-fillmore-cream 
                font-clean uppercase tracking-[0.2em] text-sm md:text-base rounded-full 
                transition-all duration-500 hover:bg-fillmore-cream hover:text-fillmore-black
                focus:outline-none focus:ring-2 focus:ring-fillmore-orange focus:ring-offset-4 focus:ring-offset-fillmore-black
                ${isRevealed ? 'opacity-50' : 'opacity-100 animate-float'}
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isRevealed ? 'Close' : 'Enter Experience'}
                <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${isRevealed ? 'rotate-180' : ''}`} />
              </span>
            </button>
          </div>

        </div>

        {/* Texture Overlay (Grain) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </section>

      {/* Reveal Section anchor */}
      <div ref={scrollRef} className="w-full relative z-20 pb-20 px-4">
        <RevealContent isVisible={isRevealed} />
      </div>

      {/* Footer / Copyright */}
      <footer className="w-full py-6 text-center relative z-20 opacity-40 mix-blend-screen">
         <p className="font-clean text-[10px] text-fillmore-cream uppercase tracking-widest">
            © {new Date().getFullYear()} Brian Furano • San Francisco
         </p>
      </footer>

    </div>
  );
};

export default App;

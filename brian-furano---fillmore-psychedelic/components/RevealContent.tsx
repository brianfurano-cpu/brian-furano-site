import React, { useEffect, useRef } from 'react';
import { Mail,  Music, Video, ExternalLink, Instagram } from 'lucide-react';

interface RevealContentProps {
  isVisible: boolean;
}

export const RevealContent: React.FC<RevealContentProps> = ({ isVisible }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`transition-all duration-1000 ease-in-out overflow-hidden w-full max-w-2xl mx-auto
        ${isVisible ? 'opacity-100 max-h-[1000px] mt-8' : 'opacity-0 max-h-0 mt-0'}`}
      ref={contentRef}
    >
      <div className="bg-fillmore-cream text-fillmore-black p-6 rounded-lg shadow-2xl mx-4 border-2 border-fillmore-orange/30 texture-paper">
        
        {/* Header */}
        <div className="text-center mb-8 border-b border-fillmore-moss/20 pb-4">
            <h2 className="font-psychedelic text-3xl text-fillmore-orange mb-2">Get in Touch</h2>
            <p className="font-clean text-fillmore-moss text-sm uppercase tracking-widest">San Francisco, CA</p>
        </div>

        {/* Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-clean">
            <a href="#" className="flex items-center justify-center gap-3 p-4 bg-fillmore-moss/10 hover:bg-fillmore-moss/20 transition-colors rounded border border-fillmore-moss/20 group">
                <Mail className="w-5 h-5 text-fillmore-moss group-hover:scale-110 transition-transform" />
                <span className="text-fillmore-black font-medium">Email Me</span>
            </a>
             <a href="#" className="flex items-center justify-center gap-3 p-4 bg-fillmore-moss/10 hover:bg-fillmore-moss/20 transition-colors rounded border border-fillmore-moss/20 group">
                <Instagram className="w-5 h-5 text-fillmore-moss group-hover:scale-110 transition-transform" />
                <span className="text-fillmore-black font-medium">@brianfurano</span>
            </a>
        </div>

        {/* Video Embed */}
        <div className="relative w-full pb-[56.25%] bg-fillmore-black rounded overflow-hidden border-4 border-fillmore-moss shadow-inner group">
             <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 bg-black/40">
                 <Music className="w-12 h-12 text-fillmore-cream opacity-80 animate-pulse" />
             </div>
             <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/pafY6sZt0FE?si=k-Fv2yE1k8Wn0b5-" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            ></iframe>
        </div>

        <div className="mt-6 text-center">
            <p className="font-clean text-xs text-fillmore-moss/60 italic">
                "Without love in the dream it'll never come true."
            </p>
        </div>
      </div>
    </div>
  );
};

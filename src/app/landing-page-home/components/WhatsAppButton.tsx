'use client';
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="glass-card rounded-2xl p-4 w-64 shadow-2xl shadow-primary/20 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full gradient-bg-primary flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">T5-SERVICES</div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">En ligne</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Bonjour ! 👋 Comment pouvons-nous vous aider ? Discutons de votre projet.
          </p>
          <a
            href="https://wa.me/261XXXXXXXXX?text=Bonjour%20T5-SERVICES%2C%20je%20souhaite%20discuter%20d%27un%20projet."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-150 active:scale-95"
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={16} /> Démarrer la conversation
          </a>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full shadow-2xl shadow-success/30 flex items-center justify-center text-white transition-all duration-300 active:scale-95 hover:scale-110 animate-glow"
        style={{ background: '#25D366' }}
        aria-label="Contacter via WhatsApp"
      >
        {expanded ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
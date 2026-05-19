'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, MessageSquare, Send, Loader2 } from 'lucide-react';

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  budget: string;
  message: string;
};

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    // BACKEND INTEGRATION POINT: POST /api/contact with data
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    reset();
    toast.success('Message envoyé ! Nous vous répondrons sous 2 heures.');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-accent tracking-widest uppercase bg-accent/10 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-section-title text-foreground mb-4">
            Parlons de <span className="gradient-text">Votre Projet</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Remplissez le formulaire ou contactez-nous directement. Réponse garantie sous 2 heures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {[
              { key: 'contact-loc', icon: MapPin, label: 'Adresse', value: 'Alarobia Amboniloha, 101', sub: 'Antananarivo, Madagascar' },
              { key: 'contact-phone', icon: Phone, label: 'Téléphone', value: '038 57 228 06', sub: 'Lun–Sam, 8h–18h' },
              { key: 'contact-email', icon: Mail, label: 'Email', value: 't5.services@gmail.com', sub: 'Réponse sous 2 heures' },
              { key: 'contact-wa', icon: MessageSquare, label: 'WhatsApp', value: '038 57 228 06', sub: 'Chat instantané disponible' },
            ].map((item) => (
              <div key={item.key} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-2xl p-6 lg:p-8 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Nom complet <span className="text-danger">*</span></label>
                  <input
                    {...register('name', { required: 'Nom requis' })}
                    placeholder="Jean Rakoto"
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email <span className="text-danger">*</span></label>
                  <input
                    {...register('email', { required: 'Email requis', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email invalide' } })}
                    type="email"
                    placeholder="jean@entreprise.mg"
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Téléphone</label>
                  <input
                    {...register('phone')}
                    placeholder="+261 XX XX XXX XX"
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Budget estimé</label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="less-500k">Moins de 500 000 Ar</option>
                    <option value="500k-1m">500 000 – 1 000 000 Ar</option>
                    <option value="1m-5m">1 000 000 – 5 000 000 Ar</option>
                    <option value="more-5m">Plus de 5 000 000 Ar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Sujet <span className="text-danger">*</span></label>
                <input
                  {...register('subject', { required: 'Sujet requis' })}
                  placeholder="Développement site e-commerce"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                {errors.subject && <p className="text-xs text-danger mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message <span className="text-danger">*</span></label>
                <textarea
                  {...register('message', { required: 'Message requis', minLength: { value: 30, message: 'Minimum 30 caractères' } })}
                  rows={5}
                  placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
                {errors.message && <p className="text-xs text-danger mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-3.5 font-semibold text-white gradient-bg-primary rounded-xl hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 shadow-lg shadow-primary/25"
                style={{ minHeight: '52px' }}
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
                ) : (
                  <><Send size={18} /> Envoyer le Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
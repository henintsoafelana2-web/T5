'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, Lock, Mail, Copy, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LoginData = {
  email: string;
  password: string;
  remember: boolean;
};

const demoCredentials = [
  { key: 'cred-superadmin', role: 'Super Admin', email: 'superadmin@t5services.mg', password: 'T5Admin2026!', badge: 'bg-warning/10 text-warning' },
  { key: 'cred-admin', role: 'Admin', email: 'admin@t5services.mg', password: 'T5Admin2026!', badge: 'bg-primary/10 text-primary' },
  { key: 'cred-editor', role: 'Éditeur', email: 'editor@t5services.mg', password: 'T5Edit2026!', badge: 'bg-accent/10 text-accent' },
  { key: 'cred-client', role: 'Client', email: 'client@t5services.mg', password: 'T5Client2026!', badge: 'bg-success/10 text-success' },
];

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<LoginData>({
    defaultValues: { remember: false },
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    // BACKEND INTEGRATION POINT: POST /api/auth/login with data.email + data.password
    await new Promise((r) => setTimeout(r, 1200));

    const validCreds = demoCredentials.find(
      (c) => c.email === data.email && c.password === data.password
    );

    if (validCreds) {
      setLoading(false);
      toast.success(`Connecté en tant que ${validCreds.role}`);
      router.push('/admin-dashboard');
    } else {
      setLoading(false);
      setError('email', { message: 'Identifiants invalides — utilisez les comptes de démonstration ci-dessous pour vous connecter.' });
    }
  };

  const autofill = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
    toast.success('Identifiants renseignés automatiquement');
  };

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex-1 lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
      <div className="w-full max-w-md">
        {/* Mobile logo */}
        <div className="flex items-center gap-3 mb-8 lg:hidden">
          <div className="w-10 h-10 rounded-xl gradient-bg-primary flex items-center justify-center">
            <Lock size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">T5-SERVICES Admin</span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Connexion</h2>
          <p className="text-sm text-muted-foreground">
            Accédez à votre tableau de bord d&apos;administration.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Adresse email <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                {...register('email', {
                  required: 'Email requis',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Format email invalide' },
                })}
                type="email"
                placeholder="admin@t5services.mg"
                className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-danger mt-1.5 leading-relaxed">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Mot de passe <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                {...register('password', {
                  required: 'Mot de passe requis',
                  minLength: { value: 6, message: 'Minimum 6 caractères' },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                className="w-full pl-10 pr-12 py-3 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-danger mt-1.5">{errors.password.message}</p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('remember')}
                type="checkbox"
                className="rounded border-border accent-primary"
              />
              <span className="text-sm text-muted-foreground">Se souvenir de moi</span>
            </label>
            <button type="button" className="text-sm text-primary hover:text-accent transition-colors font-medium">
              Mot de passe oublié ?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3.5 font-semibold text-white gradient-bg-primary rounded-xl hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 shadow-lg shadow-primary/25"
            style={{ minHeight: '52px' }}
          >
            {loading ? (
              <><Loader2 size={18} className="animate-spin" /> Connexion en cours...</>
            ) : (
              <>Se Connecter <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2">Comptes de Démonstration</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-muted/20">
              <p className="text-xs text-muted-foreground">
                Cliquez sur <strong className="text-foreground">Utiliser</strong> pour remplir automatiquement les champs.
              </p>
            </div>
            <div className="divide-y divide-border">
              {demoCredentials.map((cred) => (
                <div key={cred.key} className="px-4 py-3 flex items-center gap-3 hover:bg-muted/20 transition-colors">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${cred.badge}`}>
                    {cred.role}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-foreground truncate">{cred.email}</div>
                    <div className="text-xs text-muted-foreground font-mono">{'•'.repeat(12)}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copyToClipboard(cred.password, `${cred.key}-pwd`)}
                      title="Copier le mot de passe"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                    >
                      {copiedKey === `${cred.key}-pwd` ? (
                        <Check size={13} className="text-success" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                    <button
                      onClick={() => autofill(cred.email, cred.password)}
                      className="px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors active:scale-95"
                    >
                      Utiliser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

type Step = 'mobile' | 'otp' | 'details';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | 'hinglish'>('en');

  // NOTE: Actual OTP send/verify happens via Firebase Client SDK.
  // This UI shows the flow; wire up firebase/auth's signInWithPhoneNumber
  // + RecaptchaVerifier here, then POST the resulting idToken to
  // /api/v1/auth/verify-otp (see backend/src/auth/auth.controller.ts).

  const sendOtp = async () => {
    if (mobile.length !== 10) return;
    setLoading(true);
    // await firebaseSendOtp(mobile)
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    // const idToken = await firebaseVerifyOtp(otp)
    // const { data } = await api.post('/auth/verify-otp', { idToken, fullName, referralCode })
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-gradient p-4">
      <div className="absolute right-6 top-6">
        <div className="flex gap-1 rounded-full bg-white/10 p-1 backdrop-blur-glass">
          {(['en', 'hi', 'hinglish'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                language === lang ? 'bg-gold-gradient text-primary' : 'text-white/70'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिं' : 'Hinglish'}
            </button>
          ))}
        </div>
      </div>

      <GlassCard className="w-full max-w-md !bg-white/95 p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient font-bold text-primary">
            E
          </div>
          <h1 className="mt-4 text-xl font-bold text-ink">Earning with Solution</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {step === 'mobile' && 'Login or sign up with your mobile number'}
            {step === 'otp' && `OTP sent to +91 ${mobile}`}
            {step === 'details' && 'A few details to get started'}
          </p>
        </div>

        {step === 'mobile' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3">
              <Phone size={16} className="text-ink-muted" />
              <span className="text-sm font-medium text-ink-muted">+91</span>
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-transparent text-sm text-ink outline-none"
              />
            </div>
            <button
              onClick={sendOtp}
              disabled={mobile.length !== 10 || loading}
              className="btn-gold w-full disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send OTP'}
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4">
            <div className="flex justify-between gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  maxLength={1}
                  value={otp[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    const newOtp = otp.split('');
                    newOtp[i] = val;
                    setOtp(newOtp.join(''));
                    if (val && e.target.nextElementSibling) {
                      (e.target.nextElementSibling as HTMLInputElement).focus();
                    }
                  }}
                  className="h-12 w-full rounded-xl border border-black/10 bg-white text-center text-lg font-bold text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                />
              ))}
            </div>
            <button
              onClick={verifyOtp}
              disabled={otp.length !== 6 || loading}
              className="btn-gold w-full disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify & Continue'}
            </button>
            <button onClick={sendOtp} className="w-full text-center text-xs font-medium text-primary">
              Resend OTP
            </button>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-field !bg-white"
            />
            <input
              placeholder="Referral Code (optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="input-field !bg-white"
            />
            <label className="flex items-start gap-2 text-xs text-ink-muted">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              I agree to the{' '}
              <a href="/terms" className="text-primary underline">Terms of Service</a> &{' '}
              <a href="/privacy" className="text-primary underline">Privacy Policy</a>
            </label>
            <button disabled={!agreed || !fullName} className="btn-gold w-full disabled:opacity-50">
              Create Account
            </button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-muted">
          <ShieldCheck size={14} className="text-success" />
          Secured with bank-grade encryption
        </div>
      </GlassCard>
    </main>
  );
}

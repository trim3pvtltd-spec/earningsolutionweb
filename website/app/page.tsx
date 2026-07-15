import Link from 'next/link';
import { ArrowRight, ShieldCheck, TrendingUp, Users, Wallet, Award, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const productPillars = [
  { icon: Wallet, title: 'Bank Accounts & Cards', desc: 'Savings accounts, credit cards, prepaid business cards from India\'s leading banks.' },
  { icon: TrendingUp, title: 'Loans & Investments', desc: 'Personal, business, gold loans plus demat and trading accounts.' },
  { icon: ShieldCheck, title: 'Insurance', desc: 'Life, health and motor insurance with trusted partner insurers.' },
];

const trustPoints = [
  { label: 'Verified Partners', value: '25+' },
  { label: 'Products Live', value: '40+' },
  { label: 'States Covered', value: '10+' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface dark:bg-surface-dark">
      {/* --- Header --- */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-gradient font-bold text-primary">
            E
          </div>
          <span className="text-lg font-bold text-ink dark:text-white">
            Earning <span className="text-accent">with Solution</span>
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-muted md:flex">
          <a href="#products" className="hover:text-primary">Products</a>
          <a href="#how-it-works" className="hover:text-primary">How it works</a>
          <a href="#trust" className="hover:text-primary">Why us</a>
        </nav>
        <Link href="/auth/login" className="btn-primary !px-5 !py-2.5 text-sm">
          Get Started
        </Link>
      </header>

      {/* --- Hero --- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gradient opacity-[0.03] dark:opacity-[0.08]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <Sparkles size={14} /> Tri M3 Credible Solution Pvt Ltd
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-ink dark:text-white md:text-5xl">
              Sell financial products.
              <br />
              <span className="bg-gold-gradient bg-clip-text text-transparent">Earn real commission.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-ink-muted">
              India&apos;s premium fintech affiliate platform — loans, credit cards, insurance,
              demat accounts and more, with transparent payouts and a team you can grow.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/auth/login" className="btn-gold">
                Start Earning <ArrowRight size={18} />
              </Link>
              <Link href="#how-it-works" className="btn-outline">
                See How It Works
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              {trustPoints.map((t) => (
                <div key={t.label}>
                  <p className="text-2xl font-bold text-primary dark:text-accent">{t.value}</p>
                  <p className="text-xs text-ink-muted">{t.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Signature element: floating earnings glass panel */}
          <div className="relative mx-auto w-full max-w-sm">
            <GlassCard goldBorder className="relative z-10 p-6">
              <p className="text-xs font-medium text-ink-muted">Wallet Balance</p>
              <p className="mt-1 text-3xl font-extrabold text-ink dark:text-white">₹48,250</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-success/10 p-3">
                  <p className="text-[11px] text-ink-muted">Approved</p>
                  <p className="text-sm font-bold text-success">₹42,000</p>
                </div>
                <div className="rounded-2xl bg-warning/10 p-3">
                  <p className="text-[11px] text-ink-muted">Pending</p>
                  <p className="text-sm font-bold text-warning">₹6,250</p>
                </div>
              </div>
              <button className="btn-gold mt-5 w-full !py-2.5 text-sm">Withdraw</button>
            </GlassCard>
            <div className="absolute -bottom-6 -left-6 -z-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -top-6 -right-6 -z-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* --- Product pillars --- */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-ink dark:text-white md:text-3xl">
          Every product your customers need
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink-muted">
          Bank accounts, loans, insurance, FASTag, recharge and bill payments — one platform, one login.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {productPillars.map((p) => (
            <GlassCard key={p.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <p.icon size={22} />
              </div>
              <h3 className="mt-4 font-semibold text-ink dark:text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* --- How it works --- */}
      <section id="how-it-works" className="bg-primary/[0.03] py-16 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-2xl font-bold text-ink dark:text-white md:text-3xl">
            Three steps to your first payout
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Users, title: 'Join & verify KYC', desc: 'Sign up with mobile OTP and complete quick KYC verification.' },
              { icon: TrendingUp, title: 'Sell products', desc: 'Share affiliate links or assist customers directly for any product.' },
              { icon: Award, title: 'Get paid', desc: 'Track approvals in real time and withdraw to UPI or bank anytime.' },
            ].map((s, i) => (
              <GlassCard key={s.title}>
                <span className="text-xs font-bold text-accent">STEP {i + 1}</span>
                <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient text-primary">
                  <s.icon size={18} />
                </div>
                <h3 className="mt-3 font-semibold text-ink dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{s.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA footer --- */}
      <section id="trust" className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-ink dark:text-white md:text-3xl">
          Ready to start earning with confidence?
        </h2>
        <p className="mt-3 text-sm text-ink-muted">
          Join Field Executives and Shopkeepers already growing their income with Earning with Solution.
        </p>
        <Link href="/auth/login" className="btn-gold mx-auto mt-8 w-fit">
          Create Free Account <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="border-t border-black/5 py-8 text-center text-xs text-ink-muted dark:border-white/5">
        © {new Date().getFullYear()} Tri M3 Credible Solution Pvt Ltd. All rights reserved.
      </footer>
    </main>
  );
}

'use client';

import { AppShell } from '@/components/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { CountUp } from '@/components/ui/CountUp';
import {
  Wallet, TrendingUp, Clock, CheckCircle2, XCircle, Trophy, Gift,
  Megaphone, PlayCircle, MessageCircle, Newspaper, ArrowUpRight,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const earningsBreakdown = [
  { label: "Today's Earnings", value: 1250, icon: TrendingUp, tone: 'text-primary' },
  { label: 'Pending', value: 6250, icon: Clock, tone: 'text-warning' },
  { label: 'Approved', value: 42000, icon: CheckCircle2, tone: 'text-success' },
  { label: 'Rejected', value: 1800, icon: XCircle, tone: 'text-error' },
];

const products = [
  { name: 'Personal Loan', payout: '₹1,000', color: 'bg-primary/10 text-primary' },
  { name: 'Term Insurance', payout: '₹800', color: 'bg-accent/10 text-accent' },
  { name: 'Credit Card', payout: '₹600', color: 'bg-success/10 text-success' },
  { name: 'Demat Account', payout: '₹200', color: 'bg-warning/10 text-warning' },
];

const leaderboard = [
  { rank: 1, name: 'Amit Verma', earnings: 82000 },
  { rank: 2, name: 'Priya Singh', earnings: 74500 },
  { rank: 3, name: 'Rohit Kumar', earnings: 68200 },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Banner slider */}
        <GlassCard className="relative overflow-hidden !bg-brand-gradient !p-0">
          <div className="flex items-center justify-between px-8 py-10">
            <div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-accent-light">
                Festival Offer
              </span>
              <h2 className="mt-3 text-xl font-bold text-white md:text-2xl">
                Earn 2X commission this Diwali
              </h2>
              <p className="mt-1 text-sm text-white/70">On all insurance products, till 30th July</p>
            </div>
            <ArrowUpRight className="hidden text-accent md:block" size={32} />
          </div>
        </GlassCard>

        {/* Earnings summary */}
        <GlassCard goldBorder className="!bg-brand-gradient text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70">Wallet Balance</p>
              <CountUp value={48250} prefix="₹" className="text-3xl font-extrabold" />
            </div>
            <button className="btn-gold !py-2.5 !px-5 text-sm">Withdraw</button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {earningsBreakdown.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 p-3 backdrop-blur-glass">
                <item.icon size={16} className="text-accent" />
                <p className="mt-2 text-[11px] text-white/70">{item.label}</p>
                <p className="text-sm font-bold">{formatCurrency(item.value)}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Daily target */}
        <GlassCard className="flex items-center gap-6">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
              <path className="stroke-black/10" strokeWidth="3" fill="none" d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32" />
              <path
                className="stroke-accent"
                strokeWidth="3"
                strokeDasharray="70, 100"
                strokeLinecap="round"
                fill="none"
                d="M18 2 a16 16 0 1 1 0 32 a16 16 0 1 1 0 -32"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-ink dark:text-white">
              7/10
            </span>
          </div>
          <div>
            <p className="font-semibold text-ink dark:text-white">Today&apos;s Target</p>
            <p className="text-sm text-ink-muted">3 more leads to hit today&apos;s goal! 🎯</p>
          </div>
        </GlassCard>

        {/* Products */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-ink dark:text-white">Products</h3>
            <a href="/products" className="text-xs font-medium text-primary">View all</a>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {products.map((p) => (
              <GlassCard key={p.name} className="min-w-[160px] shrink-0">
                <div className={`inline-flex rounded-xl px-2 py-1 text-[10px] font-semibold ${p.color}`}>
                  Commission up to {p.payout}
                </div>
                <p className="mt-3 text-sm font-semibold text-ink dark:text-white">{p.name}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Leaderboard */}
          <GlassCard className="lg:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-accent" />
              <h3 className="font-semibold text-ink dark:text-white">Leaderboard</h3>
            </div>
            <div className="space-y-3">
              {leaderboard.map((l) => (
                <div key={l.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-gradient text-[11px] font-bold text-primary">
                      {l.rank}
                    </span>
                    <span className="text-sm text-ink dark:text-white">{l.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-success">{formatCurrency(l.earnings)}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 rounded-xl bg-primary/5 px-3 py-2 text-center text-xs font-medium text-primary">
              Your Rank: #23
            </p>
          </GlassCard>

          {/* Referral + Announcements */}
          <div className="space-y-6 lg:col-span-2">
            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-accent/10 p-2.5 text-accent">
                  <Gift size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink dark:text-white">Referral Income</p>
                  <p className="text-xs text-ink-muted">₹2,400 earned from referrals</p>
                </div>
              </div>
              <button className="btn-outline !py-2 !px-4 text-xs">Invite & Earn</button>
            </GlassCard>

            <GlassCard>
              <div className="mb-3 flex items-center gap-2">
                <Megaphone size={16} className="text-primary" />
                <h3 className="font-semibold text-ink dark:text-white">Announcements</h3>
              </div>
              <div className="space-y-2 text-sm text-ink-muted">
                <p>📢 New product launched: Star Health Insurance — ₹600 payout</p>
                <p>📢 Payout cycle updated — approvals now processed within 48 hrs</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Training + News */}
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <div className="mb-3 flex items-center gap-2">
              <PlayCircle size={16} className="text-primary" />
              <h3 className="font-semibold text-ink dark:text-white">Training Videos</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {['How to sell Personal Loans', 'KYC best practices', 'Handling objections'].map((t) => (
                <div key={t} className="min-w-[140px] rounded-2xl bg-primary/5 p-3">
                  <div className="flex h-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <PlayCircle size={22} />
                  </div>
                  <p className="mt-2 text-xs font-medium text-ink dark:text-white">{t}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-3 flex items-center gap-2">
              <Newspaper size={16} className="text-primary" />
              <h3 className="font-semibold text-ink dark:text-white">Latest News</h3>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-ink dark:text-white">RBI revises personal loan guidelines for FY26</p>
              <p className="text-xs text-ink-muted">Financial Express · 2 hours ago</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Floating support chat */}
      <button className="fixed bottom-24 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient shadow-gold md:bottom-8">
        <MessageCircle className="text-primary" size={22} />
      </button>
    </AppShell>
  );
}

'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { CountUp } from '@/components/ui/CountUp';
import { Download, Search, ArrowDownLeft, ArrowUpRight, Filter } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const transactions = [
  { id: '1', type: 'credit', desc: 'Personal Loan — Lead #EWS-LD-2026-004521', amount: 1000, status: 'Approved', date: '2026-07-14' },
  { id: '2', type: 'withdraw', desc: 'Withdrawal to UPI', amount: -5000, status: 'Completed', date: '2026-07-12' },
  { id: '3', type: 'credit', desc: 'Term Insurance — Lead #EWS-LD-2026-004490', amount: 800, status: 'Pending', date: '2026-07-11' },
  { id: '4', type: 'bonus', desc: 'Monthly target bonus', amount: 500, status: 'Approved', date: '2026-07-10' },
];

export default function WalletPage() {
  const [search, setSearch] = useState('');

  return (
    <AppShell>
      <div className="space-y-6">
        <GlassCard goldBorder className="!bg-brand-gradient text-white">
          <p className="text-xs text-white/70">Wallet Balance</p>
          <CountUp value={48250} prefix="₹" className="text-3xl font-extrabold" />
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
            {[
              ['Lifetime', 92400],
              ['Pending', 6250],
              ['Approved', 42000],
              ['Rejected', 1800],
              ['Bonus', 2100],
              ['Referral', 2400],
            ].map(([label, val]) => (
              <div key={label as string} className="rounded-2xl bg-white/10 p-3">
                <p className="text-[10px] text-white/70">{label}</p>
                <p className="text-sm font-bold">{formatCurrency(val as number)}</p>
              </div>
            ))}
          </div>
          <button className="btn-gold mt-6 !py-2.5 !px-6 text-sm">Withdraw Funds</button>
        </GlassCard>

        <GlassCard>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-ink dark:text-white">Transaction History</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2">
                <Search size={14} className="text-ink-muted" />
                <input
                  placeholder="Search transactions"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-40 bg-transparent text-xs outline-none"
                />
              </div>
              <button className="rounded-xl border border-black/10 p-2 text-ink-muted">
                <Filter size={14} />
              </button>
              <button className="btn-outline !py-2 !px-3 text-xs">
                <Download size={14} /> PDF
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {transactions
              .filter((t) => t.desc.toLowerCase().includes(search.toLowerCase()))
              .map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 transition-colors hover:bg-primary/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl p-2 ${
                        t.amount >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      }`}
                    >
                      {t.amount >= 0 ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink dark:text-white">{t.desc}</p>
                      <p className="text-xs text-ink-muted">{formatDate(t.date)} · {t.status}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${t.amount >= 0 ? 'text-success' : 'text-error'}`}>
                    {t.amount >= 0 ? '+' : ''}{formatCurrency(t.amount)}
                  </p>
                </div>
              ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}

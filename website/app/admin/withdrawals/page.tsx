'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Check, X, Banknote } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const withdrawals = [
  { id: '1', code: 'EWS-WD-2026-000045', name: 'Amit Verma', amount: 5000, mode: 'UPI', status: 'Pending', date: '2026-07-14' },
  { id: '2', code: 'EWS-WD-2026-000044', name: 'Priya Singh', amount: 12000, mode: 'Bank', status: 'Approved', date: '2026-07-13' },
  { id: '3', code: 'EWS-WD-2026-000041', name: 'Rohit Kumar', amount: 3200, mode: 'UPI', status: 'Completed', date: '2026-07-11' },
];

const statusColors: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning',
  Approved: 'bg-primary/10 text-primary',
  Completed: 'bg-success/10 text-success',
  Rejected: 'bg-error/10 text-error',
};

export default function AdminWithdrawalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-white">Withdraw Requests</h1>
        <p className="text-sm text-ink-muted">Minimum withdrawal ₹500. Every action requires manual approval.</p>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs uppercase text-ink-muted">
                <th className="pb-3">Request ID</th>
                <th className="pb-3">User</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Mode</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Requested</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w.id} className="border-b border-black/5 last:border-0">
                  <td className="py-3 font-mono text-xs text-primary">{w.code}</td>
                  <td className="py-3 font-medium text-ink dark:text-white">{w.name}</td>
                  <td className="py-3 font-semibold">{formatCurrency(w.amount)}</td>
                  <td className="py-3 text-ink-muted">{w.mode}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColors[w.status]}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="py-3 text-ink-muted">{formatDate(w.date)}</td>
                  <td className="py-3">
                    {w.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 rounded-lg bg-success/10 px-2.5 py-1.5 text-xs font-semibold text-success">
                          <Check size={12} /> Approve
                        </button>
                        <button className="flex items-center gap-1 rounded-lg bg-error/10 px-2.5 py-1.5 text-xs font-semibold text-error">
                          <X size={12} /> Reject
                        </button>
                      </div>
                    )}
                    {w.status === 'Approved' && (
                      <button className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary">
                        <Banknote size={12} /> Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

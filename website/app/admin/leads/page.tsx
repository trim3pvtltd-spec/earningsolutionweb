'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Search, Download, MapPin, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const leads = [
  { id: '1', code: 'EWS-LD-2026-004521', name: 'Suresh Yadav', mobile: '9876543210', product: 'Personal Loan', state: 'Uttar Pradesh', executive: 'Amit Verma', status: 'Pending', date: '2026-07-14' },
  { id: '2', code: 'EWS-LD-2026-004518', name: 'Neha Gupta', mobile: '9123456780', product: 'Term Insurance', state: 'Delhi', executive: 'Priya Singh', status: 'In Process', date: '2026-07-13' },
  { id: '3', code: 'EWS-LD-2026-004510', name: 'Vikram Rao', mobile: '9988776655', product: 'Kotak 811 Classic', state: 'Maharashtra', executive: 'Rohit Kumar', status: 'Approved', date: '2026-07-12' },
];

const statusColors: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning',
  'In Process': 'bg-primary/10 text-primary',
  Approved: 'bg-success/10 text-success',
  Rejected: 'bg-error/10 text-error',
  Duplicate: 'bg-ink-muted/10 text-ink-muted',
};

export default function AdminLeadsPage() {
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-white">Lead Management</h1>
          <p className="text-sm text-ink-muted">Review and manually update lead status.</p>
        </div>
        <button className="btn-outline !py-2.5 !px-5 text-sm">
          <Download size={16} /> Export Excel
        </button>
      </div>

      <GlassCard>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 md:w-72">
            <Search size={14} className="text-ink-muted" />
            <input placeholder="Search by name, mobile, Lead ID" className="w-full bg-transparent text-sm outline-none" />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-xs text-ink-muted">
            <Filter size={14} /> Status
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-xs text-ink-muted">
            <Filter size={14} /> Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs uppercase text-ink-muted">
                <th className="pb-3">Lead ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Product</th>
                <th className="pb-3">Executive</th>
                <th className="pb-3">State</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setSelectedLead(l)}
                  className="cursor-pointer border-b border-black/5 last:border-0 hover:bg-primary/5"
                >
                  <td className="py-3 font-mono text-xs text-primary">{l.code}</td>
                  <td className="py-3 font-medium text-ink dark:text-white">{l.name}<br /><span className="text-xs text-ink-muted">{l.mobile}</span></td>
                  <td className="py-3 text-ink-muted">{l.product}</td>
                  <td className="py-3 text-ink-muted">{l.executive}</td>
                  <td className="py-3 text-ink-muted">{l.state}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColors[l.status]}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3 text-ink-muted">{formatDate(l.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Lead detail / status update panel */}
      {selectedLead && (
        <div className="fixed inset-0 z-40 flex items-center justify-end bg-black/40" onClick={() => setSelectedLead(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card !bg-white h-full w-full max-w-md overflow-y-auto !rounded-l-3xl !rounded-r-none p-6"
          >
            <h3 className="text-lg font-bold text-ink">{selectedLead.name}</h3>
            <p className="font-mono text-xs text-primary">{selectedLead.code}</p>

            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-ink-muted">Mobile:</span> {selectedLead.mobile}</p>
              <p><span className="text-ink-muted">Product:</span> {selectedLead.product}</p>
              <p><span className="text-ink-muted">Executive:</span> {selectedLead.executive}</p>
              <p className="flex items-center gap-1"><MapPin size={12} className="text-ink-muted" /> {selectedLead.state}</p>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase text-ink-muted">Update Status</p>
              <div className="grid grid-cols-2 gap-2">
                {['Pending', 'In Process', 'Approved', 'Rejected', 'Duplicate'].map((s) => (
                  <button
                    key={s}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                      selectedLead.status === s
                        ? 'border-transparent bg-brand-gradient text-white'
                        : 'border-black/10 text-ink-muted hover:border-primary/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-accent/10 p-3 text-xs text-ink">
                ⚠️ Marking as <b>Approved</b> will prompt a confirmation to credit ₹1,000 commission
                to {selectedLead.executive}&apos;s wallet. This is a manual, explicit action — nothing is credited automatically.
              </div>
              <button className="btn-primary mt-4 w-full !py-2.5 text-sm">Confirm Status Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

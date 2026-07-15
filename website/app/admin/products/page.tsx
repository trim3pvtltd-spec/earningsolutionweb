'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Search, Plus, Edit3, ExternalLink, History, Check, X } from 'lucide-react';

const products = [
  { id: '1', title: 'Kotak 811 Classic', category: 'Bank Account', payout: 400, status: 'Active', link: 'https://example-bank.com/kotak-811-classic' },
  { id: '2', title: 'Personal Loan - Bajaj Finserv', category: 'Loan', payout: 1000, status: 'Active', link: 'https://example-loan.com/bajaj-personal' },
  { id: '3', title: 'Term Life - Max Life', category: 'Insurance', payout: 800, status: 'Active', link: 'https://example-insurance.com/maxlife-term' },
  { id: '4', title: 'Upstox Demat Account', category: 'Demat Account', payout: 200, status: 'Inactive', link: 'https://example-broker.com/upstox' },
];

export default function AdminProductsPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [linkDraft, setLinkDraft] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink dark:text-white">Products</h1>
          <p className="text-sm text-ink-muted">Manage catalog and affiliate links — changes go live instantly.</p>
        </div>
        <button className="btn-primary !py-2.5 !px-5 text-sm">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <GlassCard>
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 md:w-80">
          <Search size={14} className="text-ink-muted" />
          <input
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs uppercase text-ink-muted">
                <th className="pb-3">Product</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Payout</th>
                <th className="pb-3">Affiliate Link</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
                .map((p) => (
                  <tr key={p.id} className="border-b border-black/5 last:border-0">
                    <td className="py-3 font-medium text-ink dark:text-white">{p.title}</td>
                    <td className="py-3 text-ink-muted">{p.category}</td>
                    <td className="py-3 font-semibold text-success">₹{p.payout}</td>
                    <td className="py-3">
                      {editingId === p.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={linkDraft}
                            onChange={(e) => setLinkDraft(e.target.value)}
                            className="w-56 rounded-lg border border-accent/40 px-2 py-1 text-xs outline-none"
                          />
                          <button
                            onClick={() => setEditingId(null)}
                            className="rounded-lg bg-success/10 p-1.5 text-success"
                            title="Save — this updates instantly for all users"
                          >
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditingId(null)} className="rounded-lg bg-error/10 p-1.5 text-error">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-ink-muted">
                          <span className="max-w-[180px] truncate">{p.link}</span>
                          <ExternalLink size={12} />
                        </div>
                      )}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          p.status === 'Active' ? 'bg-success/10 text-success' : 'bg-ink-muted/10 text-ink-muted'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(p.id);
                            setLinkDraft(p.link);
                          }}
                          className="rounded-lg bg-primary/10 p-1.5 text-primary"
                          title="Edit affiliate link"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button className="rounded-lg bg-black/5 p-1.5 text-ink-muted" title="Link change history">
                          <History size={14} />
                        </button>
                      </div>
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

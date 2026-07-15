'use client';

import { StatCard } from '@/components/ui/StatCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Users, TrendingUp, Clock, Target, Trophy, MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

const revenueData = [
  { month: 'Feb', revenue: 145000 }, { month: 'Mar', revenue: 168000 },
  { month: 'Apr', revenue: 152000 }, { month: 'May', revenue: 189000 },
  { month: 'Jun', revenue: 210000 }, { month: 'Jul', revenue: 198000 },
];

const topProducts = [
  { name: 'Personal Loan', leads: 342 },
  { name: 'Term Insurance', leads: 289 },
  { name: 'Kotak 811 Classic', leads: 251 },
  { name: 'Credit Card', leads: 198 },
];

const topExecutives = [
  { name: 'Amit Verma', earnings: 82000, leads: 64 },
  { name: 'Priya Singh', earnings: 74500, leads: 58 },
  { name: 'Rohit Kumar', earnings: 68200, leads: 51 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink dark:text-white">Dashboard</h1>
        <p className="text-sm text-ink-muted">Welcome back — here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Today's Leads" value={47} icon={Users} trend={12.5} />
        <StatCard label="Today's Earnings" value={38200} prefix="₹" icon={TrendingUp} trend={8.2} tone="success" />
        <StatCard label="Pending Leads" value={132} icon={Clock} tone="warning" />
        <StatCard label="Conversion Rate" value={64} icon={Target} tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <h3 className="mb-4 font-semibold text-ink dark:text-white">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#0B3D91" strokeWidth={3} dot={{ fill: '#D4AF37', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <div className="mb-3 flex items-center gap-2">
            <Trophy size={16} className="text-accent" />
            <h3 className="font-semibold text-ink dark:text-white">Top Executives</h3>
          </div>
          <div className="space-y-3">
            {topExecutives.map((e, i) => (
              <div key={e.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-gradient text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-white">{e.name}</p>
                    <p className="text-[11px] text-ink-muted">{e.leads} leads approved</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-success">{formatCurrency(e.earnings)}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h3 className="mb-4 font-semibold text-ink dark:text-white">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium text-ink dark:text-white">{p.name}</span>
                  <span className="text-ink-muted">{p.leads} leads</span>
                </div>
                <div className="h-2 rounded-full bg-primary/10">
                  <div
                    className="h-2 rounded-full bg-gold-gradient"
                    style={{ width: `${(p.leads / 342) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="mb-3 flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <h3 className="font-semibold text-ink dark:text-white">State Wise Sales</h3>
          </div>
          <div className="space-y-2">
            {[
              ['Uttar Pradesh', 412], ['Maharashtra', 356], ['Delhi', 298], ['Karnataka', 241],
            ].map(([state, count]) => (
              <div key={state as string} className="flex items-center justify-between text-sm">
                <span className="text-ink dark:text-white">{state}</span>
                <span className="font-semibold text-primary">{count}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Package, Link2, ClipboardList, Wallet,
  Banknote, BarChart3, MapPin, Bell, Image as ImageIcon, HeadphonesIcon,
  PlayCircle, Settings, Shield, FileClock, LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navGroups = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Operations',
    items: [
      { href: '/admin/users', label: 'Users', icon: Users },
      { href: '/admin/products', label: 'Products', icon: Package },
      { href: '/admin/leads', label: 'Lead Management', icon: ClipboardList },
      { href: '/admin/wallet', label: 'Wallet', icon: Wallet },
      { href: '/admin/withdrawals', label: 'Withdraw Requests', icon: Banknote },
    ],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/locations', label: 'States & Cities', icon: MapPin },
      { href: '/admin/notifications', label: 'Notifications', icon: Bell },
      { href: '/admin/banners', label: 'Banner Management', icon: ImageIcon },
      { href: '/admin/support', label: 'Support', icon: HeadphonesIcon },
      { href: '/admin/training', label: 'Training Videos', icon: PlayCircle },
    ],
  },
  {
    title: 'System',
    items: [
      { href: '/admin/settings', label: 'Settings', icon: Settings },
      { href: '/admin/security', label: 'Security', icon: Shield },
      { href: '/admin/logs', label: 'Logs', icon: FileClock },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-surface dark:bg-surface-dark">
      <aside className="flex w-64 shrink-0 flex-col border-r border-black/5 bg-white/70 p-5 backdrop-blur-glass dark:border-white/5 dark:bg-surface-dark/80">
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-gradient font-bold text-primary">E</div>
          <div>
            <p className="text-sm font-bold text-ink dark:text-white">Admin Panel</p>
            <p className="text-[10px] text-ink-muted">Earning with Solution</p>
          </div>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'bg-brand-gradient text-white shadow-soft'
                          : 'text-ink-muted hover:bg-primary/5 hover:text-primary',
                      )}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <button className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-error hover:bg-error/5">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6">{children}</main>
    </div>
  );
}

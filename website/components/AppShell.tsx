'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Wallet, Package, Users, HeadphonesIcon, Bell, Moon, Sun,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/leads', label: 'My Leads', icon: Users },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  return (
    <div className={cn(dark && 'dark')}>
      <div className="min-h-screen bg-surface pb-24 dark:bg-surface-dark md:pb-0 md:pl-64">
        {/* Sidebar — desktop */}
        <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-black/5 bg-white/70 p-6 backdrop-blur-glass dark:border-white/5 dark:bg-surface-dark/80 md:flex">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-gradient font-bold text-primary">E</div>
            <span className="font-bold text-ink dark:text-white">Earning with Solution</span>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                    active
                      ? 'bg-brand-gradient text-white shadow-soft'
                      : 'text-ink-muted hover:bg-primary/5 hover:text-primary',
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-ink-muted hover:bg-primary/5"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </aside>

        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-black/5 bg-white/70 px-6 py-4 backdrop-blur-glass dark:border-white/5 dark:bg-surface-dark/80">
          <div>
            <p className="text-xs text-ink-muted">Namaste 👋</p>
            <p className="text-sm font-semibold text-ink dark:text-white">Rahul Sharma</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full bg-primary/5 p-2.5 text-primary">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
            </button>
            <div className="h-9 w-9 rounded-full bg-brand-gradient" />
          </div>
        </header>

        <main className="px-6 py-6">{children}</main>

        {/* Bottom nav — mobile */}
        <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-black/5 bg-white/90 py-2 backdrop-blur-glass dark:border-white/5 dark:bg-surface-dark/90 md:hidden">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium', active ? 'text-primary' : 'text-ink-muted')}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

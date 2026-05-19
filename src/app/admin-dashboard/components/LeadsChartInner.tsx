'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '01 Mai', quotes: 2, contacts: 1 },
  { date: '03 Mai', quotes: 1, contacts: 3 },
  { date: '05 Mai', quotes: 4, contacts: 2 },
  { date: '07 Mai', quotes: 3, contacts: 1 },
  { date: '09 Mai', quotes: 5, contacts: 4 },
  { date: '11 Mai', quotes: 2, contacts: 2 },
  { date: '13 Mai', quotes: 6, contacts: 3 },
  { date: '15 Mai', quotes: 4, contacts: 5 },
  { date: '17 Mai', quotes: 7, contacts: 2 },
  { date: '18 Mai', quotes: 5, contacts: 3 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={`tooltip-${entry.name}`} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name === 'quotes' ? 'Devis' : 'Contacts'} :</span>
            <span className="font-semibold text-foreground tabular-nums">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function LeadsChartInner() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Leads Entrants</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Devis et messages contact — 18 derniers jours</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary opacity-80" />
            Devis
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-accent opacity-80" />
            Contacts
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradQuotes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradContacts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="quotes" stroke="var(--primary)" strokeWidth={2} fill="url(#gradQuotes)" />
          <Area type="monotone" dataKey="contacts" stroke="var(--accent)" strokeWidth={2} fill="url(#gradContacts)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
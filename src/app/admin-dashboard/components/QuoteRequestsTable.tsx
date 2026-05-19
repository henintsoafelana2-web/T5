'use client';
import React, { useState } from 'react';
import { Eye, Check, X, Clock, ChevronUp, ChevronDown, Search } from 'lucide-react';

type Status = 'new' | 'in_review' | 'quoted' | 'accepted' | 'rejected';

const statusConfig: Record<Status, { label: string; color: string; bg: string }> = {
  new: { label: 'Nouveau', color: 'text-warning', bg: 'bg-warning/10' },
  in_review: { label: 'En cours', color: 'text-primary', bg: 'bg-primary/10' },
  quoted: { label: 'Devisé', color: 'text-accent', bg: 'bg-accent/10' },
  accepted: { label: 'Accepté', color: 'text-success', bg: 'bg-success/10' },
  rejected: { label: 'Refusé', color: 'text-danger', bg: 'bg-danger/10' },
};

const quotes = [
  { id: 'quote-001', ref: 'DEV-2026-047', client: 'Rakotomalala Jean-Pierre', email: 'jp.rakoto@mobijob.mg', project: 'Plateforme RH avec dashboard', budget: '3 000 000 Ar', deadline: '2 mois', status: 'new' as Status, date: '18 Mai 2026', service: 'Développement Web' },
  { id: 'quote-002', ref: 'DEV-2026-046', client: 'Razafindrakoto Miora', email: 'miora@bazarmada.com', project: 'Refonte site e-commerce', budget: '1 500 000 Ar', deadline: '6 sem.', status: 'in_review' as Status, date: '17 Mai 2026', service: 'E-Commerce' },
  { id: 'quote-003', ref: 'DEV-2026-045', client: 'Andrianasolo Hery', email: 'hery.a@gasypay.mg', project: 'App mobile fintech iOS/Android', budget: '5 000 000 Ar', deadline: '3 mois', status: 'quoted' as Status, date: '16 Mai 2026', service: 'Mobile' },
  { id: 'quote-004', ref: 'DEV-2026-044', client: 'Raharisoa Fenitra', email: 'fenitra@techmada.mg', project: 'Identité visuelle + site vitrine', budget: '800 000 Ar', deadline: '3 sem.', status: 'accepted' as Status, date: '15 Mai 2026', service: 'Design' },
  { id: 'quote-005', ref: 'DEV-2026-043', client: 'Randriamahefa Lova', email: 'lova.r@gmail.com', project: 'Blog personnel + SEO', budget: '400 000 Ar', deadline: '2 sem.', status: 'new' as Status, date: '14 Mai 2026', service: 'Web' },
  { id: 'quote-006', ref: 'DEV-2026-042', client: 'Rakoto Zo Andriana', email: 'zo@axian.mg', project: 'Dashboard analytiques interne', budget: '2 200 000 Ar', deadline: '6 sem.', status: 'in_review' as Status, date: '13 Mai 2026', service: 'Développement Web' },
  { id: 'quote-007', ref: 'DEV-2026-041', client: 'Rasolofoson Aina', email: 'aina.raso@canal.mg', project: 'Portail client streaming', budget: '4 000 000 Ar', deadline: '4 mois', status: 'rejected' as Status, date: '12 Mai 2026', service: 'Web' },
  { id: 'quote-008', ref: 'DEV-2026-040', client: 'Randria Fanja', email: 'fanja@jovenna.mg', project: 'Application gestion stations', budget: '3 500 000 Ar', deadline: '3 mois', status: 'accepted' as Status, date: '11 Mai 2026', service: 'Mobile' },
];

type SortField = 'date' | 'client' | 'budget' | 'status';

export default function QuoteRequestsTable() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = quotes.filter((q) => {
    const matchSearch = q.client.toLowerCase().includes(search.toLowerCase()) ||
      q.ref.toLowerCase().includes(search.toLowerCase()) ||
      q.project.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map((q) => q.id));
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp size={10} className={sortField === field && sortAsc ? 'text-primary' : 'text-muted-foreground/40'} />
      <ChevronDown size={10} className={sortField === field && !sortAsc ? 'text-primary' : 'text-muted-foreground/40'} />
    </span>
  );

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex flex-wrap items-center gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">Demandes de Devis</h3>
          <p className="text-xs text-muted-foreground">{filtered.length} demandes</p>
        </div>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="pl-8 pr-3 py-1.5 bg-muted/50 border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 w-44 transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-muted/50 border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-primary/50 transition-colors"
          >
            <option value="all">Tous les statuts</option>
            <option value="new">Nouveau</option>
            <option value="in_review">En cours</option>
            <option value="quoted">Devisé</option>
            <option value="accepted">Accepté</option>
            <option value="rejected">Refusé</option>
          </select>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.length > 0 && (
        <div className="px-5 py-2.5 bg-primary/10 border-b border-primary/20 flex items-center gap-3">
          <span className="text-xs font-medium text-primary">{selectedIds.length} sélectionné(s)</span>
          <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-success bg-success/10 rounded-lg hover:bg-success/20 transition-colors">
            <Check size={12} /> Marquer traité
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-danger bg-danger/10 rounded-lg hover:bg-danger/20 transition-colors">
            <X size={12} /> Archiver
          </button>
          <button onClick={() => setSelectedIds([])} className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors">
            Désélectionner
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                  className="rounded border-border accent-primary"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Réf.</th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => handleSort('client')}
              >
                Client <SortIcon field="client" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Projet</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Service</th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => handleSort('budget')}
              >
                Budget <SortIcon field="budget" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => handleSort('status')}
              >
                Statut <SortIcon field="status" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => handleSort('date')}
              >
                Date <SortIcon field="date" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((quote) => {
              const sc = statusConfig[quote.status];
              const isSelected = selectedIds.includes(quote.id);
              return (
                <tr
                  key={quote.id}
                  className={`border-b border-border last:border-0 transition-colors duration-150 ${isSelected ? 'bg-primary/5' : 'hover:bg-muted/30'}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(quote.id)}
                      className="rounded border-border accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-muted-foreground">{quote.ref}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-foreground whitespace-nowrap">{quote.client}</div>
                      <div className="text-xs text-muted-foreground">{quote.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground max-w-[180px] truncate block">{quote.project}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{quote.service}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-foreground whitespace-nowrap tabular-nums">{quote.budget}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.color}`}>
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{quote.date}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        title="Voir les détails"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-150"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        title="Marquer comme traité"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-success hover:bg-success/10 transition-all duration-150"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        title="Rejeter la demande"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all duration-150"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {/* Show actions always on mobile */}
                    <div className="flex items-center gap-1 lg:hidden">
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-muted-foreground hover:text-success hover:bg-success/10 transition-all">
                        <Check size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <MessageSquareIcon />
            <p className="text-sm font-semibold text-foreground mt-3">Aucune demande de devis</p>
            <p className="text-xs text-muted-foreground mt-1">Les nouvelles demandes apparaîtront ici</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{filtered.length} résultats</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((page) => (
            <button
              key={`page-${page}`}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${page === 1 ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
            >
              {page}
            </button>
          ))}
        </div>
        <select className="px-2 py-1 bg-muted/50 border border-border rounded-lg text-xs text-foreground focus:outline-none">
          <option>10 / page</option>
          <option>25 / page</option>
          <option>50 / page</option>
        </select>
      </div>
    </div>
  );
}

function MessageSquareIcon() {
  return (
    <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto">
      <Clock size={24} className="text-muted-foreground" />
    </div>
  );
}
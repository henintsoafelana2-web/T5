import AdminLayout from './components/AdminLayout';
import DashboardKpis from './components/DashboardKpis';
import QuoteRequestsTable from './components/QuoteRequestsTable';
import LeadsChart from './components/LeadsChart';
import ContentHealthPanel from './components/ContentHealthPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import QuickActions from './components/QuickActions';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tableau de Bord</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Vue d&apos;ensemble — T5-SERVICES Admin</p>
          </div>
          <QuickActions />
        </div>

        {/* KPI cards */}
        <DashboardKpis />

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <LeadsChart />
          </div>
          <div className="xl:col-span-1">
            <ContentHealthPanel />
          </div>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <QuoteRequestsTable />
          </div>
          <div className="xl:col-span-1">
            <RecentActivityFeed />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
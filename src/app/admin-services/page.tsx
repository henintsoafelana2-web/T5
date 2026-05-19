import React from 'react';
import AdminLayout from '../admin-dashboard/components/AdminLayout';
import ServicesList from './components/ServicesList';

export default function AdminServicesPage() {
  return (
    <AdminLayout>
      <ServicesList />
    </AdminLayout>
  );
}

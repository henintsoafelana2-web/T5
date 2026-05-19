import React from 'react';
import AdminLayout from '../../admin-dashboard/components/AdminLayout';
import ServiceForm from '../components/ServiceForm';

export default function NewServicePage() {
  return (
    <AdminLayout>
      <ServiceForm />
    </AdminLayout>
  );
}

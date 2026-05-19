'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '../../../admin-dashboard/components/AdminLayout';
import ServiceForm from '../../components/ServiceForm';

export default function EditServicePage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params?.id : Array.isArray(params?.id) ? params?.id?.[0] : '';

  return (
    <AdminLayout>
      <ServiceForm serviceId={id} />
    </AdminLayout>
  );
}

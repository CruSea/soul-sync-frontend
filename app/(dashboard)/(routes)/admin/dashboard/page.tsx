'use client';
import AdminView from '@/components/views/admin/dashboard';
import withAuth from '@/context/withAuth';
import React from 'react';

function Admin() {
  return <AdminView />;
}

export default withAuth(Admin);

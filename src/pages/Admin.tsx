
import React from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import { useAppContext } from '@/contexts/AppContext';

const Admin: React.FC = () => {
  const { isAdmin } = useAppContext();

  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;

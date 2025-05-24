import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, userRole, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/auth/admin/sign-in" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
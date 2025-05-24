import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import React from 'react';
import Chat from './components/Chat';

// Layout components
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Page components
import HomePage from "./pages/HomePage";
import DetectionPage from "./pages/DetectionPage";
import ResultPage from "./pages/ResultPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import DiseaseInfoPage from "./pages/DiseaseInfoPage";
import NotificationsPage from "./pages/NotificationsPage";
import FarmerDashboardPage from "./pages/FarmerDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminMessagesPage from "./pages/AdminMessagesPage";
import FarmerSignInPage from "./pages/auth/FarmerSignInPage";
import FarmerSignUpPage from "./pages/auth/FarmerSignUpPage";
import AdminSignInPage from "./pages/auth/AdminSignInPage";
import NotFoundPage from "./pages/NotFoundPage";

// Components
import ScrollToTop from "./components/ScrollToTop";

// Get the Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? '';

if (!clerkPubKey) {
  throw new Error("Missing Clerk publishable key");
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <AuthProvider>
          <LanguageProvider>
            <ScrollToTop />
            <Chat />
            <AppRoutes />
          </LanguageProvider>
        </AuthProvider>
      </Router>
    </ClerkProvider>
  );
}

// Protected route component for farmers
const FarmerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, userRole, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || userRole !== 'farmer') {
    return <Navigate to="/auth/farmer/sign-in" />;
  }

  return <>{children}</>;
};

// Protected route component for admins
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, userRole, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/auth/admin/sign-in" />;
  }

  return <>{children}</>;
};

// Routes component
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth/farmer/sign-in/*" element={<FarmerSignInPage />} />
      <Route path="/auth/farmer/sign-up/*" element={<FarmerSignUpPage />} />
      <Route path="/auth/admin/sign-in/*" element={<AdminSignInPage />} />

      {/* Main layout routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/detection" element={<DetectionPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/recommendations/:diseaseId" element={<RecommendationsPage />} />
        <Route path="/disease-info" element={<DiseaseInfoPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route
          path="/dashboard"
          element={
            <FarmerRoute>
              <FarmerDashboardPage />
            </FarmerRoute>
          }
        />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="messages"
          element={
            <AdminRoute>
              <AdminMessagesPage />
            </AdminRoute>
          }
        />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

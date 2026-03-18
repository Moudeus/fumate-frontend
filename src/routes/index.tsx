import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import HomePage from '../pages/Home/HomePage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import ManageUserPage from '../pages/Admin/ManageUserPage';
import MBTIIntroPage from '../pages/MBTI/MBTIIntroPage';
import MBTIQuizPage from '../pages/MBTI/MBTIQuizPage';
import MBTIResultPage from '../pages/MBTI/MBTIResultPage';
import CareerListPage from '../pages/Career/CareerListPage';
import UniversityListPage from '../pages/University/UniversityListPage';

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(249, 115, 22, 0.2)',
            borderTopColor: '#f97316',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Đang tải...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/dashboard"
          element={isAuthenticated ? <AdminDashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/users"
          element={isAuthenticated ? <ManageUserPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/mbti/intro"
          element={isAuthenticated ? <MBTIIntroPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/mbti/quiz"
          element={isAuthenticated ? <MBTIQuizPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/mbti/result"
          element={isAuthenticated ? <MBTIResultPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/careers/major/:majorId"
          element={isAuthenticated ? <CareerListPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/universities/major/:majorId"
          element={isAuthenticated ? <UniversityListPage /> : <Navigate to="/login" />}
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

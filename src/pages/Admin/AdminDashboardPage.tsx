import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getAdminStats, AdminStats } from '../../apis/UsersAPI/GET';
import './styles/AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdminStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
        setError('Không thể tải dữ liệu thống kê');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-page">
        <div className="container">
          <div className="error-message glass-card">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="action-btn">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="admin-dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header glass-card animate-fade-in">
          <div className="header-content">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Xin chào, <span className="gradient-text">{user?.firstName} {user?.lastName}</span></p>
            </div>
            <div className="admin-badge">
              <span>👑</span>
              <span>Quản trị viên</span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Only 2 stats */}
        <div className="stats-grid stats-grid-simple">
          {/* Total Users */}
          <div className="stat-card glass-card animate-slide-in">
            <div className="stat-icon users">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Tổng người dùng</h3>
              <p className="stat-value">{stats.totalUsers.toLocaleString()}</p>
              <span className="stat-change positive">+{stats.newUsersThisMonth} tháng này</span>
            </div>
          </div>

          {/* MBTI Tests */}
          <div className="stat-card glass-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="stat-icon tests">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Bài test MBTI hoàn thành</h3>
              <p className="stat-value">{stats.mbtiTestsCompleted.toLocaleString()}</p>
              <span className="stat-change">
                {stats.totalUsers > 0 
                  ? `${Math.round((stats.mbtiTestsCompleted / stats.totalUsers) * 100)}% người dùng`
                  : '0% người dùng'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2>Thao tác nhanh</h2>
          <div className="quick-actions-grid">
            <button className="quick-action-card" onClick={() => navigate('/admin/users')}>
              <div className="action-icon users">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="action-content">
                <h3>Quản lý người dùng</h3>
                <p>Xem và quản lý tất cả người dùng</p>
              </div>
              <div className="action-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

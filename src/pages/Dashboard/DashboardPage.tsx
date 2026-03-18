import { useAuth } from '../../hooks/useAuth';
import './styles/DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header glass-card animate-fade-in">
          <h1>Dashboard</h1>
          <div className="user-info">
            <p>Xin chào, <span className="gradient-text">{user?.firstName} {user?.lastName}</span></p>
            {user?.mbtiType && (
              <div className="mbti-badge">
                <span className="mbti-label">MBTI:</span>
                <span className="mbti-type">{user.mbtiType}</span>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card glass-card animate-slide-in">
            <h3>Thông tin cá nhân</h3>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Vai trò:</span>
              <span className="value badge">{user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</span>
            </div>
            <div className="info-row">
              <span className="label">Trạng thái:</span>
              <span className="value badge success">{user?.isActive ? 'Đang hoạt động' : 'Không hoạt động'}</span>
            </div>
            <div className="info-row">
              <span className="label">Xác thực:</span>
              <span className="value badge success">{user?.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}</span>
            </div>
            <div className="info-row">
              <span className="label">Gói dịch vụ:</span>
              <span className="value badge">{user?.subscriptionTier === 'free' ? 'Miễn phí' : user?.subscriptionTier === 'premium' ? 'Premium' : 'Enterprise'}</span>
            </div>
          </div>

          <div className="dashboard-card glass-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <h3>Hoạt động gần đây</h3>
            <p className="empty-state">Chưa có hoạt động nào</p>
          </div>

          <div className="dashboard-card glass-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <h3>Thống kê</h3>
            <p className="empty-state">Dữ liệu đang được cập nhật</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

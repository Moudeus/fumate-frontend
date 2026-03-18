import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, User } from '../../apis/UsersAPI/GET';
import './styles/ManageUserPage.css';

const ManageUserPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers(page, limit);
      setUsers(data.items);
      setTotalPages(data.pagination.totalPages);
      setTotal(data.pagination.total);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <span className="badge badge-admin">Admin</span>
    ) : (
      <span className="badge badge-user">User</span>
    );
  };

  const getStatusBadge = (isActive: boolean, isVerified: boolean) => {
    if (!isActive) {
      return <span className="badge badge-inactive">Không hoạt động</span>;
    }
    if (!isVerified) {
      return <span className="badge badge-unverified">Chưa xác thực</span>;
    }
    return <span className="badge badge-active">Hoạt động</span>;
  };

  const getSubscriptionBadge = (tier: string) => {
    const badges = {
      free: <span className="badge badge-free">Free</span>,
      premium: <span className="badge badge-premium">Premium</span>,
      enterprise: <span className="badge badge-enterprise">Enterprise</span>
    };
    return badges[tier as keyof typeof badges] || badges.free;
  };

  if (loading && currentPage === 1) {
    return (
      <div className="manage-user-page">
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
      <div className="manage-user-page">
        <div className="container">
          <div className="error-message glass-card">
            <p>{error}</p>
            <button onClick={() => fetchUsers(currentPage)} className="action-btn">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-user-page">
      <div className="container">
        {/* Header */}
        <div className="page-header glass-card animate-fade-in">
          <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Quay lại
          </button>
          <div className="header-content">
            <h1>Quản lý người dùng</h1>
            <p>Tổng số: <span className="gradient-text">{total}</span> người dùng</p>
          </div>
        </div>

        {/* User Table */}
        <div className="table-container glass-card animate-slide-in">
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Gói</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Đăng nhập cuối</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{(currentPage - 1) * limit + index + 1}</td>
                    <td className="user-name">
                      <div className="user-avatar">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                      <span>{user.firstName} {user.lastName}</span>
                    </td>
                    <td className="user-email">{user.email}</td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>{getSubscriptionBadge(user.subscriptionTier)}</td>
                    <td>{getStatusBadge(user.isActive, user.isVerified)}</td>
                    <td className="date-cell">{formatDate(user.createdAt)}</td>
                    <td className="date-cell">
                      {user.lastLogin ? formatDate(user.lastLogin) : (
                        <span className="text-muted">Chưa đăng nhập</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                Trước
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
              >
                Sau
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          )}

          {loading && (
            <div className="loading-overlay">
              <div className="spinner-small"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;

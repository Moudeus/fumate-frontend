import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { login as loginAPI } from '../../apis/AuthAPI/POST';
import './styles/AuthPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { message?: string } | null;
    if (state?.message) {
      setSuccess(state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await loginAPI({ email, password });
      login(response.accessToken, response.refreshToken, response.user);
      
      // Redirect based on user role
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form className="auth-form-content" onSubmit={handleSubmit}>
          {/* Header */}
          <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1 className="auth-title">Đăng nhập</h1>
            <p className="auth-description">
              Chào mừng trở lại! Hãy đăng nhập để tiếp tục hành trình của bạn
            </p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Email Field */}
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              <span className="label-icon">📧</span>
              <span>Email</span>
            </label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              <span className="label-icon">🔑</span>
              <span>Mật khẩu</span>
            </label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                style={{ paddingRight: '3rem' }}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <Link to="/forgot-password" className="forgot-link">
            Quên mật khẩu?
          </Link>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? (
              <>
                <span className="btn-spinner">⏳</span>
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <>
                <span>Đăng nhập</span>
                <span className="btn-icon">→</span>
              </>
            )}
          </button>

          {/* Footer */}
          <div className="auth-footer">
            <p className="auth-footer-text">Chưa có tài khoản?</p>
            <Link to="/register" className="auth-link">
              <span>Đăng ký ngay</span>
              <span>→</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

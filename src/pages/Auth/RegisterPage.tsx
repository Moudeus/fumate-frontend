import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../apis/AuthAPI/POST';
import './styles/AuthPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form data
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Vui lòng nhập đầy đủ thông tin');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      // Skip OTP verification in production - redirect directly to login
      navigate('/login', { state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' } });
    } catch (err: any) {
      console.error('Register error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Đăng ký thất bại';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <form className="auth-form-content" onSubmit={handleRegisterSubmit}>
            {/* Header */}
            <div className="auth-header">
              <div className="auth-icon">🚀</div>
              <h1 className="auth-title">Bắt đầu hành trình</h1>
              <p className="auth-description">
                Tạo tài khoản để khám phá con đường sự nghiệp của bạn
              </p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {/* Name Fields */}
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="firstName" className="input-label">
                  <span className="label-icon">👤</span>
                  <span>Họ</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="firstName"
                    type="text"
                    className="input-field"
                    placeholder="Nguyễn"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="lastName" className="input-label">
                  <span className="label-icon">👤</span>
                  <span>Tên</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="lastName"
                    type="text"
                    className="input-field"
                    placeholder="Văn A"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                <span className="label-icon">🔐</span>
                <span>Mật khẩu</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  placeholder="Tối thiểu 6 ký tự"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              <p className="field-hint">Sử dụng mật khẩu mạnh để bảo vệ tài khoản</p>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? (
                <>
                  <span className="btn-spinner">⏳</span>
                  <span>Đang đăng ký...</span>
                </>
              ) : (
                <>
                  <span>Đăng ký</span>
                  <span className="btn-icon">→</span>
                </>
              )}
            </button>

            {/* Footer */}
            <div className="auth-footer">
              <p className="auth-footer-text">Đã có tài khoản?</p>
              <Link to="/login" className="auth-link">
                <span>Đăng nhập ngay</span>
                <span>→</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

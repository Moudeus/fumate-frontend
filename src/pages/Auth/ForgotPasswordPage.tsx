import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../apis/AuthAPI/POST';
import './styles/AuthPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess('Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư của bạn.');
      setEmail('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gửi email thất bại');
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
            <div className="auth-icon">🔓</div>
            <h1 className="auth-title">Quên mật khẩu?</h1>
            <p className="auth-description">
              Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu
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

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? (
              <>
                <span className="btn-spinner">⏳</span>
                <span>Đang gửi...</span>
              </>
            ) : (
              <>
                <span>Gửi email khôi phục</span>
                <span className="btn-icon">→</span>
              </>
            )}
          </button>

          {/* Back to Login */}
          <div className="auth-footer">
            <Link to="/login" className="back-link">
              <span>←</span>
              <span>Quay lại đăng nhập</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

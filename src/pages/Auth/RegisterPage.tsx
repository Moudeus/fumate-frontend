import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, verifyOTP, resendOTP } from '../../apis/AuthAPI/POST';
import './styles/AuthPage.css';
import './styles/OTPModal.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
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
      setShowOTPModal(true);
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      console.error('Register error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Đăng ký thất bại';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Vui lòng nhập đầy đủ 6 chữ số');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await verifyOTP({ email: formData.email, otp: otpCode });
      setShowOTPModal(false);
      navigate('/login', { state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xác thực OTP thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setResendLoading(true);

    try {
      await resendOTP(formData.email);
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gửi lại OTP thất bại');
    } finally {
      setResendLoading(false);
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
                    disabled={loading || showOTPModal}
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
                    disabled={loading || showOTPModal}
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
                  disabled={loading || showOTPModal}
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
                  disabled={loading || showOTPModal}
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
            <button type="submit" disabled={loading || showOTPModal} className="btn btn-primary">
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

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="otp-modal-overlay">
          <div className="otp-modal glass-card">
            <div className="otp-modal-header">
              <div className="otp-icon">✉️</div>
              <h2>Xác thực Email</h2>
              <p>Nhập mã OTP 6 chữ số được gửi đến</p>
              <p className="email-highlight">{formData.email}</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  disabled={loading}
                  className="otp-input"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleVerifyOTP}
              disabled={loading || otp.join('').length !== 6}
              className="otp-verify-btn"
            >
              {loading ? 'Đang xác thực...' : 'Xác thực'}
            </button>

            <div className="otp-footer">
              <p>Không nhận được mã?</p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading || resendTimer > 0}
                className="resend-btn"
              >
                {resendTimer > 0 ? `Gửi lại sau ${resendTimer}s` : 'Gửi lại'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowOTPModal(false);
                setOtp(['', '', '', '', '', '']);
                setError('');
              }}
              className="close-modal-btn"
              disabled={loading}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;

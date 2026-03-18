import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [phoneRotation, setPhoneRotation] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 100,
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom > 0) {
          const rotation = (scrollY * 0.5) % 360;
          setPhoneRotation(rotation);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-up">
        <div className="hero-content">
          <h1 className="hero-title">
            Khám phá con đường sự nghiệp của bạn
          </h1>
          <p className="hero-subtitle">
            FU-Mate giúp bạn tìm ra ngành học phù hợp, đại học lý tưởng và sự nghiệp tương lai thông qua đánh giá MBTI và phân tích dữ liệu
          </p>
          <div className="hero-buttons">
            {!isAuthenticated ? (
              <>
                <button onClick={() => navigate('/login')} className="btn-large btn-primary">
                  Bắt đầu ngay
                </button>
                <button onClick={() => navigate('/login')} className="btn-large btn-outline">
                  Đăng nhập
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/mbti/quiz')} className="btn-large btn-primary">
                  Bắt đầu ngay
                </button>
                <button onClick={() => navigate('/mbti/intro')} className="btn-large btn-outline">
                  MBTI là gì?
                </button>
              </>
            )}
          </div>
        </div>
        <div className="hero-image" data-aos="fade-left">
          <div className="phone-container" style={{ transform: `rotateY(${phoneRotation}deg) rotateX(15deg)` }}>
            <div className="phone">
              <div className="phone-screen">
                <div className="phone-notch"></div>
                <div className="screen-content">
                  <div className="screen-header">
                    <span className="status-bar">
                      <span className="signal">●●●●●</span>
                      <span className="time">09:41</span>
                      <span className="battery">🔋</span>
                    </span>
                  </div>
                  <div className="screen-body">
                    <h3 className="screen-title">Dự đoán hướng nghiệp</h3>
                    <div className="features-list">
                      <div className="feature-row">
                        <div className="feature-box">
                          <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                          <span>MBTI</span>
                        </div>
                        <div className="feature-box">
                          <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L15 8H22L17 12L19 18L12 14L5 18L7 12L2 8H9L12 2Z"></path>
                          </svg>
                          <span>Ngành</span>
                        </div>
                      </div>
                      <div className="feature-row">
                        <div className="feature-box">
                          <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
                          </svg>
                          <span>Đại học</span>
                        </div>
                        <div className="feature-box">
                          <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                          </svg>
                          <span>Điểm</span>
                        </div>
                      </div>
                    </div>
                    <button className="screen-btn">Khám phá ngay</button>
                  </div>
                </div>
              </div>
              <div className="phone-frame"></div>
              <div className="phone-side"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features" data-aos="fade-up">
        <div className="section-header">
          <h2>Tính năng nổi bật</h2>
          <p>Công cụ toàn diện để hỗ trợ hành trình học tập của bạn</p>
        </div>
        <div className="features-grid">
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="0">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <h3>Đánh giá MBTI</h3>
            <p>Khám phá tính cách và xu hướng sự nghiệp của bạn thông qua đánh giá MBTI chuyên sâu</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h3>Gợi ý ngành học</h3>
            <p>Nhận các gợi ý ngành học phù hợp dựa trên tính cách, điểm số và sở thích của bạn</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h3>Tìm đại học</h3>
            <p>Khám phá các trường đại học hàng đầu với thông tin chi tiết về chương trình, điều kiện nhập học</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Theo dõi điểm số</h3>
            <p>Quản lý điểm số học tập và xem xác suất nhập học vào các trường mong muốn</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section" id="why-us" data-aos="fade-up">
        <div className="section-header">
          <h2>Tại sao chọn FU-Mate?</h2>
          <p>Chúng tôi cung cấp giải pháp toàn diện cho hành trình học tập của bạn</p>
        </div>
        <div className="why-us-grid">
          <div className="why-card" data-aos="fade-right">
            <div className="why-number">01</div>
            <h3>Đánh giá chính xác</h3>
            <p>Sử dụng công nghệ AI và dữ liệu thực tế để cung cấp gợi ý chính xác nhất</p>
          </div>
          <div className="why-card" data-aos="fade-right" data-aos-delay="100">
            <div className="why-number">02</div>
            <h3>Dữ liệu cập nhật</h3>
            <p>Thông tin về đại học, ngành học và yêu cầu nhập học được cập nhật thường xuyên</p>
          </div>
          <div className="why-card" data-aos="fade-right" data-aos-delay="200">
            <div className="why-number">03</div>
            <h3>Hỗ trợ toàn diện</h3>
            <p>Từ đánh giá tính cách đến lựa chọn ngành học, chúng tôi hỗ trợ mọi bước</p>
          </div>
          <div className="why-card" data-aos="fade-right" data-aos-delay="300">
            <div className="why-number">04</div>
            <h3>Giao diện thân thiện</h3>
            <p>Dễ sử dụng trên mọi thiết bị, từ điện thoại đến máy tính</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section" data-aos="fade-up">
        <div className="section-header">
          <h2>Quy trình sử dụng</h2>
          <p>4 bước đơn giản để tìm ra con đường sự nghiệp của bạn</p>
        </div>
        <div className="process-steps">
          <div className="step" data-aos="fade-up" data-aos-delay="0">
            <div className="step-number">1</div>
            <h3>Đăng ký tài khoản</h3>
            <p>Tạo tài khoản FU-Mate của bạn chỉ trong vài giây</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step" data-aos="fade-up" data-aos-delay="100">
            <div className="step-number">2</div>
            <h3>Làm bài đánh giá</h3>
            <p>Hoàn thành bài đánh giá MBTI để hiểu rõ tính cách của bạn</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step" data-aos="fade-up" data-aos-delay="200">
            <div className="step-number">3</div>
            <h3>Nhận gợi ý</h3>
            <p>Nhận các gợi ý ngành học và đại học phù hợp với bạn</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step" data-aos="fade-up" data-aos-delay="300">
            <div className="step-number">4</div>
            <h3>Lập kế hoạch</h3>
            <p>Lập kế hoạch học tập và theo dõi tiến độ của bạn</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" data-aos="fade-up">
        <div className="section-header">
          <h2>Những câu chuyện thành công</h2>
          <p>Nghe từ những học sinh đã tìm được con đường sự nghiệp của họ</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card" data-aos="fade-up" data-aos-delay="0">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "FU-Mate đã giúp tôi hiểu rõ hơn về tính cách và tìm ra ngành học phù hợp. Tôi rất hài lòng với gợi ý của nó!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍🎓</div>
              <div>
                <p className="author-name">Đoàn Ngọc Kim Ngân</p>
                <p className="author-role">Học sinh lớp 12</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Ứng dụng này rất hữu ích. Nó không chỉ giúp tôi chọn ngành học mà còn giúp tôi hiểu rõ hơn về bản thân."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">👨‍🎓</div>
              <div>
                <p className="author-name">Nguyễn Văn Huân</p>
                <p className="author-role">Học sinh lớp 11</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Tôi đã sử dụng FU-Mate để tìm đại học phù hợp và kết quả rất tuyệt vời. Tôi đã được nhập học vào trường mơ ước!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍🎓</div>
              <div>
                <p className="author-name">Hoàng Chí Nhân</p>
                <p className="author-role">Sinh viên năm 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="coming-soon-section" data-aos="fade-up">
        <div className="coming-soon-content">
          <div className="coming-soon-badge">Sắp ra mắt</div>
          <h2>Ứng dụng Mobile sẽ ra mắt vào 01/04/2026</h2>
          <p>Đăng ký ngay để nhận thông báo sớm nhất và ưu đãi đặc biệt dành cho người dùng đầu tiên!</p>
          
          <form className="email-subscribe-form" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký!'); }}>
            <input 
              type="email" 
              placeholder="Nhập email của bạn" 
              className="email-input"
              required
            />
            <button type="submit" className="subscribe-btn">Đăng ký ngay</button>
          </form>

          <div className="app-store-badges">
            <div className="store-badge">
              <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="store-text">
                <span className="store-label">Tải về trên</span>
                <span className="store-name">App Store</span>
              </div>
            </div>
            <div className="store-badge">
              <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="store-text">
                <span className="store-label">Tải về trên</span>
                <span className="store-name">Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq" data-aos="fade-up">
        <div className="section-header">
          <h2>Câu hỏi thường gặp</h2>
          <p>Tìm câu trả lời cho những câu hỏi phổ biến</p>
        </div>
        <div className="faq-container">
          <details className="faq-item" data-aos="fade-up" data-aos-delay="0">
            <summary>FU-Mate là gì?</summary>
            <p>FU-Mate là một nền tảng hướng dẫn sự nghiệp toàn diện giúp học sinh tìm ra ngành học, đại học và sự nghiệp phù hợp thông qua đánh giá MBTI và phân tích dữ liệu.</p>
          </details>
          <details className="faq-item" data-aos="fade-up" data-aos-delay="100">
            <summary>Bài đánh giá MBTI mất bao lâu?</summary>
            <p>Bài đánh giá MBTI thường mất khoảng 10-15 phút để hoàn thành. Bạn có thể làm bài này bất cứ lúc nào và có thể quay lại sau nếu cần.</p>
          </details>
          <details className="faq-item" data-aos="fade-up" data-aos-delay="200">
            <summary>Gợi ý của FU-Mate có chính xác không?</summary>
            <p>Gợi ý của FU-Mate dựa trên dữ liệu thực tế, kết quả MBTI và thông tin học tập của bạn. Tuy nhiên, đây chỉ là gợi ý và bạn nên tham khảo ý kiến của giáo viên, phụ huynh và những người có kinh nghiệm.</p>
          </details>
          <details className="faq-item" data-aos="fade-up" data-aos-delay="300">
            <summary>Tôi có thể thay đổi ngành học sau khi chọn không?</summary>
            <p>Có, bạn có thể thay đổi ngành học bất cứ lúc nào. FU-Mate cho phép bạn cập nhật thông tin và nhận gợi ý mới dựa trên sự thay đổi của bạn.</p>
          </details>
          <details className="faq-item" data-aos="fade-up" data-aos-delay="400">
            <summary>Dữ liệu của tôi có an toàn không?</summary>
            <p>Có, chúng tôi sử dụng các biện pháp bảo mật hàng đầu để bảo vệ dữ liệu của bạn. Thông tin cá nhân của bạn sẽ không được chia sẻ với bên thứ ba.</p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-aos="zoom-in">
        <div className="cta-content">
          <h2>Sẵn sàng bắt đầu hành trình của bạn?</h2>
          <p>Tham gia hàng ngàn học sinh đã tìm được con đường sự nghiệp của họ</p>
          {!isAuthenticated ? (
            <button onClick={() => navigate('/register')} className="btn-large btn-primary">
              Đăng ký miễn phí ngay
            </button>
          ) : (
            <button onClick={() => navigate('/mbti/quiz')} className="btn-large btn-primary">
              Làm bài đánh giá MBTI
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

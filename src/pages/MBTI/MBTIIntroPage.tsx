import { useNavigate } from 'react-router-dom';
import './styles/MBTIIntroPage.css';

const MBTIIntroPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🧠',
      title: 'Khám phá tính cách',
      description: 'Hiểu rõ hơn về điểm mạnh, điểm yếu và cách bạn tương tác với thế giới'
    },
    {
      icon: '🎯',
      title: 'Tìm ngành phù hợp',
      description: 'Nhận gợi ý ngành học dựa trên tính cách và sở thích của bạn'
    },
    {
      icon: '📈',
      title: 'Lập kế hoạch sự nghiệp',
      description: 'Xây dựng con đường sự nghiệp phù hợp với bản thân'
    },
    {
      icon: '🌟',
      title: 'Phát triển bản thân',
      description: 'Tìm hiểu cách tối ưu hóa tiềm năng của bạn'
    }
  ];

  return (
    <div className="mbti-intro-page">
      {/* Hero Section */}
      <section className="mbti-hero">
        <div className="mbti-hero-content">
          <h1 className="mbti-hero-title">Khám phá bản thân qua MBTI</h1>
          <p className="mbti-hero-subtitle">
            Bài trắc nghiệm MBTI giúp bạn hiểu rõ tính cách, sở thích và tìm ra con đường sự nghiệp phù hợp nhất
          </p>
          <button className="mbti-btn-start" onClick={() => navigate('/mbti/quiz')}>
            Bắt đầu ngay
          </button>
        </div>
        <div className="mbti-hero-visual">
          <div className="mbti-circle mbti-circle-1"></div>
          <div className="mbti-circle mbti-circle-2"></div>
          <div className="mbti-circle mbti-circle-3"></div>
          <div className="mbti-icon">🧭</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mbti-features">
        <div className="mbti-section-header">
          <h2>Lợi ích của MBTI</h2>
          <p>Tìm hiểu những gì bạn sẽ nhận được</p>
        </div>
        <div className="mbti-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="mbti-feature-card" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="mbti-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="mbti-info">
        <div className="mbti-info-content">
          <h2>Về bài trắc nghiệm MBTI</h2>
          <div className="mbti-info-grid">
            <div className="mbti-info-item">
              <div className="mbti-info-number">16</div>
              <p>Loại tính cách</p>
            </div>
            <div className="mbti-info-item">
              <div className="mbti-info-number">70+</div>
              <p>Câu hỏi</p>
            </div>
            <div className="mbti-info-item">
              <div className="mbti-info-number">15-20</div>
              <p>Phút hoàn thành</p>
            </div>
            <div className="mbti-info-item">
              <div className="mbti-info-number">100%</div>
              <p>Miễn phí</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mbti-how-it-works">
        <div className="mbti-section-header">
          <h2>Cách thức hoạt động</h2>
          <p>3 bước đơn giản để khám phá bản thân</p>
        </div>
        <div className="mbti-steps">
          <div className="mbti-step">
            <div className="mbti-step-number">1</div>
            <h3>Trả lời câu hỏi</h3>
            <p>Trả lời các câu hỏi về tính cách và sở thích của bạn một cách trung thực</p>
          </div>
          <div className="mbti-step-arrow">→</div>
          <div className="mbti-step">
            <div className="mbti-step-number">2</div>
            <h3>Nhận kết quả</h3>
            <p>Hệ thống sẽ phân tích câu trả lời và xác định loại tính cách của bạn</p>
          </div>
          <div className="mbti-step-arrow">→</div>
          <div className="mbti-step">
            <div className="mbti-step-number">3</div>
            <h3>Khám phá gợi ý</h3>
            <p>Nhận gợi ý ngành học và sự nghiệp phù hợp với tính cách của bạn</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mbti-cta">
        <h2>Sẵn sàng khám phá bản thân?</h2>
        <p>Hãy bắt đầu bài trắc nghiệm MBTI ngay hôm nay</p>
        <button className="mbti-btn-start mbti-btn-large" onClick={() => navigate('/mbti/quiz')}>
          Bắt đầu trắc nghiệm
        </button>
      </section>
    </div>
  );
};

export default MBTIIntroPage;

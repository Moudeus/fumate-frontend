import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/MBTIResultPage.css';

interface Major {
  _id: string;
  name: string;
  code: string;
  description: string;
}

interface MBTIResult {
  resultId: string;
  resultType: string;
  typeName: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  majors: Major[];
  scores: Record<string, number>;
  percentages: Record<string, number>;
  confidence: number;
}

const MBTIResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAppModal, setShowAppModal] = useState(false);

  useEffect(() => {
    const state = location.state as { result?: MBTIResult } | null;
    console.log('MBTIResultPage - Location state:', JSON.stringify(state, null, 2));
    if (state?.result) {
      console.log('MBTIResultPage - Setting result:', state.result);
      console.log('MBTIResultPage - Majors:', state.result.majors);
      console.log('MBTIResultPage - Scores:', state.result.scores);
      console.log('MBTIResultPage - Percentages:', state.result.percentages);
      setResult(state.result);
    }
    setLoading(false);
  }, [location]);

  if (loading) {
    return (
      <div className="mbti-result-page">
        <div className="mbti-loading">
          <div className="mbti-spinner"></div>
          <p>Đang tải kết quả...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mbti-result-page">
        <div className="mbti-error-container">
          <p>Không có kết quả. Vui lòng làm bài trắc nghiệm lại.</p>
          <button onClick={() => navigate('/mbti/intro')}>Quay lại</button>
        </div>
      </div>
    );
  }

  const getMBTIColor = (type: string) => {
    const colors: Record<string, string> = {
      'INTJ': '#8B5CF6', 'INTP': '#6366F1', 'ENTJ': '#3B82F6', 'ENTP': '#06B6D4',
      'INFJ': '#EC4899', 'INFP': '#F43F5E', 'ENFJ': '#F97316', 'ENFP': '#EAB308',
      'ISTJ': '#10B981', 'ISFJ': '#14B8A6', 'ESTJ': '#0EA5E9', 'ESFJ': '#8B5CF6',
      'ISTP': '#6366F1', 'ISFP': '#3B82F6', 'ESTP': '#06B6D4', 'ESFP': '#EC4899'
    };
    return colors[type] || '#f97316';
  };

  const mbtiColor = getMBTIColor(result.resultType);

  return (
    <div className="mbti-result-page">
      <div className="mbti-result-container">
        {/* Header */}
        <div className="mbti-result-header">
          <h1>Kết quả trắc nghiệm MBTI</h1>
          <p>Khám phá tính cách và con đường sự nghiệp của bạn</p>
        </div>

        {/* MBTI Type Card */}
        <div className="mbti-type-card" style={{ borderColor: mbtiColor }}>
          <div className="mbti-type-badge" style={{ backgroundColor: mbtiColor }}>
            {result.resultType}
          </div>
          <h2 className="mbti-type-name">{result.typeName}</h2>
          <p className="mbti-type-description">{result.description}</p>
          <div className="mbti-confidence">
            <span>Độ tin cậy:</span>
            <div className="confidence-bar">
              <div className="confidence-fill" style={{ width: `${result.confidence}%` }}></div>
            </div>
            <span>{Math.round(result.confidence)}%</span>
          </div>
        </div>

        {/* Scores Section */}
        <section className="mbti-scores-section">
          <h3>Điểm số theo chiều</h3>
          <div className="mbti-scores-grid">
            {Object.entries(result.percentages || result.scores || {}).map(([dimension, percentage]) => (
              <div key={dimension} className="mbti-score-item">
                <div className="score-label">{dimension}</div>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="score-value">{Math.round(percentage)}%</div>
              </div>
            ))}
          </div>
        </section>

        {/* Strengths & Weaknesses */}
        <div className="mbti-traits-grid">
          {/* Strengths */}
          <section className="mbti-traits-section">
            <h3>💪 Điểm mạnh</h3>
            <ul className="mbti-traits-list">
              {result.strengths.map((strength, index) => (
                <li key={index} className="mbti-trait-item">
                  <span className="trait-icon">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Weaknesses */}
          <section className="mbti-traits-section">
            <h3>⚠️ Điểm yếu</h3>
            <ul className="mbti-traits-list">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="mbti-trait-item">
                  <span className="trait-icon">!</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Recommended Majors */}
        {result.majors && result.majors.length > 0 && (
          <section className="mbti-majors-section">
            <h3>🎓 Ngành học phù hợp</h3>
            <div className="mbti-majors-grid">
              {result.majors.map((major) => (
                <div key={major._id} className="mbti-major-card">
                  <div className="major-header">
                    <h4>{major.name}</h4>
                    <span className="major-code">{major.code}</span>
                  </div>
                  <p className="major-description">{major.description}</p>
                  <div className="major-actions">
                    <button 
                      className="major-btn"
                      onClick={() => navigate(`/careers/major/${major._id}`, { state: { majorName: major.name } })}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 13v10h-6v-6h-6v6h-6v-10l9-7 9 7z"/>
                      </svg>
                      Nghề nghiệp
                    </button>
                    <button 
                      className="major-btn"
                      onClick={() => navigate(`/universities/major/${major._id}`, { state: { majorName: major.name } })}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      Trường ĐH
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="mbti-actions">
          <button className="mbti-btn-primary" onClick={() => navigate('/dashboard')}>
            Xem bảng điều khiển
          </button>
          <button 
            className="mbti-btn-secondary" 
            onClick={() => setShowAppModal(true)}
          >
            Làm lại bài trắc nghiệm
          </button>
        </div>

        {/* App Download Modal */}
        {showAppModal && (
          <div className="modal-overlay" onClick={() => setShowAppModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowAppModal(false)}>✕</button>
              <div className="modal-icon">📱</div>
              <h2>Tải app để khám phá định hướng về bản thân nhé</h2>
              <p className="modal-subtitle">Ứng dụng sẽ ra mắt sớm nhất</p>
              <button className="modal-btn" onClick={() => setShowAppModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MBTIResultPage;

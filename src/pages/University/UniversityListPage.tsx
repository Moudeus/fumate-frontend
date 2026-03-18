import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getUniversitiesByMajor } from '../../apis/UniversityAPI';
import './styles/UniversityListPage.css';

interface University {
  _id: string;
  name: string;
  code: string;
  description: string;
  location?: {
    city: string;
    address: string;
  };
  type?: string;
  ranking?: number;
  website?: string;
  logo?: string;
}

const UniversityListPage = () => {
  const { majorId } = useParams<{ majorId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  
  const majorName = (location.state as { majorName?: string })?.majorName || 'Ngành học';

  useEffect(() => {
    const fetchUniversities = async () => {
      if (!majorId) return;
      
      try {
        setLoading(true);
        const data = await getUniversitiesByMajor(majorId, { 
          page: pagination.page, 
          limit: pagination.limit 
        });
        setUniversities(data.items || data);
        if (data.pagination) {
          setPagination(prev => ({ ...prev, total: data.pagination.total }));
        }
      } catch (err) {
        console.error('Error fetching universities:', err);
        setError('Không thể tải danh sách trường đại học');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [majorId, pagination.page, pagination.limit]);

  if (loading) {
    return (
      <div className="university-list-page">
        <div className="university-loading">
          <div className="university-spinner"></div>
          <p>Đang tải danh sách trường đại học...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="university-list-page">
        <div className="university-error">
          <p>{error}</p>
          <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="university-list-page">
      <div className="university-list-container">
        <div className="university-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Quay lại
          </button>
          <h1>Trường đại học phù hợp</h1>
          <p className="major-name">Ngành: {majorName}</p>
        </div>

        {universities.length === 0 ? (
          <div className="no-universities">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <p>Chưa có thông tin trường đại học cho ngành này</p>
          </div>
        ) : (
          <div className="universities-grid">
            {universities.map((university) => (
              <div key={university._id} className="university-card">
                {university.logo && (
                  <div className="university-logo">
                    <img src={university.logo} alt={university.name} />
                  </div>
                )}
                
                <div className="university-card-header">
                  <h3>{university.name}</h3>
                  <span className="university-code">{university.code}</span>
                </div>

                {university.location && (
                  <div className="university-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{university.location.city}</span>
                  </div>
                )}

                <p className="university-description">{university.description}</p>

                <div className="university-meta">
                  {university.type && (
                    <span className="meta-tag">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      </svg>
                      {university.type}
                    </span>
                  )}
                  {university.ranking && (
                    <span className="meta-tag">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      Top {university.ranking}
                    </span>
                  )}
                </div>

                {university.website && (
                  <a 
                    href={university.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="university-website-btn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Xem website
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityListPage;

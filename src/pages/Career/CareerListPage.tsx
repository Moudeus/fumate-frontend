import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getCareersByMajor } from '../../apis/CareerAPI';
import './styles/CareerListPage.css';

interface Career {
  _id: string;
  name: string;
  code: string;
  description: string;
  requiredSkills?: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
  jobProspects?: string;
  workEnvironment?: string;
}

const CareerListPage = () => {
  const { majorId } = useParams<{ majorId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const majorName = (location.state as { majorName?: string })?.majorName || 'Ngành học';

  useEffect(() => {
    const fetchCareers = async () => {
      if (!majorId) return;
      
      try {
        setLoading(true);
        const data = await getCareersByMajor(majorId);
        setCareers(data);
      } catch (err) {
        console.error('Error fetching careers:', err);
        setError('Không thể tải danh sách nghề nghiệp');
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, [majorId]);

  if (loading) {
    return (
      <div className="career-list-page">
        <div className="career-loading">
          <div className="career-spinner"></div>
          <p>Đang tải danh sách nghề nghiệp...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="career-list-page">
        <div className="career-error">
          <p>{error}</p>
          <button onClick={() => navigate(-1)}>Quay lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="career-list-page">
      <div className="career-list-container">
        <div className="career-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Quay lại
          </button>
          <h1>Nghề nghiệp phù hợp</h1>
          <p className="major-name">Ngành: {majorName}</p>
        </div>

        {careers.length === 0 ? (
          <div className="no-careers">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 13v10h-6v-6h-6v6h-6v-10l9-7 9 7z"/>
            </svg>
            <p>Chưa có thông tin nghề nghiệp cho ngành này</p>
          </div>
        ) : (
          <div className="careers-grid">
            {careers.map((career) => (
              <div key={career._id} className="career-card">
                <div className="career-card-header">
                  <h3>{career.name}</h3>
                  <span className="career-code">{career.code}</span>
                </div>
                
                <p className="career-description">{career.description}</p>

                {career.salaryRange && (
                  <div className="career-salary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span>
                      {career.salaryRange.min.toLocaleString()} - {career.salaryRange.max.toLocaleString()} VNĐ/tháng
                    </span>
                  </div>
                )}

                {career.requiredSkills && career.requiredSkills.length > 0 && (
                  <div className="career-skills">
                    <h4>Kỹ năng cần thiết:</h4>
                    <div className="skills-list">
                      {career.requiredSkills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {career.jobProspects && (
                  <div className="career-prospects">
                    <h4>Triển vọng nghề nghiệp:</h4>
                    <p>{career.jobProspects}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerListPage;

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMBTIQuestions, submitMBTITest, MBTIAnswer } from '../../apis/MbtiAPI';
import { getLatestMBTIResult } from '../../apis/MbtiAPI/GET';
import './styles/MBTIQuizPage.css';

interface Question {
  _id: string;
  question: string;
  firstAnswer: string;
  secondAnswer: string;
  category: string;
}

const MBTIQuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [checkingExisting, setCheckingExisting] = useState(true);

  useEffect(() => {
    const checkExistingAndLoad = async () => {
      try {
        // Check if we should skip the existing result check
        // Check both location.state and URL search params for maximum reliability
        const state = location.state as { skipCheck?: boolean } | null;
        const searchParams = new URLSearchParams(location.search);
        const skipFromParams = searchParams.get('skipCheck') === 'true';
        const shouldSkipCheck = state?.skipCheck === true || skipFromParams;
        
        console.log('=== MBTIQuizPage Debug ===');
        console.log('Location pathname:', location.pathname);
        console.log('Location search:', location.search);
        console.log('Location state:', state);
        console.log('Skip from params:', skipFromParams);
        console.log('Should skip check:', shouldSkipCheck);
        console.log('========================');
        
        if (shouldSkipCheck) {
          // Skip check, load questions directly
          console.log('✅ SKIPPING existing result check - loading questions directly');
          setCheckingExisting(false);
          setLoading(true);
          const data = await getMBTIQuestions(1, 100);
          setQuestions(data.items || []);
          setLoading(false);
          return;
        }
        
        // Normal flow: check for existing result
        console.log('🔍 Checking for existing result...');
        setCheckingExisting(true);
        const latestResult = await getLatestMBTIResult();
        
        console.log('Latest result from API:', latestResult);
        
        if (latestResult) {
          // Calculate percentages from scores
          const calculatePercentages = (scores: Record<string, number>) => {
            const percentages: Record<string, number> = {};
            const dimensions = ['E-I', 'S-N', 'T-F', 'J-P'];
            
            dimensions.forEach(dim => {
              const [first, second] = dim.split('-');
              const firstScore = scores[first] || 0;
              const secondScore = scores[second] || 0;
              const total = firstScore + secondScore;
              
              if (total > 0) {
                percentages[first] = Math.round((firstScore / total) * 100);
                percentages[second] = Math.round((secondScore / total) * 100);
              }
            });
            
            return percentages;
          };
          
          const percentages = calculatePercentages(latestResult.scores || {});
          console.log('Calculated percentages:', percentages);
          console.log('Majors:', latestResult.majors);
          
          // User already has a result, navigate to result page
          console.log('✅ Found existing result, redirecting to result page');
          navigate('/mbti/result', {
            state: {
              result: {
                resultId: latestResult._id,
                resultType: latestResult.resultType,
                typeName: latestResult.resultType,
                description: latestResult.description,
                strengths: latestResult.strengths || [],
                weaknesses: latestResult.weaknesses || [],
                majors: latestResult.majors || [],
                scores: latestResult.scores || {},
                percentages: percentages,
                confidence: 85
              }
            }
          });
          return;
        }
        
        // No existing result, load questions
        console.log('ℹ️ No existing result found, loading questions');
        setLoading(true);
        const data = await getMBTIQuestions(1, 100);
        setQuestions(data.items || []);
      } catch (err) {
        setError('Không thể tải câu hỏi. Vui lòng thử lại.');
        console.error('❌ Error:', err);
      } finally {
        setLoading(false);
        setCheckingExisting(false);
      }
    };

    checkExistingAndLoad();
  }, [navigate, location]);

  const handleAnswer = (choice: 'a' | 'b') => {
    const currentQuestion = questions[currentIndex];
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion._id);

    if (existingIndex >= 0) {
      newAnswers[existingIndex].choice = choice;
    } else {
      newAnswers.push({ questionId: currentQuestion._id, choice });
    }

    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError('Vui lòng trả lời tất cả các câu hỏi');
      return;
    }

    try {
      setSubmitting(true);
      const result = await submitMBTITest(answers);
      navigate('/mbti/result', { state: { result } });
    } catch (err) {
      setError('Không thể nộp bài. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || checkingExisting) {
    return (
      <div className="mbti-quiz-page">
        <div className="mbti-loading">
          <div className="mbti-spinner"></div>
          <p>{checkingExisting ? 'Đang kiểm tra kết quả...' : 'Đang tải câu hỏi...'}</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="mbti-quiz-page">
        <div className="mbti-error-container">
          <p>Không có câu hỏi nào. Vui lòng thử lại sau.</p>
          <button onClick={() => navigate('/mbti/intro')}>Quay lại</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion._id);
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="mbti-quiz-page">
      <div className="mbti-quiz-container">
        {/* Header */}
        <div className="mbti-quiz-header">
          <div className="mbti-quiz-title">
            <h1>Trắc nghiệm MBTI</h1>
            <p>Câu {currentIndex + 1} / {questions.length}</p>
          </div>
          <button className="mbti-quiz-close" onClick={() => navigate('/mbti/intro')}>✕</button>
        </div>

        {/* Progress Bar */}
        <div className="mbti-progress-container">
          <div className="mbti-progress-bar">
            <div className="mbti-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mbti-progress-text">{Math.round(progress)}%</p>
        </div>

        {/* Error Message */}
        {error && <div className="mbti-error-message">{error}</div>}

        {/* Question */}
        <div className="mbti-question-container">
          <h2 className="mbti-question-text">{currentQuestion.question}</h2>
          <p className="mbti-question-category">Danh mục: {currentQuestion.category}</p>

          {/* Answers */}
          <div className="mbti-answers">
            <button
              className={`mbti-answer-btn ${currentAnswer?.choice === 'a' ? 'active' : ''}`}
              onClick={() => handleAnswer('a')}
            >
              <span className="mbti-answer-label">A</span>
              <span className="mbti-answer-text">{currentQuestion.firstAnswer}</span>
            </button>

            <button
              className={`mbti-answer-btn ${currentAnswer?.choice === 'b' ? 'active' : ''}`}
              onClick={() => handleAnswer('b')}
            >
              <span className="mbti-answer-label">B</span>
              <span className="mbti-answer-text">{currentQuestion.secondAnswer}</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mbti-navigation">
          <button
            className="mbti-nav-btn"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ← Quay lại
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              className="mbti-nav-btn mbti-submit-btn"
              onClick={handleSubmit}
              disabled={submitting || answers.length !== questions.length}
            >
              {submitting ? 'Đang xử lý...' : 'Nộp bài'}
            </button>
          ) : (
            <button
              className="mbti-nav-btn"
              onClick={handleNext}
              disabled={!currentAnswer}
            >
              Tiếp theo →
            </button>
          )}
        </div>

        {/* Answered Count */}
        <div className="mbti-answered-count">
          Đã trả lời: {answers.length} / {questions.length}
        </div>
      </div>
    </div>
  );
};

export default MBTIQuizPage;

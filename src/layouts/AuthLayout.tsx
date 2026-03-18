import { Outlet } from 'react-router-dom';
import './styles/AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-background"></div>
      <div className="auth-container glass-card-strong animate-fade-in">
        <div className="auth-logo">
          <h1 className="gradient-text">FU-Mate</h1>
          <p>Career Guidance Platform</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

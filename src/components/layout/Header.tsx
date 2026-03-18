import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Styles/Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          FU-Mate
        </Link>
        <nav>
          <Link to="/">Trang chủ</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <span>Xin chào, {user?.firstName}</span>
              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

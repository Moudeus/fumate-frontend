import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './styles/MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="main-background"></div>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

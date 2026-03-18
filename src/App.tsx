import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          <Analytics />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

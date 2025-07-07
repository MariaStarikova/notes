import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { ErrorBoundary } from '@/app/error-boundary';
import { AppRouter } from '@/app/routes/app-router';
import { AuthProvider } from '@/app/auth/context/auth-context';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

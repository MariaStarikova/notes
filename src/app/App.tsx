import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { ErrorBoundary } from '@/app/error-boundary';
import { AppRouter } from '@/app/routes/app-router';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from '@/app/routes/routes';
import { Signin } from '@/pages/sign-in';
import { HomePage } from '@/pages/home-page';
import { PrivateRoute } from '@/app/routes/private-route';

const NotFound = lazy(() =>
  import('@/pages/not-found').then(module => ({
    default: module.NotFound
  }))
);
const OfflinePage = lazy(() =>
  import('@/pages/offline-page').then(module => ({
    default: module.OfflinePage
  }))
);

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Signin />} />
      <Route
        path={paths.home}
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/offline"
        element={
          <Suspense fallback={<p>Загрузка...</p>}>
            <OfflinePage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<p>Загрузка...</p>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

import { Route, Routes } from 'react-router-dom';
import { paths } from '@/app/routes/routes';
import { Signin } from '@/pages/sign-in';
import { HomePage } from '@/pages/home-page';
import { PrivateRoute } from '@/app/routes/private-route';
import { NotFound } from '@/pages/not-found';

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/auth/context/auth-context';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();

  if (auth?.user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

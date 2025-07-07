import { useLocation } from 'react-router-dom';
import { AuthStatus } from '@/features/auth-status';
import './header.scss';

export function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <header className="header">
      <h1 className="header__title">Notes</h1>
      {!isLoginPage && <AuthStatus />}
    </header>
  );
}

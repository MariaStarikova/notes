import { useLocation } from 'react-router-dom';
import './header.scss';

export function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <header className="header">
      <h1 className="header__title">Notes</h1>
      {!isLoginPage && (
        <div className="header__user">
          <p className="header__email">m@gmail.com</p>
          <button className="header__out-button">Выйти</button>
        </div>
      )}
    </header>
  );
}

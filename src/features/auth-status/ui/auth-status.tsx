import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/auth/context/auth-context';
import './auth-status.scss';

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth !== null) {
    const handleSignout = () => {
      auth.signout(() => {
        navigate('/');
      });
    };

    return (
      <div className="header__user">
        <p className="header__email">{auth.user?.email}</p>
        <button className="header__out-button" onClick={handleSignout}>
          Выйти
        </button>
      </div>
    );
  }
  return <></>;
}

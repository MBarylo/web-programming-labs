import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header
      style={{
        display: 'flex',
        gap: '10px',
        padding: '20px',
      }}
    >
      {user ? (
        <>
          <span>{user.email}</span>

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>

          <Link to="/register">Register</Link>
        </>
      )}
    </header>
  );
}

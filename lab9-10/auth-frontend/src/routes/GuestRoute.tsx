import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

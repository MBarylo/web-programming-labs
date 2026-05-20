import { useAuth } from '../auth/AuthContext';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Profile</h1>

      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Created at: {user.createdAt}</p>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation } from '@tanstack/react-query';

import { useAuth } from '../auth/AuthContext';
import { AxiosError } from 'axios';

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation<void, AxiosError, FormData>({
    mutationFn: login,

    onSuccess: () => {
      navigate('/profile');
    },
  });

  function onSubmit(data: FormData) {
    mutation.mutate(data);
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Email" {...register('email')} />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {mutation.error?.response?.status === 401 && (
          <p>Invalid email or password</p>
        )}

        <button disabled={mutation.isPending}>
          {mutation.isPending ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

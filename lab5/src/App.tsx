import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todosApi } from './api/todos';

function App() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newTodo: { title: string; completed: boolean }) =>
      todosApi.create(newTodo),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });

      setTitle('');
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h1>Todos</h1>

      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo..."
        />

        <button
          onClick={() => mutate({ title, completed: false })}
          disabled={isPending || !title.trim()}
        >
          {isPending ? 'Adding...' : 'Додати'}
        </button>
      </div>

      <ul>
        {todos?.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

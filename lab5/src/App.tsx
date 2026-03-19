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

  const createMutation = useMutation({
    mutationFn: (newTodo: { title: string; completed: boolean }) =>
      todosApi.create(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => todosApi.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h1>Todos</h1>

      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo..."
        />

        <button
          onClick={() =>
            createMutation.mutate({
              title,
              completed: false,
            })
          }
          disabled={createMutation.isPending || !title.trim()}
        >
          {createMutation.isPending ? 'Adding...' : 'Додати'}
        </button>
      </div>

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                updateMutation.mutate({
                  id: todo.id,
                  completed: !todo.completed,
                })
              }
            />

            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                marginLeft: '8px',
              }}
            >
              {todo.title}
            </span>

            <button
              onClick={() => deleteMutation.mutate(todo.id)}
              style={{ marginLeft: '10px' }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

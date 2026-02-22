export {}

type Status = 'todo' | 'in_progress' | 'done' | 'cancelled'

type Priority = 'low' | 'medium' | 'high' | 'critical'

interface Task {
  id: number
  title: string
  description: string
  status: Status
  priority: Priority
  assignee: string | null // null, якщо задача не призначена
  createdAt: Date
  dueDate: Date | null
}

type LoadingState = { status: 'loading' }
type SuccessState<T> = { status: 'success'; data: T; loadedAt: Date }
type ErrorState = { status: 'error'; message: string; code: number }

type FetchState<T> = LoadingState | SuccessState<T> | ErrorState

function isLoadingState(state: FetchState<unknown>): state is LoadingState {
  return state.status === 'loading'
}

function isSuccessState<T>(state: FetchState<T>): state is SuccessState<T> {
  return state.status === 'success'
}

function isErrorState(state: FetchState<unknown>): state is ErrorState {
  return state.status === 'error'
}

function renderState<T>(
  state: FetchState<T>,
  renderData: (data: T) => string,
): string {
  if (state.status === 'loading') {
    return '⏳ Завантаження...'
  }

  if (state.status === 'success') {
    return `✅ Завантажено о ${state.loadedAt.toLocaleTimeString()}: ${renderData(state.data)}`
  }

  return `❌ Помилка ${state.code}: ${state.message}`
}

function processValue(
  value: string | number | boolean | null | undefined,
): string {
  if (value === null || value === undefined) {
    return '(порожнє значення)'
  }

  if (typeof value === 'string') {
    return `Рядок: '${value}' (${value.length} символів)`
  }

  if (typeof value === 'number') {
    return `Число: ${value} (${value % 2 === 0 ? 'парне' : 'непарне'})`
  }

  return `Булеве: ${value ? 'так' : 'ні'}`
}

function getStatusLabel(status: Status): string {
  switch (status) {
    case 'todo':
      return 'До виконання'

    case 'in_progress':
      return 'В процесі'

    case 'done':
      return 'Виконано'

    case 'cancelled':
      return 'Скасовано'

    default: {
      const exhaustiveCheck: never = status
      return exhaustiveCheck
    }
  }
}

console.log('=== Завдання 5: Type Guards та звуження типів ===')

const states: FetchState<Task[]>[] = [
  { status: 'loading' },
  { status: 'success', data: [], loadedAt: new Date() },
  { status: 'error', message: 'Not found', code: 404 },
]

states.forEach((state) => {
  console.log(renderState(state, (tasks) => `${tasks.length} задач`))
})

// Демонстрація processValue
const values: (string | number | boolean | null | undefined)[] = [
  'TypeScript',
  42,
  true,
  null,
  undefined,
  0,
  '',
]
values.forEach((v) => console.log(processValue(v)))

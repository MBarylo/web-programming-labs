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

interface HasId {
  id: number
}

interface Project extends HasId {
  name: string
  description: string
  tasks: Task[]
  ownerId: number
}

const getTaskStats = (tasks: Task[]) => {
  const taskStatus: Record<Status, number> = {
    todo: 0,
    in_progress: 0,
    done: 0,
    cancelled: 0,
  }

  let overdued = 0

  tasks.map((task) => {
    taskStatus[task.status]++
    if (
      task.status != 'done' &&
      task.status != 'cancelled' &&
      task.dueDate != null &&
      task.dueDate < new Date()
    ) {
      overdued++
    }
  })

  return {
    total: tasks.length,
    byStatus: taskStatus,
    overdue: overdued,
  }
}

const formatTask = (task: Task): string => {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`
}

console.log('=== Завдання 1: Базові типи, інтерфейси та type aliases ===')

const tasks: Task[] = [
  {
    id: 1,
    title: 'Налаштувати CI/CD',
    description: 'Додати автоматичний деплой',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Олег',
    createdAt: new Date('2026-02-01'),
    dueDate: new Date('2026-02-15'),
  },
  {
    id: 2,
    title: 'Оновити документацію',
    description: 'Актуалізувати README',
    status: 'todo',
    priority: 'medium',
    assignee: null,
    createdAt: new Date('2026-02-10'),
    dueDate: new Date('2026-02-25'),
  },
  {
    id: 3,
    title: 'Виправити баг авторизації',
    description: 'Помилка 500 при логіні',
    status: 'done',
    priority: 'critical',
    assignee: 'Марія',
    createdAt: new Date('2026-01-20'),
    dueDate: new Date('2026-01-25'),
  },
  {
    id: 4,
    title: 'Додати темну тему',
    description: 'Реалізувати Dark Mode',
    status: 'cancelled',
    priority: 'low',
    assignee: null,
    createdAt: new Date('2026-01-15'),
    dueDate: null,
  },
  {
    id: 5,
    title: 'Рефакторинг API',
    description: 'Оптимізувати контролери',
    status: 'todo',
    priority: 'high',
    assignee: 'Іван',
    createdAt: new Date('2026-02-05'),
    dueDate: new Date('2026-02-12'), // якщо дата вже минула — буде overdue
  },
]

// Демонстрація formatTask
console.log('\nФорматовані задачі:')
tasks.forEach((task) => {
  console.log(formatTask(task))
})

// Демонстрація getTaskStats
console.log('\nСтатистика задач:')
const stats = getTaskStats(tasks)
console.log(stats)

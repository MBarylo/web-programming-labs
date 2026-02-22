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

class TaskManager {
  #tasks: Task[]
  #nextId: number

  constructor(initialTasks: Task[] = []) {
    this.#tasks = initialTasks
    this.#nextId = 1
  }

  public addTask(dto: Omit<Task, 'id' | 'createdAt'>): Task {
    const task = {
      id: this.#nextId,
      createdAt: new Date(),
      ...dto,
    }
    this.#nextId++
    this.#tasks.push(task)
    return task
  }

  public updateTask(
    id: number,
    updates: Partial<Omit<Task, 'id' | 'createdAt'>>,
  ): Task | null {
    const index = this.#tasks.findIndex((task) => {
      return task.id == id
    })

    if (index != -1) {
      const oldTask = this.#tasks[index]
      const newTask = {
        ...oldTask,
        ...updates,
      }
      this.#tasks[index] = newTask
      return newTask
    } else return null
  }

  public deleteTask(id: number): boolean {
    const index = this.#tasks.findIndex((task) => {
      return task.id == id
    })

    if (index != -1) {
      this.#tasks.splice(index, 1)
      return true
    } else return false
  }

  public get tasks(): Task[] {
    return [...this.#tasks]
  }

  public get count(): number {
    return this.#tasks.length
  }

  public getById(id: number): Task | undefined {
    return this.#tasks.find((task) => task.id === id)
  }
}

class FilteredTaskManager extends TaskManager {
  public getByStatus(status: Status): Task[] {
    return this.tasks.filter((task) => task.status === status)
  }

  public getByPriority(priority: Priority): Task[] {
    return this.tasks.filter((task) => task.priority === priority)
  }

  public getByAssignee(assignee: string): Task[] {
    return this.tasks.filter((task) => task.assignee === assignee)
  }

  public getOverdue(): Task[] {
    return this.tasks.filter(
      (task) =>
        task.status != 'done' &&
        task.status != 'cancelled' &&
        task.dueDate != null &&
        task.dueDate < new Date(),
    )
  }
}

console.log('=== Завдання 3: Класи та модифікатори доступу ===')

const manager = new FilteredTaskManager()

const task1 = manager.addTask({
  title: 'Розробити API',
  description: 'REST API для задач',
  status: 'in_progress',
  priority: 'high',
  assignee: 'Іван',
  dueDate: new Date('2025-02-01'),
})

const task2 = manager.addTask({
  title: 'Написати документацію',
  description: 'Swagger + README',
  status: 'todo',
  priority: 'medium',
  assignee: 'Олена',
  dueDate: new Date('2026-01-10'),
})

const task3 = manager.addTask({
  title: 'Налаштувати CI/CD',
  description: 'GitHub Actions',
  status: 'done',
  priority: 'high',
  assignee: 'Іван',
  dueDate: new Date('2025-01-01'),
})

const task4 = manager.addTask({
  title: 'Оновити залежності',
  description: 'npm update',
  status: 'todo',
  priority: 'low',
  assignee: 'Петро',
  dueDate: new Date('2024-12-01'), // прострочена
})

console.log('Додано task1:', task1)
console.log('Кількість задач:', manager.count)

console.log('\nУсі задачі:')
console.log(manager.tasks)

console.log('\n=== Оновлення задачі ===')
const updated = manager.updateTask(task2.id, {
  status: 'in_progress',
  priority: 'high',
})
console.log('Оновлено:', updated)
console.log('Після оновлення:', manager.getById(task2.id))

console.log('\n=== Видалення задачі ===')
const deleted = manager.deleteTask(task3.id)
console.log('Видалено:', deleted)
console.log('Кількість після видалення:', manager.count)

console.log('\n=== Фільтрація ===')

console.log("За статусом 'todo':")
console.log(manager.getByStatus('todo'))

console.log("За пріоритетом 'high':")
console.log(manager.getByPriority('high'))

console.log("За виконавцем 'Іван':")
console.log(manager.getByAssignee('Іван'))

console.log('\nПрострочені задачі:')
console.log(manager.getOverdue())

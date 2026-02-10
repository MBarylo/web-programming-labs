import { LIBRARY_NAME, books } from './data.js'
import BookCollection from './utils.js'
import {
  getBooksByGenre,
  getAveragePages as calcAveragePages,
  getOldestBook,
} from './utils.js'

console.log('=== Завдання 5: Модулі ===')

console.log('Бібліотека:', LIBRARY_NAME)
console.log('Всього книг:', books.length)

console.log('Книги жанру fiction:', getBooksByGenre(books, 'fiction'))

console.log('Середня кількість сторінок:', calcAveragePages(books))

console.log('Найстаріша книга:', getOldestBook(books))

const collection = new BookCollection(books)

console.log('Кількість книг у колекції:', collection.count)
console.log('Відсортовані за роком:', collection.getSortedByYear())

collection.addBook({
  title: "You Don't Know JS",
  author: 'Kyle Simpson',
  year: 2015,
  pages: 278,
  genre: 'programming',
})

console.log('Після додавання книги, кількість:', collection.count)

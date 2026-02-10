export const getBooksByGenre = (books, genre) =>
  books.filter((book) => book.genre === genre)

export const getAveragePages = (books) =>
  books.reduce((sum, book) => sum + book.pages, 0) / books.length

export const getOldestBook = (books) =>
  books.reduce((oldest, book) => (book.year < oldest.year ? book : oldest))
export default class BookCollection {
  constructor(books = []) {
    this.books = [...books]
  }

  getSortedByYear() {
    return [...this.books].sort((a, b) => a.year - b.year)
  }

  addBook(book) {
    this.books.push(book)
  }

  get count() {
    return this.books.length
  }
}

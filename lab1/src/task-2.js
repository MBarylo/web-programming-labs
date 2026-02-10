import { VARIANT } from './config.js'

console.log('=== Завдання 2: Методи масивів ===')
console.log('Варіант:', VARIANT)

const products = [
  {
    id: 1,
    name: 'Ноутбук',
    price: 25000 + VARIANT * 100,
    category: 'electronics',
    inStock: true,
  },
  {
    id: 2,
    name: 'Навушники',
    price: 2500 + VARIANT * 10,
    category: 'electronics',
    inStock: true,
  },
  {
    id: 3,
    name: 'Футболка',
    price: 800 + VARIANT * 5,
    category: 'clothing',
    inStock: false,
  },
  {
    id: 4,
    name: "Книга 'JavaScript'",
    price: 450 + VARIANT * 3,
    category: 'books',
    inStock: true,
  },
  {
    id: 5,
    name: 'Рюкзак',
    price: 1500 + VARIANT * 8,
    category: 'accessories',
    inStock: true,
  },
  {
    id: 6,
    name: 'Клавіатура',
    price: 3200 + VARIANT * 15,
    category: 'electronics',
    inStock: false,
  },
  {
    id: 7,
    name: 'Кросівки',
    price: 4200 + VARIANT * 20,
    category: 'clothing',
    inStock: true,
  },
  {
    id: 8,
    name: "Книга 'TypeScript'",
    price: 520 + VARIANT * 4,
    category: 'books',
    inStock: true,
  },
  {
    id: 9,
    name: 'Чохол для телефону',
    price: 350 + VARIANT * 2,
    category: 'accessories',
    inStock: true,
  },
  {
    id: 10,
    name: 'Монітор',
    price: 12000 + VARIANT * 50,
    category: 'electronics',
    inStock: true,
  },
]

//2.1

const getAvailableProducts = (products) =>
  products.filter((product) => product.inStock).map((product) => product.name)

console.log('2.1:', getAvailableProducts(products))

//2.2

const getProductsByCategory = (products, category) =>
  products
    .filter((product) => product.category === category)
    .sort((a, b) => a.price - b.price)

console.log('2.2:', getProductsByCategory(products, 'electronics'))

//2.3

const getTotalPrice = (products) =>
  products
    .filter((product) => product.inStock)
    .reduce((sum, product) => sum + product.price, 0)

console.log('2.3:', getTotalPrice(products))

//2.4

const getProductsSummary = (products) =>
  products.reduce((summary, product) => {
    const { category, price, inStock } = product

    if (!summary[category]) {
      summary[category] = { count: 0, totalPrice: 0 }
    }

    if (inStock) {
      summary[category].count += 1
      summary[category].totalPrice += price
    }

    return summary
  }, {})

console.log('2.4:', getProductsSummary(products))

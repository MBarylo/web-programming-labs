console.log('=== Завдання 1: Деструктуризація та Spread/Rest ===')

//1.1

const getFullName = (user) => {
  const { firstName, lastName, middleName = '' } = user

  return `${lastName} ${firstName[0]}. ${
    middleName ? `${middleName[0]}.` : ''
  }`.trim()
}

console.log(
  '1.1:',
  getFullName({
    firstName: 'Петро',
    lastName: 'Іванов',
    middleName: 'Сергійович',
  }),
)

console.log(
  '1.1:',
  getFullName({
    firstName: 'Анна',
    lastName: 'Коваль',
  }),
)

//1.2

const mergeObjects = (...objects) => {
  return objects.reduce((result, obj) => {
    return { ...result, ...obj }
  }, {})
}

console.log('1.2:', mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }))

//1.3

const removeDuplicates = (...arrays) => {
  return [...new Set(arrays.flat())]
}

console.log('1.3:', removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5]))

//1.4

const createUpdatedUser = (user, updates) => {
  return {
    ...user,
    ...updates,
    address: {
      ...user.address,
      ...updates.address,
    },
  }
}

const user = {
  name: 'John',
  age: 25,
  address: {
    city: 'Kyiv',
    zip: '01001',
  },
}

const updated = createUpdatedUser(user, {
  age: 26,
  address: { zip: '02002' },
})

console.log('1.4 updated:', updated)
console.log('1.4 original user:', user)

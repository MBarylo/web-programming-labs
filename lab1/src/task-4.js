//4.1
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

//4.2
const simulateFetch = (url) =>
  new Promise((resolve, reject) => {
    const timeout = 200 + Math.random() * 300 // 200–500 мс

    setTimeout(() => {
      if (!url.startsWith('https')) {
        reject(new Error(`Invalid URL: ${url}`))
        return
      }

      const success = Math.random() < 0.7 // 70%

      if (success) {
        resolve({
          url,
          status: 200,
          data: 'OK',
        })
      } else {
        reject(new Error('Server error: 500'))
      }
    }, timeout)
  })

//4.3
const fetchWithRetry = async (url, attempts) => {
  let lastError

  for (let attempt = 1; attempt <= attempts; attempt++) {
    console.log(`Спроба ${attempt}...`)

    try {
      return await simulateFetch(url)
    } catch (error) {
      lastError = error

      if (attempt < attempts) {
        await delay(500)
      }
    }
  }

  throw lastError
}

//4.4
const fetchMultiple = async (urls) => {
  const results = await Promise.allSettled(
    urls.map((url) => simulateFetch(url)),
  )

  return {
    successful: results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r.value),

    failed: results
      .filter((r) => r.status === 'rejected')
      .map((r) => r.reason.message),
  }
}

async function main() {
  console.log('=== Завдання 4: async/await та Promises ===')

  //4.1
  console.time('delay')
  await delay(1000)
  console.timeEnd('delay')

  //4.2
  try {
    const result = await simulateFetch(
      'https://jsonplaceholder.typicode.com/posts',
    )
    console.log('Успіх:', result)
  } catch (error) {
    console.error('Помилка:', error.message)
  }

  //4.3
  try {
    const result = await fetchWithRetry(
      'https://jsonplaceholder.typicode.com/posts',
      5,
    )
    console.log('fetchWithRetry результат:', result)
  } catch (error) {
    console.error('Всі спроби невдалі:', error.message)
  }

  //4.4
  const results = await fetchMultiple([
    'https://jsonplaceholder.typicode.com/posts',
    'http://invalid-url',
    'https://jsonplaceholder.typicode.com/users',
  ])

  console.log('Результати:', results)
}

main()

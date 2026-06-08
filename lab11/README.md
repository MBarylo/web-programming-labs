# Lab 11 — Image Upload App

## Запуск

### Backend
```bash
cd backend
npm install
npm run start:dev
```
Сервер запуститься на http://localhost:3000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Клієнт запуститься на http://localhost:5173

## Ендпоінти
| Метод | Маршрут | Опис |
|-------|---------|------|
| POST | /files | Завантажити файл |
| GET | /files | Список усіх файлів |
| GET | /files/:name | Отримати файл за назвою |

# Лабораторная работа №1: Первичная настройка проекта

## 📌 Краткое описание

Проект представляет собой простое веб-приложение для управления задачами (Task Manager), разработанное в рамках лабораторной работы по настройке современного стека технологий с соблюдением стандартов качества кода, pre-commit хуков и контейнеризации.

**Frontend** – React + TypeScript (Vite)  
**Backend** – Node.js + Express (TypeScript)  
**API** – RESTful

---

## 📁 Структура проекта

lab-project/
├── backend/ # Серверная часть
│ ├── src/
│ │ └── index.ts # Основной код API
│ ├── Dockerfile
│ ├── .eslintrc.js
│ ├── .prettierrc
│ ├── tsconfig.json
│ └── package.json
├── frontend/ # Клиентская часть
│ ├── src/
│ │ ├── App.tsx
│ │ ├── services/
│ │ │ └── api.ts
│ │ └── types/
│ │ └── Task.ts
│ ├── Dockerfile
│ ├── .eslintrc.cjs
│ ├── .prettierrc
│ └── package.json
├── .husky/
│ └── pre-commit # Pre-commit хук
├── docker-compose.yml
├── package.json # Корневой (husky + lint-staged)
└── README.md

---

## 🛠 Технологии

| Компонент     | Технологии |
|---------------|------------|
| Frontend      | [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/) |
| Backend       | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/) |
| Линтинг       | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) |
| Pre-commit    | [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged) |
| Контейнеризация | [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/) |

---

## ⚙️ Переменные окружения

### Backend (`.env`)

PORT=3001
NODE_ENV=development
text


### Frontend (`.env`)

VITE_API_URL=http://localhost:3001
text


Пример переменных находится в файлах `.env.example` в соответствующих папках.

---

## 🚀 Инструкция по установке и запуску

### Локальный запуск

```bash
# Установка зависимостей
cd backend && npm install
cd ../frontend && npm install

# Запуск backend (порт 3001)
cd backend && npm run dev

# Запуск frontend (порт 5173)
cd frontend && npm run dev

Приложение будет доступно по адресу: http://localhost:5173
```

### Проверка качества кода

```bash
# Backend
cd backend
npm run lint          # Проверка линтером
npm run format        # Форматирование кода

# Frontend
cd frontend
npm run lint
npm run format

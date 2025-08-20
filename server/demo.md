# 🦷 DentalScaner - Full Stack Demo

## 🎯 **Что готово для демо:**

### ✅ **Frontend (Next.js + NextAuth)**
- Красивая страница входа с фоном
- Google OAuth + Demo credentials
- Защищенные маршруты
- Dashboard с статистикой
- Страницы: Doctors, Appointments, Profile, Procedure

### ✅ **Backend (Nest.js + GraphQL + PostgreSQL)**
- **TDD подход** - все тесты проходят
- **User Service** - полный CRUD
- **User GraphQL Resolver** - API endpoints
- **PostgreSQL** - все таблицы созданы
- **TypeORM** - entities настроены

### ✅ **База данных**
- Users, Doctors, Appointments, Procedures, Clinics
- Связи между таблицами
- UUID primary keys
- Timestamps

## 🚀 **Как запустить демо:**

### 1. Frontend
```bash
cd client
npm run dev
# http://localhost:3000
```

### 2. Backend
```bash
cd server
npm run start:dev
# http://localhost:3000/graphql
```

### 3. GraphQL Playground
- Откройте http://localhost:3000/graphql
- Тестируйте запросы

## 📊 **Примеры GraphQL запросов:**

### Создать пользователя
```graphql
mutation {
  createUser(createUserInput: {
    email: "demo@example.com"
    firstName: "John"
    lastName: "Doe"
    role: "patient"
  }) {
    id
    email
    firstName
    lastName
  }
}
```

### Получить всех пользователей
```graphql
query {
  users {
    id
    email
    firstName
    lastName
    role
  }
}
```

## 🧪 **TDD результаты:**
- ✅ 16 тестов проходят
- ✅ User Service покрыт тестами
- ✅ User Resolver покрыт тестами
- ✅ Все CRUD операции работают

## 🎉 **Готово для демо!**

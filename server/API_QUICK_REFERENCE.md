# 🚀 DentalScaner API - Quick Reference

## 📍 Base URL
```
http://localhost:3000/graphql
```

## 🔥 Quick Start

### 1. Start Server
```bash
cd server && npm run start:dev
```

### 2. Test Connection
```graphql
query { __schema { types { name } } }
```

---

## 👤 User Operations

### Create User
```graphql
mutation {
  createUser(createUserInput: {
    email: "user@example.com"
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

### Get All Users
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

### Get User by ID
```graphql
query {
  user(id: "user-id") {
    id
    email
    firstName
    lastName
    role
  }
}
```

### Update User
```graphql
mutation {
  updateUser(
    id: "user-id"
    updateUserInput: {
      firstName: "Updated"
      phone: "+1234567890"
    }
  ) {
    id
    firstName
    phone
  }
}
```

### Delete User
```graphql
mutation {
  removeUser(id: "user-id")
}
```

---

## 📊 Data Types

### User
```graphql
type User {
  id: ID!
  email: String!
  firstName: String!
  lastName: String!
  phone: String
  dateOfBirth: DateTime
  address: String
  role: String!
  avatar: String
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### CreateUserInput
```graphql
input CreateUserInput {
  email: String!
  firstName: String!
  lastName: String!
  role: String
  phone: String
  dateOfBirth: DateTime
  address: String
  avatar: String
}
```

### UpdateUserInput
```graphql
input UpdateUserInput {
  firstName: String
  lastName: String
  phone: String
  dateOfBirth: DateTime
  address: String
  avatar: String
}
```

---

## 🧪 Testing

### Run Tests
```bash
npm test                    # All tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage
```

### Test Results
- ✅ **16 tests passing**
- ✅ **User Service**: CRUD operations
- ✅ **User Resolver**: GraphQL operations

---

## 🔧 Development

### Scripts
```bash
npm run start:dev          # Development server
npm run start:debug        # Debug mode
npm run start:prod         # Production
npm test                   # Run tests
```

### Environment
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=dental_clinic
NODE_ENV=development
```

---

## 📚 Full Documentation
See [API_DOCS.md](./API_DOCS.md) for complete documentation.

---

**�� Ready for demo!**

# 🦷 DentalScaner API Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [GraphQL Schema](#graphql-schema)
- [User Operations](#user-operations)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Testing](#testing)

---

## 🎯 Overview

DentalScaner API is a **GraphQL-based** backend service built with **NestJS** and **PostgreSQL**. It provides a complete solution for dental appointment booking systems.

### 🏗️ Architecture
- **Framework**: NestJS
- **API**: GraphQL (Apollo Server)
- **Database**: PostgreSQL with TypeORM
- **Testing**: Jest (TDD approach)
- **Authentication**: JWT-based (planned)

### 🚀 Base URL
```
http://localhost:3000/graphql
```

---

## 🚀 Getting Started

### 1. Start the Server
```bash
cd server
npm run start:dev
```

### 2. Access GraphQL Playground
Open your browser and navigate to:
```
http://localhost:3000/graphql
```

### 3. Test Connection
```graphql
query {
  __schema {
    types {
      name
    }
  }
}
```

---

## 🔐 Authentication

> **Note**: Authentication is currently in development. All endpoints are publicly accessible for demo purposes.

### Future Implementation
- JWT-based authentication
- Role-based access control (patient, doctor, admin)
- Google OAuth integration

---

## 📊 GraphQL Schema

### Core Entities

#### User Entity
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
  appointments: [Appointment!]
}
```

#### Appointment Entity
```graphql
type Appointment {
  id: ID!
  date: Date!
  time: Time!
  status: AppointmentStatus!
  amount: Float!
  notes: String
  stripePaymentIntentId: String
  isPaid: Boolean!
  user: User!
  doctor: Doctor!
  procedure: Procedure!
  clinic: Clinic!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum AppointmentStatus {
  pending
  confirmed
  completed
  cancelled
}
```

#### Doctor Entity
```graphql
type Doctor {
  id: ID!
  firstName: String!
  lastName: String!
  specialization: String!
  bio: String
  avatar: String
  rating: Float!
  reviewCount: Int!
  availability: JSON
  clinic: Clinic!
  procedures: [Procedure!]
  appointments: [Appointment!]
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### Procedure Entity
```graphql
type Procedure {
  id: ID!
  name: String!
  description: String
  price: Float!
  priceMax: Float
  duration: Int!
  image: String
  isActive: Boolean!
  doctors: [Doctor!]
  appointments: [Appointment!]
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### Clinic Entity
```graphql
type Clinic {
  id: ID!
  name: String!
  address: String!
  phone: String
  email: String
  description: String
  image: String
  workingHours: JSON
  doctors: [Doctor!]
  appointments: [Appointment!]
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

---

## 👤 User Operations

### 📖 Queries

#### Get All Users
```graphql
query GetAllUsers {
  users {
    id
    email
    firstName
    lastName
    role
    phone
    createdAt
  }
}
```

**Response:**
```json
{
  "data": {
    "users": [
      {
        "id": "uuid-here",
        "email": "john@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "patient",
        "phone": "+1234567890",
        "createdAt": "2025-08-20T16:42:25.000Z"
      }
    ]
  }
}
```

#### Get User by ID
```graphql
query GetUser($id: String!) {
  user(id: $id) {
    id
    email
    firstName
    lastName
    role
    phone
    dateOfBirth
    address
    avatar
    createdAt
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "uuid-here"
}
```

### ✏️ Mutations

#### Create User
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
    email
    firstName
    lastName
    role
    phone
    createdAt
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "jane@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "patient",
    "phone": "+1234567890",
    "address": "123 Main St, City"
  }
}
```

#### Update User
```graphql
mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
  updateUser(id: $id, updateUserInput: $input) {
    id
    email
    firstName
    lastName
    role
    phone
    address
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "uuid-here",
  "input": {
    "firstName": "Jane Updated",
    "phone": "+1987654321",
    "address": "456 Oak Ave, City"
  }
}
```

#### Delete User
```graphql
mutation DeleteUser($id: String!) {
  removeUser(id: $id)
}
```

**Variables:**
```json
{
  "id": "uuid-here"
}
```

**Response:**
```json
{
  "data": {
    "removeUser": true
  }
}
```

---

## 📝 Input Types

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

## ⚠️ Error Handling

### Common Error Types

#### Validation Errors
```json
{
  "errors": [
    {
      "message": "Validation failed",
      "extensions": {
        "code": "BAD_USER_INPUT",
        "exception": {
          "validationErrors": [
            {
              "property": "email",
              "constraints": {
                "isEmail": "email must be an email"
              }
            }
          ]
        }
      }
    }
  ]
}
```

#### Not Found Errors
```json
{
  "errors": [
    {
      "message": "User not found",
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

#### Database Errors
```json
{
  "errors": [
    {
      "message": "Internal server error",
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR"
      }
    }
  ]
}
```

---

## 🧪 Examples

### Complete User Management Flow

#### 1. Create a New User
```graphql
mutation {
  createUser(createUserInput: {
    email: "demo@example.com"
    firstName: "Demo"
    lastName: "User"
    role: "patient"
    phone: "+1234567890"
    address: "Demo Address"
  }) {
    id
    email
    firstName
    lastName
    role
    createdAt
  }
}
```

#### 2. Get All Users
```graphql
query {
  users {
    id
    email
    firstName
    lastName
    role
    createdAt
  }
}
```

#### 3. Update User
```graphql
mutation {
  updateUser(
    id: "user-id-here"
    updateUserInput: {
      firstName: "Updated"
      phone: "+1987654321"
    }
  ) {
    id
    firstName
    phone
    updatedAt
  }
}
```

#### 4. Delete User
```graphql
mutation {
  removeUser(id: "user-id-here")
}
```

---

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
src/
├── services/
│   ├── user.service.spec.ts    # User service tests
│   └── user.service.ts
└── graphql/
    └── resolvers/
        ├── user.resolver.spec.ts  # User resolver tests
        └── user.resolver.ts
```

### Test Coverage
- ✅ **User Service**: CRUD operations
- ✅ **User Resolver**: GraphQL queries/mutations
- ✅ **16 tests passing** with TDD approach

---

## 🔧 Development

### Available Scripts
```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode
npm run start:prod         # Start in production mode

# Testing
npm test                   # Run tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage

# Database
npm run typeorm:run        # Run TypeORM migrations
npm run typeorm:revert     # Revert last migration
```

### Environment Variables
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=dental_clinic

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

---

## 🚀 Future Features

### Planned Endpoints
- [ ] **Doctor Operations**: CRUD for doctors
- [ ] **Appointment Operations**: CRUD for appointments
- [ ] **Procedure Operations**: CRUD for procedures
- [ ] **Clinic Operations**: CRUD for clinics
- [ ] **Authentication**: JWT-based auth
- [ ] **File Upload**: Avatar and image uploads
- [ ] **Search & Filtering**: Advanced queries
- [ ] **Pagination**: Cursor-based pagination
- [ ] **Real-time**: WebSocket subscriptions

### Integration Features
- [ ] **Stripe Payments**: Payment processing
- [ ] **Email Notifications**: Appointment reminders
- [ ] **SMS Notifications**: Text reminders
- [ ] **Calendar Integration**: Google Calendar sync

---

## 📞 Support

### Issues & Questions
- **GitHub Issues**: [Create an issue](https://github.com/your-repo/issues)
- **Documentation**: Check this file for updates
- **GraphQL Playground**: Interactive API testing

### Contributing
1. Fork the repository
2. Create a feature branch
3. Write tests (TDD approach)
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**🎉 Happy coding with DentalScaner API!**

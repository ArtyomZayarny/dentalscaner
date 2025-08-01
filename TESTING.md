# Testing Guide

This project uses a comprehensive testing setup with Jest for unit/integration tests and Playwright for E2E tests.

## 🧪 **Testing Stack**

- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing
- **MSW** - API mocking

## 📁 **Test Structure**

```
├── __tests__/
│   ├── components/     # Component tests
│   ├── pages/         # Page tests
│   ├── context/       # Context tests
│   └── utils/         # Utility function tests
├── e2e/               # End-to-end tests
├── mocks/             # Mock files
├── jest.config.js     # Jest configuration
├── jest.setup.js      # Jest setup file
└── playwright.config.ts # Playwright configuration
```

## 🚀 **Running Tests**

### **Unit/Integration Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### **E2E Tests**
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug
```

## 📝 **Writing Tests**

### **Component Tests**
```tsx
import { render, screen } from '@testing-library/react'
import { ComponentName } from '@/app/components/ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### **Context Tests**
```tsx
import { render, screen } from '@testing-library/react'
import { ContextProvider, useContext } from '@/app/context/ContextName'

const TestComponent = () => {
  const { data } = useContext()
  return <div data-testid="test">{data}</div>
}

describe('ContextName', () => {
  it('provides data correctly', () => {
    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    )
    expect(screen.getByTestId('test')).toHaveTextContent('expected')
  })
})
```

### **E2E Tests**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature', () => {
  test('should work correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Welcome')).toBeVisible()
  })
})
```

## 🔧 **Configuration**

### **Jest Configuration**
- Uses Next.js Jest preset
- JSDOM environment for DOM testing
- Path mapping for `@/` imports
- Coverage collection from app, components, and lib directories

### **Playwright Configuration**
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Automatic server startup
- Screenshot and trace capture on failure

## 🎯 **Testing Priorities**

### **High Priority**
- Authentication flows
- Core components (Sidebar, Topbar, data tables)
- Context providers
- Critical user journeys

### **Medium Priority**
- Form validations
- Error handling
- Loading states
- Responsive design

### **Low Priority**
- Utility functions
- Static content
- Third-party integrations

## 📊 **Coverage Goals**

- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

## 🚨 **Common Issues**

### **React Act Warnings**
If you see "act" warnings, wrap state updates in `act()`:
```tsx
import { act } from '@testing-library/react'

await act(async () => {
  // State updates here
})
```

### **Module Resolution**
If tests can't find modules, check:
- Path mapping in `jest.config.js`
- Import paths in test files
- File extensions

### **Async Testing**
For async operations, use:
```tsx
await screen.findByText('Text') // Waits for element
await waitFor(() => expect(element).toBeInTheDocument())
```

## 🔄 **CI/CD Integration**

Tests run automatically on:
- Pre-commit (via Husky)
- Pull requests
- Main branch pushes

## 📚 **Resources**

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [MSW Documentation](https://mswjs.io/docs/) 
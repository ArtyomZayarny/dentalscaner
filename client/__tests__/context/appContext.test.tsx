import { render, screen } from '@testing-library/react';
import { AppContextProvider, useAppContext } from '@/app/context/appContext';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '@/lib/apollo-client';

// Mock Apollo Client
jest.mock('@/lib/apollo-client', () => ({
  getApolloClient: jest.fn(() => ({
    query: jest.fn(),
    mutate: jest.fn(),
    watchQuery: jest.fn(),
  })),
}));

// Mock useQuery hook
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(() => ({
    data: {
      appointmentsByUserId: [
        { id: '1', userId: 'user1', doctorId: 'doc1', date: '2025-08-28', time: '10:00' },
        { id: '2', userId: 'user1', doctorId: 'doc2', date: '2025-08-29', time: '11:00' },
        { id: '3', userId: 'user1', doctorId: 'doc3', date: '2025-08-30', time: '12:00' },
      ],
    },
    loading: false,
    error: null,
  })),
}));

const TestComponent = () => {
  const { user, appointments } = useAppContext();
  return (
    <div>
      <span data-testid="user-name">{user?.fullName}</span>
      <span data-testid="appointments-count">{appointments?.length || 0}</span>
    </div>
  );
};

describe('AppContext', () => {
  it('provides user and appointments data', () => {
    render(
      <ApolloProvider client={getApolloClient()}>
        <AppContextProvider>
          <TestComponent />
        </AppContextProvider>
      </ApolloProvider>,
    );

    expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    expect(screen.getByTestId('appointments-count')).toBeInTheDocument();
  });

  it('loads appointments when user is available', async () => {
    render(
      <ApolloProvider client={getApolloClient()}>
        <AppContextProvider>
          <TestComponent />
        </AppContextProvider>
      </ApolloProvider>,
    );

    // Wait for appointments to load
    await screen.findByTestId('appointments-count');

    const appointmentsCount = screen.getByTestId('appointments-count');
    expect(appointmentsCount.textContent).toBe('3'); // Based on mock data
  });
});

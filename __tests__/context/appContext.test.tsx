import { render, screen } from '@testing-library/react'
import { AppContextProvider, useAppContext } from '@/app/context/appContext'

const TestComponent = () => {
  const { user, appointments } = useAppContext()
  return (
    <div>
      <span data-testid="user-name">{user?.fullName}</span>
      <span data-testid="appointments-count">{appointments?.length || 0}</span>
    </div>
  )
}

describe('AppContext', () => {
  it('provides user and appointments data', () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    )
    
    expect(screen.getByTestId('user-name')).toHaveTextContent('Test User')
    expect(screen.getByTestId('appointments-count')).toBeInTheDocument()
  })

  it('loads appointments when user is available', async () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    )
    
    // Wait for appointments to load
    await screen.findByTestId('appointments-count')
    
    const appointmentsCount = screen.getByTestId('appointments-count')
    expect(appointmentsCount.textContent).toBe('4') // Based on mock data
  })
}) 
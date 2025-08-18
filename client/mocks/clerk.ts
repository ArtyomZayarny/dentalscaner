export const mockUser = {
  id: 'test-user-id',
  fullName: 'Test User',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  imageUrl: 'https://example.com/avatar.jpg',
}

export const mockUseUser = () => ({
  user: mockUser,
  isLoaded: true,
  isSignedIn: true,
})

export const mockSignedIn = ({ children }: { children: React.ReactNode }) => children
export const mockSignedOut = ({ children }: { children: React.ReactNode }) => children
export const mockClerkProvider = ({ children }: { children: React.ReactNode }) => children 
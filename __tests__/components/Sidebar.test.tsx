import { render, screen } from '@testing-library/react'
import Sidebar from '@/app/components/Sidebar'

describe('Sidebar', () => {
  it('renders navigation items', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Appointments')).toBeInTheDocument()
    expect(screen.getByText('Procedures')).toBeInTheDocument()
  })

  it('renders logo/brand', () => {
    render(<Sidebar />)
    
    // Check if logo or brand name is present
    expect(screen.getByText(/dental/i)).toBeInTheDocument()
  })

  it('has proper navigation structure', () => {
    render(<Sidebar />)
    
    // Check if navigation links are present
    const navItems = screen.getAllByRole('link')
    expect(navItems.length).toBeGreaterThan(0)
  })
}) 
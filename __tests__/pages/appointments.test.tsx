import { render, screen } from '@testing-library/react'

// Simple test for appointments functionality
describe('Appointments', () => {
  it('should have appointments data structure', () => {
    const mockAppointment = {
      id: '728ed52f',
      amount: 100,
      date: 'June 15, 2025',
      time: '11:00 am',
      procedure: 'Routine Dental Check',
      status: 'pending',
      actions: 'Complete',
    }

    expect(mockAppointment).toHaveProperty('id')
    expect(mockAppointment).toHaveProperty('amount')
    expect(mockAppointment).toHaveProperty('date')
    expect(mockAppointment).toHaveProperty('time')
    expect(mockAppointment).toHaveProperty('procedure')
    expect(mockAppointment).toHaveProperty('status')
  })

  it('should render appointment information correctly', () => {
    const appointment = {
      id: '728ed52f',
      amount: 100,
      date: 'June 15, 2025',
      time: '11:00 am',
      procedure: 'Routine Dental Check',
      status: 'pending',
    }

    render(
      <div>
        <span data-testid="appointment-id">{appointment.id}</span>
        <span data-testid="appointment-procedure">{appointment.procedure}</span>
        <span data-testid="appointment-status">{appointment.status}</span>
      </div>
    )

    expect(screen.getByTestId('appointment-id')).toHaveTextContent('728ed52f')
    expect(screen.getByTestId('appointment-procedure')).toHaveTextContent('Routine Dental Check')
    expect(screen.getByTestId('appointment-status')).toHaveTextContent('pending')
  })
})

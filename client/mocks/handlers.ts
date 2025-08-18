import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock appointments API
  http.get('/api/appointments', () => {
    return HttpResponse.json([
      {
        id: '728ed52f',
        amount: 100,
        date: 'June 15, 2025',
        time: '11:00 am',
        procedure: 'Routine Dental Check',
        status: 'pending',
        actions: 'Complete',
      },
      {
        id: '728ed521',
        amount: 150,
        date: 'June 20, 2025',
        time: '2:00 pm',
        procedure: 'Teeth Cleaning',
        status: 'confirmed',
        actions: 'Complete',
      },
    ]);
  }),

  // Mock user profile API
  http.get('/api/user/profile', () => {
    return HttpResponse.json({
      id: 'test-user-id',
      fullName: 'Test User',
      email: 'test@example.com',
    });
  }),
];

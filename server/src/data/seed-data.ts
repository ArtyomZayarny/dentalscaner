import { User } from '../entities/user.entity';

export const seedUsers: Partial<User>[] = [
  {
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'patient',
    phone: '+1234567890',
    address: '123 Main St, New York, NY',
    dateOfBirth: new Date('1990-05-15'),
  },
  {
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'patient',
    phone: '+1234567891',
    address: '456 Oak Ave, Los Angeles, CA',
    dateOfBirth: new Date('1985-08-22'),
  },
  {
    email: 'mike.johnson@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'patient',
    phone: '+1234567892',
    address: '789 Pine Rd, Chicago, IL',
    dateOfBirth: new Date('1992-03-10'),
  },
  {
    email: 'sarah.wilson@example.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'patient',
    phone: '+1234567893',
    address: '321 Elm St, Miami, FL',
    dateOfBirth: new Date('1988-12-05'),
  },
];

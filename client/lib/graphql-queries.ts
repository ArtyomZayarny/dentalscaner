import { gql } from '@apollo/client';

export const GET_APPOINTMENTS_BY_USER = gql`
  query GetAppointmentsByUserId($userId: String!) {
    appointmentsByUserId(userId: $userId) {
      id
      userId
      doctorId
      clinicId
      procedureId
      date
      time
      duration
      amount
      status
      paid
      notes
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_APPOINTMENTS = gql`
  query GetAllAppointments {
    appointments {
      id
      userId
      doctorId
      clinicId
      procedureId
      date
      time
      duration
      amount
      status
      paid
      notes
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
      role
      phone
      address
      dateOfBirth
    }
  }
`;

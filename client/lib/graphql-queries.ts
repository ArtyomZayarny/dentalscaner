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

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $userId: String!
    $doctorId: String!
    $clinicId: String!
    $procedureId: String!
    $date: String!
    $time: String!
    $duration: Int!
    $amount: Float!
    $notes: String
  ) {
    createAppointment(
      userId: $userId
      doctorId: $doctorId
      clinicId: $clinicId
      procedureId: $procedureId
      date: $date
      time: $time
      duration: $duration
      amount: $amount
      notes: $notes
    ) {
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

import { gql } from '@apollo/client';

export const GET_DOCTORS = gql`
  query GetDoctors {
    doctors {
      id
      name
      specialization
      avatar
    }
  }
`;

// Removed GET_CLINICS - not needed

export const GET_PROCEDURES = gql`
  query GetProcedures {
    procedures {
      id
      name
      description
      price
      duration
    }
  }
`;

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      id
      userId
      doctorId
      doctor {
        id
        name
      }
      procedureId
      procedure {
        id
        name
      }
      date
      time
      duration
      amount
      status
      notes
      stripePaymentIntentId
      paid
      createdAt
      updatedAt
    }
  }
`;

export const GET_APPOINTMENTS_BY_USER = gql`
  query GetAppointmentsByUserId($userId: String!) {
    appointmentsByUserId(userId: $userId) {
      id
      userId
      doctorId
      doctor {
        id
        name
      }
      procedureId
      procedure {
        id
        name
      }
      date
      time
      duration
      amount
      status
      notes
      stripePaymentIntentId
      paid
      createdAt
      updatedAt
    }
  }
`;

export const GET_APPOINTMENT_BY_ID = gql`
  query GetAppointmentById($id: String!) {
    appointment(id: $id) {
      id
      userId
      doctorId
      doctor {
        id
        name
      }
      procedureId
      procedure {
        id
        name
      }
      date
      time
      duration
      amount
      status
      notes
      stripePaymentIntentId
      paid
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $userId: String!
    $doctorId: String!
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

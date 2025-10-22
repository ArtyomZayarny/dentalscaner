import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Appointment = {
  __typename?: 'Appointment';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['String']['output'];
  doctor?: Maybe<Doctor>;
  doctorId: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  paid: Scalars['Boolean']['output'];
  procedure?: Maybe<Procedure>;
  procedureId: Scalars['String']['output'];
  status: AppointmentStatus;
  stripePaymentIntentId?: Maybe<Scalars['String']['output']>;
  time: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

/** The status of an appointment */
export enum AppointmentStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  NoShow = 'NO_SHOW',
  Pending = 'PENDING'
}

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type Doctor = {
  __typename?: 'Doctor';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  specialization?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type GoogleLoginResponse = {
  __typename?: 'GoogleLoginResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppointment: Appointment;
  createUser: User;
  deleteAppointment: Scalars['Boolean']['output'];
  googleLogin: GoogleLoginResponse;
  login: LoginResponse;
  register: LoginResponse;
  removeUser: Scalars['Boolean']['output'];
  updateAppointment: Appointment;
  updateUser: User;
};


export type MutationCreateAppointmentArgs = {
  amount: Scalars['Float']['input'];
  date: Scalars['String']['input'];
  doctorId: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  procedureId: Scalars['String']['input'];
  time: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteAppointmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationGoogleLoginArgs = {
  token: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAppointmentArgs = {
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserInput;
};

export type Procedure = {
  __typename?: 'Procedure';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  appointment: Appointment;
  appointments: Array<Appointment>;
  appointmentsByUserId: Array<Appointment>;
  doctors: Array<Doctor>;
  procedures: Array<Procedure>;
  user: User;
  users: Array<User>;
};


export type QueryAppointmentArgs = {
  id: Scalars['String']['input'];
};


export type QueryAppointmentsByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string } } };

export type GoogleLoginMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'GoogleLoginResponse', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string } } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: string } } };

export type GetDoctorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDoctorsQuery = { __typename?: 'Query', doctors: Array<{ __typename?: 'Doctor', id: string, name: string, specialization?: string | null, avatar?: string | null }> };

export type GetProceduresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProceduresQuery = { __typename?: 'Query', procedures: Array<{ __typename?: 'Procedure', id: string, name: string, description?: string | null, price: number, duration: number }> };

export type GetAppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppointmentsQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id: string, userId: string, doctorId: string, procedureId: string, date: string, time: string, duration: number, amount: number, status: AppointmentStatus, notes?: string | null, stripePaymentIntentId?: string | null, paid: boolean, createdAt: any, updatedAt: any, doctor?: { __typename?: 'Doctor', id: string, name: string } | null, procedure?: { __typename?: 'Procedure', id: string, name: string } | null }> };

export type GetAppointmentsByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetAppointmentsByUserIdQuery = { __typename?: 'Query', appointmentsByUserId: Array<{ __typename?: 'Appointment', id: string, userId: string, doctorId: string, procedureId: string, date: string, time: string, duration: number, amount: number, status: AppointmentStatus, notes?: string | null, stripePaymentIntentId?: string | null, paid: boolean, createdAt: any, updatedAt: any, doctor?: { __typename?: 'Doctor', id: string, name: string } | null, procedure?: { __typename?: 'Procedure', id: string, name: string } | null }> };

export type GetAppointmentByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAppointmentByIdQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id: string, userId: string, doctorId: string, procedureId: string, date: string, time: string, duration: number, amount: number, status: AppointmentStatus, notes?: string | null, stripePaymentIntentId?: string | null, paid: boolean, createdAt: any, updatedAt: any, doctor?: { __typename?: 'Doctor', id: string, name: string } | null, procedure?: { __typename?: 'Procedure', id: string, name: string } | null } };

export type CreateAppointmentMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  doctorId: Scalars['String']['input'];
  procedureId: Scalars['String']['input'];
  date: Scalars['String']['input'];
  time: Scalars['String']['input'];
  duration: Scalars['Int']['input'];
  amount: Scalars['Float']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', createAppointment: { __typename?: 'Appointment', id: string, userId: string, doctorId: string, procedureId: string, date: string, time: string, duration: number, amount: number, status: AppointmentStatus, paid: boolean, notes?: string | null, createdAt: any, updatedAt: any } };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GoogleLoginDocument = gql`
    mutation GoogleLogin($token: String!) {
  googleLogin(token: $token) {
    token
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
}
    `;
export type GoogleLoginMutationFn = Apollo.MutationFunction<GoogleLoginMutation, GoogleLoginMutationVariables>;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleLoginMutation, { data, loading, error }] = useGoogleLoginMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGoogleLoginMutation(baseOptions?: Apollo.MutationHookOptions<GoogleLoginMutation, GoogleLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
      }
export type GoogleLoginMutationHookResult = ReturnType<typeof useGoogleLoginMutation>;
export type GoogleLoginMutationResult = Apollo.MutationResult<GoogleLoginMutation>;
export type GoogleLoginMutationOptions = Apollo.BaseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  register(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
  ) {
    token
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetDoctorsDocument = gql`
    query GetDoctors {
  doctors {
    id
    name
    specialization
    avatar
  }
}
    `;

/**
 * __useGetDoctorsQuery__
 *
 * To run a query within a React component, call `useGetDoctorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDoctorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDoctorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDoctorsQuery(baseOptions?: Apollo.QueryHookOptions<GetDoctorsQuery, GetDoctorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDoctorsQuery, GetDoctorsQueryVariables>(GetDoctorsDocument, options);
      }
export function useGetDoctorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDoctorsQuery, GetDoctorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDoctorsQuery, GetDoctorsQueryVariables>(GetDoctorsDocument, options);
        }
export function useGetDoctorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDoctorsQuery, GetDoctorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDoctorsQuery, GetDoctorsQueryVariables>(GetDoctorsDocument, options);
        }
export type GetDoctorsQueryHookResult = ReturnType<typeof useGetDoctorsQuery>;
export type GetDoctorsLazyQueryHookResult = ReturnType<typeof useGetDoctorsLazyQuery>;
export type GetDoctorsSuspenseQueryHookResult = ReturnType<typeof useGetDoctorsSuspenseQuery>;
export type GetDoctorsQueryResult = Apollo.QueryResult<GetDoctorsQuery, GetDoctorsQueryVariables>;
export const GetProceduresDocument = gql`
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

/**
 * __useGetProceduresQuery__
 *
 * To run a query within a React component, call `useGetProceduresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProceduresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProceduresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProceduresQuery(baseOptions?: Apollo.QueryHookOptions<GetProceduresQuery, GetProceduresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProceduresQuery, GetProceduresQueryVariables>(GetProceduresDocument, options);
      }
export function useGetProceduresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProceduresQuery, GetProceduresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProceduresQuery, GetProceduresQueryVariables>(GetProceduresDocument, options);
        }
export function useGetProceduresSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProceduresQuery, GetProceduresQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProceduresQuery, GetProceduresQueryVariables>(GetProceduresDocument, options);
        }
export type GetProceduresQueryHookResult = ReturnType<typeof useGetProceduresQuery>;
export type GetProceduresLazyQueryHookResult = ReturnType<typeof useGetProceduresLazyQuery>;
export type GetProceduresSuspenseQueryHookResult = ReturnType<typeof useGetProceduresSuspenseQuery>;
export type GetProceduresQueryResult = Apollo.QueryResult<GetProceduresQuery, GetProceduresQueryVariables>;
export const GetAppointmentsDocument = gql`
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

/**
 * __useGetAppointmentsQuery__
 *
 * To run a query within a React component, call `useGetAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppointmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppointmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAppointmentsQuery, GetAppointmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppointmentsQuery, GetAppointmentsQueryVariables>(GetAppointmentsDocument, options);
      }
export function useGetAppointmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppointmentsQuery, GetAppointmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppointmentsQuery, GetAppointmentsQueryVariables>(GetAppointmentsDocument, options);
        }
export function useGetAppointmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAppointmentsQuery, GetAppointmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAppointmentsQuery, GetAppointmentsQueryVariables>(GetAppointmentsDocument, options);
        }
export type GetAppointmentsQueryHookResult = ReturnType<typeof useGetAppointmentsQuery>;
export type GetAppointmentsLazyQueryHookResult = ReturnType<typeof useGetAppointmentsLazyQuery>;
export type GetAppointmentsSuspenseQueryHookResult = ReturnType<typeof useGetAppointmentsSuspenseQuery>;
export type GetAppointmentsQueryResult = Apollo.QueryResult<GetAppointmentsQuery, GetAppointmentsQueryVariables>;
export const GetAppointmentsByUserIdDocument = gql`
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

/**
 * __useGetAppointmentsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetAppointmentsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppointmentsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppointmentsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAppointmentsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetAppointmentsByUserIdQuery, GetAppointmentsByUserIdQueryVariables> & ({ variables: GetAppointmentsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppointmentsByUserIdQuery, GetAppointmentsByUserIdQueryVariables>(GetAppointmentsByUserIdDocument, options);
      }
export function useGetAppointmentsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppointmentsByUserIdQuery, GetAppointmentsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppointmentsByUserIdQuery, GetAppointmentsByUserIdQueryVariables>(GetAppointmentsByUserIdDocument, options);
        }
export function useGetAppointmentsByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAppointmentsByUserIdQuery, GetAppointmentsByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAppointmentsByUserIdQuery, GetAppointmentsByUserIdQueryVariables>(GetAppointmentsByUserIdDocument, options);
        }
export type GetAppointmentsByUserIdQueryHookResult = ReturnType<typeof useGetAppointmentsByUserIdQuery>;
export type GetAppointmentsByUserIdLazyQueryHookResult = ReturnType<typeof useGetAppointmentsByUserIdLazyQuery>;
export type GetAppointmentsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetAppointmentsByUserIdSuspenseQuery>;
export type GetAppointmentsByUserIdQueryResult = Apollo.QueryResult<GetAppointmentsByUserIdQuery, GetAppointmentsByUserIdQueryVariables>;
export const GetAppointmentByIdDocument = gql`
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

/**
 * __useGetAppointmentByIdQuery__
 *
 * To run a query within a React component, call `useGetAppointmentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppointmentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppointmentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAppointmentByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAppointmentByIdQuery, GetAppointmentByIdQueryVariables> & ({ variables: GetAppointmentByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppointmentByIdQuery, GetAppointmentByIdQueryVariables>(GetAppointmentByIdDocument, options);
      }
export function useGetAppointmentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppointmentByIdQuery, GetAppointmentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppointmentByIdQuery, GetAppointmentByIdQueryVariables>(GetAppointmentByIdDocument, options);
        }
export function useGetAppointmentByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAppointmentByIdQuery, GetAppointmentByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAppointmentByIdQuery, GetAppointmentByIdQueryVariables>(GetAppointmentByIdDocument, options);
        }
export type GetAppointmentByIdQueryHookResult = ReturnType<typeof useGetAppointmentByIdQuery>;
export type GetAppointmentByIdLazyQueryHookResult = ReturnType<typeof useGetAppointmentByIdLazyQuery>;
export type GetAppointmentByIdSuspenseQueryHookResult = ReturnType<typeof useGetAppointmentByIdSuspenseQuery>;
export type GetAppointmentByIdQueryResult = Apollo.QueryResult<GetAppointmentByIdQuery, GetAppointmentByIdQueryVariables>;
export const CreateAppointmentDocument = gql`
    mutation CreateAppointment($userId: String!, $doctorId: String!, $procedureId: String!, $date: String!, $time: String!, $duration: Int!, $amount: Float!, $notes: String) {
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
export type CreateAppointmentMutationFn = Apollo.MutationFunction<CreateAppointmentMutation, CreateAppointmentMutationVariables>;

/**
 * __useCreateAppointmentMutation__
 *
 * To run a mutation, you first call `useCreateAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppointmentMutation, { data, loading, error }] = useCreateAppointmentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      doctorId: // value for 'doctorId'
 *      procedureId: // value for 'procedureId'
 *      date: // value for 'date'
 *      time: // value for 'time'
 *      duration: // value for 'duration'
 *      amount: // value for 'amount'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCreateAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAppointmentMutation, CreateAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAppointmentMutation, CreateAppointmentMutationVariables>(CreateAppointmentDocument, options);
      }
export type CreateAppointmentMutationHookResult = ReturnType<typeof useCreateAppointmentMutation>;
export type CreateAppointmentMutationResult = Apollo.MutationResult<CreateAppointmentMutation>;
export type CreateAppointmentMutationOptions = Apollo.BaseMutationOptions<CreateAppointmentMutation, CreateAppointmentMutationVariables>;
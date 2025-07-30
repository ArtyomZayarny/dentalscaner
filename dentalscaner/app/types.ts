export interface IUser {
  email: string;
  fullName: string;
}

export interface IAppointment {
  id: string;
  amount: number;
  date: string;
  time: string;
  procedure: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  actions: 'Rebook' | 'Complete';
}

import { number, string } from 'zod';

export interface pagination {
  lastPage: number | null;
  page: number | null;
  pageSize: number | null;
  total: number | null;
}

export interface NotifyType {
  message: {
    title: string;
    description: string;
    duration?: number;
  };
}

export interface inviteMentorProps {
  accountId: string;
  name: string;
  email: string;
}

export interface inviteAdminProps {
  accountId: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
}

export interface GetStartedMentorFormValues {
  age: number;
  gender: 'male' | 'female';
  location: string;
  capacity: number;
  specialization: string[];
  availability: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}

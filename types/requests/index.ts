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

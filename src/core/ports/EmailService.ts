import { Employee } from '../entities/Employee';

export interface EmailService {
  sendBirthdayGreeting(employee: Employee): Promise<void>;
}
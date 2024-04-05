import { Employee } from '../entities/Employee';

export interface EmployeeRepository {
  findEmployeesWithBirthday(date: Date): Promise<Employee[]>;
}
import { FileEmployeeRepository } from '../../src/adapters/repositories/FileEmployeeRepository';
import path from 'path';
import 'dotenv/config';

describe('FileEmployeeRepository', () => {
  it('should find employees with birthday today', async () => {
    const repository = new FileEmployeeRepository(path.join(process.cwd(), (process.env.EMPLOYEES_FILE_PATH || 'employees.csv')));
    const today = new Date('2024/04/05');

    const employees = await repository.findEmployeesWithBirthday(today);

    expect(employees.length).toBeGreaterThan(0);
    expect(employees[0].firstName).toBe('Mario');
  });



  it('should find employees with birthday on 29 Feb', async () => {
    const repository = new FileEmployeeRepository(path.join(process.cwd(), (process.env.EMPLOYEES_FILE_PATH || 'employees.csv')));
    const today = new Date('2023/02/28');

    const employees = await repository.findEmployeesWithBirthday(today);

    expect(employees.length).toBeGreaterThan(0);
    expect(employees[0].firstName).toBe('Marzio');
  });

  it('should not find employees with birthday on 29 Feb', async () => {
    const repository = new FileEmployeeRepository(path.join(process.cwd(), (process.env.EMPLOYEES_FILE_PATH || 'employees.csv')));
    const today = new Date('2024/02/28');

    const employees = await repository.findEmployeesWithBirthday(today);

    expect(employees.length).toBe(0);
  });
});

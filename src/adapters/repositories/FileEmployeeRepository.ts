import { EmployeeRepository } from '../../core/ports/EmployeeRepository';
import { Employee } from '../../core/entities/Employee';
import fs from 'fs';
import csv from 'csv-parser';

export class FileEmployeeRepository implements EmployeeRepository {
  constructor(private filePath: string) { }

  async findEmployeesWithBirthday(date: Date): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      const results: Employee[] = [];
      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data) => {
          const dob = new Date(data.date_of_birth);
          if ((dob.getMonth() === date.getMonth() && dob.getDate() === date.getDate()) ||
            (date.getFullYear() % 4 !== 0 && date.getMonth() === 1 && dob.getMonth() === 1 && dob.getDate() === 29 && date.getDate() === 28)) {
            results.push(new Employee(data.last_name, data.first_name, dob, data.email));
          }
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', reject);
    });
  }
}
import { EmployeeRepository } from '../ports/EmployeeRepository';
import { EmailService } from '../ports/EmailService';

export class SendBirthdayGreetings {
  constructor(
    private employeeRepository: EmployeeRepository,
    private emailService: EmailService
  ) { }

  async execute(today: Date): Promise<void> {
    const employees = await this.employeeRepository.findEmployeesWithBirthday(today);
    for (const employee of employees) {
      await this.emailService.sendBirthdayGreeting(employee);
    }
  }
}
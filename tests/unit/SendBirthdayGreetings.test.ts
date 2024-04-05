import { SendBirthdayGreetings } from '../../src/core/use_cases/SendBirthdayGreetings';
import { EmployeeRepository } from '../../src/core/ports/EmployeeRepository';
import { EmailService } from '../../src/core/ports/EmailService';
import { Employee } from '../../src/core/entities/Employee';

describe('SendBirthdayGreetings', () => {
  const mockEmployeeRepository = {
    findEmployeesWithBirthday: jest.fn()
  } as jest.Mocked<EmployeeRepository>;
  const mockEmailService = {
    sendBirthdayGreeting: jest.fn()
  } as jest.Mocked<EmailService>;

  it('should send an email to employees whose birthday is today', async () => {
    const today = new Date();
    const employee = new Employee('Rossi', 'Mario', today, 'mario.rossi@palmabit.com');
    mockEmployeeRepository.findEmployeesWithBirthday.mockResolvedValue([employee]);

    const sendBirthdayGreetings = new SendBirthdayGreetings(mockEmployeeRepository, mockEmailService);
    await sendBirthdayGreetings.execute(today);

    expect(mockEmployeeRepository.findEmployeesWithBirthday).toHaveBeenCalledWith(today);
    expect(mockEmailService.sendBirthdayGreeting).toHaveBeenCalledWith(employee);
  });
});

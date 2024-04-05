import { FileEmployeeRepository } from './adapters/repositories/FileEmployeeRepository';
import { NodemailerEmailService } from './adapters/email/NodemailerEmailService';
import { SendBirthdayGreetings } from './core/use_cases/SendBirthdayGreetings';
import nodemailer from 'nodemailer';
import path from 'path';
import 'dotenv/config';

(async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: !!+(process.env.SMTP_SECURE || '0'),  // Converto '0' o '1' in 0 o 1 con (+),
    auth: {                                       // dopodiché li trasformo in booleani con la negazione (!)
      user: process.env.SMTP_USER,                // ma siccome non ho bisogno del negato lo nego due volte (!!)
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const emailService = new NodemailerEmailService(transporter);

  const employeeRepository = new FileEmployeeRepository(path.join(process.cwd(), (process.env.EMPLOYEES_FILE_PATH || 'employees.csv')));

  const birthdayService = new SendBirthdayGreetings(employeeRepository, emailService);

  try {
    await birthdayService.execute(new Date());
    console.log('Auguri di compleanno inviati con successo!');
  } catch (error) {
    console.error('Si è verificato un errore durante l\'invio degli auguri di compleanno:', error);
  }
})();

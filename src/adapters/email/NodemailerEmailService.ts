import { EmailService } from '../../core/ports/EmailService';
import { Employee } from '../../core/entities/Employee';
import nodemailer from 'nodemailer';

export class NodemailerEmailService implements EmailService {
  constructor(private transporter: nodemailer.Transporter) { }

  async sendBirthdayGreeting(employee: Employee): Promise<void> {
    await this.transporter.sendMail({
      from: '"Birthday Greetings" <hello@palmabit.com>',
      to: employee.email,
      subject: 'Happy birthday!',
      text: `Happy birthday, dear ${employee.firstName}!`,
    });
  }
}
import { NodemailerEmailService } from '../../src/adapters/email/NodemailerEmailService';
import nodemailer from 'nodemailer';
import { Employee } from '../../src/core/entities/Employee';

jest.mock('nodemailer');
const mockedNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;

describe('NodemailerEmailService', () => {
  it('should send an email', async () => {
    const transporter = {
      sendMail: jest.fn().mockResolvedValue(true)
    };

    mockedNodemailer.createTransport.mockReturnValue(transporter as any);

    const name = 'Mario';

    const service = new NodemailerEmailService(transporter as any);
    await service.sendBirthdayGreeting(new Employee('Rossi', name, new Date(), 'mario.rossi@palmabit.com'));

    expect(transporter.sendMail).toHaveBeenCalledWith(expect.objectContaining({
      from: '"Birthday Greetings" <hello@palmabit.com>',
      to: 'mario.rossi@palmabit.com',
      subject: 'Happy birthday!',
      text: `Happy birthday, dear ${name}!`
    }));
  });
});
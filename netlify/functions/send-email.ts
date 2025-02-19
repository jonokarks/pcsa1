import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { type, data } = JSON.parse(event.body || '{}');

    let emailContent = '';
    let subject = '';

    if (type === 'contact') {
      subject = 'New Contact Form Submission';
      emailContent = `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Message: ${data.message}
      `;
    } else if (type === 'booking') {
      subject = 'New Pool Inspection Booking';
      emailContent = `
        Name: ${data.firstName} ${data.lastName}
        Email: ${data.email}
        Phone: ${data.phone}
        Address: ${data.address}
        Suburb: ${data.suburb}
        Postcode: ${data.postcode}
        Preferred Date: ${data.preferredDate}
        Include CPR Sign: ${data.includeCprSign ? 'Yes' : 'No'}
        Additional Notes: ${data.notes || 'None'}
        Total Amount: $${data.total}
      `;
    } else {
      throw new Error('Invalid email type');
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@poolcompliancesa.com.au',
      to: 'info@poolcompliancesa.com.au',
      subject,
      text: emailContent,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};

export { handler };

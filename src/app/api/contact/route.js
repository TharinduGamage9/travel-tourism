import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create transporter using Mailtrap or your SMTP settings
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
            port: parseInt(process.env.SMTP_PORT || '2525'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.CONTACT_EMAIL || 'Ceylonetravels@gmail.com',
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #193555; border-bottom: 2px solid #193555; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-top: 20px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
                        <p><strong>Subject:</strong> ${subject}</p>
                        <div style="margin-top: 20px;">
                            <strong>Message:</strong>
                            <p style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    <p style="color: #697e8a; font-size: 12px; margin-top: 20px;">
                        This email was sent from the Ceylon Travels contact form.
                    </p>
                </div>
            `,
            text: `
                New Contact Form Submission
                
                Name: ${name}
                Email: ${email}
                ${phone ? `Phone: ${phone}` : ''}
                Subject: ${subject}
                
                Message:
                ${message}
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}


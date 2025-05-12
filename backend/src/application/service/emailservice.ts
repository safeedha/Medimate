import nodemailer from 'nodemailer';

export async function sendMail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mksafeedha@gmail.com',  // ✅ wrap in quotes
      pass: 'lfyk ynde oime hser',    // ✅ your Gmail app password
    },
  });

  await transporter.sendMail({
    from: 'mksafeedha@gmail.com',    // ✅ wrap in quotes
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`,
  });
}

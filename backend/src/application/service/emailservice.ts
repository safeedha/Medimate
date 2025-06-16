import nodemailer from 'nodemailer';

export async function sendMail(
  email: string,
  otp?: string,
  subject?: string,
  reason?: string
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mksafeedha@gmail.com',
      pass: 'lfyk ynde oime hser',
    },
  });

  
  let message = '';
  if (otp) {
    message = `Your OTP for verification is: ${otp}`;
  } else if (reason) {
    message = `Reason for rejecting your application: ${reason}`;
  } else {
    message = 'No message content provided.';
  }
   console.log(message)
  await transporter.sendMail({
    from: 'mksafeedha@gmail.com',
    to: email,
    subject: subject || 'Notification', 
    text: message,
  });
  console.log("mail send to",email)
}


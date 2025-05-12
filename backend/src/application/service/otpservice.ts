import otpGenerator from 'otp-generator';

export function generateOtp(): string {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: true,
  });

  return otp;
}


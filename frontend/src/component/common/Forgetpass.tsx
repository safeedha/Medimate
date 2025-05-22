import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { otpsend, verifyuserotp } from '../../api/userapi/register'; // adjust path as needed
import { useLocation } from 'react-router-dom';
import {userpasswordRest} from '../../api/userapi/register';
import {docpasswordRest} from "../../api/doctorapi/doclogin";
import {useNavigate} from 'react-router-dom'




function Forgetpass() {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<'email' | 'otp' | 'password'>('email');
  const [otp, setOtp] = useState('');
  const Navigate=useNavigate()
  const [timer, setTimer] = useState(60);
  const [resendVisible, setResendVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const location = useLocation();
  const { role } = location.state;

  useEffect(() => {
    if (stage === 'otp' && timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
    if (timer === 0) {
      setResendVisible(true);
    }
  }, [stage, timer]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!email)
      {
        toast.error("Please enter the email")
         return
      }

      const result = await otpsend(email);
      toast.success(result);
      setStage('otp');
      setTimer(60);
      setResendVisible(false);
    } catch (error) {
      toast.error('Failed to send OTP');
      console.log(error);
    }
  };

  const handleResend = async () => {
    try {
      const result = await otpsend(email);
      toast.success(result);
      setStage('otp');
      setTimer(60);
      setResendVisible(false);
    } catch (error) {
      toast.error('Failed to resend OTP');
      console.log(error);
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }
    try {
      const result = await verifyuserotp(email, otp);
      if (result === 'OTP verified successfully') {
        toast.success('OTP verified successfully');
        setStage('password');
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error('Verification failed');
      console.log(error);
    }
  };

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in both fields');
      return;
    }
      const regex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;
      if (!regex.test(newPassword )) {
        toast.error('Password must be at least 5 characters long and contain letters and numbers');
        return;
      }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      if(role==="doctor")
      {
       await docpasswordRest(email,newPassword)
       toast.success("Password changed.pleas login")
       Navigate("/doctor/login")
       

      }
      if(role==="user")
      {
          await userpasswordRest(email,newPassword)
         toast.success("Password changed.pleas login")
         Navigate("/login")
      }
     
     
     
    } catch (error) {
      toast.error('Failed to reset password');
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        {stage === 'email' && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Forgot Password
            </h2>
            <form onSubmit={handleEmailSubmit}>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send OTP
              </button>
            </form>
          </>
        )}

        {stage === 'otp' && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Verify OTP
            </h2>
            <label className="block text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
            />
            {!resendVisible && (
              <button
                onClick={handleVerify}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mb-4"
              >
                Verify
              </button>
            )}
            {resendVisible ? (
              <button
                onClick={handleResend}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-center text-gray-500">Resend in {timer}s</p>
            )}
          </>
        )}

        {stage === 'password' && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">
              Reset Password
            </h2>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handlePasswordReset}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Forgetpass;

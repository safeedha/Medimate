import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { otpsend } from '../../api/userapi/register';
import {otpsendfordoctor} from '../../api/doctorapi/doclogin'
import {verifyuserotp} from '../../api/userapi/register';
import {verifydoctorotp} from '../../api/doctorapi/doclogin'
import { Toaster, toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import type{LocationState} from '../../Interface/interface'


function Otp() {
  const location = useLocation();
  const { email } = (location.state as LocationState) || {};
  const {role}=(location.state as LocationState) || {}
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendVisible, setResendVisible] = useState(false);

  useEffect(() => {
    const otpcreation = async () => {
      if (email&&role==='user') {
         await otpsend(email);       
      } else {
        console.log("Email not found in location state");
      }

      if (email&&role==='doctor') {
        await otpsendfordoctor(email);       
      } else {
        console.log("Email not found in location state");
      }
    };
    otpcreation();
  }, [email,role]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendVisible(true);
    }
  }, [timer]);

  const handleResend = async () => {
    if (email) {
      if(role==='user')
      {
         await otpsend(email);
      }
      if(role==='doctor')
      {
           await otpsendfordoctor(email);   
      }
      toast.success("Otp resended")
      setTimer(60);
      setResendVisible(false);
    }
  };

  const handleVerify = async() => {
    if (!otp) {
      console.log("Please enter the OTP");
      return;
    }
   if(role==="user")
   {
    const result = await verifyuserotp(email, otp);
     if(result==="OTP verified successfully")
      { 
         toast.success("OTP verified successfully,Now you can login"); 
         
            setTimeout(() => {
            navigate("/login");
           }, 2000);
      }
      else{
        toast.error("Invalid OTP");
       }
    }
    else{
       const result = await verifydoctorotp(email, otp);
     if(result==="OTP verified successfully")
      { 
         toast.success("OTP verified successfully,Now you can login"); 
         
            setTimeout(() => {
            navigate("/doctor/login");
           }, 2000);
      }
      else{
        toast.error("Invalid OTP");
       }
    }
      

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Toaster />
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
        <p className="text-gray-600 mb-2">
          We sent an OTP to: <span className="font-semibold">{email}</span>
        </p>

       <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      maxLength={6}
      className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-lg mt-4"
    />

        {!resendVisible && (
          <button
            onClick={handleVerify}
            className="mt-4 w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Verify
          </button>
        )}

        {resendVisible ? (
          <button
            onClick={handleResend}
            className="mt-4 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Resend OTP
          </button>
        ) : (
          <p className="mt-4 text-sm text-gray-500">Resend OTP in {timer}s</p>
        )}
      </div>
    </div>
  );
}

export default Otp;

import React, { useState } from 'react';
import bgImage from '../../../assets/patient.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../api/userapi/register';
import { useDispatch } from 'react-redux';
import {GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import {googleLogin} from '../../../api/userapi/register';

function Plogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    const result = await login(email, password,dispatch);
    if (result === 'Login successful') {
      toast.success('Login successful');
      setEmail('');
      setPassword('');
      navigate("/home")
     
    } else if (result === 'this account is not verified') {
      toast.error('This account is not verified, please check your mail for otp verification');
      setTimeout(() => {
        navigate('/otp', { state: { email, role: 'user' } });
      }, 2000);
    } else {
      toast.error(result);
    }
  };
  
  const responseMessage = async(response:any) => {
        console.log(response);
        console.log(jwtDecode(response.credential))
        await googleLogin(response.credential,dispatch)
        toast.success('Login successful');
        navigate("/home")
    };
    const errorMessage = () => {
        console.log("failed")
    };
 
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontSize: '14px',
              padding: '10px 20px',
              maxWidth: '400px',
            },
          }}
        />

        <form
          className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
          onSubmit={handleLogin}
        >
          <h3 className="font-semibold text-center mb-6 text-gray-800 text-lg">
            User Login
          </h3>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field + Forgot Link */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right mt-1">
              <Link
                to="/forgetpassword"
                state={{ role:"user"}} 
                className="text-xs text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Login
          </button>
          <br />
          <br></br>
          <div className='ml-14'>
             <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            useOneTap={false}
            promptMomentNotification={() => {}}
            containerProps={{ className: "w-full" }}
          />
          </div>
           
                    

          {/* Signup Prompt */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Plogin;

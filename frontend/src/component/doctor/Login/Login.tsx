import React, { useState } from 'react';
import bgImage from '../../../assets/doc.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../api/doctorapi/doclogin';
import {useDispatch} from "react-redux"
import {logoutUser} from '../../../feature/userslice'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reaply,setReaply]=useState<boolean>(false)
  const dispatch=useDispatch()
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    const result = await login(email, password,dispatch);
    if (result === 'doctor login sucessfull') {
      toast.success(result);
      dispatch(logoutUser())
      localStorage.removeItem("admin");
      navigate("/doctor/home")
    } else if (result === 'Your account not verified') {
      navigate('/otp', { state: { email, role: 'doctor' } });
    } 
    else if(result==='Your account is Rejected by admin')
    {
      toast.error("Your account is rejected by admin,Please check Your mail to know Reason")
      setReaply(true)
    }
    else {
      toast.error(result);
    }
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
            Doctor Login
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

          {/* Password Field */}
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
              state={{role:"doctor"}}
              className="text-xs text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
            </div>
            {reaply&&(
            <div className="text-right mt-1">
              <Link
              to="/doctor/reapply"
              className="text-xs text-blue-500 hover:underline"
            >
              Reapply
            </Link>
            </div>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Login
          </button>

          {/* Signup Prompt */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?{' '}
            <Link to="/doctor/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

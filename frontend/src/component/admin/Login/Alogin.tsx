import bgImage from '../../../assets/Admin.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import {adminLogin} from '../../../api/adminapi/adminlogin'
import {useNavigate} from 'react-router-dom'
function Login() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
      const result=await adminLogin(email,password)
      if(result==='admin login sucessfull')
      {
        toast.success("Login sucessfull")
        navigate("/admin/dashboard")
      }
      else{
        toast.error(result)
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
            fontSize: '14px',          // Set global font size
            padding: '10px 20px',      // Set global padding
            maxWidth: '400px',         // Limit the width of the toast
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-700"
          >
            Login
          </button>

         
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useState} from 'react';
import bgImage from '../../../assets/patient.jpg';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {register} from '../../../api/userapi/register';
import {useNavigate} from 'react-router-dom'
function Psignup() {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const navigate=useNavigate()
  
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Basic required fields check
  if (!firstname || !email || !gender || !password || !confirmPassword || !contact) {
    toast.error('Please fill all required fields');
    return;
  }

  // Email format validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  // Phone number validation: only digits and 10 characters
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(contact)) {
    toast.error('Please enter a valid 10-digit phone number');
    return;
  }

  const regex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;
  if (!regex.test(password)) {
    toast.error('Password must be at least 5 characters long and contain letters and numbers');
    return;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  // Proceed with registration
  const response = await register(
    firstname,
    lastname,
    email,
    contact,
    password,
    gender
  );

  if (response === "Registration successful") {
    toast.success('User registered successfully');
    setFirstname('');
    setLastname('');
    setContact('');
    setPassword('');
    setConfirmPassword('');
    setGender('');
     toast('This account is not verified, please check your mail for otp verification');
          setTimeout(() => {
            navigate('/otp', { state: { email, role: 'user' } });
          }, 2000);
      setEmail('');
  } else {
    toast.error(response);
  }
};




  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <Toaster />
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 p-6 rounded-2xl shadow-lg w-full max-w-lg max-h-screen overflow-y-auto"
        >
          <h3 className="font-semibold text-center mb-6 text-gray-800 underline text-lg">
            User Signup
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="first-name" className="block text-gray-700 text-sm font-normal">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-gray-700 text-sm font-normal">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-normal">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-gray-700 text-sm font-normal">
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter your contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>

          {/* Gender Radio */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-normal mb-1">Gender</label>
            <div className="flex gap-6">
              {['male', 'female', 'other'].map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={(e) =>
                      setGender(e.target.value as 'male' | 'female' | 'other')
                    }
                    className="accent-blue-500"
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-normal">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-normal">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full p-2 mt-1 border border-gray-300 rounded text-sm"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

        

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-md text-sm hover:bg-blue-700 mt-2"
          >
            Sign Up
          </button>

          <p className="text-center mt-3 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Psignup;

import { useState } from 'react';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import toast, { Toaster } from 'react-hot-toast'
import {userpasswordRest} from '../../api/userapi/register'
import {useSelector} from 'react-redux'
import type { RootState } from '../../app/store';


function Password() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector((state: RootState) => state.user.userInfo);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
       toast.error("Passwords do not match!");
      return;
    }
    
        const regex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;
      if (!regex.test(newPassword )) {
        toast.error('Password must be at least 5 characters long and contain letters and numbers');
        return;
      }
      await userpasswordRest(user?.email as string,newPassword )
      toast.success("Password changed")
  
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Toaster/>
      <div className="flex min-h-screen bg-teal-50">
        <UserSidebar />
        <div className="ml-64 flex-1 overflow-auto mt-32 p-6">
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
              Change Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;

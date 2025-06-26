import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logoutUser} from '../../feature/userslice'
import type{ AppDispatch} from '../../app/store'
import {useEffect,memo} from 'react'

import {getuserdetail,logout} from '../../api/userapi/register'


const Navbar = memo(() => {
  const navigate=useNavigate();
  const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
      const setuserdetail=async()=>{
       const result=await getuserdetail()
       if(result.isBlocked===true)
       {
        await logout()
        dispatch(logoutUser())
         navigate('/login');
       }
      }
      setuserdetail()
    },[dispatch,navigate])
 
  const handlelogout= async() => {
    //  await logout()
     dispatch(logoutUser())
    navigate('/login');
  };
  
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg flex justify-between items-center z-50 w-full fixed top-0 left-0">
      {/* Left: Logo and Web Name */}
      <div className="text-3xl font-bold text-white tracking-wide flex items-center gap-2">
        <span className="text-4xl">🩺</span>
        <span>MediMate</span>
      </div>

      {/* Right: Navigation Links */}
      <div className="space-x-6 flex items-center text-white text-lg font-medium">
         <Link
          to="/home"
          className="hover:underline hover:text-blue-100 transition"
        >
          Home
        </Link>
       
        <Link
          to="/doctor"
          className="hover:underline hover:text-blue-100 transition"
        >
          Doctors
        </Link>
        <Link
          to="/chat"
          className="hover:underline hover:text-blue-100 transition"
        >
          Chat with Doctor
        </Link>
        <Link
          to="/profile"
          className="hover:underline hover:text-blue-100 transition"
        >
          Profile
        </Link>
       <div className="relative inline-block">
        <Link to=""
          className="hover:underline hover:text-blue-100 transition text-xl"
        >
          🔔
        </Link>

        {/* Notification Count Badge */}
        {/* {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )} */}
      </div>

        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition" onClick={handlelogout}>
          Logout
        </button>
      </div>
    </nav>
  );
});

export default Navbar;

import { Link} from 'react-router-dom';
import {  logoutDoctor} from '../../feature/doctorslice'
import {logout,getdetails} from '../../api/doctorapi/doclogin'
import type{ AppDispatch} from '../../app/store'
import { useDispatch } from 'react-redux';
import {useEffect,useState} from 'react'
function DoctorSidebar() {

useEffect(()=>{ 
const getStatus=async()=>{
  const result =await getdetails()
  if(result===true)
  {
  await logout()
  dispatch( logoutDoctor())
  }
}
getStatus()
},[])


const dispatch=useDispatch<AppDispatch>()
  const handleLogout = async() => {
  await logout()
  dispatch( logoutDoctor())
  };

  return (
    <aside className="w-52 h-screen bg-gradient-to-b from-teal-600 to-cyan-600 text-white fixed top-0 left-0 shadow-lg flex flex-col">
      
      <div className="h-20 flex items-center justify-center border-b border-cyan-500">
        <h1 className="text-2xl font-bold">🩺 MediMate</h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-4 text-lg font-medium">
        <Link to="/doctor/home" className="block hover:text-cyan-200">
          🏠 Home
        </Link>
        <Link to="/doctor/dashboard" className="block hover:text-cyan-200">
        📊 Dashboard
      </Link>


        <Link to="/doctor/profile" className="block hover:text-cyan-200">
          ⚙️ Profile
        </Link>
         <Link to="/doctor/slots" className="block hover:text-cyan-200">
           ⏰ <span>Schedules</span>
        </Link>
        <Link to="/doctor/appointments" className="block hover:text-cyan-200">
          📅 Appointments
        </Link>
        <Link to="/doctor/chat" className="flex items-center gap-2 hover:text-cyan-200">
          💬 <span>Chat with patient</span>
        </Link>

        <Link to="/doctor/wallet" className="flex items-center gap-2 hover:text-cyan-200">
          💰 <span>Wallet</span>
        </Link>

      </nav>

      
      <div className="px-4 py-6 border-t border-cyan-500">
        <button
          onClick={handleLogout}
          className="w-full text-left hover:text-red-300"
        >
          🔒 Logout
        </button>
      </div>
    </aside>
  );
}

export default DoctorSidebar;


import { Link, useNavigate } from 'react-router-dom';
import {  logoutDoctor} from '../../feature/doctorslice'
import type{ AppDispatch} from '../../app/store'
import { useDispatch } from 'react-redux';
function DoctorSidebar() {
  const navigate = useNavigate();
const dispatch=useDispatch<AppDispatch>()
  const handleLogout = () => {
  dispatch( logoutDoctor())
  };

  return (
    <aside className="w-52 h-screen bg-gradient-to-b from-teal-600 to-cyan-600 text-white fixed top-0 left-0 shadow-lg flex flex-col">
      
      <div className="h-20 flex items-center justify-center border-b border-cyan-500">
        <h1 className="text-2xl font-bold">🩺 MediMate</h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-4 text-lg font-medium">
        <Link to="/doctor/home" className="block hover:text-cyan-200">
          🏠 Dashboard
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
        <Link to="/doctor/slots" className="flex items-center gap-2 hover:text-cyan-200">
          ⏰ <span>Current Schedules</span>
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


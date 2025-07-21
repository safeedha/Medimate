import { Link, useNavigate } from 'react-router-dom';
import {Logout} from '../../api/adminapi/adminlogin'

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async() => {
    await Logout()
    localStorage.removeItem("admin");
    navigate('/admin/login');
  };

  return (
    <div className="fixed top-0 right-0 left-0 bg-cyan-950 flex flex-col items-center w-1/6 shadow-md z-10 h-screen pt-4">
      
       <div className="mb-4">
        <Link to="/admin/dashboard" className="text-lg text-white">Dashboard</Link>
      </div>


      <div className="mb-4">
        <Link to="/admin/user" className="text-lg text-white">User</Link>
      </div>

      <div className="mb-4">
        <Link to="/admin/doctor" className="text-lg text-white">Doctor</Link>
      </div>

      <div className="mb-4">
        <Link to="/admin/verify" className="text-lg text-white">Doctor verification</Link>
      </div>

      <div className="mb-4">
        <Link to="/admin/Department" className="text-lg text-white">Department</Link>
      </div>

      <div className="mb-4">
        <Link to="/admin/wallet" className="text-lg text-white">Wallet</Link>
      </div>

   
      <button
        onClick={handleLogout}
        className="mt-auto mb-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;

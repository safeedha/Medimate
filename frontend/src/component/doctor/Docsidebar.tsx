import { Link, useNavigate } from 'react-router-dom';

function DoctorSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-teal-600 to-cyan-600 text-white fixed top-0 left-0 shadow-lg flex flex-col">
      {/* Logo and App Name */}
      <div className="h-20 flex items-center justify-center border-b border-cyan-500">
        <h1 className="text-2xl font-bold">🩺 MediMate</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-4 space-y-4 text-lg font-medium">
        <Link to="/doctor/home" className="block hover:text-cyan-200">
          🏠 Dashboard
        </Link>
        <Link to="/doctor/profile" className="block hover:text-cyan-200">
          ⚙️ Profile
        </Link>
        <Link to="/doctor/appointments" className="block hover:text-cyan-200">
          📅 Appointments
        </Link>
      </nav>

      {/* Logout */}
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


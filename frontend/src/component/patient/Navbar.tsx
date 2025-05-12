import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg flex justify-between items-center">
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
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

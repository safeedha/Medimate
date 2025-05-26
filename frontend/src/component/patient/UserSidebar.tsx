import { Link, } from 'react-router-dom';

function UserSidebar() {




  return (
  <aside className="w-64 h-screen bg-gradient-to-b from-teal-200 to-cyan-100 fixed top-0 py-16 left-0 shadow-xl flex flex-col p-6">

  <div className="mb-4 text-center">
    <h1 className="text-2xl font-bold text-gray-800"></h1>
  </div>

  <nav className="flex flex-col gap-4 text-lg font-medium text-gray-700">
    <Link to="/profile" className="hover:text-teal-600 transition-colors">
      📋 Update Details
    </Link>
    <Link to="/booking_details" className="hover:text-teal-600 transition-colors">
      📅 Bookings
    </Link>
    <Link to="" className="hover:text-teal-600 transition-colors">
      💊 Prescription
    </Link>
    <Link to="" className="hover:text-teal-600 transition-colors">
      💰 Wallet
    </Link>
  </nav>

  <div className="mt-auto pt-6 border-t border-gray-300">
    <button
      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
    >
      🔒 Logout
    </button>
  </div>
</aside>



  );
}

export default UserSidebar;


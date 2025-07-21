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
    {/* <Link to="" className="hover:text-teal-600 transition-colors">
      💊 Prescription
    </Link> */}
     <Link to="/changepassword" className="hover:text-teal-600 transition-colors">
      🔑 Change Password
    </Link>

    <Link to="/wallet" className="hover:text-teal-600 transition-colors">
      💰 Wallet
    </Link>
  </nav>

 
</aside>



  );
}

export default UserSidebar;


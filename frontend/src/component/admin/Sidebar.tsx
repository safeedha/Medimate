
import {Link} from 'react-router-dom'

function sidebar() {
  return (
    <div className="fixed top-0 right-0 left-0 bg-cyan-950 flex flex-col items-center w-1/6 shadow-md z-10 h-screen pt-4">
  <div className=" mb-4">
    <Link to="/admin/appointment" className="text-lg text-white">Appointment</Link>
  </div>

  <div className=" mb-4">
    <Link to="/admin/user" className="text-lg text-white">User</Link>
  </div>

  <div className="mb-4">
    <Link to="/admin/doctor" className="text-lg text-white">Doctor</Link>
  </div>

   <div className="mb-4">
    <Link to="/admin/verify" className="text-lg text-white">Doctor verification</Link>
  </div>

  <div className=" mb-4">
    <Link to="/admin/Department" className="text-lg text-white">Department</Link>
  </div>
</div>
  )
}

export default sidebar
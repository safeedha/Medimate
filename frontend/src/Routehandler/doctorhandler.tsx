import {Route} from 'react-router-dom'
 import Login from '../component/doctor/Login/Login'
 import DoctorHome from '../component/doctor/Dhome'
import DoctorProfile from '../component/doctor/Docprofile'
import Schedules from '../component/doctor/Schedules'
import Signup from '../component/doctor/Login/Signup'
import Reapplication from '../component/doctor/Login/Reapplication'
function Doctorhandler() {
  return (
    <>
    <Route path="/doctor/signup" element={<Signup />} />
    <Route path="/doctor/login" element={<Login />} />
    <Route path="/doctor/home" element={<  DoctorHome />} />
    <Route path="/doctor/profile" element={< DoctorProfile />} />
    <Route path="/doctor/reapply" element={< Reapplication />} />
     <Route path="/doctor/slots" element={< Schedules />} />
    </> 
  )
}

export default Doctorhandler
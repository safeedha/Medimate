
import { Route } from "react-router-dom";
import UserloginProtect from './UserloginProt'
import UserProtect from './UserProtect'
import Psignup from '../component/patient/Login/Psignup'
import Plogin from '../component/patient/Login/Plogin'
import PatientHomePage from '../component/patient/Phome'
import Doclist from '../component/patient/Doclist'
import Pprofile from '../component/patient/Pprofile'
import Docdetails from '../component/patient/Docdetails'
import Booking from '../component/patient/Booking'

function Userhandler() {
  return (
    <>
    <Route path="/signup" element={<UserloginProtect><Psignup /></UserloginProtect>} />
    <Route path="/login" element={<UserloginProtect><Plogin /></UserloginProtect>} />

    <Route path="/home" element={<UserProtect><PatientHomePage /></UserProtect>} />
    <Route path="/doctor" element={<UserProtect><Doclist /></UserProtect>} />
    <Route path="/profile" element={<UserProtect><Pprofile /></UserProtect>} />
    <Route path="/doctor/:id" element={<UserProtect><Docdetails /></UserProtect>} />
    <Route path="/booking_details" element={<UserProtect><Booking /></UserProtect>} />
    </> 
  )
}

export default Userhandler
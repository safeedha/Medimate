
import { Route } from "react-router-dom";
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
    <Route path="/signup" element={<Psignup />} />
    <Route path="/login" element={<Plogin />} />
    <Route path="/home" element={< PatientHomePage />} />
    <Route path="/home" element={< PatientHomePage />} />
    <Route path="/doctor" element={< Doclist />} />
    <Route path="/profile" element={< Pprofile />} />
    <Route path="/doctor/:id" element={<  Docdetails />} />
     <Route path="/booking_details" element={< Booking />} />
   
    </> 
  )
}

export default Userhandler
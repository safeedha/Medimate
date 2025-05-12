
import { Route } from "react-router-dom";
import Psignup from '../component/patient/Login/Psignup'
import Plogin from '../component/patient/Login/Plogin'
import PatientHomePage from '../component/patient/Phome'
import Doclist from '../component/patient/Doclist'

function Userhandler() {
  return (
    <>
    <Route path="/signup" element={<Psignup />} />
    <Route path="/login" element={<Plogin />} />
    <Route path="/home" element={< PatientHomePage />} />
    <Route path="/home" element={< PatientHomePage />} />
    <Route path="/doctor" element={< Doclist />} />
    </> 
  )
}

export default Userhandler
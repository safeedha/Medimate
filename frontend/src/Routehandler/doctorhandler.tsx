import { Route } from 'react-router-dom';
import DoctorLoginProtect from './DoctorloginProte';
import DoctorProtect from './DoctorProt';

import Login from '../component/doctor/Login/Login';
import DoctorHome from '../component/doctor/Dhome';
import DoctorProfile from '../component/doctor/Docprofile';
import Schedules from '../component/doctor/Schedules';
import Signup from '../component/doctor/Login/Signup';
import Reapplication from '../component/doctor/Login/Reapplication';
import Docappoinment from '../component/doctor/Docappoinment';

function Doctorhandler() {
  return (
    <>
      {/* Routes accessible only when NOT logged in */}
      <Route path="/doctor/signup" element={
        <DoctorLoginProtect>
          <Signup />
        </DoctorLoginProtect>
      } />

      <Route path="/doctor/login" element={
        <DoctorLoginProtect>
          <Login />
        </DoctorLoginProtect>
      } />

      {/* Routes protected for authenticated doctors only */}
      <Route path="/doctor/home" element={
        <DoctorProtect>
          <DoctorHome />
        </DoctorProtect>
      } />

      <Route path="/doctor/profile" element={
        <DoctorProtect>
          <DoctorProfile />
        </DoctorProtect>
      } />

      <Route path="/doctor/reapply" element={
        <DoctorProtect>
          <Reapplication />
        </DoctorProtect>
      } />

      <Route path="/doctor/slots" element={
        <DoctorProtect>
          <Schedules />
        </DoctorProtect>
      } />

      <Route path="/doctor/appointments" element={
        <DoctorProtect>
          <Docappoinment />
        </DoctorProtect>
      } />
    </>
  );
}

export default Doctorhandler;

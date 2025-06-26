import { Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import DoctorLoginProtect from './DoctorloginProte';
import DoctorProtect from './DoctorProt';
import LoaderFallback from '../component/common/LoaderFallback';

// Lazy-loaded components
const Login = lazy(() => import('../component/doctor/Login/Login'));
const Signup = lazy(() => import('../component/doctor/Login/Signup'));
const Reapplication = lazy(() => import('../component/doctor/Login/Reapplication'));
const DoctorHome = lazy(() => import('../component/doctor/Dhome'));
const DoctorProfile = lazy(() => import('../component/doctor/Docprofile'));
const Schedules = lazy(() => import('../component/doctor/Schedules'));
const Docappoinment = lazy(() => import('../component/doctor/Docappoinment'));
const DocChat = lazy(() => import('../component/doctor/Docchat'));
const Prescription = lazy(() => import('../component/doctor/Prescription'));
const Docwallet = lazy(() => import('../component/doctor/Docwallet'));
const Dashboard = lazy(() => import('../component/doctor/Dashboard'));

function Doctorhandler() {
  return (
    <>
      {/* Routes accessible only when NOT logged in */}
      <Route path="/doctor/signup" element={
        <DoctorLoginProtect>
          <Suspense fallback={<LoaderFallback />}>
            <Signup />
          </Suspense>
        </DoctorLoginProtect>
      } />

      <Route path="/doctor/login" element={
        <DoctorLoginProtect>
          <Suspense fallback={<LoaderFallback />}>
            <Login />
          </Suspense>
        </DoctorLoginProtect>
      } />


      <Route path="/doctor/home" element={
        <DoctorProtect>
          <Suspense fallback={<LoaderFallback />}>
            <DoctorHome />
          </Suspense>
        </DoctorProtect>
      } />

      <Route path="/doctor/dashboard" element={
        <DoctorProtect>
          <Suspense fallback={<LoaderFallback />}>
            <Dashboard />
          </Suspense>
        </DoctorProtect>
      } />

      <Route path="/doctor/addreport" element={
        <DoctorProtect>
          <Suspense fallback={<LoaderFallback />}>
            <Prescription />
          </Suspense>
        </DoctorProtect>
      } />

      <Route path="/doctor/profile" element={
        <DoctorProtect>
          <Suspense fallback={<LoaderFallback />}>
            <DoctorProfile />
          </Suspense>
        </DoctorProtect>
      } />

      <Route path="/doctor/reapply" element={
        <DoctorLoginProtect>
          <Suspense fallback={<LoaderFallback />}>
            <Reapplication />
          </Suspense>
       </DoctorLoginProtect>
      } />

      <Route path="/doctor/slots" element={
        <DoctorProtect>
          <Suspense fallback={<LoaderFallback />}>
            <Schedules />
          </Suspense>
        </DoctorProtect>
      } />

      <Route path="/doctor/appointments" element={
        <DoctorProtect>
          <Suspense fallback={<LoaderFallback />}>
            <Docappoinment />
          </Suspense>
        </DoctorProtect>
      } />

      <Route path="/doctor/chat" element={
        <DoctorProtect>
          <Suspense fallback={<LoaderFallback />}>
            <DocChat />
          </Suspense>
        </DoctorProtect>
      } />

      <Route path="/doctor/wallet" element={
        <DoctorProtect>
          <Suspense fallback={<LoaderFallback />}>
            <Docwallet />
          </Suspense>
        </DoctorProtect>
      } />
    </>
  );
}

export default Doctorhandler;

import { Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Adminloginprotect from './Adminloginprotect';
import Adminprotect from './Adminprotect';
import LoaderFallback from '../component/common/LoaderFallback';

const Alogin = lazy(() => import('../component/admin/Login/Alogin'));
const Adashboard = lazy(() => import('../component/admin/Adashboard'));
const Department = lazy(() => import('../component/admin/Dept/Department'));
const Docverify = lazy(() => import('../component/admin/Docver/Docverify'));
const Doctor = lazy(() => import('../component/admin/Docver/Doctor'));
const User = lazy(() => import('../component/admin/user/User'));
const Appoinment = lazy(() => import('../component/admin/Appoinment/Appoinment'));
const Awallet = lazy(() => import('../component/admin/wallet/Awallet'));

function Adminhandler() {
  return (
    <>
      <Route
        path="/admin/login"
        element={
          <Adminloginprotect>
            <Suspense fallback={<LoaderFallback />}>
              <Alogin />
            </Suspense>
          </Adminloginprotect>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <Adminprotect>
            <Suspense fallback={<LoaderFallback />}>
              <Adashboard />
            </Suspense>
          </Adminprotect>
        }
      />

      <Route
        path="/admin/department"
        element={
          <Adminprotect>
            <Suspense fallback={<LoaderFallback />}>
              <Department />
            </Suspense>
          </Adminprotect>
        }
      />

      <Route
        path="/admin/verify"
        element={
          <Adminprotect>
            <Suspense fallback={<LoaderFallback />}>
              <Docverify />
            </Suspense>
          </Adminprotect>
        }
      />

      <Route
        path="/admin/doctor"
        element={
          <Adminprotect>
            <Suspense fallback={<LoaderFallback />}>
              <Doctor />
            </Suspense>
          </Adminprotect>
        }
      />

      <Route
        path="/admin/user"
        element={
          <Adminprotect>
            <Suspense fallback={<LoaderFallback />}>
              <User />
            </Suspense>
          </Adminprotect>
        }
      />

      <Route
        path="/admin/appointment"
        element={
          <Adminprotect>
            <Suspense fallback={<LoaderFallback />}>
              <Appoinment />
            </Suspense>
          </Adminprotect>
        }
      />

      <Route
        path="/admin/wallet"
        element={
          <Adminprotect>
            <Suspense fallback={<LoaderFallback />}>
              <Awallet />
            </Suspense>
          </Adminprotect>
        }
      />
    </>
  );
}

export default Adminhandler;

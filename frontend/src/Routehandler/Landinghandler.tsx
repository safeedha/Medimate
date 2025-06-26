import { Route } from 'react-router-dom';

import { Suspense, lazy } from 'react';


import LoaderFallback from '../component/common/LoaderFallback';
const Landing = lazy(() => import('../component/common/Landing'));
const Otp = lazy(() => import('../component/common/Otp'));
const Forgetpass = lazy(() => import('../component/common/Forgetpass'));
const Meetingroom = lazy(() => import('../component/common/Videocall'));

function Landinghandler() {
  return (
    <>
      <Route path="/"element={<Suspense fallback={<LoaderFallback/>} > <Landing /></Suspense> } />
      <Route path="/otp" element={<Otp />} />
      <Route path="/forgetpassword" element={<Forgetpass />} />
      <Route path="/video/:roomId" element={<Meetingroom />} />
    </>
  );
}

export default Landinghandler;

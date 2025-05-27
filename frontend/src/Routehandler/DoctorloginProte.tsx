// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../app/store';
// import type{ ReactElement } from 'react';


// function DoctorloginProte({ children }: { children: ReactElement }) {
//  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);

//   if(doctor)
//   {
//     return <Navigate to='/doctor/home'/>
//   }
//   return children

// }

// export default DoctorloginProte

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import type { ReactElement } from 'react';

function DoctorLoginProtect({ children }: { children: ReactElement }) {
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
  console.log(doctor)

  if (doctor) {
    return <Navigate to='/doctor/home' />;
  }

  return children;
}

export default DoctorLoginProtect;
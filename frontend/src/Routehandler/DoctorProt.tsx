import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import type{ ReactElement } from 'react';


function DoctorProtect({ children }: { children: ReactElement }) {
 const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);

  if(doctor)
  {
    return children
  }
  return <Navigate to='/doctor/login'/>
}

export default DoctorProtect
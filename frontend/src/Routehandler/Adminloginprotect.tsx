import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';


function Adminloginprotect({children}:{ children: ReactElement }) {
   const admin=localStorage.getItem("admin");
    if(!admin)
   {
    return children
   }
   else{
      return <Navigate to='/admin/dashboard'/>
   }
}

export default Adminloginprotect
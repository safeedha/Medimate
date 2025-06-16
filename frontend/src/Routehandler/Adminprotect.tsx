
import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';

function Adminprotect({children}:{ children: ReactElement }) {
  const admin=localStorage.getItem("admin");
  if(admin)
   {
    return children
   }
   else{
      return <Navigate to='/admin/login'/>
   }
}

export default Adminprotect
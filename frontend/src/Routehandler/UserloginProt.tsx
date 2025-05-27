
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import type{ ReactElement } from 'react';

function UserloginProtect({ children }: { children: ReactElement }) {
  const user = useSelector((state: RootState) => state.user.userInfo);
  console.log("hey")
  console.log(user)
  if(user)
  {
    return <Navigate to='/home'/>
  }
  return children

}

export default UserloginProtect
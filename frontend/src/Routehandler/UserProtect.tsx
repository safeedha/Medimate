import type{ ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';


function UserProtect({ children }: { children: ReactElement }) {
  const user = useSelector((state: RootState) => state.user.userInfo);

  if (user) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
}

export default UserProtect;


import {Route} from 'react-router-dom'
import Adminloginprotect from './Adminloginprotect'
import Adminprotect from './Adminprotect'
import Alogin from '../component/admin/Login/Alogin'
import Adashboard from '../component/admin/Adashboard'
import Department from '../component/admin/Dept/Department'
import Docverify from '../component/admin/Docver/Docverify'
import Doctor from '../component/admin/Docver/Doctor'
import User from '../component/admin/user/User'
import Appoinment from '../component/admin/Appoinment/Appoinment'
import Awallet from '../component/admin/wallet/Awallet'



function Adminhandler() {
  return (
    <>
       <Route path="/admin/login" element={<Adminloginprotect><Alogin /></Adminloginprotect>} />
       <Route path="/admin/dashboard" element={<Adminprotect><Adashboard /></Adminprotect>} />
      <Route path="/admin/department" element={<Adminprotect><Department /></Adminprotect>} />
      <Route path="/admin/verify" element={<Adminprotect><Docverify /></Adminprotect>} />
      <Route path="/admin/doctor" element={<Adminprotect><Doctor /></Adminprotect>} />
      <Route path="/admin/user" element={<Adminprotect><User /></Adminprotect>} />
      <Route path="/admin/appointment" element={<Adminprotect><Appoinment /></Adminprotect>} />
      <Route path="/admin/wallet" element={<Adminprotect><Awallet /></Adminprotect>} />
    </>
  )
}

export default Adminhandler
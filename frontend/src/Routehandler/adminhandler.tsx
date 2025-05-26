
import {Route} from 'react-router-dom'
import Alogin from '../component/admin/Login/Alogin'
import Adashboard from '../component/admin/Adashboard'
import Department from '../component/admin/Dept/Department'
import Docverify from '../component/admin/Docver/Docverify'
import Doctor from '../component/admin/Docver/Doctor'
import User from '../component/admin/user/User'
import Appoinment from '../component/admin/Appoinment/Appoinment'



function Adminhandler() {
  return (
    <>
       <Route path="/admin/login" element={<Alogin />} />
       <Route path="/admin/dashboard" element={<Adashboard />} />
       <Route path="/admin/department" element={<Department />} />
        <Route path="/admin/verify" element={<Docverify />} />
        <Route path="/admin/doctor" element={<Doctor />} />
        <Route path="/admin/user" element={<User/>} />
        <Route path="/admin/appointment" element={<Appoinment/>} />
    </>
  )
}

export default Adminhandler
import {Route} from 'react-router-dom'
import Landing from '../component/common/Landing'
import Otp from '../component/common/Otp'
import Forgetpass from '../component/common/Forgetpass'
import Meetingroom from '../component/common/Videocall'

function Landinghandler() {
  return (
     <>
       <Route path="/" element={<Landing />} />
       <Route path="/otp" element={<Otp />} />
       <Route path="/forgetpassword" element={<Forgetpass />} />
       <Route path="/video/:roomId" element={<Meetingroom />} />
    </>
  )
}

export default Landinghandler
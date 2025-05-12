
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Routes,  } from 'react-router-dom';
import Landinghandler from './Routehandler/Landinghandler'
import Adminhandler from './Routehandler/adminhandler'
import Userhandler from './Routehandler/userhandler'
import Doctorhandler from './Routehandler/doctorhandler'
function App() {
  

  return (
    <>
      <Router>
      <Routes>
        {Landinghandler()}
        {Adminhandler()}
        {Userhandler()}
        {Doctorhandler()}
      </Routes>
    </Router>
    </>
  )
}

export default App


import Sidebar from './Sidebar'

function Adashboard() {
  return (
    <div className="flex flex-row">
      <div className="w-1/6"><Sidebar/></div>
      <div className="w-5/6 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mt-4">Admin Dashboard</h1>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
          <p className="text-gray-600">Manage your application from here.</p>
        </div>
      </div>
    </div>
  )
}

export default Adashboard
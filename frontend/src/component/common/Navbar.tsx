import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logoutUser} from '../../feature/userslice'
import type{ AppDispatch} from '../../app/store'
import {useEffect,memo} from 'react'
import {getuserdetail,logout} from '../../api/userapi/register'
import {getunreadnotification,readallnotification} from '../../api/userapi/notification'
import {useState} from 'react'
import { socket } from '../../socket';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type{INotification} from '../../Interface/interface';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = memo(() => {
 
  const navigate=useNavigate();
  const [count,setCount]=useState<number>(0)
  const [notification,setNotification]=useState<INotification[]>([])
   const user = useSelector((state: RootState) => state.user.userInfo);
   const [showNotifications, setShowNotifications] = useState(false);


     useEffect(()=>{
     const getcountandnotification=async()=>{
        const response=await getunreadnotification()
        setCount(response.length)
        setNotification(response)
     }
     getcountandnotification()
  },[count])

      useEffect(()=>{
       socket.on('notification_count',(data,message)=>{
        console.log(data)
        setCount(count+data)
        toast.success(message)
       })
       return () => {
           socket.off('notification_count')
        }
      },[])

       useEffect(()=>{
       socket.emit('joinRoom1', user?._id);
       return () => {
        socket.emit('leaveRoom1',user?._id);
        }
      },[])

  const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
      const setuserdetail=async()=>{
       const result=await getuserdetail()
       if(result.isBlocked===true)
       {
        await logout()
        dispatch(logoutUser())
         navigate('/login');
       }
      }
      setuserdetail()
    },[dispatch,navigate])
 
  const handlelogout= async() => {
      await logout()
     dispatch(logoutUser())
    navigate('/login');
  };
  
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg flex justify-between items-center z-50 w-full fixed top-0 left-0">
      <Toaster/>
      <div className="text-3xl font-bold text-white tracking-wide flex items-center gap-2">
        <span className="text-4xl">🩺</span>
        <span>MediMate</span>
      </div>

      {/* Right: Navigation Links */}
      <div className="space-x-6 flex items-center text-white text-lg font-medium">
         <Link
          to="/home"
          className="hover:underline hover:text-blue-100 transition"
        >
          Home
        </Link>
       
        <Link
          to="/doctor"
          className="hover:underline hover:text-blue-100 transition"
        >
          Doctors
        </Link>
        <Link
          to="/chat"
          className="hover:underline hover:text-blue-100 transition"
        >
          Chat with Doctor
        </Link>
        <Link
          to="/profile"
          className="hover:underline hover:text-blue-100 transition"
        >
          Profile
        </Link>
       <div className="relative inline-block">
        <Link to=""
          className="hover:underline hover:text-blue-100 transition text-xl"
            onClick={(e) => {
          e.preventDefault(); 
          setShowNotifications((prev) => !prev); 
        }}
        >
          🔔
        </Link>
          {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 max-h-64 bg-white text-black rounded shadow-lg overflow-y-auto z-50">
          
          <div className="p-2 text-left border-b border-gray-200 sticky top-0 bg-white z-10">
            <button
              onClick={async() => {
               await readallnotification()
               toast.success('All notifications marked as read')
               setCount(0)
              }}
              className="text-blue-600 hover:underline text-sm"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          {notification.length === 0 ? (
            <div className="p-4 text-center text-sm">No new notifications</div>
          ) : (
            notification.map((note, index) => (
              <div key={index} className="p-3 border-b border-gray-200 text-sm">
                <p>{note.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}


         {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )} 
      </div>

        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition" onClick={handlelogout}>
          Logout
        </button>
      </div>
    </nav>
  );
});

export default Navbar;

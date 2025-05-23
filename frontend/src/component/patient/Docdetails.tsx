import {useEffect,useState} from 'react'
import Navbar from './Navbar';
import {useParams} from 'react-router-dom'
import {getSingledoctor} from '../../api/userapi/doctor'
import type{Idoctor} from '../../Interface/interface'

function Docdetails() {
const[doctor,setDoctor]=useState<Idoctor>() 
type Params = {
  id: string;
};
 const { id } = useParams<Params>();

 useEffect(() => {
  if (!id) return; 
  const fetchSingleDoctor = async () => {
    const doctorData = await getSingledoctor(id);
    setDoctor(doctorData);
  };

  fetchSingleDoctor();
}, [id]);


  return (
     <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className=''>

      </div>
      </div>
  )
}

export default Docdetails
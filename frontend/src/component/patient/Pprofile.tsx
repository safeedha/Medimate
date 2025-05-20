import UserSidebar from './UserSidebar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useEffect,useState} from 'react'
import {getuserdetail,setUserdetail} from '../../api/userapi/register'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Toaster, toast } from 'react-hot-toast';

function Pprofile() {
  const [firstname,setFirstname]=useState<string>('')
  const [lastname,setLastname]=useState<string>('')
  const [phone,setPhone]=useState<string>('')
  const [age,setAge]=useState<number>()
  const [gender,setGender]=useState<"male"|"female"|"other">("other")
 const [update,setUpdate]=useState<boolean>(false)
  useEffect(() => {
  async function getUserDetails() {
    try {
    
      const response = await getuserdetail();
      console.log(response)
      setFirstname(response.firstname)
      setLastname(response.lastname)
      setPhone(response.phone)
      setAge(response.age)
      setGender(response.gender)
          } catch (error) {
              console.error('Error fetching user details:', error);
            }
          }

          getUserDetails();
        }, [update]);

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  try{
     const response=await setUserdetail(firstname,lastname,phone,age,gender)
     if(response==="updation successfull")
     {
      toast.success("Your profile updated sucessfully")
       setUpdate((prev)=>!prev)
     }
     else{
        toast.error(response)
     }
     

  }
  catch(error)
  {
    console.log(error)
  }
  }

  return (
   <div className="flex min-h-screen bg-slate-100">
  <UserSidebar />
  <div className="ml-64 flex-1 overflow-auto p-10">
    <Box
      component="form"
      onSubmit={handleSubmit} // Add your form submit function here
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: 3,
        maxWidth: 900,
        mx: 'auto',
        p: 5,
      }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Profile</h2>
      <Toaster />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 3,
          width: '100%',
        }}
      >
        <TextField
          label="First Name"
          type="text"
          fullWidth
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Last Name"
          type="text"
          fullWidth
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          label="Phone Number"
          type="text"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Age"
          type="number"
          fullWidth
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
       
        />
      </Box>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </Box>
  </div>
</div>

  );
}

export default Pprofile;

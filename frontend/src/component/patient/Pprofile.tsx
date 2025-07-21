import UserSidebar from './UserSidebar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { getuserdetail, setUserdetail } from '../../api/userapi/register';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../common/Navbar';

function Pprofile() {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>(''); // Changed from number to string
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('other');
  const [update, setUpdate] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await getuserdetail();
        console.log(response);
        setFirstname(response.firstname);
        setLastname(response.lastname);
        setPhone(response.phone);
        setAge(String(response.age)); // Convert to string
        setGender(response.gender);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    getUserDetails();
  }, [update]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!/^\d{10}$/.test(phone)) {
        toast.error('Phone number must be exactly 10 digits');
        return;
      }
      if (!age || Number(age) < 5) {
        toast.error('Please enter a valid age (5 or above)');
        return;
      }

      const response = await setUserdetail(
        firstname,
        lastname,
        phone,
        Number(age), 
        gender
      );

      if (response === 'updation successfull') {
        toast.success('Your profile updated successfully');
        setUpdate((prev) => !prev);
        setDisabled(true);
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex min-h-screen bg-teal-50">
        <UserSidebar />
        <div className="ml-64 flex-1 overflow-auto mt-32">
          <Box
            component="form"
            onSubmit={handleSubmit}
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
                required
                disabled={disabled}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <TextField
                label="Last Name"
                type="text"
                fullWidth
                required
                disabled={disabled}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <TextField
                label="Phone Number"
                type="text"
                fullWidth
                required
                disabled={disabled}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  required
                  label="Gender"
                  onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                  disabled={disabled}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Age"
                type="number"
                required
                fullWidth
                value={age}
                disabled={disabled}
                onChange={(e) => setAge(e.target.value)}
                inputProps={{ min: 5 }}
              />
            </Box>
            {disabled ? (
              <p
                onClick={() => setDisabled(false)}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-colors inline-block cursor-pointer"
              >
                Update Profile
              </p>
            ) : (
              <button
                type="submit"
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Pprofile;

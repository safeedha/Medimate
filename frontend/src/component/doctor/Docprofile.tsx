import DoctorSidebar from '../common/Docsidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState } from '../../app/store';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { profileUpdate,getSingledoctor } from '../../api/doctorapi/doclogin';
import { getDepartment } from '../../api/doctorapi/department';
import type { DepartmentProps } from '../../Interface/interface';


interface Experience {
  hospitalName: string;
  role: string;
  years: string;
}

function DoctorProfile() {
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
  const dispatch = useDispatch();

  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [profilePicture, setProfilePicture] = useState(doctor?.profilePicture || '');
  const [medicalLicence, setMedicalLicence] = useState(doctor?.medicalLicence || '');
  const [newExperienceList, setNewExperienceList] = useState<Experience[]>([
    { hospitalName: '', role: '', years: '' },
  ]);

  const [formData, setFormData] = useState({
    firstname: doctor?.firstname || '',
    lastname: doctor?.lastname || '',
    experience: doctor?.experience?.toString() || '',
    fee: doctor?.fee?.toString() || '',
    phone: doctor?.phone || '',
    specialisation: doctor?.specialisation || '',
    qualification: doctor?.qualification || '',
  });
  useEffect(()=>{
   const fetchSingledoctor=async()=>{
    const response=await getSingledoctor()
   }
   fetchSingledoctor()
  },[])

  useEffect(() => {
    getDepartment().then(setDepartments).catch(console.error);
  }, []);

  const update = () => setDisabled(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const updatedList = [...newExperienceList];
    updatedList[index][field] = value;
    setNewExperienceList(updatedList);
  };

  const addExperienceField = () => {
    setNewExperienceList([...newExperienceList, { hospitalName: '', role: '', years: '' }]);
  };

  const handleLicenceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'products');

    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/dwerqkqou/image/upload',
        uploadData
      );
      setMedicalLicence(data.secure_url.split('/upload/')[1]);
      toast.success('Medical License uploaded');
    } catch {
      toast.error('Upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstname, lastname, phone, qualification, experience, fee } = formData;

    if (!firstname.trim()) return toast.error('First name is required');
    if (!lastname.trim()) return toast.error('Last name is required');
    if (!experience || isNaN(Number(experience))) return toast.error('Valid experience is required');
    if (!fee || isNaN(Number(fee))) return toast.error('Valid consultation fee is required');
    if (!qualification.trim()) return toast.error('Qualification is required');
    if (!/^\d{10}$/.test(phone)) return toast.error('Phone number must be exactly 10 digits');

    let uploadedUrl = profilePicture;

    if (profilePicture && profilePicture.startsWith('data:')) {
      const uploadForm = new FormData();
      uploadForm.append('file', profilePicture);
      uploadForm.append('upload_preset', 'products');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dwerqkqou/image/upload',
        uploadForm
      );
      uploadedUrl = response.data.secure_url.split('/upload/')[1];
    }

    const payload = {
      firstname,
      lastname,
      experience: Number(experience),
      fee: Number(fee),
      image: uploadedUrl,
      phone,
      email: doctor!.email!,
      specialisation: formData.specialisation,
      qualification,
      medicalLicence,
      newExperienceList, // ⬅️ send new entries to backend
    };

    const res = await profileUpdate(payload, dispatch);

    if (res === 'Profile updated successfully') {
      toast.success(res);
      setDisabled(true);
    } else {
      toast.error(res);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      <Toaster />
      <DoctorSidebar />
      <div className="ml-64 flex-1 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <header className="text-center py-6 px-6">
          <h1 className="text-4xl font-semibold text-indigo-700 mb-2">
            Dr. {doctor?.firstname || 'Doctor'}
          </h1>
          <p className="text-gray-600">Manage your personal and professional details.</p>
        </header>

        <main className="px-6 md:px-20 py-4 flex justify-center">
          <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-md">
            {/* Profile Photo Upload */}
            <div className="text-center mb-6">
              <img
                src={`https://res.cloudinary.com/dwerqkqou/image/upload/${profilePicture}`}
                alt="Profile"
                className="w-20 h-20 rounded-full border mx-auto cursor-pointer"
                onClick={() => document.getElementById('fileInput')?.click()}
              />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
                disabled={disabled}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Inputs */}
              <div className="flex gap-4">
                <input
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder="First Name"
                  className="flex-1 p-2 border rounded-md"
                />
                <input
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder="Last Name"
                  className="flex-1 p-2 border rounded-md"
                />
              </div>

              {/* Contact & Specialisation */}
              <div className="flex gap-4">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder="Phone Number"
                  className="flex-1 p-2 border rounded-md"
                  pattern="[0-9]{10}"
                />
                <select
                  name="specialisation"
                  value={formData.specialisation}
                  onChange={handleChange}
                  disabled={disabled}
                  className="flex-1 p-2 border rounded-md"
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.deptname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Qualification */}
              <textarea
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                disabled={disabled}
                placeholder="Qualification"
                className="w-full p-2 border rounded-md"
              />

              {/* License Upload */}
              <div>
                <label className="text-sm">Medical License</label>
                {medicalLicence && (
                  <div className="mb-1">
                    <a
                      href={`https://res.cloudinary.com/dwerqkqou/image/upload/${medicalLicence}`}
                      className="text-blue-600 underline text-sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Uploaded License
                    </a>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleLicenceChange}
                  disabled={disabled}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Experience & Fee */}
              <div className="flex gap-4">
                <input
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder="Total Experience"
                  className="flex-1 p-2 border rounded-md"
                />
                <input
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder="Consultation Fee"
                  className="flex-1 p-2 border rounded-md"
                />
              </div>

              {/* Dynamic Experience Fields */}
              {!disabled && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-indigo-600">Add Previous Experience</h3>
                    <button
                      type="button"
                      onClick={addExperienceField}
                      className="bg-indigo-500 text-white px-3 py-1 rounded"
                    >
                      + Add
                    </button>
                  </div>
                  {newExperienceList.map((exp, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Hospital Name"
                        value={exp.hospitalName}
                        onChange={(e) => handleExperienceChange(idx, 'hospitalName', e.target.value)}
                        className="p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                        className="p-2 border rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Years"
                        value={exp.years}
                        onChange={(e) => handleExperienceChange(idx, 'years', e.target.value)}
                        className="p-2 border rounded-md"
                        min={0}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="text-center">
                {disabled ? (
                  <button
                    type="button"
                    onClick={update}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                  >
                    Update Profile
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorProfile;

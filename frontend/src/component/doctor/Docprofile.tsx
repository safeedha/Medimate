import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState } from '../../app/store';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { profileUpdate, getSingledoctor } from '../../api/doctorapi/doclogin';
import { getDepartment } from '../../api/doctorapi/department';
import DoctorSidebar from '../common/Docsidebar';
import type { DepartmentProps,Experience } from '../../Interface/interface';



function DoctorProfile() {
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);

  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [render, setRender] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [medicalLicence, setMedicalLicence] = useState<string>('');
  const [experienceDetail, setExperienceDetail] = useState<Experience[]>([]);
  const [newExperienceList, setNewExperienceList] = useState<Experience[]>([
    { hospitalName: '', role: '', years: '' },
  ]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    experience: '',
    fee: '',
    phone: '',
    specialisation: '',
    qualification: '',
  });

  useEffect(() => {
    const fetchSingleDoctor = async () => {
      try {
        const doctor = await getSingledoctor();
        setFormData({
          firstname: doctor.firstname || '',
          lastname: doctor.lastname || '',
          experience: doctor.experience?.toString() || '',
          fee: doctor.fee?.toString() || '',
          phone: doctor.phone || '',
          specialisation: doctor.specialisation?.id || '',
          qualification: doctor.qualification || '',
        });
        setProfilePicture(doctor.profilePicture || '');
        setMedicalLicence(doctor.medicalLicence || '');
        setExperienceDetail(doctor.experienceDetail || []);
      } catch (error) {
        console.error('Failed to fetch doctor:', error);
      }
    };

    fetchSingleDoctor();
  }, [render]);

  useEffect(() => {
    getDepartment().then(setDepartments).catch(console.error);
  }, []);

  const update = () => {
    setDisabled(false);
    setNewExperienceList(experienceDetail);
  };

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

   const handleRemoveExperience = (index: number) => {
    const updatedList = [...newExperienceList];
    updatedList.splice(index, 1);
    setNewExperienceList(updatedList);
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
       for (const exp of newExperienceList) {
      if (!exp.hospitalName.trim() || !exp.role.trim() || !exp.years.trim()) {
        return toast.error('All experience fields must be filled');
      }
    }
    const cleanedExperienceList = newExperienceList.filter(
      (exp) => exp.hospitalName.trim() && exp.role.trim() && exp.years.trim()
    );

    const payload = {
      firstname,
      lastname,
      experience: Number(experience),
      fee: Number(fee),
      image: uploadedUrl,
      phone,
      specialisation: formData.specialisation,
      qualification,
      medicalLicence,
      newExperienceList: cleanedExperienceList,
    };

    const res = await profileUpdate(payload, newExperienceList);
    if (res === 'Profile updated successfully') {
      toast.success(res);
      setRender((prev) => !prev);
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
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="firstname" className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastname" className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="specialisation" className="block text-sm font-medium mb-1">Department</label>
                  <select
                    id="specialisation"
                    name="specialisation"
                    value={formData.specialisation}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.deptname}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="qualification" className="block text-sm font-medium mb-1">Qualification</label>
                <textarea
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  disabled={disabled}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label htmlFor="medicalLicense" className="block text-sm font-medium mb-1">Medical License</label>
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
                  id="medicalLicense"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleLicenceChange}
                  disabled={disabled}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="experience" className="block text-sm font-medium mb-1">Total Experience</label>
                  <input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="fee" className="block text-sm font-medium mb-1">Consultation Fee</label>
                  <input
                    id="fee"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    disabled={disabled}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              {disabled && experienceDetail.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-indigo-600 mb-2">Experience History</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 border">Hospital</th>
                          <th className="px-3 py-2 border">Role</th>
                          <th className="px-3 py-2 border">Years</th>
                        </tr>
                      </thead>
                      <tbody>
                        {experienceDetail.map((exp, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-3 py-2 border">{exp.hospitalName}</td>
                            <td className="px-3 py-2 border">{exp.role}</td>
                            <td className="px-3 py-2 border">{exp.years}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
                  

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
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 items-end relative border p-3 rounded-md shadow-sm">
                      <div>
                        <label className="text-sm block mb-1">Hospital Name</label>
                        <input
                          type="text"
                          value={exp.hospitalName}
                          onChange={(e) => handleExperienceChange(idx, 'hospitalName', e.target.value)}
                          className="p-2 border rounded-md w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm block mb-1">Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                          className="p-2 border rounded-md w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm block mb-1">Years</label>
                        <input
                          type="number"
                          value={exp.years}
                          onChange={(e) => handleExperienceChange(idx, 'years', e.target.value)}
                          className="p-2 border rounded-md w-full"
                          min={0}
                        />
                      </div>
                      {newExperienceList.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* {disabled && experienceDetail.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-indigo-600 mb-2">Experience History</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 border">Hospital</th>
                          <th className="px-3 py-2 border">Role</th>
                          <th className="px-3 py-2 border">Years</th>
                        </tr>
                      </thead>
                      <tbody>
                        {experienceDetail.map((exp, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-3 py-2 border">{exp.hospitalName}</td>
                            <td className="px-3 py-2 border">{exp.role}</td>
                            <td className="px-3 py-2 border">{exp.years}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

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
                      <div>
                        <label className="text-sm block mb-1">Hospital Name</label>
                        <input
                          type="text"
                          value={exp.hospitalName}
                          onChange={(e) => handleExperienceChange(idx, 'hospitalName', e.target.value)}
                          className="p-2 border rounded-md w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm block mb-1">Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                          className="p-2 border rounded-md w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm block mb-1">Years</label>
                        <input
                          type="number"
                          value={exp.years}
                          onChange={(e) => handleExperienceChange(idx, 'years', e.target.value)}
                          className="p-2 border rounded-md w-full"
                          min={0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )} */}

              <div className="text-center">
                {disabled ? (
                  <div
                    onClick={update}
                    className="ml-60 mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer text-center text-xs w-fit"
                  >
                    Update Profile
                  </div>
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

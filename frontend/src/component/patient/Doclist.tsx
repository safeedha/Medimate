import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { getAlldoctors, getDepartnment } from '../../api/userapi/doctor';
import Pagination from '../../component/common/Pgination';
import type { IDepartment, Idoctor } from '../../Interface/interface';

function Doclist() {
  const [doctors, setDoctors] = useState<Idoctor[] | null>(null);
  const [department, setDepartment] = useState<IDepartment[]>([]);
  const [singledepartment, setSingledepartment] = useState<string>('All doctor');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorData = await getAlldoctors(currentPage, itemsPerPage, singledepartment, search);
      setDoctors(doctorData.data);
      setTotal(doctorData.total);
    };

    fetchDoctors();
  }, [currentPage, singledepartment, search]);

  useEffect(() => {
    const fetchDepartnment = async () => {
      const response = await getDepartnment();
      setDepartment(response);
    };

    fetchDepartnment();
  }, []);

 
  useEffect(() => {
    setCurrentPage(1);
  }, [search, singledepartment]);

  const appoinmenHandle = (id: string | undefined) => {
    if (id) navigate(`/doctor/${id}`);
  };

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const deptdetails = department.map((dept) => (
    <div
      key={dept._id}
      className="hover:bg-slate-200 cursor-pointer p-2 rounded"
      onClick={() => setSingledepartment(dept.deptname)}
    >
      <p>{capitalizeFirst(dept.deptname)}</p>
    </div>
  ));

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="flex flex-row">
        <div className="fixed h-screen w-48 top-0 shadow-lg py-20 flex flex-col gap-7 items-center overflow-y-auto">
          <div
            className="hover:bg-slate-200 cursor-pointer p-2 rounded"
            onClick={() => setSingledepartment('All doctor')}
          >
            <p>All doctor</p>
          </div>
          {deptdetails}
        </div>

        <section className="py-4 px-4 md:px-12 lg:px-20 ml-48 w-full mt-20">
          <div>
            <input
              type="text"
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full max-w-md"
              placeholder="Search for Doctor"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>

          {!doctors ? (
            <p className="text-center text-gray-600 text-lg">Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No doctors found.</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.map((doctor, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl border-2 border-teal-300 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
                  >
                    <img
                      src={doctor.profilePicture || 'https://via.placeholder.com/100'}
                      alt="Doctor"
                      className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-teal-500 mb-4"
                    />
                    <h4 className="text-xl font-semibold text-teal-700 text-center">
                      Dr. {doctor.firstname} {doctor.lastname}
                    </h4>
                    <p className="text-black text-center mt-1 font-semibold">
                      {typeof doctor.specialisation === 'object' && doctor.specialisation
                        ? doctor.specialisation.deptname
                        : 'General Practitioner'}
                    </p>
                    <p className="text-black text-center mt-1 font-semibold">
                      Consultation fee: ₹{doctor.fee}
                    </p>
                    <p className="text-black text-center mt-1 font-semibold">
                      Experience: {doctor.experience} years
                    </p>
                    <button
                      className="bg-slate-900 text-white px-4 py-2 rounded-xl mt-4 mx-auto block hover:bg-slate-800 transition duration-200"
                      onClick={() => appoinmenHandle(doctor._id)}
                    >
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Doclist;

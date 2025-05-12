import DoctorSidebar from './Docsidebar';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

function DoctorHome() {
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main content */}
      <div className="ml-64 flex-1 bg-gradient-to-br from-white via-emerald-50 to-cyan-100 p-8 flex flex-col justify-center items-center">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
            Welcome, Dr. {doctor?.firstname || 'Doctor'}
          </h1>
          <p className="text-lg text-gray-700 mb-10 italic">
            “Medicine is a science of uncertainty and an art of probability.” – William Osler
          </p>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-l-8 border-teal-500">
            <p className="text-gray-800 text-lg mb-6">
              Your digital assistant to help you deliver care seamlessly — with organized appointments, patient insights, and performance tracking all in one place.
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
              <li>📅 Stay on top of appointments, past and upcoming.</li>
              <li>🩻 Access in-depth patient histories with clarity.</li>
              <li>🔐 Engage in secure and private communication.</li>
              <li>📈 Monitor your performance and improve efficiency.</li>
            </ul>

            <div className="mt-8 text-center">
              <span className="inline-block bg-teal-100 text-teal-800 px-6 py-3 rounded-full font-semibold shadow">
                Empowering care through smart technology.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorHome;

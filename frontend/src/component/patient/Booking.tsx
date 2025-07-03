import { useEffect, useState, useRef } from 'react';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';
import { getfutureAppoinments, cancelAppoinment, getPage } from '../../api/userapi/appoinment';
import { getReport } from '../../api/userapi/report';
import type { Appointment } from '../../Interface/interface';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import './booking.css'

function Booking() {
  const [futur, setFuture] = useState<Appointment[]>([]);
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [doctorname,setDoctorname]=useState<string>("")
  const [render, setRender] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [targetIdToScroll, setTargetIdToScroll] = useState<string | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const rowRef = useRef<{ [key: string]: HTMLTableRowElement | null }>({});
  const reportRef = useRef<HTMLDivElement | null>(null);
  const limit = 3;

  useEffect(() => {
    const getFutureAppointments = async () => {
      const result = await getfutureAppoinments(currentpage, limit);
      setFuture(result.appoi);
      setTotal(result.total);
    };
    getFutureAppointments();
  }, [render, currentpage]);

  const cancelHandle = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure to cancel this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    });

    if (result.isConfirmed) {
      const response = await cancelAppoinment(id);
      if (response === 'Status updated') {
        toast.success("The appointment was cancelled. You will be refunded within weeks.");
        setRender(!render);
      }
    }
  };

  const handleViewReport = async (appointmentId: string,doctorname:string) => {
    try {
      setLoadingReport(true);
      setDoctorname(doctorname)
      const report = await getReport(appointmentId);
      setSelectedReport(report.content || 'No report content found.');
      setShowModal(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch report");
    } finally {
      setLoadingReport(false);
    }
  };

  const scrollToreschedule = async (originalId: string) => {
    const followup = futur.find(a => a._id === originalId);

    if (followup && rowRef.current[followup?._id!]) {
      rowRef.current[followup._id!]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      rowRef.current[followup._id!]?.classList.add('bg-orange-500');
      setTimeout(() => {
        rowRef.current[followup._id!]?.classList.remove('bg-orange-500');
      }, 2000);
    } else {
      const page = await getPage(originalId, limit);
      setCurrentpage(page);
      setTargetIdToScroll(originalId);
    }
  };

  const scrollToFollowUp = async (originalId: string) => {
    const followup = futur.find(a => a._id === originalId);

    if (followup && rowRef.current[followup._id!]) {
      rowRef.current[followup._id!]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      rowRef.current[followup._id!]?.classList.add('bg-yellow-100');
      setTimeout(() => {
        rowRef.current[followup._id!]?.classList.remove('bg-yellow-100');
      }, 2000);
    } else {
      const page = await getPage(originalId, limit);
      setCurrentpage(page);
      setTargetIdToScroll(originalId);
    }
  };

  useEffect(() => {
    if (targetIdToScroll && futur.length > 0) {
      const target = futur.find(a => a._id === targetIdToScroll);
      if (target && rowRef.current[target._id as string]) {
        rowRef.current[target._id as string]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        rowRef.current[target._id as string]?.classList.add('bg-yellow-100');
        setTimeout(() => {
          rowRef.current[target._id as string]?.classList.remove('bg-yellow-100');
        }, 2000);
        setTargetIdToScroll(null);
      }
    }
  }, [futur, targetIdToScroll]);

//    const handleDownloadPDF = () => {
//   if (reportRef.current) {
//     const originalStyle = reportRef.current.getAttribute('style');
//     reportRef.current.style.maxHeight = 'none';
//     reportRef.current.style.overflow = 'visible';

//     const opt = {
//       margin: 0.5,
//       filename: 'Appointment-Report.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
//     };

//     html2pdf()
//       .set(opt)
//       .from(reportRef.current)
//       .save()
//       .then(() => {
//         if (originalStyle) {
//           reportRef.current?.setAttribute('style', originalStyle);
//         } else {
//           reportRef.current?.removeAttribute('style');
//         }
//       });
//   }
// };
const handleDownloadPDF = () => {
  if (reportRef.current) {
    const reportElement = reportRef.current;

    // Temporarily expand styles
    const originalStyle = reportElement.getAttribute('style');
    reportElement.style.maxHeight = 'none';
    reportElement.style.overflow = 'visible';

    const opt = {
      margin: 0.5,
      filename: 'Appointment-Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: reportElement.scrollWidth,
        windowHeight: reportElement.scrollHeight,
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf()
      .set(opt)
      .from(reportElement)
      .save()
      .then(() => {
        if (originalStyle !== null) {
          reportElement.setAttribute('style', originalStyle);
        } else {
          reportElement.removeAttribute('style');
        }
      });
  }
};

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className='min-h-screen bg-teal-50'>
        <Toaster />
        <Navbar />
        <div className="flex h-screen">
          <UserSidebar />
          <div className="ml-64 flex-1 p-6 overflow-y-auto space-y-8 mt-20">
            <div className="bg-white shadow-xl rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 text-center">
                Upcoming Appointments
              </h2>
              {futur.length > 0 ? (
                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Patient Name</th>
                        <th className="border px-4 py-2">Doctor</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Reason</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {futur.map((appointment) => (
                        <tr key={appointment._id} className="hover:bg-gray-50" ref={(el) => { rowRef.current[appointment._id!] = el; }}>
                          <td className="border px-4 py-2">{appointment.patient_name}</td>
                          <td className="border px-4 py-2">
                            {typeof appointment.doctor_id !== 'string' ? appointment.doctor_id.firstname : ''}
                          </td>
                          <td className="border px-4 py-2">
                            {typeof appointment.schedule_id !== 'string'
                              ? new Date(appointment.schedule_id.date).toLocaleDateString()
                              : ''}
                          </td>
                          <td className="border px-4 py-2">
                            {typeof appointment.schedule_id !== 'string'
                              ? `${appointment.schedule_id.startingTime} - ${appointment.schedule_id.endTime}`
                              : ''}
                          </td>
                          <td className="border px-4 py-2">{appointment.reason}</td>
                          <td className="border px-4 py-2 capitalize">{appointment.status}</td>
                          <td className="border px-4 py-2 text-center">
                            {appointment.status === 'completed' ? (
                              appointment.reportAdded ? (
                                <button
                                onClick={() => {
                                if (typeof appointment.doctor_id === 'object' && appointment.doctor_id !== null) {
                                  handleViewReport(appointment._id!, appointment?.doctor_id?.firstname!);
                                }
                              }}
                                  className="min-w-[120px] px-3 py-1.5 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                                >
                                  View Report
                                </button>
                              ) : (
                                <span className="inline-block min-w-[120px] px-3 py-1.5 rounded-md text-sm font-medium text-yellow-600 bg-yellow-100">
                                  Report Pending
                                </span>
                              )
                            ) : appointment.status === 'pending' ? (
                              <button
                                onClick={() => cancelHandle(appointment._id!)}
                                className="min-w-[120px] px-3 py-1.5 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition duration-200"
                              >
                                Cancel
                              </button>
                            ) : (appointment.status === 'cancelled' && appointment.isRescheduled === false) ? (
                              <span className="inline-block min-w-[120px] px-3 py-1.5 rounded-md text-sm text-gray-500 bg-gray-100">
                                {appointment.status}
                              </span>
                            ) : (
                              <button
                                className="min-w-[120px] px-3 mt-1 py-1.5 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 shadow transition duration-200"
                                onClick={() => scrollToreschedule(appointment.rescheduled_to as string)}
                              >
                                Reschedule Added
                              </button>
                            )}

                            {appointment.status === 'completed' && appointment.followup_status && (
                              <button
                                className="min-w-[120px] px-3 mt-1 py-1.5 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-lime-400 text-white hover:bg-lime-700 shadow transition duration-200"
                                onClick={() => scrollToFollowUp(appointment.followup_id as string)}
                              >
                                Follow-up Added
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-6">
                      <button
                        onClick={() => setCurrentpage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentpage === 1}
                        className="px-3 py-1 border rounded text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentpage(index + 1)}
                          className={`px-3 py-1 border rounded text-sm ${currentpage === index + 1 ? 'bg-teal-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentpage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentpage === totalPages}
                        className="px-3 py-1 border rounded text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 text-center">You have no upcoming appointments.</p>
              )}
            </div>
              


             {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
    <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] p-6 md:p-8 shadow-2xl border border-gray-200 flex flex-col">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold"
        onClick={() => setShowModal(false)}
        aria-label="Close"
      >
        &times;
      </button>

      {loadingReport ? (
        <p className="text-center text-gray-500 animate-pulse">Loading report...</p>
      ) : (
        <>
          <div className="overflow-auto flex-1 pr-1 scrollbar-custom">
  <div ref={reportRef} className="text-gray-800 leading-relaxed">
    <h2 className="text-2xl font-extrabold mb-2 text-center text-blue-800">
      Medimate HealthCare
    </h2>
    <h3 className="text-lg font-semibold mb-1 text-center text-gray-700">
      Appointment Report
    </h3>
    <p className="text-sm font-medium text-center mb-4 text-gray-600">
      Dr: <span className="capitalize">{doctorname}</span>
    </p>

    {/* REMOVE max-h-[400px] and overflow-auto here */}
    <div className="border border-gray-200 p-4 rounded-md bg-gray-50">
      <div dangerouslySetInnerHTML={{ __html: selectedReport }} />
    </div>

    <p className="text-xs text-right text-gray-500 mt-4">
      Generated on: {new Date().toLocaleDateString()}
    </p>
  </div>
</div>

          <div className="mt-6 text-center">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium px-6 py-2 rounded-lg shadow"
            >
              Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}


            
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;

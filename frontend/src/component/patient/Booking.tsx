import React, { useEffect, useState, useRef } from 'react';
import UserSidebar from './UserSidebar';
import Navbar from '../common/Navbar';
import { getfutureAppoinments, cancelAppoinment, getPage } from '../../api/userapi/appoinment';
import { getReport } from '../../api/userapi/report';
import type { Appointment } from '../../Interface/interface';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import Table from '../../component/common/Table';
import './booking.css';

function Booking() {
  const [futur, setFuture] = useState<Appointment[]>([]);
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [doctorname, setDoctorname] = useState<string>('');
  const [render, setRender] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [selectedMedicines, setSelectedMedicines] = useState<any[]>([]);
  const [targetIdToScroll, setTargetIdToScroll] = useState<string | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const rowRefs = useRef<{ [key: string]: React.RefObject<HTMLTableRowElement> }>({});
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
      title: 'Are you sure about to cancel this appoinment',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    });
    if (result.isConfirmed) {
      const response = await cancelAppoinment(id);
      if (response === 'refund added') {
        toast.success("The appointment was cancelled. Your refund added to your wallet");
        setRender(r => !r);
      }
      if (response === 'Status updated') {
        toast.success("The appointment was cancelled.");
        setRender(r => !r);
      }
    }
  };

  const handleViewReport = async (appointmentId: string, doctorname: string) => {
    try {
      setLoadingReport(true);
      setDoctorname(doctorname);
      const report = await getReport(appointmentId);
      setSelectedReport(report.content || 'No report content found.');
      setSelectedMedicines(report.medicine || []);
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
    if (followup && rowRefs.current[followup._id!]?.current) {
      rowRefs.current[followup._id!]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      rowRefs.current[followup._id!]?.current?.classList.add('bg-orange-500');
      setTimeout(() => {
        rowRefs.current[followup._id!]?.current?.classList.remove('bg-orange-500');
      }, 2000);
    } else {
      const page = await getPage(originalId, limit);
      setCurrentpage(page);
      setTargetIdToScroll(originalId);
    }
  };

  const scrollToFollowUp = async (originalId: string) => {
    const followup = futur.find(a => a._id === originalId);
    if (followup && rowRefs.current[followup._id!]?.current) {
      rowRefs.current[followup._id!]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      rowRefs.current[followup._id!]?.current?.classList.add('bg-yellow-100');
      setTimeout(() => {
        rowRefs.current[followup._id!]?.current?.classList.remove('bg-yellow-100');
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
      if (target && rowRefs.current[target._id as string]?.current) {
        rowRefs.current[target._id as string]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        rowRefs.current[target._id as string]?.current?.classList.add('bg-yellow-100');
        setTimeout(() => {
          rowRefs.current[target._id as string]?.current?.classList.remove('bg-yellow-100');
        }, 2000);
        setTargetIdToScroll(null);
      }
    }
  }, [futur, targetIdToScroll]);

  const joinHandle = (doctorId: string, userId: string) => {
    const roomId = [doctorId, userId].sort().join('_');
    const videoUrl = `/video/${roomId}?role=user&userId=${userId}`;
    window.open(videoUrl, '_blank');
  };

  const handleDownloadPDF = () => {
    if (reportRef.current) {
      const reportElement = reportRef.current;
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

  // ---- Table columns ----
  const columns = [
    {
      header: 'Patient Name',
      accessor: (appointment: Appointment) => appointment.patient_name,
    },
    {
      header: 'Doctor',
      accessor: (appointment: Appointment) =>
        typeof appointment.doctor_id !== 'string' && appointment.doctor_id
          ? appointment.doctor_id.firstname
          : '',
    },
    {
      header: 'Date',
      accessor: (appointment: Appointment) =>
        typeof appointment.schedule_id !== 'string' && appointment.schedule_id
          ? new Date(appointment.schedule_id.date).toLocaleDateString()
          : '',
    },
    {
      header: 'Time',
      accessor: (appointment: Appointment) =>
        typeof appointment.schedule_id !== 'string' && appointment.schedule_id
          ? `${appointment.schedule_id.startingTime} - ${appointment.schedule_id.endTime}`
          : '',
    },
    {
      header: 'Reason',
      accessor: (appointment: Appointment) => appointment.reason,
    },
    {
      header: 'Status',
      accessor: (appointment: Appointment) => (
        <span className="capitalize">{appointment.status}</span>
      ),
    },
    {
      header: 'Action',
      accessor: (appointment: Appointment) => {
        if (appointment.status === 'completed') {
          if (appointment.reportAdded) {
            return (
              <button
                onClick={() => {
                  if (typeof appointment.doctor_id === 'object' && appointment.doctor_id !== null) {
                    handleViewReport(appointment._id!, appointment.doctor_id.firstname!);
                  }
                }}
                className="min-w-[120px] px-3 py-1.5 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
              >
                View Report
              </button>
            );
          } else {
            return (
              <span className="inline-block min-w-[120px] px-3 py-1.5 rounded-md text-sm font-medium text-yellow-600 bg-yellow-100">
                Report Pending
              </span>
            );
          }
        } else if (appointment.status === 'pending') {
          return (
            <div className="flex gap-1 flex-col min-w-[120px]">
              <button
                onClick={() => cancelHandle(appointment._id!)}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={() => joinHandle(appointment?.doctor_id! as string, appointment.user_id as string)}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Join
              </button>
            </div>
          );
        } else if (appointment.status === 'cancelled' && appointment.isRescheduled === false) {
          return (
            <span className="inline-block min-w-[120px] px-3 py-1.5 rounded-md text-sm text-gray-500 bg-gray-100">
              {appointment.status}
            </span>
          );
        } else {
          return (
            <button
              className="min-w-[120px] px-3 mt-1 py-1.5 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => scrollToreschedule(appointment.rescheduled_to as string)}
            >
              Reschedule Added
            </button>
          );
        }
      },
    },
    {
      header: '',
      accessor: (appointment: Appointment) =>
        appointment.status === 'completed' && appointment.followup_status ? (
          <button
            className="min-w-[120px] px-3 mt-1 py-1.5 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-lime-400 text-white hover:bg-lime-700"
            onClick={() => scrollToFollowUp(appointment.followup_id as string)}
          >
            Follow-up Added
          </button>
        ) : null,
    },
  ];

  return (
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
                <Table
                  columns={columns}
                  data={futur}
                  getRowClassName={() => ''}
                  rowRefById={appointment => {
                    const id = appointment._id;
                    if (!id) return null;
                    if (!rowRefs.current[id]) {
                      rowRefs.current[id] = React.createRef<HTMLTableRowElement>();
                    }
                    return rowRefs.current[id];
                  }}
                />
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

          {/* Report Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
              <div
                className="
                  relative bg-white rounded-2xl w-full max-w-3xl 
                  max-h-[90vh] p-6 md:p-8 shadow-2xl border border-gray-200 
                  flex flex-col
                  overflow-y-auto
                "
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedMedicines([]);
                  }}
                  aria-label="Close"
                >
                  &times;
                </button>
                {loadingReport ? (
                  <p className="text-center text-gray-500 animate-pulse">Loading report...</p>
                ) : (
                  <>
                    <div
                      ref={reportRef}
                      className="text-gray-800 leading-relaxed"
                      style={{ paddingBottom: 48 }}
                    >
                      <h2 className="text-2xl font-extrabold mb-2 text-center text-blue-800">
                        Medimate HealthCare
                      </h2>
                      <h3 className="text-lg font-semibold mb-1 text-center text-gray-700">
                        Appointment Report
                      </h3>
                      <p className="text-sm font-medium text-center mb-4 text-gray-600">
                        Dr: <span className="capitalize">{doctorname}</span>
                      </p>
                      <div className="border border-gray-200 p-4 rounded-md bg-gray-50">
                        <div dangerouslySetInnerHTML={{ __html: selectedReport }} />
                      </div>

                      {/* --- Medicines Table --- */}
                      {selectedMedicines?.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold mb-2 text-blue-700 text-center">Prescribed Medicines</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full border text-left border-gray-200 rounded-md shadow text-sm">
                              <thead className="bg-blue-50">
                                <tr>
                                  <th className="px-3 py-2 border">Name</th>
                                  <th className="px-3 py-2 border">Dosage</th>
                                  <th className="px-3 py-2 border">Frequency</th>
                                  <th className="px-3 py-2 border">Duration</th>
                                  <th className="px-3 py-2 border">Notes</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedMedicines.map((med, idx) => (
                                  <tr key={idx} className="even:bg-blue-50">
                                    <td className="px-3 py-2 border">{med.name}</td>
                                    <td className="px-3 py-2 border">{med.dosage}</td>
                                    <td className="px-3 py-2 border">{med.frequency}</td>
                                    <td className="px-3 py-2 border">{med.duration}</td>
                                    <td className="px-3 py-2 border">{med.notes}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* -- PDF Footer -- */}
                      <div
                        className="w-full flex justify-end mt-8"
                        style={{
                          paddingBottom: 24,
                          pageBreakInside: 'avoid'
                        }}
                      >
                        <div
                          style={{
                            background: '#F0F4F8',
                            borderRadius: 8,
                            fontSize: '1em',
                            color: '#555',
                            fontStyle: 'italic',
                            fontWeight: 500,
                            minWidth: 220,
                            padding: '0.5rem 1rem',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            border: '1px dashed #d1d5db',
                            textAlign: 'right',
                            letterSpacing: '0.01em',
                          }}
                        >
                          Generated on:{" "}
                          {new Date().toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
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
  );
}

export default Booking;

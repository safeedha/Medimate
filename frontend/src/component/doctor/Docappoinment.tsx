import { useEffect, useState,useRef ,useCallback} from 'react';
import DoctorSidebar from './Docsidebar';
import { getallappoinment, cancelAppoinment, completeappoinment ,reshecdule,followup,getPage} from '../../api/doctorapi/appoinment';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Pagination from '../../component/common/Pgination';
import type { IndividualSlot ,Appointment} from '../../Interface/interface';
import { getSlotedoctor} from '../../api/doctorapi/appoinment';


function Docappoinment() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
 const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [slot, setSlot] = useState<IndividualSlot[]>([]);
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [render, setRender] = useState(false);
  const [mail, setMail] = useState<string>('');
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFollowupModal, setShowFollowupModal] = useState(false);
  const [targetIdToScroll, setTargetIdToScroll] = useState<string | null>(null);
  const [followupAppointmentId, setFollowupAppointmentId] = useState<string | null>(null);
 const rowRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});
  const limit = 3;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const minDate = formatDate(today);

  const handleFollowUp = (appoinmentid:string) => {
   setFollowupAppointmentId(appoinmentid)
    setShowFollowupModal(true)

  };
  
  const fetchAppointments = useCallback(async () => {
  try {
    const result = await getallappoinment(currentpage, limit);
    setAppointments(result.appointments);
    setTotal(result.total);
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
}, [currentpage, limit])

   const getSlot=async(e: React.ChangeEvent<HTMLInputElement>)=>{
      console.log(e.target.value)
      const selectedDate = new Date(e.target.value);
      const slots = await getSlotedoctor(selectedDate);
      setSlot(slots);
   }

   useEffect(() => {
  fetchAppointments();
}, [fetchAppointments, render]);

  const openCancelModal = (id: string, userid: string, email: string) => {
    setSelectedId(id);
    setReason('');
    setSlot([]);
    setShowModal(true);
    setUserid(userid);
    setMail(email);
  };

  const handleCancelSubmit = async () => {
    if (!reason.trim()) {
      toast.error('Please enter a reason for cancellation.');
      return;
    }
    setLoading(true);
    try {
      const result = await cancelAppoinment(selectedId!, reason, userid!, mail);
      if(result==='refund added')
      {
          toast.success("The appointment was cancelled. Your refund added to your mail");
        setRender(!render);
         setShowModal(false);
      }
      if (result === "Status updated") {
        toast.success("Appointment cancelled. Reason mailed to patient inbox");
        setRender(!render);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to cancel appointment.");
    } finally {
      setLoading(false);
    }
  };

  const Reschedule=async()=>{
     if (!reason.trim()) {
      toast.error('Please enter a reason for cancellation.');
      return;
    }
    try{
     const result = await reshecdule(selectedId!, reason, userid!, mail,selectedSlot!);
     if(result==='Appoinment rescheduled')
     {
       toast.success("Appointment cancelled.and also resheduled");
       setShowModal(false);
       setRender(!render)
     }
    }
    catch(error)
    {
     console.log(error)
    }
  }
  const confirmHandle = async (apptid: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to mark this appointment as complete?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!',
    });

    if (result.isConfirmed) {
      try {
        await completeappoinment(apptid);
        setRender(!render);
        Swal.fire('Confirmed!', 'The appointment has been marked as complete.', 'success');
      } catch (error) {
        console.log(error)
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  const createfollowup=async()=>{
      const result=await followup(selectedSlot as string,followupAppointmentId as string)
      if(result==='followup appoinment created')
      {
         setShowFollowupModal(false)
         toast.success("followup appoinment created");
         setRender(!render)
      }
  }

  const scrollToreschedule=async(originalId: string) =>{
    const followup = appointments.find(a => a._id === originalId);

  if (followup && rowRefs.current[followup?._id!]) {
    rowRefs.current[followup?._id!]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    rowRefs.current[followup?._id!]?.classList.add('bg-orange-500');
    setTimeout(() => {
      rowRefs.current[followup?._id!]?.classList.remove('bg-orange-500');
    }, 2000);
  } else {
    const page = await getPage(originalId, limit);
    setCurrentPage(page);
    setTargetIdToScroll(originalId); 
  }
  }

 const scrollToFollowUp = async (originalId: string) => {
  const followup = appointments.find(a => a._id === originalId);

  if (followup && rowRefs.current[followup?._id!]) {
    rowRefs.current[followup?._id!]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    rowRefs.current[followup?._id!]?.classList.add('bg-yellow-100');
    setTimeout(() => {
      rowRefs.current[followup?._id!]?.classList.remove('bg-yellow-100');
    }, 2000);
  } else {
    const page = await getPage(originalId, limit);
    setCurrentPage(page);
    setTargetIdToScroll(originalId); 
  }
}


useEffect(() => {
  if (targetIdToScroll && appointments.length > 0) {
    const target = appointments.find(a => a._id === targetIdToScroll);
    if (target && rowRefs.current[target?._id!]) {
      rowRefs.current[target?._id!]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      rowRefs.current[target?._id!]?.classList.add('bg-yellow-100');
      setTimeout(() => {
        rowRefs.current[target?._id!]?.classList.remove('bg-yellow-100');
      }, 2000);
      setTargetIdToScroll(null); 
    }
  }
}, [appointments, targetIdToScroll]);


  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      <DoctorSidebar />
      <Toaster />
      <div className="ml-52 flex-1 bg-gray-100 p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h1>

        {appointments.length === 0 ? (
          <div className="text-center text-gray-500 mt-16 text-base">
            No appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Patient Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id} className="border-t border-gray-200" ref={(el) => { rowRefs.current[appt?._id!] = el; }}>
                    <td className="px-4 py-2">{appt.patient_name}</td>
                    <td className="px-4 py-2">{appt.patient_email}</td>
                    <td className="px-4 py-2">{appt.patient_age}</td>
                    <td className="px-4 py-2">{appt.patient_gender}</td>
                    <td className="px-4 py-2">{appt.reason}</td>
                    {typeof appt?.schedule === 'object' && (
                        <>
                          <td className="px-4 py-2">
                            {new Date(appt.schedule.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2">
                            {appt.schedule.startingTime} - {appt.schedule.endTime}
                          </td>
                        </>
                      )}
                    <td className="px-4 py-2 font-semibold">{appt.status}</td>
                      <td className="px-4 py-2">
            <div className="flex flex-col gap-1 w-32">

              {appt.status === 'completed' ? (
                appt.reportAdded === false ? (
                  <Link
                    to="/doctor/addreport"
                    state={{ appointmentId: appt._id, userId: appt.user_id }}
                    className="w-full px-3 py-1 bg-green-500 text-white rounded text-xs text-center hover:bg-green-600"
                  >
                    Add Report
                  </Link>
                ) : (
                  <span className="w-full px-3 py-1 bg-gradient-to-r from-green-200 via-green-300 to-green-400 text-green-900 border border-green-600 rounded text-xs text-center shadow-sm">
                    Report Added
                  </span>
                )
              ) : appt.status === 'cancelled' ? (
                <span className="text-gray-500 text-xs text-center">No actions</span>
              ) : (
                <>
                  <button
                    onClick={() => openCancelModal(appt?._id!, appt.user_id as string, appt.patient_email)}
                    className="w-full px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmHandle(appt?._id!)}
                    className="w-full px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Complete
                  </button>
                </>
              )}

              {appt.status === 'completed' && (
                appt.followup_status === false ? (
                  <button
                    onClick={() => handleFollowUp(appt?._id!)}
                    className="w-full px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
                  >
                    Follow-up
                  </button>
                ) : (
                  <span
                    className="w-full px-3 py-1 bg-purple-100 text-purple-700 border border-purple-300 rounded text-xs text-center cursor-pointer"
                    onClick={() => scrollToFollowUp(appt?.followup_id as string)}
                  >
                    Follow-up Added
                  </span>
                )
              )}

              {appt.status === 'cancelled' && appt.isRescheduled && (
                <button
                  className="w-full px-3 py-1 bg-emerald-500 text-white rounded text-xs hover:bg-emerald-600"
                  onClick={() => scrollToreschedule(appt.rescheduled_to as string)}
                >
                  Rescheduled
                </button>
              )}

              <Link
                to="/doctor/chat"
                state={{ userId: appt.user_id }}
                className="w-full px-3 py-1 bg-gray-300 text-gray-800 rounded text-xs text-center hover:bg-gray-400"
              >
                Chat
              </Link>

            </div>
          </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {appointments.length > 0 && (
          <Pagination
            currentPage={currentpage}
            totalPages={Math.ceil(total / limit)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

  {showFollowupModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Create Follow-up</h2>

      <label className="text-sm text-gray-700 mb-1">Select Follow-up Date</label>
      <input
        type="date"
        onChange={getSlot}
        min={minDate}
        className="w-full border p-2 rounded-md mb-4"
      />
         <div className="flex flex-col gap-2">
  {slot.filter((slo) => slo.status === 'available').length > 0 ? (
    slot
      .filter((slo) => slo.status === 'available')
      .map((slo) => (
        <label
          key={slo._id}
          className="flex items-center gap-1 p-3 rounded-2xl bg-green-100 text-green-700 shadow-md cursor-pointer max-w-xs"
        >
          <input
            type="radio"
            name="selectedSlot"
            value={slo._id}
            className="accent-green-600"
            onChange={() => setSelectedSlot(slo._id ?? null)}
          />
          <span className="text-sm font-medium">
            {slo.startingTime} - {slo.endTime}
          </span>
        </label>
      ))
  ) : (
    <div className="text-gray-500 text-center py-4">
      No available slots for the selected date.
    </div>
  )}
</div>

      <div className="flex justify-between mt-3">
        <button
          onClick={() => setShowFollowupModal(false)}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          onClick={createfollowup}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
      {/* ❌ Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold mb-4">Cancel & Reschedule Appointment</h2>

      <label className="text-sm text-gray-700 mb-1">Reason for cancellation (optional)</label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full border rounded-md p-2 mb-4 resize-none"
        rows={3}
        placeholder="Write reason..."
      />

      <label className="text-sm text-gray-700 mb-1">Reschedule to</label>
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          className="border p-2 rounded-md flex-1"
          min={minDate}
          onChange={getSlot}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          {slot.filter((slo) => slo.status === 'available').length > 0 ? (
            slot
              .filter((slo) => slo.status === 'available')
              .map((slo) => (
                <label
                  key={slo._id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-green-100 text-green-700 shadow-md cursor-pointer max-w-xs"
                >
                  <input
                    type="radio"
                    name="selectedSlot"
                    value={slo._id}
                    className="accent-green-600"
                    onChange={() => setSelectedSlot(slo._id ?? null)}
                  />
                  <span className="text-sm font-medium">
                    {slo.startingTime} - {slo.endTime}
                  </span>
                </label>
              ))
          ) : (
            <div className="text-gray-500  py-4">
              No available slots for the selected date.
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        This appointment will be canceled and rescheduled.<br />
        The patient will be notified.
      </p>

      <div className="flex justify-between">
        <button
          onClick={handleCancelSubmit}
          disabled={loading}
          className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel Only
        </button>
        <button
          onClick={Reschedule}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Cancel & Reschedule
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Docappoinment;

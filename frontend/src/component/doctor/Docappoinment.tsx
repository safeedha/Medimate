import React, { useEffect, useState, useRef, useCallback } from "react";
import DoctorSidebar from "../common/Docsidebar";
import Table from "../../component/common/Table";
import Pagination from "../../component/common/Pgination";
import {
  getallappoinment,
  cancelAppoinment,
  reshecdule,
  followup,
  getPage,
  getSlotedoctor,
  completeappoinment
} from "../../api/doctorapi/appoinment";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import type { IndividualSlot, Appointment } from "../../Interface/interface";
import { useSelector } from "react-redux";
import { socket } from "../../socket";
import type { RootState } from "../../app/store";

function Docappoinment() {
  // State and refs
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [slot, setSlot] = useState<IndividualSlot[]>([]);
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [render, setRender] = useState(false);
  const [mail, setMail] = useState<string>("");
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFollowupModal, setShowFollowupModal] = useState(false);
  const [targetIdToScroll, setTargetIdToScroll] = useState<string | null>(null);
  const [followupAppointmentId, setFollowupAppointmentId] = useState<string | null>(null);

   const rowRefs = useRef<{ [key: string]: React.RefObject<HTMLTableRowElement|null>}>({});

  const user = useSelector((state: RootState) => state.doctor.doctorInfo);
  const limit = 3;
  const today = new Date();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const minDate = formatDate(today);

  useEffect(() => {
    if (!user?._id) return;
    socket.emit("notification", user._id, "doctor");
  }, [user?._id]);

  const fetchAppointments = useCallback(async () => {
    try {
      const result = await getallappoinment(currentpage, limit);
      setAppointments(result.appointments);
      setTotal(result.total);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, [currentpage, limit]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, render]);

  // Scroll/highlight logic
  useEffect(() => {
    if (targetIdToScroll && appointments.length > 0) {
      const target = appointments.find(a => a._id === targetIdToScroll);
      if (target && rowRefs.current[target._id!]?.current) {
        rowRefs.current[target._id!]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        rowRefs.current[target._id!]?.current?.classList.add('bg-yellow-100');
        setTimeout(() => {
          rowRefs.current[target._id!]?.current?.classList.remove('bg-yellow-100');
        }, 2000);
        setTargetIdToScroll(null);
      }
    }
  }, [appointments, targetIdToScroll]);

  const getSlot = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const slots = await getSlotedoctor(selectedDate);
    setSlot(slots);
  };

  const openCancelModal = (id: string, uid: string, email: string) => {
    setSelectedId(id);
    setReason("");
    setSlot([]);
    setShowModal(true);
    setUserid(uid);
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
      if (result === 'refund added') {
        socket.emit('notification_message', {
          userId: userid,
          doctorId: user?._id,
          message: `Your appointment with Dr. ${user?.firstname} ${user?.lastname} was cancelled. A refund has been processed and details sent to your email.`,
          type: 'cancellation',
        });
        toast.success("The appointment was cancelled. Refund processed.");
        setRender(r => !r);
        setShowModal(false);
      }
      if (result === "Status updated") {
        socket.emit('notification_message', {
          userId: userid,
          doctorId: user?._id,
          message: `Your appointment with Dr. ${user?.firstname} ${user?.lastname} was cancelled. Please check your email for the cancellation reason.`,
          type: 'refund',
        });
        toast.success("Appointment cancelled. Reason mailed to patient.");
        setRender(r => !r);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to cancel appointment.");
    } finally {
      setLoading(false);
    }
  };

  const Reschedule = async () => {
    if (!reason.trim()) {
      toast.error('Please enter a reason for cancellation.');
      return;
    }
    try {
      const result = await reshecdule(selectedId!, reason, userid!, mail, selectedSlot!);
      if (result === 'Appoinment rescheduled') {
        socket.emit('notification_message', {
          userId: userid,
          doctorId: user?._id,
          message: `Your appointment with Dr. ${user?.firstname} ${user?.lastname} has been rescheduled. Please check the updated details.`,
          type: 'reschedule',
        });
        toast.success("Appointment canceled and rescheduled");
        setShowModal(false);
        setRender(r => !r);
      }
    } catch (error) {
      toast.error("Failed to reschedule appointment.");
    }
  };

  const confirmHandle = async (apptid: string, uid: string) => {
    console.log(apptid)
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to begin the consultation with this patient?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!',
    });

    if (result.isConfirmed) {
      try {
        socket.emit('notification_message', {
          userId: uid,
          doctorId: user?._id,
          message: `Your consultation with Dr. ${user?.firstname} ${user?.lastname} has started. Please join the video call.`,
          type: 'consultation',
        });
         await completeappoinment(apptid);
        const roomId = [user?._id, uid].sort().join('_');
        const videoUrl = `/video/${roomId}?role=doctor&userId=${user?._id}`;
        window.open(videoUrl, '_blank');
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  const handleFollowUp = (appid: string) => {
    setFollowupAppointmentId(appid);
    setShowFollowupModal(true);
  };

  const createfollowup = async () => {
    if (!selectedSlot) {
      toast.error('Please select a slot.');
      return;
    }
    const result = await followup(selectedSlot, followupAppointmentId as string);
    if (result === 'followup appoinment created') {
      socket.emit('notification_message', {
        userId: userid,
        doctorId: user?._id,
        message: `Your follow-up consultation with Dr. ${user?.firstname} ${user?.lastname} is now scheduled.`,
        type: 'followup',
      });
      setShowFollowupModal(false);
      toast.success("Follow-up appointment created");
      setRender(r => !r);
    }
  };

  const scrollToreschedule = async (originalId: string) => {
    const followup = appointments.find(a => a._id === originalId);
    if (followup && rowRefs.current[followup._id!]?.current) {
      rowRefs.current[followup._id!]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      rowRefs.current[followup._id!]?.current?.classList.add('bg-orange-500');
      setTimeout(() => {
        rowRefs.current[followup._id!]?.current?.classList.remove('bg-orange-500');
      }, 2000);
    } else {
      const page = await getPage(originalId, limit);
      setCurrentPage(page);
      setTargetIdToScroll(originalId);
    }
  };

  const scrollToFollowUp = async (originalId: string) => {
    const followup = appointments.find(a => a._id === originalId);
    if (followup && rowRefs.current[followup._id!]?.current) {
      rowRefs.current[followup._id!]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      rowRefs.current[followup._id!]?.current?.classList.add('bg-yellow-100');
      setTimeout(() => {
        rowRefs.current[followup._id!]?.current?.classList.remove('bg-yellow-100');
      }, 2000);
    } else {
      const page = await getPage(originalId, limit);
      setCurrentPage(page);
      setTargetIdToScroll(originalId);
    }
  };

  // Table columns - unchanged logic
  const columns = [
    {
      header: "Patient Name",
      accessor: (appt: Appointment) => appt.patient_name,
    },
    {
      header: "Email",
      accessor: (appt: Appointment) => appt.patient_email,
    },
    {
      header: "Age",
      accessor: (appt: Appointment) => appt.patient_age,
    },
    {
      header: "Gender",
      accessor: (appt: Appointment) => appt.patient_gender,
    },
    {
      header: 'Reason',
      accessor: (appt: Appointment) => appt.reason,
    },
    {
      header: 'Date',
      accessor: (appt: Appointment) =>
        typeof appt?.schedule === 'object'
          ? new Date(appt.schedule.date).toLocaleDateString()
          : "",
    },
    {
      header: 'Time',
      accessor: (appt: Appointment) =>
        typeof appt?.schedule === 'object'
          ? `${appt.schedule.startingTime} - ${appt.schedule.endTime}`
          : "",
    },
    {
      header: 'Status',
      accessor: (appt: Appointment) => <span className="font-semibold">{appt.status}</span>,
    },
    {
      header: 'Actions',
      accessor: (appt: Appointment) => (
        <div className="flex flex-col gap-1 w-32">
          {appt.status === "completed" ? (
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
          ) : appt.status === "cancelled" ? (
            <span className="text-gray-500 text-xs text-center">No actions</span>
          ) : (
            <>
              <button
                onClick={() => openCancelModal(appt._id!, appt.user_id as string, appt.patient_email)}
                className="w-full px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmHandle(appt._id!, appt.user_id as string)}
                className="w-full px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                Join
              </button>
            </>
          )}
          {appt.status === "completed" &&
            (appt.followup_status === false ? (
              <button
                onClick={() => {
                  setUserid(appt.user_id as string);
                  handleFollowUp(appt._id!);
                }}
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
            ))}
          {appt.status === "cancelled" && appt.isRescheduled && (
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
      ),
    },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      <DoctorSidebar />
      <Toaster />
      <div className="ml-52 flex-1 bg-gray-100 p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Upcoming Appointments
        </h1>
        {appointments.length === 0 ? (
          <div className="text-center text-gray-500 mt-16 text-base">
            No appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
           <Table
            columns={columns}
            data={appointments}
            getRowClassName={() => ""}
            rowRefById={(row: Appointment) => {
              const id = row._id;
              if (!id) {
                return React.createRef<HTMLTableRowElement>();
              }
              if (!rowRefs.current[id]) {
                rowRefs.current[id]= React.createRef<HTMLTableRowElement>();
              }
              return rowRefs.current[id];
            }}
          />

          </div>
        )}

        {appointments.length > 0 && (
          <Pagination
            currentPage={currentpage}
            totalPages={Math.ceil(total / limit)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

        {/* Followup Modal */}
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
                {slot.filter((slo) => slo.status === "available").length > 0 ? (
                  slot
                    .filter((slo) => slo.status === "available")
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
                  disabled={!selectedSlot}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel/Reschedule Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Cancel & Reschedule Appointment</h2>
              <label className="text-sm text-gray-700 mb-1">Reason for cancellation</label>
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
                  {slot.filter((slo) => slo.status === "available").length > 0 ? (
                    slot
                      .filter((slo) => slo.status === "available")
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
                This appointment will be canceled and rescheduled.
                <br />
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
    </div>
  );
}

export default Docappoinment;

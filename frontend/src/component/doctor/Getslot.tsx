import { useState, useEffect } from 'react'
import { getSlotedoctor, cancelSlot } from '../../api/doctorapi/appoinment'
import type { IndividualSlot } from '../../Interface/interface'
import Swal from 'sweetalert2';



// function convertTo24Hour(time12h: string): string {
//   const [time, modifier] = time12h.toLowerCase().split(" ");
//   let [hours, minutes] = time.split(":").map(Number);

//   if (modifier === "pm" && hours !== 12) hours += 12;
//   if (modifier === "am" && hours === 12) hours = 0;

//   return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
// }

function Getslot() {
  const [date, setDate] = useState<Date>()
  const [slot, setSlot] = useState<IndividualSlot[]>([])
  // const [selectedSlot, setSelectedSlot] = useState<IndividualSlot | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  useEffect(() => {
    const fetchSlotDoctor = async () => {
      if (date) {
        const slots = await getSlotedoctor(date)
        setSlot(slots)
      }
    }
    fetchSlotDoctor()
  }, [date])

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value)
    setDate(selectedDate)
  }

  // const editHandle = (slot: IndividualSlot) => {
  //   const convertedStart = convertTo24Hour(slot.startingTime)
  //   const convertedEnd = convertTo24Hour(slot.endTime)
  //   setSelectedSlot(slot)
  //   setStartTime(convertedStart)
  //   setEndTime(convertedEnd)
  //   setShowModal(true)
  // }

const cancelHandle = async (id: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to cancel this slot?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, change it!',
  });

  if (result.isConfirmed) {
    await cancelSlot(id);
    await Swal.fire('Cancelled!', 'Slot has been cancelled successfully.', 'success');
    if (date) {
      const updated = await getSlotedoctor(date);
      setSlot(updated);
    }
  }
};



  // const handleEditSubmit = async () => {
  //   const result=await editSlot(selectedSlot?._id!,startTime,endTime)
  // }

  return (
    <div className="m-8 bg-slate-100 p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Select Date to View Slots</h2>
      <div className="flex justify-center mb-6">
        <input
          type="date"
          onChange={handleDate}
          className="p-2 border border-gray-400 rounded"
        />
      </div>

      {slot.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {slot.map((item) => (
            <div
              key={item._id}
              className={`p-2 rounded text-center text-xs font-medium shadow-sm ${
                item.status === 'available'
                  ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer'
                  : item.status === 'booked'
                  ? 'bg-red-100 text-red-800 cursor-not-allowed'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              <p>{item.startingTime} - {item.endTime}</p>
              <p className="capitalize">{item.status}</p>

              {item.status === 'available' && (
                <div className="mt-2 flex justify-center gap-2">
                  {/* <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    onClick={() => editHandle(item)}
                  >
                    Edit
                  </button> */}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                    onClick={() => cancelHandle(item._id!)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500 mt-2 text-center">No slots available for this date.</p>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">Edit Slot</h3>
            <div className="space-y-3">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time"
                className="w-full border p-2 rounded text-sm"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time"
                className="w-full border p-2 rounded text-sm"
              />
              <div className="flex justify-center gap-4 mt-4">
                {/* <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
                  onClick={handleEditSubmit}
                >
                  Save
                </button> */}
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Getslot

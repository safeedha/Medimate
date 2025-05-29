import { useState, useEffect } from 'react'
import { getSlotedoctor,editSlot,cancelSlot } from '../../api/doctorapi/appoinment'
import type { IndividualSlot } from '../../Interface/interface'

function Getslot() {
  const [date, setDate] = useState<Date>()
  const [slot, setSlot] = useState<IndividualSlot[]>([])

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

  const editHandle=async(id:string)=>{
    const result=await editSlot(id)
  }
  const cancelHandle=async(id:string)=>{
    const result= await cancelSlot(id)
  }
  return (
    <div className="m-8 bg-slate-100 p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select Date to View Slots</h2>
      <input
        type="date"
        onChange={handleDate}
        className="mb-4 p-2 border border-gray-400 rounded"
      />

      
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
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs" onClick={()=>editHandle(item._id!)}>
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"  onClick={()=>cancelHandle(item._id!)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
                            ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-2">No slots available for this date.</p>
          )}
    
    </div>
  )
}

export default Getslot

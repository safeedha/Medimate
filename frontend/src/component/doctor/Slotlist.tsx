import { useEffect, useState } from 'react';
import { getrecurring } from '../../api/doctorapi/appoinment';
import type { IRecurring } from '../../Interface/interface';
import type { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

function Slotlist({render}: {render?: boolean}) {
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
  const [slot, setSlot] = useState<IRecurring[]>([]);

  useEffect(() => {
    async function getAllRecurringslot() {
      try {
        const result = await getrecurring(doctor?._id!);
        if (Array.isArray(result)) {
          setSlot(result);
        } else {
          console.error('Expected an array of slots, but received:', result);
        }
      } catch (error) {
        console.error('Error fetching recurring slots:', error);
      }
    }

    getAllRecurringslot();
  }, [render]);

  return (
  <div className="m-8 bg-yellow-50 ">
  <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-7xl">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Recurring Appointment Slots</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left text-sm uppercase font-semibold text-gray-700">
            <th className="py-3 px-4 border border-gray-300">Start Date</th>
            <th className="py-3 px-4 border border-gray-300">End Date</th>
            <th className="py-3 px-4 border border-gray-300">Start Time</th>
            <th className="py-3 px-4 border border-gray-300">End Time</th>
            <th className="py-3 px-4 border border-gray-300">Days of Week</th>
            <th className="py-3 px-4 border border-gray-300">Frequency</th>
            <th className="py-3 px-4 border border-gray-300">Interval</th>
            <th className="py-3 px-4 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {slot.map((s) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border border-gray-300">{new Date(s.startDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 border border-gray-300">{new Date(s.endDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 border border-gray-300">{s.starttime}</td>
              <td className="py-3 px-4 border border-gray-300">{s.endttime}</td>
              <td className="py-3 px-4 border border-gray-300">{s.daysOfWeek.join(', ')}</td>
              <td className="py-3 px-4 border border-gray-300">{s.frequency}</td>
              <td className="py-3 px-4 border border-gray-300">{s.interval}</td>
              <td className="py-3 px-4 border border-gray-300">
                <div className="flex gap-2">
                  {/* <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(s._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleCancel(s._id)}
                  >
                    Cancel
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

export default Slotlist;

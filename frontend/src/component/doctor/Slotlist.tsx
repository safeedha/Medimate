import { useEffect, useState } from 'react';
import { getrecurring, changerecurringslotStatus } from '../../api/doctorapi/appoinment';
import type { IRecurring } from '../../Interface/interface';
import type { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Pagination from '../../component/common/Pgination';

function Slotlist({
  render,
  setRender,
}: {
  render?: boolean;
  setRender?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
  const [slot, setSlot] = useState<IRecurring[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // change as needed

  useEffect(() => {
    async function getAllRecurringslot() {
      try {
        const result = await getrecurring(doctor?._id!);
        if (Array.isArray(result)) {
          setSlot(result);
          setCurrentPage(1); // reset page when data changes
        } else {
          console.error('Expected an array of slots, but received:', result);
        }
      } catch (error) {
        console.error('Error fetching recurring slots:', error);
      }
    }

    getAllRecurringslot();
  }, [render, doctor?._id]);

  const handleCancel = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to change status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, change it!',
    });

    if (result.isConfirmed) {
      const response = await changerecurringslotStatus(id);
      if (response === 'Cannot cancel because one or more slots are already booked') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cannot cancel because one or more slots are already booked',
        });
      } else {
        Swal.fire(response);
        setRender?.(!render);
      }
    }
  };

  const getStatus = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    return end >= now ? 'Active' : 'Inactive';
  };

  // Calculate pagination
  const totalPages = Math.ceil(slot.length / itemsPerPage);
  const paginatedSlots = slot.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="m-8 bg-yellow-50 relative">
      <div className="fixed top-6 right-6 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md z-50">
        <span className="text-sm font-medium">
          ✅ You can only cancel and delete recurring slot before patient booking
        </span>
      </div>

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
                <th className="py-3 px-4 border border-gray-300">Status</th>
                <th className="py-3 px-4 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSlots.map((s) => {
                const status = getStatus(s.endDate);
                return (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border border-gray-300">{new Date(s.startDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 border border-gray-300">{new Date(s.endDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 border border-gray-300">{s.starttime}</td>
                    <td className="py-3 px-4 border border-gray-300">{s.endttime}</td>
                    <td className="py-3 px-4 border border-gray-300">{s.daysOfWeek.join(', ')}</td>
                    <td className="py-3 px-4 border border-gray-300">{s.frequency}</td>
                    <td className="py-3 px-4 border border-gray-300">{s.interval}</td>
                    <td className="py-3 px-4 border border-gray-300">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border border-gray-300">
                      <div className="flex gap-2">
                        <button
                          className={`px-3 py-1 rounded text-white ${
                            status === 'Inactive'
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                          onClick={() => status === 'Active' && handleCancel(s._id!)}
                          disabled={status === 'Inactive'}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Slotlist;

import React, { useEffect, useState } from 'react';
import { getrecurring, changerecurringslotStatus } from '../../api/doctorapi/appoinment';
import type { IRecurring } from '../../Interface/interface';
import type { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Table from '../../component/common/Table';

function Slotlist({ render, setRender, setrecSlot, setEdit }: { render?: boolean; setRender?: React.Dispatch<React.SetStateAction<boolean>>; setrecSlot?: React.Dispatch<React.SetStateAction<IRecurring | undefined>>; setEdit?: React.Dispatch<React.SetStateAction<boolean>>; }) {
  const doctor = useSelector((state: RootState) => state.doctor.doctorInfo);
  const [slot, setSlot] = useState<IRecurring[]>([]);
  const [total, setTotal] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    async function getAllRecurringslot() {
      try {
        const result = await getrecurring( currentpage, limit);
        setSlot(result.data);
        setTotal(result.total);
      } catch (error) {
        console.error('Error fetching recurring slots:', error);
      }
    }
    getAllRecurringslot();
  }, [render, doctor?._id, currentpage]);

  const handleCancel = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this entire slot?',
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
          text: response,
        });
      } else {
        Swal.fire('Cancelled!', response, 'success');
        setRender?.(!render);
      }
    }
  };

  const handleEdit = (s: IRecurring) => {
    if (setrecSlot && setEdit) {
      setrecSlot(s);
      setEdit(true);
    }
  };

  const getStatus = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    return end >= now ? 'Active' : 'Inactive';
  };


  const columns = [
    {
      header: "Start Date",
      accessor: (s: IRecurring) => new Date(s.startDate).toLocaleDateString(),
    },
    {
      header: "End Date",
      accessor: (s: IRecurring) => new Date(s.endDate).toLocaleDateString(),
    },
    {
      header: "Start Time",
      accessor: (s: IRecurring) => s.starttime,
    },
    {
      header: "End Time",
      accessor: (s: IRecurring) => s.endttime,
    },
    {
      header: "Days of Week",
      accessor: (s: IRecurring) => s.daysOfWeek.join(", "),
    },
    {
      header: "Frequency",
      accessor: (s: IRecurring) => s.frequency,
    },
    {
      header: "Interval",
      accessor: (s: IRecurring) => s.interval,
    },
    {
      header: "Status",
      accessor: (s: IRecurring) => {
        const status = getStatus(s.endDate);
        return (
          <span
            className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
              status === 'Active'
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessor: (s: IRecurring) => {
        const status = getStatus(s.endDate);
        return (
          <div className="space-x-1 flex">
            <button
              className={`px-2 py-0.5 rounded text-xs text-white ${
                status === 'Inactive'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
              onClick={() => status === 'Active' && handleCancel(s._id!)}
              disabled={status === 'Inactive'}
            >
              Cancel
            </button>
            <button
              className={`px-2 py-0.5 rounded text-xs text-white 
                ${status === 'Inactive' 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}
              onClick={() => handleEdit(s)}
              disabled={status === 'Inactive'}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="m-6 relative text-sm">
      <div className="fixed top-6 right-6 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50">
        <span>You can only cancel recurring slot before patient booking</span>
      </div>

      <div className="bg-white shadow-md rounded p-4 w-full max-w-7xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recurring Appointment Slots</h2>
        <div className="overflow-x-auto">
          <Table columns={columns} data={slot} />
        </div>
      </div>

   
      <div className="mt-4 flex justify-center items-center gap-2 flex-wrap">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentpage === 1}
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(total / limit) }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={`px-3 py-1 rounded ${
                currentpage === pageNumber
                  ? 'bg-blue-500 text-white font-semibold'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(total / limit)))
          }
          disabled={currentpage === Math.ceil(total / limit)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Slotlist;

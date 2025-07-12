import { useEffect, useState, useRef } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import {
  getSingledoctor,
  getSlotedoctor,
  handlePayment
} from '../../api/userapi/doctor';
import {
  creatAppoinment,
  createlockslot
} from '../../api/userapi/appoinment';
import type { Idoctor, IndividualSlot } from '../../Interface/interface';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { useRazorpay } from 'react-razorpay';
import type { formData } from '../../Interface/interface';
import DoctorRating from './Rating';

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '0',
    border: 'none',
    borderRadius: '0.5rem'
  }
};

function Docdetails() {
  Modal.setAppElement('body');
  const { Razorpay } = useRazorpay();
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  const [doctor, setDoctor] = useState<Idoctor>();
  const [date, setDate] = useState<Date>(new Date());
  const [slot, setSlot] = useState<IndividualSlot[]>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<IndividualSlot | null>(null);
  const [render, setRender] = useState<boolean>(false);
  const [formData, setFormData] = useState<formData>({
    fullName: '',
    age: '',
    gender: 'female',
    email: '',
    phone: '',
    reason: '',
    paymentMethod: ''
  });

  type Params = { id: string };
  const { id } = useParams<Params>();

  useEffect(() => {
    if (!id) return;
    const fetchSingleDoctor = async () => {
      const doctorData = await getSingledoctor(id);
      setDoctor(doctorData);
    };
    fetchSingleDoctor();
  }, [id]);

  useEffect(() => {
    const fetchSlotDoctor = async () => {
      if (!id) return;
      const slots = await getSlotedoctor(id, date);
      setSlot(slots);
    };
    fetchSlotDoctor();
  }, [date, id, render]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate < new Date(new Date().toDateString())) {
      toast.error('Please select a valid future date');
      return;
    }
    setDate(selectedDate);
  };

  const bookHandle = async (item: IndividualSlot) => {
  if (!doctor?._id) {
    toast.error("Doctor information is not loaded.");
    return;
  }

  const result = await createlockslot(item._id as string, doctor._id);

  if (result === 'Slot is locked') {
    setSelectedSlot(item);
    setIsOpen(true);
  } else if (result === 'Slot is already locked or confirmed') {
    toast.error(
      "You can't book this slot now, because another user is trying to book it. Please use another slot or try again later."
    );
  }
};

  const afterOpenModal = () => {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = '#f00';
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({
      fullName: '',
      age: '',
      gender: 'male',
      email: '',
      phone: '',
      reason: '',
      paymentMethod: ''
    });
    setSelectedSlot(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.age ||
      !formData.gender ||
      !formData.email ||
      !formData.phone ||
      !formData.reason ||
      !formData.paymentMethod
    ) {
      toast.error('Please fill all fields');
      return;
    }

    const result = await handlePayment(Razorpay, doctor?.fee as number);
    if (result === 'success') {
      const response = await creatAppoinment(
        id!,
        selectedSlot?._id as string,
        formData.fullName,
        formData.email,
        Number(formData.age),
        formData.gender,
        formData.reason,
        doctor?.fee as number
      );
      if (response === 'Appointment created successfully') {
        toast.success('Payment successful! Booking confirmed');
        setRender(!render);
      }
      closeModal();
    } else {
      toast.error('Payment failed or not verified.');
    }

    closeModal();
  };

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <Toaster />

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          ...customStyles,
          content: {
            ...customStyles.content,
            maxWidth: '600px',
            padding: '12px'
          }
        }}
        contentLabel="Patient Form Modal"
      >
        <div className="flex flex-col md:flex-row w-full p-3 gap-3 ">
          <div className="md:w-1/2 bg-gray-50 p-3 rounded shadow-sm text-xs text-gray-700">
            <div className="bg-slate-200 p-2 rounded mb-2">
              <p className="text-lg font-semibold text-gray-800">
                Dr. {doctor?.firstname} {doctor?.lastname}
              </p>
              <p className="text-gray-600">
                Specialisation:{' '}
                <span className="font-semibold text-green-700">
                  {doctor?.specialisation?.deptname}
                </span>
              </p>
              <p className="text-gray-600">
                Consultation Fee:{' '}
                <span className="font-semibold text-green-700">
                  ₹{doctor?.fee}
                </span>
              </p>
              <p className="text-gray-600">
                Consultation Time:{' '}
                <span className="font-medium text-blue-600">
                  {selectedSlot?.startingTime} - {selectedSlot?.endTime}
                </span>
              </p>
            </div>

            <h2 className="text-base font-semibold mb-1">Privacy Policy</h2>
            <p className="mb-1">
              Your personal data is collected and used solely for booking and
              managing your appointment. We ensure confidentiality and never
              share your information with third parties without consent.
            </p>
            <p className="mb-1">
              By submitting this form, you agree to our terms of use and consent
              to being contacted regarding your appointment.
            </p>
            <p>
              If you have any questions about how we handle your data, please
              contact our support team.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 bg-white p-3 rounded shadow-sm space-y-3"
          >
            <h2
              ref={subtitleRef}
              className="text-base font-semibold mb-1"
            >
              Patient Details
            </h2>

            <div>
              <label className="block text-xs font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter age"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Gender
              </label>
              <div className="flex items-center gap-2">
                {['male', 'female', 'other'].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-1 text-xs"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleInputChange}
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Reason for Visit
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Briefly describe the reason for visit"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Payment Method
              </label>
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={formData.paymentMethod === 'Online'}
                    onChange={handleInputChange}
                  />
                  Online Payment
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-1 bg-teal-600 text-white py-1.5 rounded hover:bg-teal-700 transition text-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>

      <div className="bg-teal-100 rounded-md px-16 py-4 shadow-sm mt-20">
        <div className="flex items-center space-x-4">
          <img
            src={`https://res.cloudinary.com/dwerqkqou/image/upload/${doctor?.profilePicture}`}
            alt="Doctor"
            className="w-24 h-24 rounded-full object-cover border-2 border-teal-400"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Dr. {doctor?.firstname} {doctor?.lastname}
            </h2>
            <p className="text-teal-800 text-sm">
              Specialisation: {doctor?.specialisation?.deptname}
            </p>
            <p className="text-gray-700 text-sm">
              Experience:{' '}
              <span className="font-semibold">{doctor?.experience}</span>{' '}
              years
            </p>
            <p className="text-gray-700 text-sm">
              Consultation Fee:{' '}
              <span className="font-semibold">₹{doctor?.fee}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-4 mt-6 mx-auto max-w-5xl">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">
          Select Slots
        </h1>
        <p className="text-gray-600 text-sm mb-3">
          Please select a slot to book an appointment with Dr. {doctor?.firstname}.
        </p>

        <input
          type="date"
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-5"
          onChange={handleDateChange}
          value={date.toISOString().split('T')[0]}
          min={new Date().toISOString().split('T')[0]}
        />

        <div className="bg-teal-50 p-4 rounded-md shadow-inner">
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            Available Time Slots:
          </h2>
          {slot.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slot.map((item) => (
                <div
                  onClick={() => bookHandle(item)}
                  key={item._id}
                  className={`p-2 rounded text-center text-xs font-medium shadow-sm ${
                    item.status === 'available'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer'
                      : item.status === 'booked'
                      ? 'bg-red-100 text-red-800 cursor-not-allowed'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <p>
                    {item.startingTime} - {item.endTime}
                  </p>
                  <p className="capitalize">{item.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-2">
              No slots available for this date.
            </p>
          )}
        </div>
      </div>

      <div>
        <DoctorRating doctorId={id!} />
      </div>
    </div>
  );
}

export default Docdetails;

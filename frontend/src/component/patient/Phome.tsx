
import Navbar from '../common/Navbar';
import banner from '../../assets/homep.jpg'; // Importing the banner image

const PatientHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero / Banner Section */}
      <section
        className="bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center bg-gradient-to-t from-black via-black to-transparent bg-opacity-50 p-8 rounded-lg">
          <h2 className="text-5xl font-semibold mb-4 tracking-wide">Welcome Back, Patient!</h2>
          <p className="text-xl sm:text-2xl font-light">
            Your health is our mission. Connect with your care team easily and securely.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16 px-6 md:px-20">
        <h3 className="text-3xl font-semibold text-center text-teal-600 mb-8">About MedConnect</h3>
        <p className="text-gray-700 text-center max-w-4xl mx-auto text-lg leading-relaxed">
          MedConnect is a seamless digital healthcare platform where patients can consult with doctors, manage
          appointments, and access medical records—all in one place. Our mission is to simplify healthcare access
          and communication, putting your health first.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 md:px-20">
        <h3 className="text-3xl font-semibold text-center mb-10">What You Can Do</h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white text-teal-700 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h4 className="text-xl font-semibold mb-4">Book Appointments</h4>
            <p className="text-gray-700">Easily schedule consultations with top doctors based on your availability.</p>
          </div>
          <div className="bg-white text-teal-700 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h4 className="text-xl font-semibold mb-4">Chat with Doctors</h4>
            <p className="text-gray-700">Connect instantly with healthcare professionals for advice and follow-ups.</p>
          </div>
          <div className="bg-white text-teal-700 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h4 className="text-xl font-semibold mb-4">Access Records</h4>
            <p className="text-gray-700">View and manage your lab reports, prescriptions, and appointment history.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-500 to-green-500 text-white text-center py-6 mt-16">
        <p>&copy; 2025 MedConnect. All rights reserved.</p>
        <p>
          <a href="#" className="underline hover:text-teal-200">Contact Support</a>
        </p>
      </footer>
    </div>
  );
};

export default PatientHomePage;

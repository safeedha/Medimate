import { Link } from 'react-router-dom';
import bann from "../../assets/bann.jpg";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col justify-between">
      <nav className="bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg flex justify-between items-center">
        <div className="text-3xl font-bold text-white tracking-wide flex items-center gap-2">
          <span className="text-4xl">🩺</span>
          <span>MediMate</span>
        </div>
        <div className="space-x-4">
          <Link to="/signup">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition">
              Sign up as Patient
            </button>
          </Link>
          <Link to="/doctor/signup/">
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-100 transition">
              Sign up as Doctor
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center p-8 gap-8">
        <img
          src={bann}
          alt="Doctor with patient online consultation"
          className="w-full md:w-1/2 max-h-[400px] object-cover rounded-xl shadow-lg"
        />

        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
            Book Appointments with Trusted Doctors
          </h1>
          <p className="text-gray-700 text-lg">
            MedConnect helps patients consult certified doctors securely and conveniently. Schedule online appointments, manage records, and access healthcare from anywhere.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-10 px-6 text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Why Choose MedConnect?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our platform bridges patients and medical professionals through an easy-to-use interface, instant appointment booking, and end-to-end encrypted health data — all tailored for your well-being.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 text-center text-sm">
        © {new Date().getFullYear()} MedConnect. All rights reserved.
      </footer>
    </div>
  );
}

export default Landing;

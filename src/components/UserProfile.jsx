import React, { useState, useEffect } from 'react';
import BASE_URL from '../../Base/api';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customerId, setCustomerId] = useState(null);

  const fetchCustomerId = async () => {
    try {
      const response = await fetch(`${BASE_URL}/Booking/GetCustomerId`, {
        method: "GET",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem("token")}`, },
      });

      const data = await response.json();
      const bk = data.result.result;
      setCustomerId(bk ? bk.customerId : null);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view your bookings.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // IMPORTANT: You will need to create and use an actual API endpoint
      // that returns bookings for the currently authenticated user.
      const response = await fetch(`${BASE_URL}/Booking/GetAllBookingDetailsByCustomerId?customerId=${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookings.');
      }

      const data = await response.json();
      // Assuming your API returns booking data in `data.result`
      setBookings(data.result || []);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching your bookings.');
    } finally {
      alert();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerId();
    if (customerId) {
      fetchBookings();
    }
  }, [customerId]);

  // Helper function to convert booking status ID to readable text
  const getStatusText = (status) => {
    switch (status) {
      case 1: return { text: 'Confirmed', style: 'bg-blue-500 text-white' };
      case 2: return { text: 'Completed', style: 'bg-green-500 text-white' };
      case 3: return { text: 'Cancelled', style: 'bg-red-500 text-white' };
      default: return { text: 'Pending', style: 'bg-yellow-500 text-black' };
    }
  };

  return (
    <>
      {/* Reusing the same styles and animations from Appointment.jsx */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slowZoom 15s infinite alternate ease-in-out; }
      `}</style>
      <section className="relative py-20 px-4 bg-gray-100 min-h-screen">
        <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom z-0 opacity-20" style={{ backgroundImage: "url('/appointment-bg.webp')" }}></div>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-100 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-100 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto">
          <h1 className="text-6xl md:text-7xl text-gray-800 text-center mb-16" style={{ fontFamily: "'My Soul', cursive" }}>
            My Bookings
          </h1>

          <div className="max-w-4xl mx-auto p-8 md:p-12 bg-green-900 text-white shadow-2xl rounded-lg">
            {loading && <p className="text-center text-lg">Loading your bookings...</p>}
            {error && <p className="text-center text-lg text-yellow-300">{error}</p>}

            {!loading && !error && (
              bookings.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg text-gray-300">You have no past or upcoming bookings.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {bookings.map((booking) => (
                    <div key={booking.documentNo} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-400 transition-colors duration-300">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-green-300">Booking ID: {booking.documentNo}</h3>
                          <p className="text-gray-400">Date: {new Date(booking.date).toLocaleDateString('en-GB')}</p>
                        </div>
                        {/* <span className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full ${getStatusText(booking.bookingStatus).style}`}>
                          {getStatusText(booking.bookingStatus).text}
                        </span> */}
                      </div>
                      <div className="border-t border-gray-700 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><strong>Time Slot:</strong> {booking.slotStartTime} - {booking.slotEndTime}</p>
                          <p><strong>Guests:</strong> {booking.personCount}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Selected Packages:</h4>
                          <ul className="list-disc list-inside text-gray-300">
                            {booking.packagesList?.map(pkg => (
                              <li key={pkg.Id}>{pkg.packageName}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
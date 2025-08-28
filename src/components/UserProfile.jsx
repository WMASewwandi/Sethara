import React, { useState, useEffect } from 'react';
import BASE_URL from '../../Base/api';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
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
        const response = await fetch(`${BASE_URL}/Booking/GetBookingsByCustomer`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
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
        setBookings(data.result || []);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching your bookings.');
      } finally {
        setLoading(false);
      }
    };
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

  const getStatusText = (status) => {
    switch (status) {
      case 1: return { text: 'Confirmed', style: 'bg-blue-500 text-white' };
      case 2: return { text: 'Completed', style: 'bg-green-500 text-white' };
      case 3: return { text: 'Cancelled', style: 'bg-red-500 text-white' };
      default: return { text: 'Pending', style: 'bg-yellow-500 text-black' };
    }
  };

  // New Function: Generates a PDF for a specific booking
  const generateBookingPDF = (booking) => {
    const doc = new jsPDF();

    // Style constants
    const PRIMARY_COLOR = '#065f46';
    const LIGHT_GRAY_COLOR = '#f3f4f6';
    const TEXT_COLOR = '#1f2937';
    const HEADER_TEXT_COLOR = '#ffffff';
    const PAGE_MARGIN = 15;
    const PAGE_WIDTH = doc.internal.pageSize.getWidth();
    let y = 0;

    // --- PDF HEADER ---
    doc.setFillColor(PRIMARY_COLOR);
    doc.rect(0, 0, PAGE_WIDTH, 35, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(HEADER_TEXT_COLOR);
    doc.text('Sethara Booking Details', PAGE_WIDTH / 2, 22, { align: 'center' });

    // --- CUSTOMER & BOOKING DETAILS ---
    y = 55;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_COLOR);
    
    // Assumes these fields are available in the booking object from the API
    doc.text('CUSTOMER DETAILS', PAGE_MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(TEXT_COLOR);
    doc.text(booking.customerName || 'N/A', PAGE_MARGIN, y + 7);
    doc.text(booking.email || 'N/A', PAGE_MARGIN, y + 14);
    doc.text(booking.phoneNumber || 'N/A', PAGE_MARGIN, y + 21);

    const rightColX = 110;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_COLOR);
    doc.text('BOOKING DETAILS', rightColX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(TEXT_COLOR);
    const bookingStatus = getStatusText(booking.bookingStatus).text;
    doc.text(`Booking ID: ${booking.documentNo}`, rightColX, y + 7);
    doc.text(`Date: ${new Date(booking.date).toLocaleDateString('en-GB')}`, rightColX, y + 14);
    doc.text(`Time: ${booking.slotStartTime} - ${booking.slotEndTime}`, rightColX, y + 21);
    doc.text(`Status: ${bookingStatus}`, rightColX, y + 28);
    
    y += 45;

    // --- SELECTED PACKAGES TABLE ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_COLOR);
    doc.text('YOUR SELECTED SERVICES', PAGE_MARGIN, y);
    y += 8;

    doc.setFillColor(LIGHT_GRAY_COLOR);
    doc.rect(PAGE_MARGIN, y, PAGE_WIDTH - (PAGE_MARGIN * 2), 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(TEXT_COLOR);
    doc.text('SERVICE / PACKAGE NAME', PAGE_MARGIN + 5, y + 7);
    y += 10;
    
    doc.setFont('helvetica', 'normal');
    booking.reservedPackages?.forEach((pkg, index) => {
        if (index % 2 !== 0) {
            doc.setFillColor(LIGHT_GRAY_COLOR);
            doc.rect(PAGE_MARGIN, y, PAGE_WIDTH - (PAGE_MARGIN * 2), 10, 'F');
        }
        doc.text(pkg.packageName || `Package ID: ${pkg.packageId}`, PAGE_MARGIN + 5, y + 7);
        y += 10;
    });
    const tableHeight = 10 + (booking.reservedPackages.length * 10);
    doc.setDrawColor('#cccccc');
    doc.rect(PAGE_MARGIN, y - tableHeight, PAGE_WIDTH - (PAGE_MARGIN * 2), tableHeight);
    
    y += 15;

    // --- PDF FOOTER ---
    const footerY = doc.internal.pageSize.getHeight() - 25;
    doc.setFillColor(PRIMARY_COLOR);
    doc.rect(0, footerY, PAGE_WIDTH, 25, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(HEADER_TEXT_COLOR);
    const footerText = 'Thank you for choosing Sethara. We look forward to seeing you again.';
    doc.text(footerText, PAGE_WIDTH / 2, footerY + 15, { align: 'center' });

    // --- SAVE THE DOCUMENT ---
    doc.save(`Sethara_Booking_${booking.documentNo}.pdf`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slowZoom 15s infinite alternate ease-in-out; }
      `}</style>
      <section className="relative py-20 px-4 bg-gray-100 min-h-screen overflow-hidden">
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
                      {/* Download Button Section */}
                      <div className="border-t border-gray-700 mt-4 pt-4 flex justify-end">
                        <button
                          onClick={() => generateBookingPDF(booking)}
                          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm"
                        >
                          Download Details
                        </button>
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
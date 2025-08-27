import React, { useState, useEffect } from 'react';
import BASE_URL from '../../Base/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf'; // Using the same library

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', nationality: 1 });
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [bookingType, setBookingType] = useState('person');
  const [groupMembers, setGroupMembers] = useState();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState({});
  const [slotId, setSlotId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [packages, setPackages] = useState([]);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Package/GetAll`);
        const data = await response.json();
        setPackages(data.result);
      } catch (error) {
        console.error('Package Fetch Error:', error);
      }
    };
    fetchPackages();
  }, []);

  const handleDateChange = async (value) => {
    setSelectedDate(value);
    try {
      const response = await fetch(`${BASE_URL}/Booking/GetAvailableSlotByDate?date=${value}`);
      const data = await response.json();
      setSlots(data.result);
    } catch (error) {
      console.error('Slot Fetch Error:', error);
    }
  };

  const handlePackageToggle = (pkg) => {
    setSelectedPackages(prev =>
      prev.some(p => p.id === pkg.id)
        ? prev.filter(p => p.id !== pkg.id)
        : [...prev, pkg]
    );
  };
  
  // New Function: Modern PDF design
  const generatePDF = () => {
    const doc = new jsPDF();

    // Style constants
    const PRIMARY_COLOR = '#065f46'; // Dark Green from your theme (bg-green-900)
    const LIGHT_GRAY_COLOR = '#f3f4f6'; // Light Gray for table rows
    const TEXT_COLOR = '#1f2937';
    const HEADER_TEXT_COLOR = '#ffffff';
    const PAGE_MARGIN = 15;
    const PAGE_WIDTH = doc.internal.pageSize.getWidth();
    let y = 0; // Y-position tracker

    // --- PDF HEADER ---
    doc.setFillColor(PRIMARY_COLOR);
    doc.rect(0, 0, PAGE_WIDTH, 35, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(HEADER_TEXT_COLOR);
    doc.text('Sethara Booking Confirmation', PAGE_WIDTH / 2, 22, { align: 'center' });

    // --- CUSTOMER & BOOKING DETAILS (Two-column layout) ---
    y = 55;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_COLOR);
    
    // Left Column
    doc.text('BILLED TO', PAGE_MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(TEXT_COLOR);
    doc.text(formData.name, PAGE_MARGIN, y + 7);
    doc.text(formData.email, PAGE_MARGIN, y + 14);
    doc.text(formData.phone, PAGE_MARGIN, y + 21);

    // Right Column
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_COLOR);
    const rightColX = 110;
    doc.text('BOOKING DETAILS', rightColX, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(TEXT_COLOR);
    const GUEST_COUNT = bookingType === 'group' ? `${groupMembers} Members` : '1 Person';
    doc.text(`Date: ${selectedDate}`, rightColX, y + 7);
    doc.text(`Time: ${selectedSlot.startTime} - ${selectedSlot.endTime}`, rightColX, y + 14);
    doc.text(`Guests: ${GUEST_COUNT}`, rightColX, y + 21);
    
    y += 40; // Move y-position down

    // --- SELECTED PACKAGES TABLE ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_COLOR);
    doc.text('YOUR SELECTED SERVICES', PAGE_MARGIN, y);
    y += 8;

    // Table Header
    doc.setFillColor(LIGHT_GRAY_COLOR);
    doc.rect(PAGE_MARGIN, y, PAGE_WIDTH - (PAGE_MARGIN * 2), 10, 'F'); // Header background
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(TEXT_COLOR);
    doc.text('SERVICE / PACKAGE NAME', PAGE_MARGIN + 5, y + 7);
    y += 10;
    
    // Table Body
    doc.setFont('helvetica', 'normal');
    selectedPackages.forEach((pkg, index) => {
        // Zebra striping for readability
        if (index % 2 !== 0) {
            doc.setFillColor(LIGHT_GRAY_COLOR);
            doc.rect(PAGE_MARGIN, y, PAGE_WIDTH - (PAGE_MARGIN * 2), 10, 'F');
        }
        doc.text(pkg.packageName, PAGE_MARGIN + 5, y + 7);
        y += 10;
    });
    const tableHeight = 10 + (selectedPackages.length * 10);
    doc.setDrawColor('#cccccc'); // Light border for table
    doc.rect(PAGE_MARGIN, y - tableHeight, PAGE_WIDTH - (PAGE_MARGIN * 2), tableHeight);
    
    y += 15; // Space after table

    // --- PAYMENT METHOD ---
    const PAYMENT_TYPE = paymentMethod === 'card' ? "Paid via Credit/Debit Card" : "To be Paid on Arrival";
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(PRIMARY_COLOR);
    doc.text('PAYMENT METHOD', PAGE_MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(TEXT_COLOR);
    doc.text(PAYMENT_TYPE, PAGE_MARGIN, y + 7);

    // --- PDF FOOTER ---
    const footerY = doc.internal.pageSize.getHeight() - 25;
    doc.setFillColor(PRIMARY_COLOR);
    doc.rect(0, footerY, PAGE_WIDTH, 25, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(HEADER_TEXT_COLOR);
    const footerText = 'Thank you for your reservation! We look forward to welcoming you.';
    doc.text(footerText, PAGE_WIDTH / 2, footerY + 15, { align: 'center' });

    // --- SAVE THE DOCUMENT ---
    doc.save(`Sethara_Booking_Confirmation_${formData.name.replace(/\s/g, '_')}.pdf`);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const reservedDate = `${selectedDate}`;

    const bookingData = {
      DocumentNo: '',
      Date: reservedDate,
      SlotId: slotId,
      CustomerId: 123,
      PersonCount: bookingType === 'group' ? groupMembers : 1,
      CustomerName: formData.name,
      Email: formData.email,
      Nationality: parseInt(formData.nationality),
      PhoneNumber: formData.phone,
      MemberType: bookingType === 'group' ? 2 : 1,
      BookingStatus: 1,
      PaymentStatus: 1,
      PaymentMethod: paymentMethod === 'card' ? 2 : 1,
      IsActive: true,
      ReservedPackages: selectedPackages.map(pkg => ({
        ReservedDate: reservedDate,
        PackageId: pkg.id,
        IsActive: true
      }))
    };

    fetch(`${BASE_URL}/Booking/CreateBooking`, {
      method: "POST",
      body: JSON.stringify(bookingData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        
        generatePDF();

        setTimeout(() => {
          location.reload();
        }, 1500);
      })
      .catch((error) => {
        // toast.error(error.message || "");
      });
  };

  const handleProceedToSummary = () => {
    setStep(2);
  };

  const handleSetSlotId = (id, slot) => {
    setSlotId(id);
    setSelectedSlot(slot);
  }

  return (
    // The rest of your JSX remains exactly the same
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slowZoom 15s infinite alternate ease-in-out; }
        @keyframes fall { 0% { transform: translateY(-10vh) rotate(0); opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-fall { animation: fall linear infinite; }
        .animate-spin-slow { animation: spin-slow ease-in-out infinite; }
      `}</style>
      <section className="relative py-20 px-4 bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom z-0 opacity-20" style={{ backgroundImage: "url('/appointment-bg.webp')" }}></div>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-100 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-100 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto">
          <h1 className="text-6xl md:text-7xl text-gray-800 text-center mb-16" style={{ fontFamily: "'My Soul', cursive" }}>
            {step === 1 ? 'Reservation Form' : 'Booking Summary'}
          </h1>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0 shadow-2xl rounded-lg overflow-hidden">
            <div className="p-8 md:p-12 bg-green-900 text-white">
              {step === 1 && (
                <form onSubmit={handleProceedToSummary} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input type="text" placeholder="Name" required className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <input type="email" placeholder="Email" required className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    <input type="tel" placeholder="Phone" required className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    <select className="w-full p-2 bg-green-900 border-b border-gray-500 focus:outline-none focus:border-green-300" onChange={e => setFormData({ ...formData, nationality: e.target.value })}>
                      <option value={1}>Sri Lanka</option>
                      <option value={2}>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Select one or more packages</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2">
                      {packages.map(pkg => (
                        <button type="button" key={pkg.id} onClick={() => handlePackageToggle(pkg)} className={`p-2 rounded-md text-sm text-center transition-colors duration-200 ${selectedPackages.some(p => p.id === pkg.id) ? 'bg-green-500 text-white' : 'bg-gray-800 hover:bg-green-700'}`}>
                          {pkg.packageName}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                      <label className="text-gray-400 text-sm">Choose a date</label>
                      <input type="date" required value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" />
                    </div>
                    <div className="flex items-center space-x-6 text-gray-300">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="bookingType" value="person" checked={bookingType === 'person'} onChange={() => setBookingType('person')} className="form-radio bg-transparent border-gray-500 text-green-400 focus:ring-green-500" />
                        <span className="ml-2">1 Person</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="bookingType" value="group" checked={bookingType === 'group'} onChange={() => setBookingType('group')} className="form-radio bg-transparent border-gray-500 text-green-400 focus:ring-green-500" />
                        <span className="ml-2">Group</span>
                      </label>
                    </div>
                  </div>

                  {bookingType === 'group' && (
                    <input type="number" placeholder="Number of members" min="2" value={groupMembers} onChange={e => setGroupMembers(e.target.value)} className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" />
                  )}

                  {selectedDate && (
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Choose a time slot</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {slots.map((slot, index) => {
                          const isSelected = slotId === slot.id;
                          const isAvailable = slot.isAvailable;
                          return (
                            <button
                              key={index}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => isAvailable && handleSetSlotId(slot.id, slot)}
                              className={`p-2 rounded text-sm transition-colors duration-200 
                                ${isSelected ? 'bg-green-500 text-white' : ''} 
                                ${!isAvailable ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : !isSelected ? 'bg-gray-800 text-white hover:bg-green-700' : ''}`}
                            >
                              {slot.startTime} - {slot.endTime}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-md hover:bg-green-700 transition-colors text-lg">Reserve Now</button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div><h3 className="font-bold text-xl border-b border-gray-600 pb-2 mb-2">Booking Details</h3>
                    <p><strong>Date:</strong> {selectedDate}</p>
                    <p><strong>Time:</strong> {selectedSlot ? `${selectedSlot.startTime} - ${selectedSlot.endTime}` : ""}</p>
                    <p><strong>Guests:</strong> {bookingType === 'group' ? `${groupMembers} members` : '1 person'}</p>
                  </div>
                  <div><h3 className="font-bold text-xl border-b border-gray-600 pb-2 mb-2">Selected Packages</h3>
                    <ul className="list-disc list-inside">{selectedPackages.map(p => <li key={p.packageName}>{p.packageName}</li>)}</ul>
                  </div>
                  <div><h3 className="font-bold text-xl border-b border-gray-600 pb-2 mb-2">Payment Method</h3>
                    <div className="flex items-center space-x-6 text-gray-300">
                      <label className="flex items-center cursor-pointer"><input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="form-radio bg-transparent border-gray-500 text-green-400 focus:ring-green-500" /><span className="ml-2">Pay on Arrival</span></label>
                      <label className="flex items-center cursor-pointer"><input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="form-radio bg-transparent border-gray-500 text-green-400 focus:ring-green-500" /><span className="ml-2">Credit/Debit Card</span></label>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t border-gray-600">
                      <input type="text" placeholder="Card Number" className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM/YY" className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" />
                        <input type="text" placeholder="CVC" className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" />
                      </div>
                    </div>
                  )}
                  <div className="bg-yellow-200/20 border-l-4 border-yellow-500 text-yellow-200 p-4 rounded-md"><h4 className="font-bold">Special Notes</h4><p>All payments are to be made upon arrival at the spa unless paying by card now.</p></div>
                  <button onClick={handleConfirmBooking} className="w-full bg-green-600 text-white font-bold py-4 rounded-md hover:bg-green-700 transition-colors text-lg">Confirm & Download PDF</button>
                  <button onClick={() => setStep(1)} className="w-full bg-gray-600 text-white font-bold py-2 rounded-md hover:bg-gray-700 transition-colors text-sm">Back to Form</button>
                </div>
              )}

            </div>
            <div className="hidden md:block">
              <img src="/appointment-image.webp" alt="Reservation" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointment;
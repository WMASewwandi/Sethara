import React, { useState, useEffect } from 'react';

// --- Data ---
const allPackagesData = [
  { name: 'Head Massage', price: 50 }, { name: 'Herbal Facial Treatment', price: 75 },
  { name: 'Neck & Shoulder Massage', price: 60 }, { name: 'Leg Massage', price: 60 },
  { name: 'Foot Massage', price: 65 }, { name: 'Full Body Massage', price: 120 },
  { name: 'Herbal Steam Bath', price: 40 }, { name: 'Shirovasti', price: 90 },
  { name: 'Shirodhara', price: 150 }, { name: 'Chakra', price: 100 },
  { name: 'Kativasti', price: 80 }, { name: 'Urovasti', price: 80 },
];
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

// --- Helper Function to generate PDF content ---
const generateConfirmationPDF = (details) => {
    const { appointmentNumber, formData, selectedPackages, selectedDate, selectedTime, paymentStatus } = details;
    
    // Create a simple HTML structure for the confirmation
    const content = `
        <html>
            <head><title>Booking Confirmation</title></head>
            <body style="font-family: sans-serif; padding: 20px;">
                <h1>Booking Confirmation</h1>
                <p>Thank you for your reservation at Sethara Hela Weda Madura.</p>
                <hr>
                <p><strong>Appointment Number:</strong> ${appointmentNumber}</p>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Date:</strong> ${selectedDate}</p>
                <p><strong>Time:</strong> ${selectedTime}</p>
                <hr>
                <h3>Selected Packages:</h3>
                <ul>
                    ${selectedPackages.map(p => `<li>${p.name}</li>`).join('')}
                </ul>
                <hr>
                <p><strong>Payment Status:</strong> ${paymentStatus}</p>
                <p><strong>Special Note:</strong> All payments are to be made upon arrival at the spa.</p>
            </body>
        </html>
    `;
    
    // Use a Blob to create a downloadable file
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-confirmation-${appointmentNumber}.html`; // Saved as .html, user can print to PDF
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};


// --- Child Components ---
const FallingLeaves = () => {
  const leafCount = 20;
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-5 pointer-events-none">
      {Array.from({ length: leafCount }).map((_, i) => (
        <div key={i} className="absolute animate-fall" style={{ left: `${Math.random() * 100}vw`, animationDuration: `${Math.random() * 8 + 7}s`, animationDelay: `${Math.random() * 8}s` }}>
          <img src="/leaf.png" alt="falling leaf" className="animate-spin-slow" style={{ width: `${Math.random() * 20 + 15}px`, animationDuration: `${Math.random() * 4 + 4}s` }} />
        </div>
      ))}
    </div>
  );
};

// --- Main Appointment Component ---
const Appointment = () => {
  const [step, setStep] = useState(1); // 1: Form, 2: Summary & Payment
  const [formData, setFormData] = useState({ name: '', subject: '', email: '', phone: '', nationality: 'Sri Lanka', message: '' });
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [bookingType, setBookingType] = useState('person');
  const [groupMembers, setGroupMembers] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  useEffect(() => {
    if (selectedDate) {
      const randomlyBooked = timeSlots.filter(() => Math.random() > 0.6);
      setBookedSlots(randomlyBooked);
      setSelectedTime('');
    }
  }, [selectedDate]);

  const handlePackageToggle = (pkg) => {
    setSelectedPackages(prev =>
      prev.some(p => p.name === pkg.name)
        ? prev.filter(p => p.name !== pkg.name)
        : [...prev, pkg]
    );
  };

  const handleProceedToSummary = (e) => {
    e.preventDefault();
    setStep(2); // Move to summary step
  };
  
  const handleConfirmBooking = () => {
    const bookingDetails = {
        appointmentNumber: `SHWM-${Date.now()}`,
        formData,
        selectedPackages,
        selectedDate,
        selectedTime,
        paymentStatus: paymentMethod === 'card' ? 'Paid Online' : 'To Be Paid on Arrival'
    };
    generateConfirmationPDF(bookingDetails);
    // Here you would also save the booking to your database
  };

  return (
    <>
      <style>{/* All animation keyframes */ `
      @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Maname&family=My+Soul&display=swap');
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slowZoom 15s infinite alternate ease-in-out; }
        @keyframes fall { 0% { transform: translateY(-10vh) rotate(0); opacity: 1; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-fall { animation: fall linear infinite; }
        .animate-spin-slow { animation: spin-slow ease-in-out infinite; }
      `}</style>
      <section className="relative py-20 px-4 bg-gray-100 overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom z-0 opacity-20" style={{ backgroundImage: "url('/appointment-bg.webp')" }}></div>
        <FallingLeaves />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-100 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-100 to-transparent z-10"></div>
        
        <div className="relative z-20 container mx-auto">
          <h1 className="text-6xl md:text-7xl text-gray-800 text-center mb-16" style={{ fontFamily: "'My Soul', cursive" }}>
            {step === 1 ? 'Reservation Form' : 'Booking Summary'}
          </h1>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0 shadow-2xl rounded-lg overflow-hidden">
            {/* Left Column: Form or Summary */}
            <div className="p-8 md:p-12 bg-green-900 text-white">
              {step === 1 && (
                <form onSubmit={handleProceedToSummary} className="space-y-8">
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input type="text" placeholder="Name" required className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input type="email" placeholder="Email" required className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input type="tel" placeholder="Phone" required className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <select className="w-full p-2 bg-green-900 border-b border-gray-500 focus:outline-none focus:border-green-300" onChange={e => setFormData({...formData, nationality: e.target.value})}><option>Sri Lanka</option><option>Other</option></select>
                  </div>
                  {/* Package Selection */}
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Select one or more packages</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2">
                        {allPackagesData.map(pkg => (
                            <button type="button" key={pkg.name} onClick={() => handlePackageToggle(pkg)} className={`p-2 rounded-md text-sm text-center transition-colors duration-200 ${selectedPackages.some(p => p.name === pkg.name) ? 'bg-green-500 text-white' : 'bg-gray-800 hover:bg-green-700'}`}>{pkg.name}</button>
                        ))}
                    </div>
                  </div>
                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                        <label className="text-gray-400 text-sm">Choose a date</label>
                        <input type="date" required value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" />
                    </div>
                     <div className="flex items-center space-x-6 text-gray-300">
                        <label className="flex items-center cursor-pointer"><input type="radio" name="bookingType" value="person" checked={bookingType === 'person'} onChange={() => setBookingType('person')} className="form-radio bg-transparent border-gray-500 text-green-400 focus:ring-green-500" /><span className="ml-2">1 Person</span></label>
                        <label className="flex items-center cursor-pointer"><input type="radio" name="bookingType" value="group" checked={bookingType === 'group'} onChange={() => setBookingType('group')} className="form-radio bg-transparent border-gray-500 text-green-400 focus:ring-green-500" /><span className="ml-2">Group</span></label>
                    </div>
                  </div>
                   {bookingType === 'group' && <input type="number" placeholder="Number of members" min="2" value={groupMembers} onChange={e => setGroupMembers(e.target.value)} className="w-full p-2 bg-transparent border-b border-gray-500 focus:outline-none focus:border-green-300" />}
                  {selectedDate && (
                    <div>
                        <label className="text-gray-400 text-sm mb-2 block">Choose a time slot</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {timeSlots.map(time => {
                                const isBooked = bookedSlots.includes(time);
                                return <button type="button" key={time} onClick={() => !isBooked && setSelectedTime(time)} disabled={isBooked} className={`p-2 rounded-md text-center transition-colors duration-200 ${selectedTime === time ? 'bg-green-500 text-white' : isBooked ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-green-700'}`}>{time}</button>;
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
                        <p><strong>Time:</strong> {selectedTime}</p>
                        <p><strong>Guests:</strong> {bookingType === 'group' ? `${groupMembers} members` : '1 person'}</p>
                    </div>
                    <div><h3 className="font-bold text-xl border-b border-gray-600 pb-2 mb-2">Selected Packages</h3>
                        <ul className="list-disc list-inside">{selectedPackages.map(p => <li key={p.name}>{p.name}</li>)}</ul>
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

            {/* Right Column: Image */}
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
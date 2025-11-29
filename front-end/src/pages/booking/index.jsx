import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Calendar, Clock, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    planType: '',
    pickupDate: '',
    pickupTime: '',
    deliveryTime: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    specialInstructions: '',
    bagCount: 1
  });

  const services = [
    { id: 'express', name: 'Express Wash', price: '¥1500', time: '2 days' },
    { id: 'dry-clean', name: 'Dry Cleaning', price: '¥800+', time: '3 days' },
    { id: 'premium', name: 'Premium Fabric Care', price: '¥2500', time: '1 day' },
    { id: 'same-day', name: 'Same-Day Service', price: '¥3800', time: 'same day' }
  ];

  const plans = [
    { id: 'basic', name: 'Basic', price: '¥1500' },
    { id: 'premium', name: 'Premium', price: '¥2500' },
    { id: 'vip', name: 'VIP', price: '¥3800' }
  ];

  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      serviceType: serviceId
    }));
  };

  const handlePlanSelect = (planId) => {
    setFormData(prev => ({
      ...prev,
      planType: planId
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call booking API
    console.log('Booking submitted:', formData);
    setStep(4); // Show success message
  };

  const canProceedToStep2 = formData.serviceType && formData.planType;
  const canProceedToStep3 = formData.pickupDate && formData.pickupTime && formData.deliveryTime;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/homepage" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                PureLaundry
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/homepage" className="text-gray-700 hover:text-blue-600 transition font-medium">Home</Link>
              <Link to="/services-detail" className="text-gray-700 hover:text-blue-600 transition font-medium">Services</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition font-medium">Pricing</Link>
              <Link to="/about-us" className="text-gray-700 hover:text-blue-600 transition font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <section className="py-8 px-6 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      step >= num
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {num}
                  </div>
                  <span className={`ml-3 font-semibold ${step >= num ? 'text-blue-600' : 'text-gray-500'}`}>
                    {num === 1 && 'Select Service'}
                    {num === 2 && 'Schedule'}
                    {num === 3 && 'Contact Info'}
                  </span>
                </div>
                {num < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Service</h2>
                <p className="text-xl text-gray-600">Select the service type and plan that fits your needs</p>
              </div>

              {/* Service Type */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Type</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition ${
                        formData.serviceType === service.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-bold text-gray-900">{service.name}</h4>
                        {formData.serviceType === service.id && (
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="text-lg font-semibold text-blue-600">{service.price}</span>
                        <span className="text-sm">{service.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan Type */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Plan</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition ${
                        formData.planType === plan.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                        {formData.planType === plan.id && (
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
                      <p className="text-sm text-gray-600 mt-1">per bag</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bag Count */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">
                  Number of Bags
                </label>
                <input
                  type="number"
                  name="bagCount"
                  min="1"
                  max="20"
                  value={formData.bagCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedToStep2}
                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 ${
                  canProceedToStep2
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Continue to Schedule</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Schedule Pickup & Delivery</h2>
                <p className="text-xl text-gray-600">Choose your convenient time slots</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pickup Date */}
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      <Calendar className="inline w-5 h-5 mr-2" />
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Pickup Time */}
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      <Clock className="inline w-5 h-5 mr-2" />
                      Pickup Time
                    </label>
                    <select
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  {/* Delivery Time */}
                  <div className="md:col-span-2">
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      <Clock className="inline w-5 h-5 mr-2" />
                      Preferred Delivery Time
                    </label>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className={`w-2/3 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 ${
                    canProceedToStep3
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Continue to Contact Info</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact & Delivery Details</h2>
                <p className="text-xl text-gray-600">Where should we pick up and deliver?</p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 space-y-6">
                {/* Personal Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      <Phone className="inline w-5 h-5 mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                      placeholder="+81 90-1234-5678"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      <Mail className="inline w-5 h-5 mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                    Pickup & Delivery Address
                  </h3>

                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-lg font-bold text-gray-900 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                        placeholder="Tokyo"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-gray-900 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                        placeholder="100-0001"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                    placeholder="Any special care instructions, gate codes, or delivery notes..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                  >
                    <span>Confirm Booking</span>
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-12">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for choosing PureLaundry! We've sent a confirmation email to <strong>{formData.email}</strong>.
                Our team will arrive at your location on <strong>{formData.pickupDate}</strong> between <strong>{formData.pickupTime}</strong>.
              </p>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 max-w-2xl mx-auto mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-semibold text-gray-900">{services.find(s => s.id === formData.serviceType)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-semibold text-gray-900">{plans.find(p => p.id === formData.planType)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bags:</span>
                    <span className="font-semibold text-gray-900">{formData.bagCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup:</span>
                    <span className="font-semibold text-gray-900">{formData.pickupDate} at {formData.pickupTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-semibold text-gray-900">{formData.address}, {formData.city}</span>
                  </div>
                  <div className="border-t-2 border-gray-200 mt-4 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Estimated Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {plans.find(p => p.id === formData.planType)?.price.replace('¥', '¥')} × {formData.bagCount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/homepage"
                  className="bg-blue-600 text-white px-10 py-5 rounded-xl hover:bg-blue-700 transition shadow-lg font-bold text-xl"
                >
                  Back to Home
                </Link>
                <button
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      serviceType: '',
                      planType: '',
                      pickupDate: '',
                      pickupTime: '',
                      deliveryTime: '',
                      name: '',
                      email: '',
                      phone: '',
                      address: '',
                      city: '',
                      postalCode: '',
                      specialInstructions: '',
                      bagCount: 1
                    });
                  }}
                  className="bg-white text-blue-600 px-10 py-5 rounded-xl hover:bg-blue-50 transition shadow-lg border-2 border-blue-600 font-bold text-xl"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      {step !== 4 && (
        <footer className="bg-gray-900 text-white py-12 px-6 mt-20">
          <div className="max-w-7xl mx-auto text-center">
            <Link to="/homepage" className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">PureLaundry</span>
            </Link>
            <p className="text-gray-400">Premium laundry services with care</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default BookingPage;

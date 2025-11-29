import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call contact API
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-8 h-8 text-blue-500" />,
      title: "Phone",
      details: ["+81 3-1234-5678", "+81 90-1234-5678"],
      description: "Mon-Sat 8AM-8PM, Sun 9AM-6PM"
    },
    {
      icon: <Mail className="w-8 h-8 text-blue-500" />,
      title: "Email",
      details: ["hello@purelaundry.com", "support@purelaundry.com"],
      description: "We reply within 24 hours"
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Main Office",
      details: ["123 Laundry Street", "Shibuya, Tokyo 150-0001"],
      description: "Visit us for pickup service"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Business Hours",
      details: ["Mon-Sat: 8:00 AM - 8:00 PM", "Sunday: 9:00 AM - 6:00 PM"],
      description: "Public holidays may vary"
    }
  ];

  const locations = [
    {
      name: "Shibuya Branch",
      address: "123 Laundry Street, Shibuya",
      phone: "+81 3-1234-5678",
      hours: "Mon-Sat 8AM-8PM"
    },
    {
      name: "Shinjuku Branch",
      address: "456 Clean Avenue, Shinjuku",
      phone: "+81 3-2345-6789",
      hours: "Mon-Sat 8AM-8PM"
    },
    {
      name: "Roppongi Branch",
      address: "789 Fresh Road, Roppongi",
      phone: "+81 3-3456-7890",
      hours: "Mon-Sat 8AM-8PM"
    }
  ];

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
              <Link to="/contact" className="text-blue-600 font-bold">Contact</Link>
            </nav>
            <Link to="/booking" className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg">
              <span className="font-semibold">Book Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-6 -mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-blue-600 font-semibold mb-1">{detail}</p>
                ))}
                <p className="text-sm text-gray-600 mt-3">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-xl text-gray-600">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for contacting us. We'll respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 space-y-6">
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
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                        placeholder="+81 90-1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">
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

                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg font-semibold text-lg flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Locations</h2>
                <p className="text-xl text-gray-600">
                  We have multiple branches across Tokyo to serve you better.
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg mb-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">Map Location</p>
                  <p className="text-sm text-gray-500">Google Maps integration here</p>
                </div>
              </div>

              {/* Locations List */}
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-blue-100"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-start">
                        <MapPin className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                        {location.address}
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-blue-500" />
                        {location.phone}
                      </p>
                      <p className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-500" />
                        {location.hours}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Connect With Us</h2>
          <p className="text-xl text-gray-600 mb-8">
            Follow us on social media for updates, promotions, and laundry tips
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-2xl transition transform hover:scale-110 shadow-lg"
            >
              <Facebook className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-6 rounded-2xl transition transform hover:scale-110 shadow-lg"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 hover:bg-blue-500 text-white p-6 rounded-2xl transition transform hover:scale-110 shadow-lg"
            >
              <MessageCircle className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your first laundry service today and experience premium care for your garments.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-10 py-5 rounded-xl hover:bg-blue-50 transition shadow-2xl font-bold text-xl"
          >
            <span>Book Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/homepage" className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">PureLaundry</span>
          </Link>
          <p className="text-gray-400 mb-6">Premium laundry services with care</p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link to="/homepage" className="text-gray-400 hover:text-white transition">Home</Link>
            <Link to="/services-detail" className="text-gray-400 hover:text-white transition">Services</Link>
            <Link to="/pricing" className="text-gray-400 hover:text-white transition">Pricing</Link>
            <Link to="/about-us" className="text-gray-400 hover:text-white transition">About</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
          <p className="text-gray-400 text-sm">&copy; 2025 PureLaundry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;

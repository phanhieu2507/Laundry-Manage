import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Star, Check, ArrowRight, Sparkles, Clock, Shield, Leaf, TrendingUp, Users } from 'lucide-react';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: <Sparkles className="w-12 h-12 text-blue-500" />,
      title: "Express Wash",
      description: "Quick turnaround for your everyday laundry needs with premium care.",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Dry Cleaning",
      description: "Professional dry cleaning for delicate fabrics and special garments.",
      image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-500" />,
      title: "Premium Fabric Care",
      description: "Expert handling of luxury items with specialized treatments.",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: "Same-Day Service",
      description: "Urgent cleaning needs? We've got you covered with same-day delivery.",
      image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-10 h-10 text-blue-500" />,
      title: "Fast Pickup & Delivery",
      description: "Schedule a pickup at your convenience. We deliver fresh, clean clothes right to your door."
    },
    {
      icon: <Leaf className="w-10 h-10 text-blue-500" />,
      title: "Eco-Friendly Detergents",
      description: "We use only sustainable, biodegradable products that are gentle on fabrics and the environment."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      title: "Expert Fabric Handling",
      description: "Our trained professionals treat each garment with specialized care for optimal results."
    },
    {
      icon: <Sparkles className="w-10 h-10 text-blue-500" />,
      title: "Premium Quality",
      description: "State-of-the-art equipment and proven techniques ensure superior cleaning every time."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-blue-500" />,
      title: "Competitive Pricing",
      description: "Luxury service at affordable rates. No hidden fees, transparent pricing."
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: "Customer Satisfaction",
      description: "98% satisfaction rate. Join thousands of happy customers who trust us."
    }
  ];

  const workflow = [
    {
      step: "01",
      title: "Schedule Pickup",
      description: "Book online or call us. Choose your preferred time slot."
    },
    {
      step: "02",
      title: "We Collect Your Clothes",
      description: "Our team arrives promptly to collect your laundry with care."
    },
    {
      step: "03",
      title: "Professional Cleaning",
      description: "Expert cleaning, pressing, and quality checks at our facility."
    },
    {
      step: "04",
      title: "Delivered Fresh to You",
      description: "Receive your clothes clean, fresh, and ready to wear."
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "¥1500",
      period: "per bag",
      features: [
        "Standard wash & fold",
        "2-day turnaround",
        "Basic stain treatment",
        "Eco-friendly detergent",
        "Free pickup & delivery"
      ],
      highlighted: false
    },
    {
      name: "Premium",
      price: "¥2500",
      period: "per bag",
      features: [
        "Premium wash & press",
        "24-hour turnaround",
        "Advanced stain removal",
        "Fabric softener included",
        "Free pickup & delivery",
        "Garment protection spray"
      ],
      highlighted: true
    },
    {
      name: "VIP",
      price: "¥3800",
      period: "per bag",
      features: [
        "Luxury hand wash",
        "Same-day service",
        "Expert stain removal",
        "Premium fabric care",
        "Priority pickup & delivery",
        "Garment storage option",
        "Personal account manager"
      ],
      highlighted: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Absolutely amazing service! My clothes have never looked better. The pickup and delivery are so convenient."
    },
    {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Professional, reliable, and eco-friendly. The quality of cleaning is outstanding. Highly recommend!"
    },
    {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Best laundry service I've ever used. They handle my delicate fabrics with such care. Worth every penny."
    },
    {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Fast, efficient, and affordable. The team is always professional and my clothes come back pristine."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                PureLaundry
              </span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/homepage" className="text-gray-700 hover:text-blue-600 transition font-medium">Home</Link>
              <Link to="/services-detail" className="text-gray-700 hover:text-blue-600 transition font-medium">Services</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition font-medium">Pricing</Link>
              <Link to="/about-us" className="text-gray-700 hover:text-blue-600 transition font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">Contact</Link>
            </nav>

            {/* CTA Button */}
            <Link to="/booking" className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105">
              <span className="font-semibold">Book Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-3">
              <Link to="/homepage" className="block text-gray-700 hover:text-blue-600 transition font-medium py-2">Home</Link>
              <Link to="/services-detail" className="block text-gray-700 hover:text-blue-600 transition font-medium py-2">Services</Link>
              <Link to="/pricing" className="block text-gray-700 hover:text-blue-600 transition font-medium py-2">Pricing</Link>
              <Link to="/about-us" className="block text-gray-700 hover:text-blue-600 transition font-medium py-2">About</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-blue-600 transition font-medium py-2">Contact</Link>
              <Link to="/booking" className="block w-full bg-blue-600 text-center text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                Book Now
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Premium Laundry
                <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Care You Deserve
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience luxury laundry service with eco-friendly products, expert care, and convenient pickup & delivery. Your clothes deserve the best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking" className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg">
                  <span>Schedule Pickup</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/services-detail" className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-lg border-2 border-blue-600 font-semibold text-lg">
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
                <img
                  src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80"
                  alt="Premium Laundry Service"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                    <p className="text-sm text-gray-600">Customer Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive laundry solutions tailored to your needs, delivered with care and precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                <div className="mb-6 transform group-hover:scale-110 transition duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="h-40 rounded-xl overflow-hidden mb-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                <Link to="/pricing" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center space-x-2">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose PureLaundry?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with traditional craftsmanship to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 transform hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Simple, fast, and hassle-free. Get your laundry done in four easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition duration-300 transform hover:-translate-y-2">
                  <div className="text-6xl font-bold text-white/30 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-blue-100">{step.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-white/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your lifestyle. All plans include free pickup and delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-2xl transform scale-105 border-4 border-blue-600'
                    : 'bg-white text-gray-900 shadow-lg border-2 border-gray-200'
                } transition duration-300 hover:shadow-2xl hover:-translate-y-2 relative`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    RECOMMENDED
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-blue-600'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ml-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'}`} />
                      <span className={plan.highlighted ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className={`w-full py-4 rounded-xl font-semibold transition duration-300 transform hover:scale-105 ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust PureLaundry for their clothing care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for a Premium Laundry Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of satisfied customers and experience the difference of professional laundry care. Book your first service today and get 20% off!
          </p>
          <Link to="/booking" className="bg-white text-blue-600 px-10 py-5 rounded-xl hover:bg-blue-50 transition shadow-2xl hover:shadow-3xl transform hover:scale-105 font-bold text-xl flex items-center space-x-3 mx-auto">
            <span>Book Your Service Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">PureLaundry</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Premium laundry and dry cleaning services with eco-friendly products, expert care, and convenient pickup & delivery. Your satisfaction is our priority.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/homepage" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link to="/services-detail" className="text-gray-400 hover:text-white transition">Services</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
                <li><Link to="/about-us" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Laundry Street</li>
                <li>Tokyo, Japan 100-0001</li>
                <li>Phone: +81 3-1234-5678</li>
                <li>Email: hello@purelaundry.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PureLaundry. All rights reserved. Premium laundry services with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

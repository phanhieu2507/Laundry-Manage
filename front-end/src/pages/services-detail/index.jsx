import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Sparkles as SparklesIcon, Shield, TrendingUp, Clock, Leaf, Star, Check, Package } from 'lucide-react';

const ServicesDetailPage = () => {
  const allServices = [
    {
      id: 'express-wash',
      icon: <SparklesIcon className="w-12 h-12 text-blue-500" />,
      title: "Express Wash",
      tagline: "Quick turnaround for everyday needs",
      description: "Our Express Wash service is perfect for your everyday laundry needs. We use premium detergents and advanced washing techniques to ensure your clothes come back fresh, clean, and vibrant.",
      price: "From ¥1500 per bag",
      turnaround: "2 days",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
      features: [
        "Professional washing and folding",
        "Eco-friendly detergents",
        "Basic stain treatment",
        "Free pickup and delivery",
        "Individually wrapped items",
        "Quality inspection"
      ],
      process: [
        "Sorting by color and fabric type",
        "Pre-treatment of stains",
        "Professional machine washing",
        "Precise drying at optimal temperature",
        "Careful folding and packaging",
        "Final quality check"
      ]
    },
    {
      id: 'dry-cleaning',
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Dry Cleaning",
      tagline: "Expert care for delicate garments",
      description: "Professional dry cleaning service for your delicate fabrics and special garments. Our expert team uses industry-leading techniques to preserve the quality and longevity of your finest clothes.",
      price: "From ¥800 per garment",
      turnaround: "3 days",
      image: "https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80",
      features: [
        "Solvent-based cleaning",
        "Delicate fabric handling",
        "Professional pressing",
        "Garment protection",
        "Hanger delivery",
        "Stain removal expertise"
      ],
      process: [
        "Detailed garment inspection",
        "Spot cleaning and pre-treatment",
        "Solvent cleaning process",
        "Professional steaming and pressing",
        "Final inspection and touch-ups",
        "Protective packaging"
      ]
    },
    {
      id: 'premium-fabric-care',
      icon: <TrendingUp className="w-12 h-12 text-blue-500" />,
      title: "Premium Fabric Care",
      tagline: "Luxury treatment for luxury items",
      description: "Our Premium Fabric Care service offers specialized treatment for your luxury items. From designer clothing to delicate fabrics, we provide white-glove service for your most valued garments.",
      price: "From ¥2500 per item",
      turnaround: "1-2 days",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80",
      features: [
        "Hand washing for delicates",
        "Luxury fabric expertise",
        "Premium pressing service",
        "Fabric protection spray",
        "Individual garment care",
        "Designer brand experience"
      ],
      process: [
        "Expert garment assessment",
        "Customized cleaning approach",
        "Hand washing or specialized treatment",
        "Air drying or low-heat drying",
        "Professional finishing",
        "Premium packaging"
      ]
    },
    {
      id: 'same-day-service',
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: "Same-Day Service",
      tagline: "Urgent cleaning? We've got you covered",
      description: "Need your laundry done urgently? Our Same-Day Service ensures your clothes are cleaned, pressed, and delivered within hours. Perfect for last-minute needs and busy schedules.",
      price: "From ¥3800 per bag",
      turnaround: "Same day",
      image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=800&q=80",
      features: [
        "Express processing",
        "Priority handling",
        "Same-day pickup and delivery",
        "Premium wash and press",
        "Rush stain treatment",
        "Guaranteed timing"
      ],
      process: [
        "Immediate intake and sorting",
        "Fast-track washing process",
        "Quick-dry technology",
        "Express pressing and folding",
        "Rapid quality inspection",
        "Same-day delivery guaranteed"
      ]
    }
  ];

  const additionalServices = [
    {
      icon: <Package className="w-8 h-8 text-blue-500" />,
      name: "Alterations & Repairs",
      price: "From ¥500",
      description: "Professional tailoring and garment repairs"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      name: "Leather Care",
      price: "From ¥3000",
      description: "Specialized cleaning for leather items"
    },
    {
      icon: <SparklesIcon className="w-8 h-8 text-blue-500" />,
      name: "Shoe Cleaning",
      price: "¥2000/pair",
      description: "Expert cleaning for all footwear types"
    },
    {
      icon: <Star className="w-8 h-8 text-blue-500" />,
      name: "Wedding Dress Care",
      price: "From ¥15000",
      description: "Preservation and cleaning of bridal gowns"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Leaf className="w-10 h-10 text-green-500" />,
      title: "Eco-Friendly",
      description: "Sustainable products and processes"
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      title: "Expert Care",
      description: "Trained fabric care specialists"
    },
    {
      icon: <Clock className="w-10 h-10 text-orange-500" />,
      title: "Fast Service",
      description: "Quick turnaround times"
    },
    {
      icon: <Star className="w-10 h-10 text-yellow-500" />,
      title: "Quality Guarantee",
      description: "100% satisfaction promise"
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
              <Link to="/services-detail" className="text-blue-600 font-bold">Services</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition font-medium">Pricing</Link>
              <Link to="/about-us" className="text-gray-700 hover:text-blue-600 transition font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">Contact</Link>
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
            Our Premium Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Comprehensive laundry solutions tailored to your needs. From everyday wash to luxury care, we handle your garments with expert precision.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-2xl font-bold text-lg"
          >
            <span>Book a Service</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {allServices.map((service, index) => (
            <div
              key={service.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-white rounded-full p-4 shadow-lg">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-xl text-blue-600 font-semibold mb-4">{service.tagline}</p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{service.description}</p>

                <div className="flex items-center gap-8 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Price</div>
                    <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Turnaround</div>
                    <div className="text-2xl font-bold text-gray-900">{service.turnaround}</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/booking"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg font-semibold text-lg"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized care for items that need extra attention
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 hover:shadow-xl transition duration-300 border border-blue-100"
              >
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-3">{service.price}</p>
                <p className="text-gray-600">{service.description}</p>
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
              We combine quality, convenience, and care in every service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-blue-100 text-center"
              >
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Premium Care?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your service today and discover why thousands trust PureLaundry with their garments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-blue-600 px-10 py-5 rounded-xl hover:bg-blue-50 transition shadow-2xl font-bold text-xl flex items-center justify-center space-x-3"
            >
              <span>Book Now</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              to="/pricing"
              className="bg-blue-700 text-white px-10 py-5 rounded-xl hover:bg-blue-800 transition shadow-2xl font-bold text-xl border-2 border-white"
            >
              View Pricing
            </Link>
          </div>
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

export default ServicesDetailPage;

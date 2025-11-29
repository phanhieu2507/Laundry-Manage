import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Users, Target, Award, Heart, Shield, Leaf, TrendingUp, Clock } from 'lucide-react';

const AboutUsPage = () => {
  const values = [
    {
      icon: <Heart className="w-10 h-10 text-blue-500" />,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We go above and beyond to ensure every garment receives the care it deserves."
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      title: "Quality Excellence",
      description: "We use state-of-the-art equipment and proven techniques to deliver superior cleaning results every time."
    },
    {
      icon: <Leaf className="w-10 h-10 text-blue-500" />,
      title: "Eco-Friendly",
      description: "Committed to sustainability with biodegradable products and energy-efficient processes that protect our planet."
    },
    {
      icon: <Award className="w-10 h-10 text-blue-500" />,
      title: "Expert Team",
      description: "Our trained professionals have years of experience in fabric care and garment handling."
    }
  ];

  const milestones = [
    {
      year: "2015",
      title: "Founded",
      description: "Started with a vision to revolutionize laundry services in Tokyo"
    },
    {
      year: "2017",
      title: "Expansion",
      description: "Opened 5 new locations across major districts"
    },
    {
      year: "2020",
      title: "Innovation",
      description: "Launched mobile app and same-day delivery service"
    },
    {
      year: "2023",
      title: "Recognition",
      description: "Awarded 'Best Laundry Service' by Tokyo Business Review"
    },
    {
      year: "2025",
      title: "Growth",
      description: "Serving over 50,000 satisfied customers monthly"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      number: "50,000+",
      label: "Happy Customers"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      number: "1M+",
      label: "Garments Cleaned"
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      number: "98%",
      label: "Satisfaction Rate"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      number: "24/7",
      label: "Customer Support"
    }
  ];

  const team = [
    {
      name: "Hiroshi Tanaka",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      bio: "15+ years in textile care industry"
    },
    {
      name: "Yuki Nakamura",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      bio: "Expert in sustainable cleaning methods"
    },
    {
      name: "Kenji Yamamoto",
      role: "Quality Assurance Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Certified fabric care specialist"
    },
    {
      name: "Akiko Suzuki",
      role: "Customer Success Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      bio: "Dedicated to exceptional service"
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
              <Link to="/about-us" className="text-blue-600 font-bold">About</Link>
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
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Our Story
                <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Behind the Care
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                For over a decade, PureLaundry has been dedicated to providing premium laundry services that combine traditional craftsmanship with modern technology. We believe every garment tells a story, and we're honored to care for yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg font-semibold"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-lg border-2 border-blue-600 font-semibold"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80"
                alt="Premium Laundry Service"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a small startup to Tokyo's leading laundry service
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-12 lg:mb-16 flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition border border-blue-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden lg:flex absolute left-1/2 w-8 h-8 bg-blue-600 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind PureLaundry's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-100"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3 text-center">{member.role}</p>
                <p className="text-gray-600 text-center text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <Target className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            "To provide exceptional laundry and dry cleaning services that enhance our customers' lives through convenience, quality, and sustainability. We strive to set the standard for excellence in garment care while maintaining our commitment to environmental responsibility."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-blue-600 px-10 py-5 rounded-xl hover:bg-blue-50 transition shadow-2xl font-bold text-xl"
            >
              Experience the Difference
            </Link>
            <Link
              to="/services-detail"
              className="bg-blue-700 text-white px-10 py-5 rounded-xl hover:bg-blue-800 transition shadow-2xl font-bold text-xl border-2 border-white"
            >
              Our Services
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

export default AboutUsPage;

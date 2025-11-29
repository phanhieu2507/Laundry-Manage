import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, X, ArrowRight, Shield, TrendingUp, Star } from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('perBag'); // perBag or subscription

  const pricingPlans = {
    perBag: [
      {
        name: "Basic",
        price: "¥1500",
        period: "per bag",
        description: "Perfect for individuals with light laundry needs",
        features: [
          { included: true, text: "Standard wash & fold" },
          { included: true, text: "2-day turnaround" },
          { included: true, text: "Basic stain treatment" },
          { included: true, text: "Eco-friendly detergent" },
          { included: true, text: "Free pickup & delivery" },
          { included: false, text: "Garment protection spray" },
          { included: false, text: "Same-day service" },
          { included: false, text: "Premium fabric care" }
        ],
        highlighted: false,
        color: "blue"
      },
      {
        name: "Premium",
        price: "¥2500",
        period: "per bag",
        description: "Most popular choice for busy professionals",
        features: [
          { included: true, text: "Premium wash & press" },
          { included: true, text: "24-hour turnaround" },
          { included: true, text: "Advanced stain removal" },
          { included: true, text: "Fabric softener included" },
          { included: true, text: "Free pickup & delivery" },
          { included: true, text: "Garment protection spray" },
          { included: false, text: "Same-day service" },
          { included: false, text: "Personal account manager" }
        ],
        highlighted: true,
        color: "blue"
      },
      {
        name: "VIP",
        price: "¥3800",
        period: "per bag",
        description: "Ultimate luxury care for your finest garments",
        features: [
          { included: true, text: "Luxury hand wash" },
          { included: true, text: "Same-day service" },
          { included: true, text: "Expert stain removal" },
          { included: true, text: "Premium fabric care" },
          { included: true, text: "Priority pickup & delivery" },
          { included: true, text: "Garment storage option" },
          { included: true, text: "Personal account manager" },
          { included: true, text: "White glove treatment" }
        ],
        highlighted: false,
        color: "indigo"
      }
    ],
    subscription: [
      {
        name: "Monthly Basic",
        price: "¥12,000",
        period: "per month",
        description: "8 bags per month - Save 20%",
        features: [
          { included: true, text: "8 bag credits per month" },
          { included: true, text: "Rollover unused bags" },
          { included: true, text: "Premium wash & press" },
          { included: true, text: "Priority scheduling" },
          { included: true, text: "Free pickup & delivery" },
          { included: false, text: "Same-day service" },
          { included: false, text: "Personal account manager" }
        ],
        highlighted: false,
        color: "blue"
      },
      {
        name: "Monthly Premium",
        price: "¥20,000",
        period: "per month",
        description: "12 bags per month - Save 30%",
        features: [
          { included: true, text: "12 bag credits per month" },
          { included: true, text: "Rollover unused bags" },
          { included: true, text: "Premium wash & press" },
          { included: true, text: "Priority scheduling" },
          { included: true, text: "Free pickup & delivery" },
          { included: true, text: "Same-day service (2x/month)" },
          { included: true, text: "Garment protection spray" },
          { included: false, text: "Personal account manager" }
        ],
        highlighted: true,
        color: "blue"
      },
      {
        name: "Corporate",
        price: "¥45,000",
        period: "per month",
        description: "30 bags per month - Save 40%",
        features: [
          { included: true, text: "30 bag credits per month" },
          { included: true, text: "Unlimited rollover" },
          { included: true, text: "VIP luxury service" },
          { included: true, text: "Priority scheduling" },
          { included: true, text: "Free pickup & delivery" },
          { included: true, text: "Unlimited same-day service" },
          { included: true, text: "Personal account manager" },
          { included: true, text: "Business invoicing" }
        ],
        highlighted: false,
        color: "indigo"
      }
    ]
  };

  const specialServices = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      name: "Dry Cleaning",
      price: "From ¥800",
      description: "Per garment - Professional dry cleaning for delicate fabrics"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-500" />,
      name: "Shoe Cleaning",
      price: "¥2,000",
      description: "Per pair - Expert cleaning for all types of footwear"
    },
    {
      icon: <Star className="w-8 h-8 text-blue-500" />,
      name: "Alterations",
      price: "From ¥500",
      description: "Per item - Professional tailoring and alterations"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      name: "Leather Care",
      price: "From ¥3,000",
      description: "Per item - Specialized cleaning for leather goods"
    }
  ];

  const faqs = [
    {
      question: "What's included in each bag?",
      answer: "Each bag can hold up to 8kg of laundry (approximately 12-15 items). This includes shirts, pants, undergarments, towels, and bedding."
    },
    {
      question: "How does pickup and delivery work?",
      answer: "Schedule a pickup time through our app or website. Our driver will collect your laundry and return it clean within the specified timeframe. All pickup and delivery is free."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your monthly subscription at any time. Unused bag credits will be available for 90 days after cancellation."
    },
    {
      question: "What if I have special cleaning requests?",
      answer: "You can add notes for each item during booking. Our team will contact you if we need clarification on special care instructions."
    },
    {
      question: "Do you offer commercial or bulk pricing?",
      answer: "Yes! Contact our sales team for custom enterprise plans for restaurants, hotels, salons, and other businesses."
    }
  ];

  const currentPlans = pricingPlans[billingCycle];

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
              <Link to="/pricing" className="text-blue-600 font-bold">Pricing</Link>
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
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transparent & Affordable
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your lifestyle. All plans include free pickup and delivery, eco-friendly products, and our satisfaction guarantee.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex bg-white rounded-xl shadow-lg p-2 border-2 border-blue-100">
            <button
              onClick={() => setBillingCycle('perBag')}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                billingCycle === 'perBag'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Pay Per Bag
            </button>
            <button
              onClick={() => setBillingCycle('subscription')}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                billingCycle === 'subscription'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Monthly Subscription
              <span className="ml-2 text-xs bg-green-400 text-white px-2 py-1 rounded-full">Save up to 40%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {currentPlans.map((plan, index) => (
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
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                
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
                      {feature.included ? (
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'}`} />
                      ) : (
                        <X className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-blue-300' : 'text-gray-400'}`} />
                      )}
                      <span className={`${feature.included ? (plan.highlighted ? 'text-blue-50' : 'text-gray-700') : 'text-gray-400 line-through'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/booking"
                  className={`block w-full py-4 text-center rounded-xl font-semibold transition duration-300 transform hover:scale-105 ${
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

      {/* Special Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized care for items that need extra attention
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialServices.map((service, index) => (
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

      {/* FAQs */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-blue-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
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
            Book your first service today and experience the difference. New customers get 20% off!
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
              to="/contact"
              className="bg-blue-700 text-white px-10 py-5 rounded-xl hover:bg-blue-800 transition shadow-2xl font-bold text-xl border-2 border-white"
            >
              Contact Sales
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

export default PricingPage;

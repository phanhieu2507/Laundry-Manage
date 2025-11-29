import React from 'react';
import MainLayout from '../../component/layout/MainLayout';

const AboutPage = () => (
  <MainLayout>
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">About Us</h1>
      <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" alt="About Laundry" className="rounded-2xl shadow mb-6 w-full h-64 object-cover" />
      <p className="text-lg text-gray-700 mb-4">
        Laundry E-Commerce is a leading provider of professional laundry and dry cleaning services. We use advanced technology and eco-friendly materials to ensure your clothes are always clean, fresh, and well cared for.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Our mission is to deliver convenience, quality, and satisfaction to every customer. With a dedicated team and modern facilities, we guarantee fast, safe, and reliable service for all your laundry needs.
      </p>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-blue-600 mb-2">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Premium dry cleaning & laundry technology</li>
          <li>Free pickup & delivery</li>
          <li>Eco-friendly solutions</li>
          <li>Customer loyalty rewards</li>
          <li>24/7 online support</li>
        </ul>
      </div>
    </div>
  </MainLayout>
);

export default AboutPage;

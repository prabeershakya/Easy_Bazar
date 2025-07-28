import React from 'react';
import { Link } from 'react-router';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 mt-12">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-orange-500 mb-8">
            About Us
          </h1>
          
          <div className="bg-orange-100 rounded-lg p-8 shadow-lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Story
                </h2>
                <p className="text-gray-800 leading-relaxed">
                  Welcome to our platform, where we bring together a unique collection of products from talented vendors. 
                  Our mission is to create a seamless shopping experience that connects buyers with quality products.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We strive to provide a platform that empowers vendors to showcase their products while offering 
                  customers a curated selection of high-quality items. Our focus is on building trust and ensuring 
                  satisfaction for all users.
                </p>
              </div>

              <div className='p-8'>
                <h2 className="text-3xl font-bold text-gray-800 mb-10">
                  Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-15 ml-15">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Secure Shopping</h3>
                      <p className="text-gray-400">Safe and secure transactions</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Easy Navigation</h3>
                      <p className="text-gray-400">User-friendly interface</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Vendor Support</h3>
                      <p className="text-gray-400">Tools for business growth</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Customer Focus</h3>
                      <p className="text-gray-400">Exceptional service</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-orange-100 rounded-lg p-8 shadow-lg mt-5">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">To Use our Online Services Consider,<Link to="/login" className="text-orange-600 hover:underline"> Logging In</Link></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

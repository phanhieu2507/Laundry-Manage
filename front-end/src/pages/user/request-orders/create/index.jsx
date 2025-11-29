import React from 'react';
import RequestForm from '../../../../component/request-orders/request-form';
import UserNavbar from '../../../../component/navbar/user-nav';
import UserSidebar from '../../../../component/sidebar/user-side';

const CreateRequest = () => {
  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <UserNavbar />
        <div className="flex-1 overflow-auto p-6 bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a New Request</h1>
            <RequestForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;


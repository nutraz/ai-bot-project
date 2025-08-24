
import React from 'react';

const CreateRepositoryPage = () => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-fuchsia-50 to-pink-50">
      <div className="bg-white/80 shadow-xl rounded-2xl p-10 max-w-xl w-full flex flex-col items-center text-center backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse tracking-tight">
          Create Repository
        </h1>
        <p className="text-lg text-gray-700 mb-8">This is where you'll create a new decentralized repository.</p>
        {/* Add form fields and actions here */}
      </div>
    </main>
  );
};

export default CreateRepositoryPage;

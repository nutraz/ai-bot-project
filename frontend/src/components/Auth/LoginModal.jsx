import React from 'react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">Sign In to OpenKeyHub</h3>
        <p className="text-gray-600 mb-6">Choose your authentication method to continue.</p>
        
        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Continue with Internet Identity
          </button>
          
          <button
            onClick={onLogin}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition"
          >
            Connect Wallet (Ethereum)
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

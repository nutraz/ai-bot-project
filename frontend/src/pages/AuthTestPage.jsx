import React, { useState } from 'react';
import authService from '../services/auth';

const AuthTestPage = () => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const simulateAuth = async () => {
    setIsLoading(true);
    setAttemptCount(prev => prev + 1);
    
    try {
      // Simulate different scenarios based on attempt count
      if (attemptCount >= 2) {
        // Simulate rate limit error
        const error = new Error('API rate limit exceeded for user ID 126004303. If you reach out to GitHub Support for help, please include the request ID 92D0:2C9F9:2B49FC:35A824:68AE212C and timestamp 2025-08-26 21:03:46 UTC.');
        error.isRateLimitError = true;
        throw error;
      }
      
      await authService.login();
      setStatus('✅ Authentication successful!');
    } catch (error) {
      console.error('Auth error:', error);
      setStatus(`❌ ${error.message || 'Authentication failed'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTest = () => {
    setAttemptCount(0);
    setStatus('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Authentication Rate Limiting Test</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Test Scenario</h2>
        <p className="text-gray-700">
          This page demonstrates the enhanced authentication error handling that addresses 
          GitHub API rate limit issues during sign-in attempts.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={simulateAuth}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Authenticating...' : `Simulate Auth (Attempt ${attemptCount + 1})`}
          </button>
          
          <button
            onClick={resetTest}
            disabled={isLoading}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Reset Test
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Processing authentication request...</span>
          </div>
        )}

        {status && (
          <div className={`p-4 rounded-lg ${
            status.includes('✅') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <p className="font-medium">Status:</p>
            <p className="mt-1">{status}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Improvements Made:</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Enhanced error detection for GitHub API rate limits</li>
            <li>• Automatic retry with exponential backoff</li>
            <li>• User-friendly error messages</li>
            <li>• Rate limiting protection (3 attempts per minute)</li>
            <li>• Loading states and disabled buttons during auth</li>
            <li>• Better UX with status indicators</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthTestPage;
import React, { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

const Notification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      case 'success':
      default:
        return <CheckCircle className="h-6 w-6 text-green-500" />
    }
  }

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border-l-4 px-4 py-3 max-w-sm animate-fade-in-up z-50">
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={onClose}
            className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notification

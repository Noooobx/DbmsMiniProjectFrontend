import React from 'react'

const SuccesModal = ({setShowSuccessModal}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 opacity-100">
    <div className="bg-white p-6 rounded-lg max-w-sm w-full transform transition-all duration-300 scale-100">
      <h3 className="text-xl font-bold text-center mb-4 text-green-600">Success</h3>
      <p className="mb-4">Your order has been successfully canceled!</p>
      <button
        onClick={() => setShowSuccessModal(false)} // Close success modal
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Close
      </button>
    </div>
  </div>
  )
}

export default SuccesModal
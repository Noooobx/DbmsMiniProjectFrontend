import React from 'react'

const CancelModal = ({setShowCancelModal,cancelOrder}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 opacity-100">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-bold text-center mb-4">Cancel Order</h3>
            <p className="mb-4">Are you sure you want to cancel this order?</p>
            <div className="flex justify-evenly">
              <button
                onClick={() => setShowCancelModal(false)} // Close modal without canceling
                className="px-4 py-2 bg-blue-500 rounded-md text-white"
              >
                No
              </button>
              <button
                onClick={cancelOrder} // Confirm cancellation
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
  )
}

export default CancelModal;
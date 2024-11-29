import React from 'react'

const CartSuccesModal = ({handleCloseModal}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
      <h3 className="font-bold text-lg text-black">Item Added To Cart</h3>
      <div className="mt-4 text-right">
        <button
          onClick={handleCloseModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  )
}

export default CartSuccesModal
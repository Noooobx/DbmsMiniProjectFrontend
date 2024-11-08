import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const fetchMenuData = async () => {
    try {
      const result = await axios.get("http://localhost:3004/menu/view", {
        withCredentials: true,
      });
      setMenuItems(result.data);

      const initialQuantities = {};
      result.data.forEach((item) => {
        initialQuantities[item.name] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleAddToCart = async (item) => {
    const quantity = quantities[item.name] || 1;
    try {
      await axios.post(
        "http://localhost:3004/cart/add",
        {
          name: item.name,
          quantity: quantity,
          price: parseFloat(item.price).toFixed(2),
        },
        { withCredentials: true }
      );
      console.log("Added to cart:", { item, quantity });
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

  const increaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: (prevQuantities[itemName] || 1) + 1,
    }));
  };

  const decreaseQuantity = (itemName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemName]: Math.max((prevQuantities[itemName] || 1) - 1, 1),
    }));
  };

  const handleModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-200">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl mt-8 font-bold text-center mb-6 text-orange-500">
            Our Menu
          </h1>

          <div className="flex flex-col w-full max-w-6xl px-4 space-y-6">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="card flex flex-col md:flex-row bg-white shadow-lg border border-gray-300 rounded-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg text-black">
                      Item Added to Cart!
                    </h3>
                    <p className="py-4 text-gray-700">
                      Item has been successfully added to your cart.
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn bg-blue-500 text-white hover:bg-blue-600 transition duration-200">
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>

                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-full md:w-60 h-40 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                />

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-800 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <p className="text-lg font-bold text-orange-500">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="px-3 py-1 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {quantities[item.name] || 1}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="px-3 py-1 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        handleAddToCart(item);
                        handleModal();
                      }}
                      className="px-4 py-2 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

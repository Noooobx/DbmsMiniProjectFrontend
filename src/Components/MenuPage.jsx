import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import CategoryFilter from "./CategoryFilter";
import MenuItems from "./MenuItems";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [offset,setOffset] = useState(0);
 
  // Fetch menu data
  const fetchMenuData = async () => {
    try {
      console.log("Menu fetch called")
      const result = await axios.get(`http://localhost:3004/menu/view/${offset}`, {
        withCredentials: true,
      });
      console.log(result.data)
      setMenuItems(result.data);
      setFilteredItems(result.data);

      const initialQuantities = {};
      result.data.forEach((item) => {
        initialQuantities[item.name] = 1;
      });

      const uniqueCategories = [
        ...new Set(result.data.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, [offset]);

  // Handlers
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    const filtered = menuItems.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleCategorySelect = (category) => {
    if (category === "All") {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen pt-20 pb-16 bg-gray-200">
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-4xl mt-8 font-bold text-center mb-6 text-orange-500">
            Our Menu
          </h1>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
            searchQuery={searchQuery}
          />

          {/* Menu Items */}
          <MenuItems
            items={filteredItems}
            fetchMenuData={fetchMenuData}
            offset={offset}
            setOffset={setOffset}
          />
        </div>
      </div>
      
    </div>
  );
};

export default MenuPage;

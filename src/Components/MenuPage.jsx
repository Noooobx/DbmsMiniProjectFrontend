const MenuPage = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta dish with creamy sauce and pancetta.',
      price: 12.99,
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      description: 'Traditional pizza topped with fresh mozzarella, basil, and tomatoes.',
      price: 10.99,
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.',
      price: 8.99,
    },
    {
      id: 4,
      name: 'Grilled Salmon',
      description: 'Deliciously grilled salmon served with lemon butter sauce.',
      price: 15.99,
    },
    {
      id: 5,
      name: 'Tiramisu',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers.',
      price: 6.99,
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-6 text-primary">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {menuItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl text-secondary">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;

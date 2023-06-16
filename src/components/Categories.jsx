
const Categories = ({ onTabSwich, activeTab, toggleFormVisibility }) => {

  const categories = ["All", "Custom", "ICP", "Mission", "Product"];

  const handleSwich = (tabName) => {
    onTabSwich(tabName);
  };

  return (
    <div>
      <p className="font-bold my-4">Categories</p>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-1 gap-4">
          {categories.map((category) => {
            return (
              <button
                className={
                  activeTab.toLowerCase() === category.toLowerCase()
                    ? "text-orange-500 leading-loose border-b-4 border-orange-500 py-0 px-2"
                    : "border-b-4 border-transparent py-0 px-2"
                }
                key={category}
                onClick={() => handleSwich(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
        <div>
          <button className="bg-orange-500 text-white py-2 px-4" onClick={() => toggleFormVisibility()}>
            Add topic &nbsp;<span className="font-bold">&#8250;</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Categories;

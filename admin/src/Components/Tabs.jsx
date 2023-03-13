const Tabs = ({ tabs,activeTabIndex,setActiveTabIndex }) => {

  return (
    <div className="flex flex-wrap">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          className={`py-1 mx-3 px-6 mt-2 md:mt-0 rounded-lg text-black ${
            activeTabIndex === index
              ? 'bg-gray-300 drop-shadow-md border-1 border-gray-300'
              : 'border-1 border-gray-600 drop-shadow-lg'
          }`}
          onClick={() => setActiveTabIndex(index)}
        >
          {tab.label}
          {tab.badge && (
            <span className="ml-2 inline-flex drop-shadow-md items-center rounded-xl bg-black px-2 text-white">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
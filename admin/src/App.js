import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";
import { Navbar, Sidebar, ThemeSettings } from "./Components";
import {
  Dashboard,
  NotFound,
  Request,
  GetUser,
  RestaurantDetail,
  AddCategory,
  UserDetail,
  GetOrder,
  Restaurants,
  ApprovedRestaurant,
} from "./Pages";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import LogIn from "./Pages/LogIn/LogIn";

function App() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const activeMenu = useSelector(state => state.setActiveMenu.activeMenu);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4  " style={{ zIndex: "1000" }}>
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray sm:border-0 dark:border-0"
            >
              <FiSettings />
            </button>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="sticky top-0 z-30 backdrop-blur-xl dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            {themeSettings && <ThemeSettings />}
            <Routes>
                <Route path="/" element={<Dashboard />} />  
                <Route path="/dashboard" element={<Dashboard />} />  
                <Route path="/login" element={<LogIn />} />  
                <Route path="/request" element={<Request />} />  
                <Route path="/request/:restaurantId" element={<RestaurantDetail />} />  
                <Route path="/customers" element={<GetUser />} />
                <Route path="/category" element={<AddCategory />} />
                <Route path="/customers/:id" element={<UserDetail />} />
                <Route path="/orders" element={<GetOrder />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/restaurants/:id" element={<ApprovedRestaurant/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

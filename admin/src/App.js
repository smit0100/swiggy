import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";
import { Navbar, Sidebar } from "./Components";
import { Dashboard, NotFound, Request,GetUser } from "./Pages";

function App() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

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
            <Routes>
                <Route path="/" element={<Dashboard />} />  
                <Route path="/dashboard" element={<Dashboard />} />  
                <Route path="/request" element={<Request />} />  
                <Route path="/customers" element={<GetUser />} />  
                <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          </div>

      </BrowserRouter>
    </div>
  );
}

export default App;

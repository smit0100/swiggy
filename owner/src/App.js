import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Directory from "./components/Directory";
import RestaurantRegister from "./components/RestaurantRegister";
import OwnerLogin from "./components/OwnerLogin";
import OwnerRegister from "./components/OwnerRegister";
import { useSelector } from "react-redux";
import LoginRegister from "./components/LoginRegister";
import Otp from "./components/Otp";
import PrivacyPolicy from "./components/PrivacyPolicy";
import OrderDetail from "./components/OrderDetail";
import AddProduct from "./components/AddProduct";
import OrderSummary from "./components/OrderSummary";
import ListOfProducts from "./components/ListOfProducts";
import OwnerProfile from "./pages/OwnerProfile";
import PageNotFound from "./components/PageNotFound";
function App() {
  const owner = useSelector((state) => state.userData.user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      owner == null ? (
        <Route path="/" element={<LoginRegister />}>
          <Route index element={<OwnerLogin />} />
          <Route path="/ownerRegister" element={<OwnerRegister />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      ) : (
        <Route path="/" element={<Home />}>
          <Route index element={<Directory />} />
          <Route path="/orderdetails" element={<OrderDetail />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listofproducts" element={<ListOfProducts />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/resturantRegister" element={<RestaurantRegister />} />
          <Route path="/ownerprofile" element={<OwnerProfile />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      )
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

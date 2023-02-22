import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Directory from './components/Directory';
import RestaurantRegister from './components/RestaurantRegister';
import OwnerLogin from './components/OwnerLogin'
import OwnerRegister from './components/OwnerRegister';
import { useSelector } from 'react-redux';
import LoginRegister from './components/LoginRegister';
import Otp from './components/Otp';
import PrivacyPolicy from './components/PrivacyPolicy';
import AddCategory from './components/AddCategory';
import OrderDetail from './components/OrderDetail';
function App() {

  const owner = useSelector(state => state.userData.user)

  const router = createBrowserRouter(
    createRoutesFromElements(
      owner == null ?
        <Route path="/" element={<LoginRegister />}>
          <Route index element={<OwnerLogin />} />
          <Route path="/ownerRegister" element={<OwnerRegister />} />
          <Route path="/otp" element={<Otp />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
        </Route> :
        <Route path="/" element={<Home />} >
          <Route index element={<Directory />} />
          <Route path='/addproduct' element={<AddCategory />} />
          <Route path='/orderdetail' element={<OrderDetail />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/resturantRegister' element={<RestaurantRegister />} />
        </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

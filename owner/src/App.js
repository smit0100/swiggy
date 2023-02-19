import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Directory from './components/Directory';
import OwnerRegister from './components/OwnerRegister';
import Login from './components/Login'
import Register from './components/Register';
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home/>} >
        <Route index element={<Directory/>}/>
        <Route path='/resturantRegister' element={<OwnerRegister />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
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

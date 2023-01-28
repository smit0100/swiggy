import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Directory from './components/Directory';
import OwnerRegister from './components/OwnerRegister';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home/>} >
        <Route index element={<Directory/>}/>
        <Route path='/register' element={<OwnerRegister />} />
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

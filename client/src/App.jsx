import {BrowserRouter, Routes, Route} from 'react-router';
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CheckEmail from './pages/Verify-Email/CheckEmail';
import VerifyToken from './pages/Verify-Email/VerifyToken';

function App() {
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify-email' element={<CheckEmail/>}/>
        <Route path='/user/verify-email' element={<VerifyToken/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import {BrowserRouter, Routes, Route} from 'react-router';
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CheckEmail from './pages/Verify-Email/CheckEmail';
import VerifyToken from './pages/Verify-Email/VerifyToken';
import ForgotPassword from './pages/Forgot-Password/ForgotPassword';
import ResetPassword from './pages/Forgot-Password/ResetPassword';
import Toast from './components/Toast';
import Watchlist from './pages/Watchlist/Watchlist';

function App() {
  return(
    <BrowserRouter>
      <Navbar/>
      <Toast/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify-email' element={<CheckEmail/>}/>
        <Route path='/user/verify-email' element={<VerifyToken/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/user/reset-password' element={<ResetPassword/>}/>
        <Route path='/watchlist' element={<Watchlist/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

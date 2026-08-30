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
import MovieOverview from './pages/Overview/MovieOverview';
import TvOverview from './pages/Overview/TvOverview';
import ListEditorModal from './components/ListEditorModal';
import useListEditor from './context/ListEditorContext/useListEditor';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import {useToast} from './context/ToastContext/useToast';
import API_URL from './config';

function App() {
  const {isOpen} = useListEditor();
  const {showToast} = useToast();

  useEffect(() => {
    let serverResponded = false;

    const timer = setTimeout(() => {
      if (!serverResponded) {
        showToast(
          'Server is waking up. This may take a moment.',
          'info'
        );
      }
    }, 8000);

    const wakeServer = async () => {
      try {
        await fetch(`${API_URL}/health`);
      } catch (error) {
        console.error(error);
      } finally {
        serverResponded = true;
        clearTimeout(timer);
      }
    };

    wakeServer();

    return () => clearTimeout(timer);
  }, [showToast]);
  
  return(
    <BrowserRouter>
      <ScrollToTop/>
      <Navbar/>
      <Toast/>
      {isOpen && <ListEditorModal/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify-email' element={<CheckEmail/>}/>
        <Route path='/user/verify-email' element={<VerifyToken/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/user/reset-password' element={<ResetPassword/>}/>
        <Route path='/watchlist' element={
          <ProtectedRoute>
            <Watchlist/>
          </ProtectedRoute>
        }/>
        <Route path='/movie/:id' element={<MovieOverview/>}/>
        <Route path='/tv/:id' element={<TvOverview/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;

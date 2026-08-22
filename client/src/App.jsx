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

function App() {
  const {isOpen} = useListEditor();
  
  return(
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;

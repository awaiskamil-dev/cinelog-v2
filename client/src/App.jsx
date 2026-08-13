import {BrowserRouter, Routes, Route} from 'react-router';
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";

function App() {
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

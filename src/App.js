import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Create from './pages/Create';
import Users from './pages/Users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Edit from './pages/Edit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:userID' element={<Edit />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>


  );
}

export default App;

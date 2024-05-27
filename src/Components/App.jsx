// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../Components/Register.jsx';
import Login from '../Components/Login.jsx';
import Navbar from '../Components/Navbar.jsx';
import AddProperty from '../Components/AddProperty.jsx';
import SellerProperties from '../Components/SellerProperties.jsx';
import BuyerProperties from '../Components/BuyerProperties.jsx';
import PrivateRoute from '../Components/PrivateRoute.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Navbar/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route element={<PrivateRoute />}>
          <Route path="/add-property" element={<AddProperty/>} />
          <Route path="/home-property" element={<SellerProperties/>} />
          <Route path="/buyer-property" element={<BuyerProperties/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

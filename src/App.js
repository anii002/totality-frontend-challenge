import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Home from "./components/Home";
import BookingDetails from './components/BookingDetails'
import CartSection from "./components/CartSection";
import Header from "./components/Header";
import { Route, BrowserRouter, Routes } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/booking" element={<BookingDetails />} />
      <Route path="/cart" element={<CartSection />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

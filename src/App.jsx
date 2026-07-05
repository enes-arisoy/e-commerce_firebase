import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./components/home";
import AddProduct from './components/addproduct';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Navbar from './components/navbar';
import Cart from './components/cart';
import { auth } from "./firebase";
import Checkout from './components/checkout';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const requireAuth = (element) => {
    if (loading) {
      return <div className="p-4 text-center">Loading...</div>;
    }

    return user ? element : <Navigate to="/signin" replace />;
  };

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={requireAuth(<Home />)} />
        <Route path="/addproduct" element={requireAuth(<AddProduct />)} />
        <Route path="/cart" element={requireAuth(<Cart />)} />
        <Route path="/checkout" element={requireAuth(<Checkout user={user} />)} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUp />} />
        <Route path="/signin" element={user ? <Navigate to="/" replace /> : <SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

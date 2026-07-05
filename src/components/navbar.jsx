import React from "react";
import { IoStorefront } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { PiShoppingCart } from "react-icons/pi";
import { useCart } from "../globalContext/cartContext";

const Navbar = ({ user }) => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="items-center justify-between flex px-4 py-2 bg-white shadow-md">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
        <IoStorefront className="text-6xl text-blue-500" />
        <span className="text-4xl font-bold text-gray-800">My Store</span>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700 font-semibold">
            Welcome, {user.displayName || user.email?.split("@")[0]}
          </Link>

          <Link to="/cart">
            <span className="relative text-gray-700 font-semibold hover:text-blue-500">
              <PiShoppingCart className="text-2xl " />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 font-semibold hover:text-blue-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link
            to="/signin"
            className="text-gray-700 font-semibold hover:text-blue-500"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-gray-700 font-semibold hover:text-blue-500"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

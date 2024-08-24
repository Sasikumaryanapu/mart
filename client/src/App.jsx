import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./Pages/register/Register";
import SignIn from "./Pages/sign-in/SignIn";
import Product from "./components/product/Product";
import About from "./Pages/about/About";

import Overview from "./components/product/Overview";
import ShoppingCart from "./components/product/ShoppingCart";
import Account from "./Pages/sign-in/Account";
import { useEffect } from "react";
import { checkAuthentication } from "./api/authService";
import { setAddressData, setUserData } from "./redux/slices/userSlices";
import { useDispatch } from "react-redux";
import StoreLocator from "./Pages/StoreLocator";
import Checkout from "./Pages/Checkout";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const { isAuthenticated, user } = await checkAuthentication();
        
        if (user) {
          const { firstname, lastname, email, _id, city, state, phoneNumber, street, pincode, landmark, country } = user;
          
          dispatch(setUserData({
            name: `${firstname} ${lastname}`,
            email,
            id: _id,
            isAuthenticated
          }));
          
          dispatch(setAddressData({
            city: city || '',
            state: state || '',
            phoneNumber: phoneNumber || '',
            street: street || '',
            pincode: pincode || '',
            landmark: landmark || '',
            country: country || ''
          }));
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    authenticateUser();
  }, []); 
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/products/:category" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/overview/:id" element={<Overview />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/store-locater" element={<StoreLocator />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

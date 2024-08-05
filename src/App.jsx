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

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/products/:category" element={<Product />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/overview/:id" element={<Overview />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/account" element={<Account />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

// import Brands from "./components/Brands";
// import  {Category}  from "./components/Category";
// import DisplayAllBrands from "./components/DisplayAllBrands";
// import {DisplayAllCategory} from "./components/DisplayAllCategory"
// import Products from "./components/Products";
// import DisplayAllProducts from "./components/DisplayAllProducts";
// import ProductDetails from "./components/ProductDetails";
// import DisplayAllProductDetails from "./components/DisplayAllProductDetails";
// import Banner from "./components/Banner";
// import CategoryBanners from "./components/CategoryBanners";

import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import Home from './components/userInterface/components/screens/Home';
import Header from './components/userInterface/components/Header';


import SpecificationComponent from './components/userInterface/components/screens/specifications/SpecificationComponents';
import PlusMinusComponent from './components/userInterface/components/screens/PlusMinusComponent';
import Cart from './components/userInterface/components/screens/Cart';
import LoginComponent from './components/userInterface/components/screens/user/LoginComponent';
import OtpComponent from './components/userInterface/components/screens/user/OtpComponent';
import MyProfileComponent from './components/userInterface/components/screens/user/MyProfileComponent';
import Shopping from './components/userInterface/components/screens/Shopping';
import DeliveryAddress from './components/userInterface/components/screens/user/DeliveryAddressComponent';
import ProductFilterComponent from './components/userInterface/components/screens/ProductFilterComponent';

function App() {
  return (
    <div>
   
      <Router>
        <Routes>        
          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<Home />} path="/home" />
          <Route element={<ProductFilterComponent />} path="/productfilter" />
          <Route element={<SpecificationComponent />} path="/specification" />
          <Route element={<PlusMinusComponent />} path="/pm" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<LoginComponent />} path="/login" />
          <Route element={<OtpComponent />} path="/otp" />
          <Route element={<MyProfileComponent />} path="/profiledetails" />
          <Route element={<Shopping />} path='/profile' />
          <Route element={<DeliveryAddress />} path='/showaddress' />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App;

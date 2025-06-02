import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";


import Dashboard from "./pages/dashboard";


import SignUp from "./pages/SignUp";
import Signin from "./pages/Signin";
import Profile from "./pages/profile";
import DProfile from "./pages/driverprofile";


import DSignUp from "./pages/driversigup";
import DSigin from "./pages/driversigin";
























export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>


     

   


     
      <Route path="/profile" element={<Profile />} />
     
     


        


   

      
       
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

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











import Admins from "./pages/admin";












export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>


      <Route path="/sign" element={<Signin />} />
      <Route path="/dsign" element={<DSigin />} />

      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dsign-up" element={<DSignUp />} />


      <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/Dprofile" element={< DProfile/>} />
     

   
        <Route path="/dash" element={<Dashboard />} />


        


       
        </Route>

        <Route path="/admin" element={<Admins />} />
       
     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

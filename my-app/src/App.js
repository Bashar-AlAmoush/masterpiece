import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackToTopButton from './components/user/BackToTopButton';
//-----------------------------user-------------------------------//
import NavListMenu from "./components/user/NavListMenu"
import Footer from "./components/user/Footer"
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';
import Cart from './components/user/Cart';
import Wishlist from './components/user/Wishlist';
import PaymentPage from './pages/user/PaymentPage';
import Home from "./pages/user/Home"
import About from "./pages/user/About"
import ContactUs from './pages/user/ContactUs';
import ProfilePage from './pages/user/ProfilePage'
import ServicePage from './pages/user/ServicePage';
import ServicePageAll from './pages/user/ServicePageAll';
import Details from './pages/user/Details';
import Page404 from './pages/user/Page404';
import SalesDetails from './pages/user/SalesDetails';
import EditProfile from './pages/user/EditProfile';
import Painting from './components/user/Painting';
//----------------------------------------------------------------//
//----------------------------admin------------------------------//
import Sidebar from './pages/admin/dashboard/Sidebar';
import NavListMenuD from './pages/admin/dashboard/NavDashboard'
import MainDashboard from './pages/admin/MainDashboard';
import ListUser from './pages/admin/ListUser'
import ListRestaurant from './pages/admin/ListRestaurant';
import ListSales from './pages/admin/ListSales';
import Chat from './pages/admin/Chat';
import EditAboutContact from './pages/admin/EditAboutContact';
import AcceptTables from './pages/admin/AcceptTables';
import DrawingList from './components/admin/DrawingList';
import PendingDrawing from './components/admin/PendingDrawing';
//---------------------------------------------------------------//

import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from './UserContext';

function App() {

  const { routs, updateRouts } = useContext(UserContext)
  const [hideRouterUser, setHideRouterUser] = useState(false);
  const [hideRouterAdmin, setHideRouterAdmin] = useState(true);
  const [roles, setrole] = useState({
    user: false,
  });
  const [Refresh, setRefresh] = useState(false)
  useEffect(() => {
    if (localStorage.roles != null) {
      let roles = JSON.parse(localStorage.roles)
      let status = localStorage.SignStatus
      setHideRouterUser(roles[0])
      setHideRouterAdmin(roles[1])
      updateRouts(roles)
    }
  }, [Refresh]);

  console.log(roles)
  const AppRouterUser = () => {
    const [currentTable, setCurrentTable] = useState({})

    return (

      <Router>
        <NavListMenu />
        <Routes>
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path='ContactUs' element={<ContactUs />} />
          <Route path="SignIn" element={<SignIn setRefresh={setRefresh} Refresh={Refresh}/>} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Wishlist" element={<Wishlist/>} />
          <Route path="PaymentPage" element={<PaymentPage />} />
          <Route path="ProfilePage" element={<ProfilePage />} />
          <Route path="ServicePageAll" element={<ServicePageAll />} />
          <Route path="/Details/:Product_id" element={<Details />} />
          <Route path="/SalesDetails/:Product_id" element={<SalesDetails />} />
          <Route path="EditProfile" element={<EditProfile />} />
          <Route path="Painting" element={<Painting/>} />
          <Route path="/Product/:category" element={<ServicePage />} />
          <Route path="*" element={<Page404/>} />
        </Routes>
        <BackToTopButton/>
        <Footer />
      </Router>

    );
  };
  const AppRouterAdmin = () => {
    return (
      <Router>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <NavListMenuD />
          <Routes>
            <Route index element={<MainDashboard />} />
            <Route path="ListUser" element={<ListUser />} />
            <Route path="ListRestaurant" element={<ListRestaurant />} />
            <Route path="ListSales" element={<ListSales />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="EditAboutContact" element={<EditAboutContact />} />
            <Route path="AcceptTables" element={<AcceptTables />} />
            <Route path="DrawingList" element={<DrawingList />} />
            <Route path="PendingDrawing" element={<PendingDrawing />} />
          </Routes>
        </div>
      </Router>

    );
  };

  return (
    <>

      {hideRouterUser ? null : (
        <>
          <AppRouterUser />
        </>
      )}
      {hideRouterAdmin ? null : (
        <>
          <div className='flex'>
            <AppRouterAdmin />
          </div>
        </>
      )}
    </>
  );
}

export default App;

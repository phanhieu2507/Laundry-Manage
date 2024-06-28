import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminService from "./pages/admin/services";
import UserService from "./pages/user/services";
import NotFound from "./pages/404/NotFound";
import CreateRequest from "./pages/user/request-orders/create";
import AdminRequestList from "./pages/admin/request-orders";
import Login from "./pages/login";
import Register from "./pages/register";
import UserRequestList from "./pages/user/request-orders";
import UserOrderList from "./pages/user/orders";
import AdminOrderList from "./pages/admin/orders";
import AdminCreateOrder from "./pages/admin/orders/create";
import AdminEditOrder from "./pages/admin/orders/edit";
import AdminUserList from "./pages/admin/users";
import UserProfile from "./pages/user/profile";
import PromoCodeList from "./pages/admin/promo-codes";
import PromoCodeDetail from "./pages/admin/promo-codes/[id]";
import UserPromoCodes from "./pages/user/promo-codes/[id]";
import UserReviews from "./pages/user/reviews/[id]";
import ServiceDetail from "./pages/admin/services/[id]";
import HomePage from "./pages/homepage";
import Dashboard from "./pages/admin/dashboard";
function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<IsLogin />}>
           <Route path='/home' element={<Home />} />
           <Route path='/profile' element={<Profile />} />
           <Route path='/otherprofile/:id' element={<OtherProfile />} />
           <Route path='/otherprofile/:id/tasks' element={<Task />} />
           <Route element={<IsAdmin />}>
             <Route path='/add' element={<Add />} />
             <Route path='/update/:id' element={<Update />} />
             <Route path='/push/:id' element={<Update />} />
          </Route>
        </Route> */}
        <Route path="admin/services" element={<AdminService />} />
        
        <Route path="admin/request-orders" element={<AdminRequestList />} />
        
        <Route path="admin/orders/create" element={<AdminCreateOrder />} />
        <Route path="admin/orders" element={<AdminOrderList />} />
        <Route path="admin/users" element={<AdminUserList />} />
        <Route path="admin/orders/:orderId/edit" element={<AdminEditOrder />} />
        <Route path="admin/promo-codes" element={<PromoCodeList />} />
        <Route path="admin/promo-codes/:id" element={<PromoCodeDetail />} />
        <Route path="admin/services/:serviceId" element={<ServiceDetail />} />
        <Route path="admin/dashboard" element={<Dashboard/>}/>
          <Route path="user/orders" element={<UserOrderList />} />
          <Route path="user/request-orders" element={<UserRequestList />} />
          <Route path="user/request-orders/create" element={<CreateRequest />} />
          <Route path="user/services" element={<UserService />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/promo-codes/:id" element={<UserPromoCodes />} />
          <Route path="user/reviews/:id" element={<UserReviews />} />

          <Route path="homepage" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

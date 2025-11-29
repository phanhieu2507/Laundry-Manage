import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminService from "./pages/admin/services";
import UserService from "./pages/user/services";
import EventsPage from "./pages/events";
import NewsPage from "./pages/news";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import PricingPage from "./pages/pricing";
import AboutUsPage from "./pages/about-us";
import BookingPage from "./pages/booking";
import ServicesDetailPage from "./pages/services-detail";
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
import { useAuth } from "./component/auth";
function App() {
  const { user } = useAuth();
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={user ? <Navigate to="/homepage" /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/homepage" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/homepage" /> : <Register />} />
        {user?.role === 'admin' && (
          <>
            <Route path="admin/services" element={<AdminService />} />
            <Route path="admin/request-orders" element={<AdminRequestList />} />
            <Route path="admin/orders/create" element={<AdminCreateOrder />} />
            <Route path="admin/orders" element={<AdminOrderList />} />
            <Route path="admin/users" element={<AdminUserList />} />
            <Route path="admin/orders/:orderId/edit" element={<AdminEditOrder />} />
            <Route path="admin/promo-codes" element={<PromoCodeList />} />
            <Route path="admin/promo-codes/:id" element={<PromoCodeDetail />} />
            <Route path="admin/dashboard" element={<Dashboard />} />
          </>
        )}
        {user?.role === 'user' && (
          <>
            <Route path="user/orders" element={<UserOrderList />} />
            <Route path="user/request-orders" element={<UserRequestList />} />
            <Route path="user/request-orders/create" element={<CreateRequest />} />
            <Route path="user/services" element={<UserService />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/promo-codes/:id" element={<UserPromoCodes />} />
            <Route path="user/reviews/:id" element={<UserReviews />} />
          </>
        )}
        <Route path="services/:serviceId" element={<ServiceDetail />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/services" element={<UserService />} />
        <Route path="/services-detail" element={<ServicesDetailPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;

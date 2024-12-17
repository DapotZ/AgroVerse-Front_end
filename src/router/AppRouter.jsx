import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../pages/User/Home";
import LoginPage from "../pages/User/LoginPage";
import TentangKami from "../pages/User/TentangKami";
import RegisterPage from "../pages/User/RegisterPage";
import Komunitas from "../pages/User/Komunitas";
import Webinar from "../pages/User/Webinar";
import FormWebinar from "../pages/User/FormWebinar";
import Forum from "../pages/User/Forum";
import Belanja from "../pages/User/Belanja";
import DetailProduct from "../pages/User/DetailProduct";
import Dashboard from "../pages/Admin/Dashboard";
import Product from "../pages/Admin/Product/Product";
import AddProduct from "../pages/Admin/Product/AddProduct";
import EditProduct from "../pages/Admin/Product/EditProduct";
import AdminWebinar from "../pages/Admin/Webinar/AdminWebinar";
import AddWebinar from "../pages/Admin/Webinar/AddWebinar";
import EditWebinar from "../pages/Admin/Webinar/EditWebinar";
import AdminUser from "../pages/Admin/User/AdminUser";
import AddUser from "../pages/Admin/User/AddUser";
import EditUser from "../pages/Admin/User/EditUser";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../components/PrivateRoute"; // Use this to protect the routes

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* User Route */}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/beranda" element={<PrivateRoute element={Home} />} />

          <Route
            path="/tentangkami"
            element={<PrivateRoute element={TentangKami} />}
          />
          <Route
            path="/komunitas"
            element={<PrivateRoute element={Komunitas} />}
          />
          <Route
            path="/komunitas/webinar"
            element={<PrivateRoute element={Webinar} />}
          />
          <Route
            path="/komunitas/webinar/form"
            element={<PrivateRoute element={FormWebinar} />}
          />
          <Route
            path="/komunitas/forum"
            element={<PrivateRoute element={Forum} />}
          />
          <Route path="/belanja" element={<PrivateRoute element={Belanja} />} />
          <Route
            path="/belanja/product/:productId"
            element={<PrivateRoute element={DetailProduct} />}
          />

          {/* Admin Route */}
          <Route
            path="/admin/dashboard"
            element={<PrivateRoute element={Dashboard} />}
          />

          {/* Admin Product Routes */}
          <Route
            path="/admin/products"
            element={<PrivateRoute element={Product} />}
          />
          <Route
            path="/admin/products/addproduct"
            element={<PrivateRoute element={AddProduct} />}
          />
          <Route
            path="/admin/products/edit/:productId"
            element={<PrivateRoute element={EditProduct} />}
          />

          {/* Admin Webinar Routes */}
          <Route
            path="/admin/webinar"
            element={<PrivateRoute element={AdminWebinar} />}
          />
          <Route
            path="/admin/webinar/addwebinar"
            element={<PrivateRoute element={AddWebinar} />}
          />
          <Route
            path="/admin/webinar/edit/:webinarId"
            element={<PrivateRoute element={EditWebinar} />}
          />

          {/* Admin User Routes */}
          <Route
            path="/admin/users"
            element={<PrivateRoute element={AdminUser} />}
          />
          <Route
            path="/admin/users/adduser"
            element={<PrivateRoute element={AddUser} />}
          />
          <Route
            path="/admin/users/edit/:userId"
            element={<PrivateRoute element={EditUser} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;

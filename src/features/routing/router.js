import { createBrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../account/features/auth/features/login/LoginPage";
import RegisterPage from "../account/features/auth/features/register/RegisterPage";
import EmailVerification from "../account/features/auth/features/email/EmailVerification";
import NotLogged from "../account/features/auth/components/not-logged/Not-logged";
import Header from "../../components/header/Header";
import Home from "../../components/landing-page/Home";
import Products from "../products/Products";
import DashboardProducts from "../dashboard/features/products/Products";
import ProductDetails from "../products/features/product-page/ProductDetails";
import Gallery from "../gallery/Gallery";
import Account from "../account/features/page/Account";
import Order from "../order/Order";
import Summary from "../order/features/summary/Summary";
import NotFound from "../../components/not-found-page/NotFound";
import Footer from "../../components/footer/Footer";
import AddProduct from "../dashboard/features/products/features/adding/AddProduct";
import Users from "../dashboard/features/users/Users";
import { DashboardProvider } from "../dashboard/context/DashboardContext";
import DashboardLayout from "../dashboard/DashboardLayout";
import ModeratorRoutes from "./components/ModeratorRoutes";
import User from "../dashboard/features/users/features/user/User";
import Discounts from "../dashboard/features/discounts/Discounts";
import IndividualDiscounts from "../dashboard/features/discounts/features/individual/IndividualDiscounts";
import DefaultDiscounts from "../dashboard/features/discounts/components/DefaultDiscounts";
import GroupDiscounts from "../dashboard/features/discounts/features/groups/GroupDiscounts";

export const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  return (
    <Routes>
      <Route path="/*" Component={NormalRoutes} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/dashboard" element={<ModeratorRoutes />}>
        <Route
          path=""
          element={
            <DashboardProvider>
              <DashboardLayout />
            </DashboardProvider>
          }
        >
          <Route path="products">
            <Route path="" element={<DashboardProducts />} />
            <Route path="adding" element={<AddProduct />} />
          </Route>
          <Route path="users">
            <Route path="" element={<Users />} />
            <Route path=":userID" element={<User />} />
          </Route>
          <Route path="discounts" element={<Discounts />}>
            <Route path="" element={<DefaultDiscounts />} />
            <Route path="groups" element={<GroupDiscounts />} />
            <Route path="individual" element={<IndividualDiscounts />} />
          </Route>
        </Route>
      </Route>
      <Route path="/email-verification" Component={EmailVerification} />
      <Route path="/not-logged" Component={NotLogged} />
    </Routes>
  );
}

function NormalRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products" Component={Products} />
        <Route path="/products/product/:productId" Component={ProductDetails} />
        <Route path="/gallery" Component={Gallery} />
        <Route path="/account" Component={Account} />
        <Route path="/order" Component={Order} />
        <Route path="/order/:orderID" Component={Summary} />
        <Route path="/*" Component={NotFound} />
      </Routes>
      <Footer />
    </>
  );
}

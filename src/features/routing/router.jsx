import { createBrowserRouter, Route, Routes } from "react-router-dom";
import NotLogged from "../account/features/auth/components/not-logged/NotLogged";
import Header from "../../components/header/Header";
import Home from "../../components/landing-page/Home";
import DashboardProducts from "../dashboard/features/products/Products";
import Products from "../products/features/products-page/Products";
import Account from "../account/features/page/Account";
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
import DashboardEvents from "../dashboard/features/events/Events";
import AddEventForm from "../dashboard/features/events/features/add/AddEventForm";
import EditEvent from "../dashboard/features/events/features/edit/EditEvent";
import Events from "../events/Events";
import Event from "../events/components/Event";
import MiniEvents from "../events/components/MiniEvents";
import Product from "../products/features/product-page/Product";
import ProductsOutletContext from "../products/ProductsOutletContext";
import ParamParser from "./components/ParamParser";
import DeliveryDashboard from "../dashboard/features/delivery/Delivery";
import Cart from "../cart/Cart";
import Order from "../order/Order";
import LoginBeforeOrder from "../order/features/login/LoginBeforeOrder";
import Details from "../order/features/details/Details";
import { OrderProvider } from "../order/context/OrderContext";
import Login from "../account/features/auth/features/login/Login";
import NotLoggedOnlyRoutes from "./components/NotLoggedOnlyRoutes";
import Register from "../account/features/auth/features/register/Register";
import EmailWaiting from "../account/features/auth/features/email/components/EmailWaiting";
import AuthTemplate from "../account/features/auth/components/auth-template/AuthTemplate";
import EmailActivation from "../account/features/auth/features/email/components/EmailActivation";
import Contact from "../../components/contact/Contact";
import Media from "../../components/media/Media";

export const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  return (
    <Routes>
      <Route path="/*" Component={NormalRoutes} />
      <Route path="/not-found" Component={NotFound} />

      <Route
        path="/auth"
        element={
          <AuthTemplate>
            <NotLoggedOnlyRoutes />
          </AuthTemplate>
        }
      >
        <Route path="login" Component={Login} />
        <Route path="register" Component={Register} />
        <Route path="email">
          <Route path="waiting" Component={EmailWaiting} />
          <Route path="activation" Component={EmailActivation} />
        </Route>
      </Route>
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
          <Route path="events" element={<DashboardEvents />}>
            <Route path="add" element={<AddEventForm />} />
            <Route path=":eventID" element={<EditEvent />} />
          </Route>
          <Route path="delivery" element={<DeliveryDashboard />} />
        </Route>
      </Route>
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
        <Route path="/products" Component={ProductsOutletContext}>
          <Route path="" Component={Products} />
          <Route
            path=":id"
            element={
              <ParamParser>
                <Product />
              </ParamParser>
            }
          />
        </Route>
        <Route path="/events" Component={Events}>
          <Route path="" Component={MiniEvents} />
          <Route path=":id" Component={Event} />
        </Route>
        <Route path="/account" Component={Account} />
        <Route path="/cart" Component={Cart} />
        <Route
          path="/order"
          element={
            <OrderProvider>
              <Order />
            </OrderProvider>
          }
        >
          <Route path="login-before-order" element={<LoginBeforeOrder />} />
          <Route path="details" element={<Details />} />
        </Route>
        <Route path="/contact" Component={Contact} />
        <Route path="/media" Component={Media} />
        <Route path="/*" Component={NotFound} />
      </Routes>
      <Footer />
    </>
  );
}

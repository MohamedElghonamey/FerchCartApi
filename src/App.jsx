import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import NotFound from "./Components/NotFound/NotFound";
import AuthContextProvider, { AuthContext } from "./Context/AuthContext";
import Protect from "./Components/Protect/Protect";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProductsDetails from "./Components/ProductsDetails/ProductsDetails";
import CartProvider, { CartContext } from "./Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./Components/CheckOut/CheckOut";
import MyOrder from "./Components/MyOrders/Myorder";
import ResetPassword from "./Components/ReseetPassword/ReseetPassword";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Wishlist from "./Components/WishList/WishList";
import "./App.css";
function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Protect>
              <Home />
            </Protect>
          ),
        },
        {
          path: "Wishlist",
          element: (
            <Protect>
              <Wishlist />
            </Protect>
          ),
        },
        {
          path: "/products",
          element: (
            <Protect>
              <Products />
            </Protect>
          ),
        },
        {
          path: "/products-details/:id",
          element: (
            <Protect>
              <ProductsDetails />
            </Protect>
          ),
        },

        {
          path: "/brands",
          element: (
            <Protect>
              <Brands />
            </Protect>
          ),
        },
        {
          path: "/cart",
          element: (
            <Protect>
              <Cart />
            </Protect>
          ),
        },
        {
          path: "/checkout",
          element: (
            <Protect>
              <CheckOut />
            </Protect>
          ),
        },
        {
          path: "/allOrders",
          element: (
            <Protect>
              <MyOrder />
            </Protect>
          ),
        },
        {
          path: "/categories",
          element: (
            <Protect>
              <Categories />
            </Protect>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        { path: "*", element: <NotFound /> },
        {
          path: "/forgetpassword",
          element: <ForgetPassword />,
        },
        { path: "/resetpassword", element: <ResetPassword /> },
      ],
    },
  ]);
  const query = new QueryClient();

  return (
    <>
      <AuthContextProvider>
        <CartProvider>
          <QueryClientProvider client={query}>
            <RouterProvider router={routers} />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <ToastContainer />
          </QueryClientProvider>
        </CartProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;

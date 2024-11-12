import Homepage from "./pages/Homepage";
import ProductInfo from "./pages/ProductInfo";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart/Cart";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter, Navigate, Route, Routes
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ShoppingCartProvider } from "./shared/context/ShoppingCartContext";
import { UserAuthContextProvider } from "./shared/context/UserAuthContext";

// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from "framer-motion"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/product/:id",
      element: <ProductInfo />,
    },
    {
      path: "/category/:category",
      element: <CategoryPage />,
    },
    {
      path: "/cart",
      element: <Cart />,
    }
  ]);

  return (
    <>
      <div>
        <ShoppingCartProvider>
          <UserAuthContextProvider>
            <Header />
            <RouterProvider router={router} />
            <Footer />
          </UserAuthContextProvider>
        </ShoppingCartProvider>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App;
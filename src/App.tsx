import Homepage from "./pages/Homepage";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter, Navigate, Route, Routes
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import One from "./pages/One";
import Oneone from "./pages/Oneone";
import Onetwo from "./pages/Onetwo";
import Two from "./pages/Two";
import Twoone from "./pages/Twoone";
import Twotwo from "./pages/Twotwo";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/product",
      element: <ProductDetails />,
    },
    {
      path: "/category",
      element: <CategoryPage />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  )
}

export default App;
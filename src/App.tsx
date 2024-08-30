import Homepage from "./pages/Homepage";
import ProductInfo from "./pages/ProductInfo";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter, Navigate, Route, Routes
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ShoppingCartProvider } from "./shared/context/ShoppingCartContext";
import { UserAuthContextProvider } from "./shared/context/UserAuthContext";

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
      <ShoppingCartProvider>
        <UserAuthContextProvider>
          <Header />
          <RouterProvider router={router} />
          <Footer />
        </UserAuthContextProvider>
      </ShoppingCartProvider>
    </>
  )
}

export default App;
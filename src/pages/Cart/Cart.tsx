// import data from '../mock/cartItem.json'
import { useEffect, useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { getProductArr, Product } from "../../services/productServices";
import { useShoppingCart } from "../../shared/context/ShoppingCartContext";
import { calSalePrice } from "../../utils/calSalePrice";
import { syncCartToDB } from "../../services/userServices";
import { useUserAuth } from "../../shared/context/UserAuthContext";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const [products, setProducts] = useState<Product[] | null[]>([]);
  const { cartItems, fillCart } = useShoppingCart();
  const { user, displayLogin } = useUserAuth();

  useEffect(() => {
    fetchProducts();
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      const saveCart = setTimeout(() => {
        syncCartToDB(user, cartItems);
      }, 1000);
      return () => clearTimeout(saveCart);
    }
  }, [cartItems]);

  useDocumentTitle("Cart");

  const navigate = useNavigate();

  function calTotal() {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((i) => i!.id === cartItem.id);
      return product
        ? calSalePrice(product!) * cartItem.quantity + total
        : total;
    }, 0);
  }

  async function fetchProducts() {
    const idArr = cartItems.map((i) => i.id);
    const productsArr = await getProductArr(idArr);
    setProducts(productsArr);
  }

  const DISCOUNT = 20;
  const total = products ? calTotal() : 0;

  return (
    <div className="container px-4 md:px-0">
      <Breadcrumb cart={true} />
      <h3 className="text-3xl mb-5">Your Cart</h3>
      <div className="lg:flex lg:items-start lg:gap-4">
        <CartList cartItems={cartItems} products={products} />
        <OrderSummary
          discount={DISCOUNT}
          total={total}
          cartItems={cartItems}
          user={user}
          displayLogin={displayLogin}
        />
      </div>
    </div>
  );
};

export default Cart;

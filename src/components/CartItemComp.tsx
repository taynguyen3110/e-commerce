import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { formatTitle } from "../utils/formatTitle";
import { QuantityButton } from "./QuantityButton";
import { Product } from "../services/productServices";
import {
  CartItem,
  useShoppingCart,
} from "../shared/context/ShoppingCartContext";
import { calSalePrice } from "../utils/calSalePrice";

interface CartItemCompProps {
  product: Product;
  cartItem: CartItem;
  inStock: number;
}

export const CartItemComp = ({
  product,
  cartItem,
  inStock,
}: CartItemCompProps) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const navigate = useNavigate();
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  function addToCart() {
    increaseCartQuantity(cartItem.id, cartItem.size, cartItem.color, 1);
  }

  return (
    <div className={classNames("cart-item flex gap-4 border-b pb-3")}>
      <img
        className="h-24 rounded-lg cursor-pointer"
        src={product.imgSource[cartItem.color][0]}
        onClick={() => {
          navigate(`/product/${cartItem.id}`);
        }}
        alt="Cart Item Image"
      />
      <div className="w-full h-24">
        <div className="flex justify-between items-center">
          <h4
            className="font-bold w-4/5 truncate cursor-pointer"
            onClick={() => {
              navigate(`/product/${cartItem.id}`);
            }}
          >
            {product.name}
          </h4>
          <i
            className="bx bxs-trash text-red-600 text-xl cursor-pointer"
            onClick={() =>
              removeFromCart(cartItem.id, cartItem.size, cartItem.color)
            }
          ></i>
        </div>
        <p className="opacity-100 text-xs">
          Size: <span className="opacity-60">{cartItem.size}</span>
        </p>
        <p className="opacity-100 text-xs">
          Color:{" "}
          <span className="opacity-60">{formatTitle(cartItem.color)}</span>
        </p>
        <div className="flex items-center justify-between">
          <p className="opacity-100 text-xl font-bold">
            ${calSalePrice(product)}
          </p>
          <QuantityButton
            key={cartItem.id}
            height={3}
            quantity={quantity}
            maxQuantity={inStock}
            handleAdd={addToCart}
            handleDecrease={() =>
              decreaseCartQuantity(cartItem.id, cartItem.size, cartItem.color)
            }
            setQuantity={setQuantity}
          />
        </div>
      </div>
    </div>
  );
};

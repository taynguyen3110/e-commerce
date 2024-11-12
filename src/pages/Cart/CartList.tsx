import React from "react";
import { CartItemComp } from "../../components/CartItemComp";
import { CartItem } from "../../shared/context/ShoppingCartContext";
import { Product } from "../../services/productServices";

interface CartListProps {
  cartItems: CartItem[];
  products: Product[] | null[];
}

const CartList = ({ cartItems, products }: CartListProps) => {
  function getQuantity(cartItem: CartItem): number {
    return (
      products
        .find((p) => p!.id === cartItem.id)
        ?.sizesColors.find((sc) => sc.size === cartItem.size)!
        .colors.find((c) => c.color === cartItem.color)!.stock || 0
    );
  }

  return (
    <div className="lg:w-7/12 border rounded-2xl p-3 pb-0 flex flex-col gap-3">
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((i) => {
          const product = products.find((y) => y?.id === i.id);
          if (product) {
            return (
              <CartItemComp
                key={i.id + i.color + i.size}
                product={product}
                cartItem={i}
                inStock={getQuantity(i)}
              />
            );
          }
        })
      ) : (
        <p>There are no item in your Shopping Cart!</p>
      )}
    </div>
  );
};

export default CartList;

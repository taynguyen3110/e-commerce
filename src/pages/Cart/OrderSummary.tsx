import Button from "../../components/Button";
import classNames from "classnames";
import { syncCartToDB } from "../../services/userServices";
import { notify } from "../../utils/notify";
import { CartItem } from "../../shared/context/ShoppingCartContext";
import { User } from "firebase/auth";

interface OrderSummaryProps {
  discount: number;
  total: number;
  cartItems: CartItem[];
  user: User | null;
  displayLogin: () => void;
}

const OrderSummary = ({
  discount,
  total,
  cartItems,
  user,
  displayLogin,
}: OrderSummaryProps) => {
  return (
    <div className="lg:w-5/12 mt-3 lg:mt-0 p-4 border rounded-2xl">
      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-bold">Order Summary</h4>
        <div className="flex justify-between">
          <p className={classNames("opacity-[99]")}>Subtotal</p>
          <span className="font-bold">${total}</span>
        </div>
        <div className="flex justify-between">
          <p className="">Discount (-{discount}%)</p>
          <span className="font-bold text-red-500">
            -${Math.round((total * discount) / 100)}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="">Delivery Fee</p>
          <span className="font-bold">$15</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <p className="opacity-100">Total</p>
          <span className="font-bold text-xl">
            ${Math.round((total * (100 - discount)) / 100)}
          </span>
        </div>
        <div className="flex w-full gap-4">
          <div className="relative w-8/12">
            <i className="bx bx-purchase-tag absolute top-1/2 translate-y-[-50%] left-4 text-xl opacity-40 font-bold"></i>
            <input
              type="text"
              className="md:py-4 py-3 pl-[43px] w-full bg-background rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base"
              placeholder="Add promo code"
            />
          </div>
          <Button className="w-1/3">Apply</Button>
        </div>
        <Button
          className="w-full"
          onClick={() => {
            if (user) syncCartToDB(user, cartItems);
            else {
              notify("warn", "Please Login to checkout.");
              displayLogin();
            }
          }}
        >
          Go to Checkout
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;

import classNames from "classnames";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "./Button";

interface QuantityButtonProps {
  height?: number;
  quantity: number;
  maxQuantity: number;
  handleAdd: () => void;
  handleDecrease: () => void;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  isCart?: boolean;
}

export const QuantityButton = ({
  height = 8,
  quantity = 1,
  maxQuantity,
  handleAdd,
  handleDecrease,
  setQuantity,
  isCart = false,
}: QuantityButtonProps) => {
  const [isMin, setIsMin] = useState<boolean>(quantity <= 1);
  const [isMax, setIsMax] = useState<boolean>(quantity >= maxQuantity);
  let intervalId = useRef<number>();
  let timeOutId = useRef<number>();
  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  useEffect(() => {
    setIsMin(quantity <= 1);
    setIsMax(quantity >= maxQuantity);
    if (isMax || isMin) {
      clear();
    }
  }, [quantity, maxQuantity]);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    if (value >= 0 && setQuantity) {
      setQuantity(value);
    }
  }

  function fastChange(action: string) {
    if (!intervalId.current) {
      if (action === "increase") {
        intervalId.current = setInterval(() => {
          increaseQuantity();
        }, 150) as any;
      }
      if (action === "decrease") {
        intervalId.current = setInterval(() => {
          decreaseQuantity();
        }, 150) as any;
      }
    }
  }

  function increaseQuantity() {
    setQuantity((prev) => {
      return Math.min(prev + 1, maxQuantity);
    });
  }

  function decreaseQuantity() {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }

  function onMouseDown(action: string) {
    if (action === "increase") {
      increaseQuantity();
    }
    if (action === "decrease") {
      decreaseQuantity();
    }
    delayFastChange(action);
  }

  function delayFastChange(action: string) {
    timeOutId.current = setTimeout(() => fastChange(action), 500) as any;
  }

  function clear() {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
      timeOutId.current = undefined;
    }
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = undefined;
    }
  }
  return (
    <div
      className="bg-background flex w-[calc(30%)] rounded-full"
      style={{ padding: `${height}px 0px` }}
    >
      <i
        className={`bx bx-plus w-1/3 flex items-center justify-center mr-3 text-2xl ${
            isMin ? "cursor-default text-gray-300" : "cursor-pointer"
          }`}
        onClick={() => {}}
        onMouseDown={() => {
          onMouseDown("decrease");
        }}
        onMouseUp={clear}
        onMouseLeave={clear}
      ></i>
      <input
        className={classNames(
          "bg-background focus:outline-none w-1/3 text-center",
          { "select-none": isCart }
        )}
        type="test"
        name="quantity"
        id="quantity"
        value={quantity}
        readOnly={isCart}
        onChange={handleOnChange}
      />
      <i
        className={`bx bx-plus w-1/3 flex items-center justify-center mr-3 text-2xl ${
          isMax ? "cursor-default text-gray-300" : "cursor-pointer"
        }`}
        onClick={() => {}}
        onMouseDown={() => {
          onMouseDown("increase");
        }}
        onMouseUp={clear}
        onMouseLeave={clear}
      ></i>
    </div>
  );
};

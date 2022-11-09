/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import {
  subtractQuantity,
  subtractFromTotal,
  addToTotal,
  increaseQuantity,
} from "../../redux/Slices/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const addQuantityToCart = () => {
    dispatch(increaseQuantity(props.id));
    dispatch(addToTotal(props.price));
  };

  const subtractQuantityFromCart = () => {
    dispatch(subtractQuantity(props.id));
    dispatch(subtractFromTotal(props.price));
  };

  const cartDetails = useMemo(() => {
    return (
      <div className="flex p-3">
        <img src={props.images[0]} className="h-28 rounded-lg" alt="" />
        <div className="ml-10 self-start space-y-5">
          <h1 className="text-xl text-purple-700 font-semibold">
            {props.title}
          </h1>
          <p>${props.price}</p>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <div className="flex items-center p-5 justify-between bg-violet-200 mt-2 mb-2 rounded-xl">
        {cartDetails}
        <div className="h-8 flex">
          <div
            className="h-10 p-2 border-2 bg-white cursor-pointer"
            data-testid="btn-subtract-quantity"
            onClick={subtractQuantityFromCart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </div>

          <p
            data-testid="p-quantity"
            className="h-10 px-2 py-1 bg-white border-t-2 border-b-2"
          >
            {props.quantity}
          </p>

          <div
            className="h-10 p-2 bg-white border-2 cursor-pointer"
            data-testid="btn-add-quantity"
            onClick={addQuantityToCart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

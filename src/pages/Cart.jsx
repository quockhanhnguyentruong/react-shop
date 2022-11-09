import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem/index";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const Cart = () => {
  const { currentCart, totalItems } = useSelector((state) => state.cart);

  let cartItems = currentCart.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.title}
      price={item.price}
      title={item.title}
      images={item.images}
      quantity={item.quantity}
    />
  ));

  return (
    <>
      {totalItems > 0 ? (
        <CheckoutForm cartItems={cartItems} />
      ) : (
        <>
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-gray-700 font-semibold text-xl mb-2">
              Your cart is empty!
            </h1>
            <Link to={"/"}>
              <button className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3">
                SHOP NOW
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

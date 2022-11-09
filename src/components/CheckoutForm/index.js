import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const CheckoutForm = ({ cartItems }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { totalItems, totalPrice } = useSelector((state) => state.cart);
  const onSubmit = () => {
    window.alert("Form Submitted");
  };

  return (
    <>
      <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-between p-2">
          {cartItems}
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg m-4 p-4 bg-violet-200 rounded-lg shadow-xl"
          >
            <p className="text-gray-800 font-medium">Customer information</p>
            <div className="">
              <label className="block text-sm text-gray-600" htmlFor="cus_name">
                Name
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                placeholder="Your Name"
                aria-label="Name"
                {...register("cus_name", {
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/i,
                    message: "Invalid Name",
                  },
                })}
              />
              {errors.cus_name && (
                <span className="text-red-500">{errors.cus_name.message}</span>
              )}
            </div>
            <div className="mt-2">
              <label
                className="block text-sm text-gray-600"
                htmlFor="cus_email"
              >
                Email
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="cus_email"
                name="cus_email"
                type="text"
                placeholder="Your Email"
                aria-label="Email"
                {...register("cus_email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    message: "Invalid Email",
                  },
                })}
              />
              {errors.cus_email && (
                <span className="text-red-500">{errors.cus_email.message}</span>
              )}
            </div>
            <div className="mt-2">
              <label
                className=" block text-sm text-gray-600"
                htmlFor="cus_address"
              >
                Address
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="cus_address"
                name="cus_address"
                type="text"
                placeholder="Street"
                aria-label="Address"
                {...register("cus_address", {
                  required: "This field is required",
                })}
              />
              {errors.cus_address && (
                <span className="text-red-500">
                  {errors.cus_address.message}
                </span>
              )}
            </div>
            <div className="mt-2">
              <label
                className="hidden text-sm block text-gray-600"
                htmlFor="cus_city"
              >
                City
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="cus_city"
                name="cus_city"
                type="text"
                placeholder="City"
                aria-label="City"
                {...register("cus_city", {
                  required: "This field is required",
                })}
              />
              {errors.cus_city && (
                <span className="text-red-500">{errors.cus_city.message}</span>
              )}
            </div>
            <div className="flex">
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label
                  className="hidden block text-sm text-gray-600"
                  htmlFor="cus_country"
                >
                  Country
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                  id="cus_country"
                  name="cus_country"
                  type="text"
                  placeholder="Country"
                  aria-label="Country"
                  {...register("cus_country", {
                    required: "This field is required",
                  })}
                />
                {errors.cus_country && (
                  <span className="text-red-500">
                    {errors.cus_country.message}
                  </span>
                )}
              </div>
              <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                <label
                  className="hidden block text-sm text-gray-600"
                  htmlFor="cus_zip"
                >
                  Zip
                </label>
                <input
                  className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                  id="cus_zip"
                  name="cus_zip"
                  type="text"
                  placeholder="Zip"
                  aria-label="Zip"
                  {...register("cus_zip", {
                    required: "This field is required",
                    pattern: {
                      value: /^\d{5}(?:[-\s]\d{4})?$/i,
                      message: "Invalid ZIP Code",
                    },
                  })}
                />
                {errors.cus_zip && (
                  <span className="text-red-500">{errors.cus_zip.message}</span>
                )}
              </div>
            </div>
            <p className="mt-4 text-gray-800 font-medium">
              Payment information
            </p>
            <div>
              <label className="block text-sm text-gray-600" htmlFor="cus_name">
                Card
              </label>
              <input
                className="w-full px-2 py-2 text-gray-700 bg-white rounded"
                id="cus_card"
                name="cus_card"
                type="text"
                placeholder="Card Number MM/YY CVC"
                aria-label="CardNumber"
                {...register("cus_card", {
                  required: "This field is required",
                  pattern: {
                    value: /^4[0-9]{12}(?:[0-9]{3})?$/i,
                    message: "Invalid Card Visa Number",
                  },
                })}
              />
              {errors.cus_card && (
                <span className="text-red-500">{errors.cus_card.message}</span>
              )}
            </div>
            <div>
              <div className="flex flex-col justify-center items-start mt-4 space-y-5">
                <h1 className="font-semibold text-lg text-purple-800">
                  YOUR CART SUMMARY
                </h1>
                <p>
                  <span className="text-gray-700 font-semibold">
                    Total Items
                  </span>{" "}
                  : {totalItems}
                </p>
                <p>
                  {" "}
                  <span className="text-gray-700 font-semibold">
                    Total Amount
                  </span>{" "}
                  : ${totalPrice}
                </p>
              </div>
            </div>
            <div>
              <button
                type="submit"
                data-testid="submit"
                className=" bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3"
              >
                Checkout Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;

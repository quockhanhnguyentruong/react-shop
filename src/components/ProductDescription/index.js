import React, { memo } from "react";

const ProductDescription = ({ product }) => {
  return (
    <>
      <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
        {product.title}
      </h2>

      <div className="flex items-center space-x-4 my-4">
        <div>
          <div className="rounded-lg bg-gray-100 flex py-2 px-3">
            <span className="text-purple-400 mr-1 mt-1">$</span>
            <span className="font-bold text-purple-700 text-3xl">
              {product.price}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-500">{product.description}</p>
    </>
  );
};

export default memo(ProductDescription);

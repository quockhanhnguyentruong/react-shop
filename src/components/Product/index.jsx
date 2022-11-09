import React from "react";
import {
  add,
  addToTotal,
  subtractFromTotal,
  subtractQuantity,
} from "../../redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { generatePath, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import useConfirm from "../../hooks/useConfirm";

// interface IProductProps {
//   id: string
//   price: number,
//   title: string,
//   images: string[]
// }

// interface ICartSlice {
//   cart: {
//     currentCart: {id: string}[]
//   }
// }

const Product = ({ item }) => {
  const { confirm } = useConfirm();
  const { currentCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = () => {
    dispatch(add(item));
    dispatch(addToTotal(item.price));
    enqueueSnackbar(`${item.title} added to your cart successfully`, {
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  const removeFromCart = async () => {
    const isConfirm = await confirm("Do you confirm your choice?");
    if (isConfirm) {
      dispatch(subtractQuantity(item.id));
      dispatch(subtractFromTotal(item.price));
      enqueueSnackbar(`${item.title} removed from your cart!`, {
        variant: "warning",
        autoHideDuration: 1000,
      });
    }
    return;
  };

  const productDetails = () => {
    const path = generatePath("/product/:id", { id: item.id });
    navigate(path);
  };

  return (
    <>
      <div className="group hover:scale-110 transition duration-300 ease-in flex flex-col items-center border-2 border-purple-400 gap-3 p-4 h-[350px] mt-10 ml-5  rounded-xl">
        <div className="h-[180px]">
          <img
            data-testid="product-image"
            src={item.images[0]}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1
            data-testid="product-title"
            className="truncate w-40 mt-3 text-gray-700 font-semibold text-lg"
          >
            {item.title}
          </h1>
        </div>
        <div className="flex items-center justify-between w-full mt-5">
          {currentCart.some((p) => p.id === item.id) ? (
            <button
              data-testid="btn-remove-product"
              className="hover:bg-purple-700 hover:text-white transition duration-300 ease-in text-purple-700 border-2 border-purple-700 rounded-lg font-semibold p-3"
              onClick={removeFromCart}
            >
              Remove item
            </button>
          ) : (
            <button
              data-testid="btn-add-product"
              className="group-hover:bg-purple-700 group-hover:text-white transition duration-300 ease-in text-purple-700 border-2 border-purple-700 rounded-lg font-semibold p-3"
              onClick={addToCart}
            >
              Add to cart
            </button>
          )}
          <div
            data-testid="btn-detail-product"
            onClick={productDetails}
            className="bg-purple-300 hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
          >
            <EventNoteIcon className="text-gray-800" />
          </div>
          <p data-testid="product-price">${item.price}</p>
        </div>
      </div>
    </>
  );
};

export default Product;

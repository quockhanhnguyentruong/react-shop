import CartItem from ".";
import { fireEvent, render, screen } from "@testing-library/react";

const props = {
  id: 3,
  images: ["https://dummyjson.com/image/i/products/3/1.jpg"],
  price: 1249,
  quantity: 1,
  title: "Samsung Universe 9",
};

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true),
}));

describe("CartItem", () => {
  it("Add quantity to cart", () => {
    render(<CartItem {...props} />);
    const add = screen.getByTestId("btn-add-quantity");
    fireEvent.click(add);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it("Subtract quantity to cart", () => {
    render(<CartItem {...props} />);
    const subtract = screen.getByTestId("btn-subtract-quantity");
    fireEvent.click(subtract);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});

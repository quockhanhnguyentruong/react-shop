import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import * as redux from "react-redux";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true),
  useSelector: () => mockSelector,
}));

describe("Login Page with isLogged is false", () => {
  it("Should handle wrong user name but right pass", () => {
    render(<Login />);
    const uname = screen.getByLabelText("uname");
    const pass = screen.getByLabelText("pwd");
    const submit = screen.getByTestId("submit");
    fireEvent.change(uname, { target: { value: "222" } });
    expect(uname.value).toBe("222");
    fireEvent.change(pass, { target: { value: "1" } });
    expect(pass.value).toBe("1");
    fireEvent.click(submit);
    const errorMess = screen.getByTestId("error-mess");
    expect(errorMess).toHaveTextContent("Invalid username");
  });

  it("Should handle wrong pass but right user name", () => {
    render(<Login />);
    const uname = screen.getByLabelText("uname");
    const pass = screen.getByLabelText("pwd");
    const submit = screen.getByTestId("submit");
    fireEvent.change(uname, { target: { value: "user" } });
    expect(uname.value).toBe("user");
    fireEvent.change(pass, { target: { value: "2" } });
    expect(pass.value).toBe("2");
    fireEvent.click(submit);
    const errorMess = screen.getByTestId("error-mess");
    expect(errorMess).toHaveTextContent("Invalid password");
  });

  it("Should handle right user name and password", () => {
    render(<Login />);
    const uname = screen.getByLabelText("uname");
    const pass = screen.getByLabelText("pwd");
    const submit = screen.getByTestId("submit");
    fireEvent.change(uname, { target: { value: "user" } });
    expect(uname.value).toBe("user");
    fireEvent.change(pass, { target: { value: "1" } });
    expect(pass.value).toBe("1");
    fireEvent.click(submit);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    setTimeout(function () {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    }, 1000);
  });
});

describe("Login Page with isLogged is true", () => {
  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockReturnValueOnce({ isLogged: true });
  });
  it("Should call Logout", () => {
    render(<Login />);
    const logout = screen.getByTestId("logout");
    fireEvent.click(logout);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it("Should call backToHome", () => {
    render(<Login />);
    const backHome = screen.getByTestId("back-home");
    fireEvent.click(backHome);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});

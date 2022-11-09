import { useReducer } from "react";
import { initialState, confirmReducer } from "./Slices/confirmSlice";
import ConfirmContext from "../store/ConfirmContext";

export const ConfirmContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(confirmReducer, initialState);

  return (
    <ConfirmContext.Provider value={[state, dispatch]}>
      {children}
    </ConfirmContext.Provider>
  );
};

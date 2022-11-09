import { useContext } from "react";
import ConfirmContext from "../store/ConfirmContext";
import { HIDE_CONFIRM, SHOW_CONFIRM } from "../redux/Slices/confirmSlice";

let resolveCallback;
export default function useConfirm() {
  const [confirmState, dispatch] = useContext(ConfirmContext);
  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };
  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  const confirm = (text) => {
    dispatch({
      type: SHOW_CONFIRM,
      payload: {
        text,
      },
    });
    return new Promise((res, _) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    dispatch({
      type: HIDE_CONFIRM,
    });
  };

  return { confirmState, confirm, onConfirm, onCancel };
}

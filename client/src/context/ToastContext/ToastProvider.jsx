import ToastContext from "./ToastContext";
import { useRef, useState } from "react";

const ToastProvider = ({children}) => {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = (message, type) => {
    if(timerRef.current){
      clearTimeout(timerRef.current);
    }
    setToast({message, type});

    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const value = {toast, showToast};

  return(
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
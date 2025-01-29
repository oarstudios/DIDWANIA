import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useNotify = () => {
  const notify = (arg, type) => {
    const config = {
      theme: "colored",
      autoClose: 2000, // Set auto-close duration to 2 seconds
    };

    if (type === "success") {
      toast.success(arg, config);
    } else if (type === "error") {
      toast.error(arg, config);
    }
  };

  return { notify };
};

export default useNotify;

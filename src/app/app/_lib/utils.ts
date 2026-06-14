import { Bounce, toast } from "react-toastify";
import ToastError from "../_components/toast-error";
import React from "react";

export const showAppError = (title: string, message: string) =>
  toast.error(React.createElement(ToastError, { title, message }), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    type: "error",
    transition: Bounce,
  });

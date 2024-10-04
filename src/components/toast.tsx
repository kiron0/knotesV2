"use client";

import CustomToastMessage from "@/components/custom-toast-message";
import toast, { ToastPosition } from "react-hot-toast";

export const notifySuccess = (
  title: string,
  message: string,
  position?: ToastPosition | undefined,
) => {
  toast.custom(
    () => (
      <CustomToastMessage
        title={title || "Success"}
        message={message}
        type="success"
      />
    ),
    {
      position: position ?? "top-center",
    },
  );
};

export const notifyError = (
  title: string,
  message: string,
  position?: ToastPosition | undefined,
) => {
  toast.custom(
    () => (
      <CustomToastMessage
        title={title || "Error"}
        message={message}
        type="error"
      />
    ),
    {
      position: position ?? "top-center",
    },
  );
};

export const notifyInfo = (
  title: string,
  message: string,
  position?: ToastPosition | undefined,
) => {
  toast.custom(
    () => (
      <CustomToastMessage
        title={title || "Info"}
        message={message}
        type="info"
      />
    ),
    {
      position: position ?? "top-center",
    },
  );
};

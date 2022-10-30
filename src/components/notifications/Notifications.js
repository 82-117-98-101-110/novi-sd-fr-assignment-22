import { toast } from "react-hot-toast";

export const successNotification = (message) =>
  toast.success(message, {
    style: {
      borderRadius: "70px",
      color: "#ffffff",
      width: "375px",
      height: "36px",
      background: "#01B574",
      fontFamily: "DMSans",
    },
    iconTheme: {
      primary: "#01B574",
      secondary: "#ffffff",
    },
  });

export const errorNotification = (message) =>
  toast.error(message, {
    style: {
      borderRadius: "70px",
      color: "#ffffff",
      width: "375px",
      height: "36px",
      background: "#E31A1A",
      fontFamily: "DMSans",
    },
    iconTheme: {
      primary: "#E31A1A",
      secondary: "#ffffff",
    },
  });

export const infoNotification = (message) =>
  toast(message, {
    style: {
      borderRadius: "70px",
      color: "#ffffff",
      width: "375px",
      height: "36px",
      background: "#4318FF",
      fontFamily: "DMSans",
    },
    iconTheme: {
      primary: "#4318FF",
      secondary: "#ffffff",
    },
  });

export const warningNotification = (message) =>
  toast.error(message, {
    style: {
      borderRadius: "70px",
      color: "#ffffff",
      width: "375px",
      height: "36px",
      background: "#FFB547",
      fontFamily: "DMSans",
    },
    iconTheme: {
      primary: "#FFB547",
      secondary: "#ffffff",
    },
  });

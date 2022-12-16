import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./toast.module.scss";

const ToastContext = createContext<
  | {
      isToastVisible: boolean;
      showToast: (message: string, duration?: number) => void;
    }
  | undefined
>(undefined);

const Toast = ({ message, isVisible }: { message: string; isVisible: boolean }) => {
  return isVisible ? (
    <div
      className={classNames(styles.toast, isVisible ? styles.toastVisible : "")}
      dangerouslySetInnerHTML={{
        __html: message,
      }}
    />
  ) : null;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  const { showToast } = context;
  return { showToast };
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = useCallback((message: string, duration = 2500) => {
    setIsToastVisible(true);
    setMessage(message);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        isToastVisible,
        showToast,
      }}
    >
      {children}
      <Toast message={message} isVisible={isToastVisible}></Toast>
    </ToastContext.Provider>
  );
};

"use client";

import React from "react";
import ReactModal from "react-modal";

const customStyles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: "40px 40px 40px 40px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#111827",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
    },
  },
};
export const Modal = ({ children, variant = "default", ...props }) => {
  const onKeyDown = (event) => {
    const currentActive = document.activeElement;

    if (event.key === "ArrowLeft") {
      currentActive?.previousElementSibling?.focus();
    } else if (event.key === "ArrowRight") {
      currentActive?.nextElementSibling?.focus();
    }
  };

  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={customStyles[variant]}
      {...props}
    >
      <div className={`flex flex-col w-full`}>
        <div
          tabIndex={-1}
          className={`focus:outline-none`}
          onKeyDown={onKeyDown}
        >
          {children}
        </div>
      </div>
    </ReactModal>
  );
};

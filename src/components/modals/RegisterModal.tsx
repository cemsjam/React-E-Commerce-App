import React from "react";

const RegisterModal = ({ close }: () => void) => {
  return (
    <div>
      <button onClick={close}>Close</button>
      RegisterModal
    </div>
  );
};

export default RegisterModal;

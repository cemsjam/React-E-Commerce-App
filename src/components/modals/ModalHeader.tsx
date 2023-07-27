import React from "react";
import { IoIosClose } from "react-icons/io";

import { useModalStore } from "@/stores/modalStore";

type ModalHeaderProps = {
  title?: string;
  closable?: boolean;
  closeAll?: boolean;
  classNames?: string;
};

const ModalHeader = ({ title, closable = true, closeAll = false, classNames }: ModalHeaderProps) => {
  const destroy = useModalStore((state) => state.destroy);
  const destroyAll = useModalStore((state) => state.destroyAll);

  return (
    <div className={`flex items-center justify-between ${classNames}`}>
      {title && <div className="modal-header font-bold">{title}</div>}
      {closable && (
        <button type="button" className="modal-body text-slate-500" onClick={closeAll ? destroyAll : destroy}>
          <IoIosClose size={20} />
        </button>
      )}
    </div>
  );
};

export default ModalHeader;

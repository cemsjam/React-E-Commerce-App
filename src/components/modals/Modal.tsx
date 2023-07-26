import { useModalStore } from "@/stores/modalStore";
import { modalRoutes } from "./ModalRoutes";

const Modal = () => {
  const { modals } = useModalStore();
  const destroy = useModalStore((state) => state.destroy);
  return (
    <>
      {modals.length > 0 && (
        <div className="fixed inset-0 z-[9999] bg-white/50 backdrop-blur-sm flex items-center justify-center">
          <div className="p-6 min-w-[20rem] shadow-2xl rounded-sm bg-white border border-gray-100">
            {modals.map((modalData) => {
              const activeModal = modalRoutes.find((route) => route.name === modalData.name);
              return activeModal ? <activeModal.element key={activeModal.name} close={destroy} /> : null;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

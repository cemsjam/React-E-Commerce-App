import { useModalStore } from "@/stores/modalStore";
import { modalRoutes } from "./ModalRoutes";
import { useClickOutside } from "@/hooks/useClickOutside";

const Modal = () => {
	const { modals } = useModalStore();
	const destroy = useModalStore((state) => state.destroy);
	const destroyAll = useModalStore((state) => state.destroyAll);
	const ref = useClickOutside(destroyAll) as React.RefObject<HTMLDivElement>;
	// const modalRef = useRef(null);
	// useClickOutside(modalRef, destroy);
	return (
		<>
			{modals.length > 0 && (
				<div
					ref={ref}
					className="fixed top-0 h-[100dvh] w-full overflow-auto z-[9999] bg-slate-200/50 backdrop-blur-sm flex items-center justify-center "
				>
					{modals.map((modalData) => {
						const activeModal = modalRoutes.find((route) => route.name === modalData.name);
						return (
							<div
								key={modalData.name}
								className="m-2 min-w-[20rem] shadow-2xl rounded-sm bg-white border border-gray-100 hidden last:block"
							>
								{activeModal ? <activeModal.element modalData={modalData?.data} /> : null}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default Modal;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactElement, useRef } from "react";

type typeModal = {
  title: string | ReactElement;
  children: ReactElement;
  checkOpen: boolean;
  onClose: (value: boolean) => void;
  closeModal: () => void;
};

export default function PreviewModal({
  title,
  children,
  checkOpen,
  onClose,
  closeModal,
}: typeModal) {
  // let [isOpen, setIsOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  function onMouseLeave() {
    closeModal();
  }

  return (
    <>
      <Transition appear show={checkOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                afterEnter={() => {
                  panelRef.current?.addEventListener(
                    "mouseleave",
                    onMouseLeave,
                  );
                }}
                afterLeave={() => {
                  panelRef.current?.removeEventListener(
                    "mouseleave",
                    onMouseLeave,
                  );
                }}
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-dark text-left align-middle shadow-xl transition-all">
                  <div ref={panelRef}>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{children}</p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

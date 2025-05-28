"use client";

import { useModalContext } from "@/app/contexts/modal";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";

export default function ModalLoading() {
  const { openModals } = useModalContext();

  return (
    <Modal isOpen={openModals["modalLoading"] ?? false} hideCloseButton={true} size="xs" className="h-[150px]">
      <ModalContent className="overflow-visible">
        <ModalBody className="justify-center">
          <Spinner color="warning" label="Loading..." />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

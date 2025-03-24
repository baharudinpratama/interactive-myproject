"use client";

import MyButton from "@/app/components/button";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";

export default function CloseModal() {
  const { openModals, closeModal, closeAllModals } = useModalContext();

  return (
    <Modal isOpen={openModals["closeModal"] ?? false} hideCloseButton={true} size="xs" className="w-[300px]">
      <ModalContent className="overflow-visible">
        {() => (
          <>
            <ModalBody className="px-[25px] py-[20px]">
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-[8px] self-stretch">
                    <div className="text-[16px] font-semibold">
                      Exit
                    </div>
                    <div className="flex">
                      <Icon icon="solar:info-circle-bold" height={16} style={{ color: "var(--yellow)" }} />
                    </div>
                  </div>

                  <div className="text-grey-lighter text-base font-normal">
                    Are you sure want to exit?
                  </div>
                </div>

                <div className="flex w-full justify-center items-center gap-[12px]">
                  <MyButton
                    variant="bordered"
                    color="yellow"
                    children="Cancel"
                    onPress={() => { closeModal("closeModal") }}
                    className="w-full px-[24px]"
                  />
                  <MyButton
                    color="yellow"
                    children="Continue"
                    onPress={() => { closeAllModals() }}
                    className="w-full px-[24px]"
                  />
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

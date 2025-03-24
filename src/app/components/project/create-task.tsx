import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Divider } from "@heroui/divider";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

export default function CreateTask() {
  const { openModals, openModal, closeModal } = useModalContext();
  const [taskNameInput, setTaskNameInput] = useState("");

  return (
    <Modal isOpen={openModals["createTask"] ?? false} hideCloseButton={true}>
      <ModalContent>
        <ModalHeader className="px-[25px] py-[20px]">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-[8px] self-stretch">
              <div className="flex flex-1 items-center gap-[8px]">
                <div className="text-[16px] font-semibold">
                  Create Task
                </div>
                <div className="flex">
                  <Icon icon="solar:info-circle-bold" height={16} style={{ color: "var(--yellow)" }} />
                </div>
              </div>

              <button type="button" onClick={() => openModal("closeModal")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M9.9583 1.00004L1 9.95833M0.999962 1L9.95826 9.9583" stroke="#090B0E" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="text-grey-lighter text-base font-normal">
              Create and assign tasks to streamline your workflow.
            </div>
          </div>
        </ModalHeader>

        <Divider />

        <ModalBody className="px-[25px] py-[20px]">
          <div className="flex flex-col gap-[12px]">
            <MyInput
              label="Name"
              placeholder="e. g. Prospect, New Lead."
              value={taskNameInput}
              onValueChange={setTaskNameInput}
            />

            <div className="flex justify-end items-center gap-[12px]">
              <MyButton
                color="yellow"
                children="Create"
                onPress={() => { closeModal("createTask"); openModal("taskDetail") }}
                className="px-[24px]"
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

"use client";

import MyButton from "@/app/[locale]/components/button";
import MyInput from "@/app/[locale]/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { useWorkspaceContext } from "@/app/contexts/workspace";
import { Icon } from "@iconify-icon/react";
import { Divider, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function RenameProject() {
  const params = useParams();
  const projectId = params.id as string;
  const { getProjectById, updateProject } = useWorkspaceContext();
  const { openModals, closeAllModals } = useModalContext();
  const [projectNameInput, setProjectNameInput] = useState(getProjectById(projectId)?.name);

  const handleRename = () => {

  }

  return (
    <Modal isOpen={openModals["renameProject"]} hideCloseButton={true} size="lg">
      <ModalContent className="overflow-visible">
        {() => (
          <>
            <ModalHeader>
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-[8px] self-stretch">
                  <div className="flex flex-1 items-center gap-[8px]">
                    <div className="text-[16px] font-semibold">
                      Edit
                    </div>
                    <div className="flex">
                      <Icon icon="solar:info-circle-bold" size={16} style={{ color: "var(--yellow)" }} />
                    </div>
                  </div>

                  <button type="button" onClick={() => closeAllModals()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M9.9583 1.00004L1 9.95833M0.999962 1L9.95826 9.9583" stroke="#090B0E" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="text-grey-lighter text-base font-normal">
                  Update the name to better reflect the purpose or content.
                </div>
              </div>
            </ModalHeader>

            <Divider />

            <ModalBody className="px-[25px] py-[20px]">
              <div className="flex flex-col gap-[12px]">
                <MyInput
                  label="Name"
                  placeholder="Project Name"
                  value={projectNameInput}
                  onValueChange={setProjectNameInput}
                />

                <div className="flex justify-end items-center gap-[12px]">
                  <MyButton
                    color="yellow"
                    children="Done"
                    onPress={handleRename}
                    className="px-[24px]"
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

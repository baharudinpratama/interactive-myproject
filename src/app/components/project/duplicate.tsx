"use client";

import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Modal, ModalBody, ModalContent, ModalHeader, Radio, RadioGroup } from "@nextui-org/react";

export default function DuplicateProject() {
  const { openModals, closeModal, closeAllModals, openModal } = useModalContext();

  return (
    <Modal isOpen={openModals["duplicateProject"]} hideCloseButton={true} size="lg">
      <ModalContent className="overflow-visible">
        {() => (
          <>
            <ModalHeader className="px-[25px] py-[20px]">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-[8px] self-stretch">
                  <div className="flex flex-1 items-center gap-[8px]">
                    <div className="text-[16px] font-semibold">
                      Duplicate Project
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
                  Create an exact copy of your project to reuse templates or streamline similar workflows.
                </div>
              </div>
            </ModalHeader>

            <ModalBody className="px-[25px] py-[20px]">
              <div className="flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[6px]">
                  New Project Name

                  <div className="flex items-center gap-[12px]">
                    <div role="button" className="flex size-[46px] p-[15px] justify-center items-center rounded-[8px] border border-grey-light-active bg-white-alt-active">
                      <Icon icon="solar:alt-arrow-down-outline" size={20} className="text-grey-light-active" />
                    </div>

                    <MyInput
                      placeholder="Enter project name"
                    />
                  </div>
                </div>

                <MyInput
                  label="Where should this Project be created?"
                  placeholder="Enter project name"
                />

                <RadioGroup
                  defaultValue="everything"
                  label="What would you like to copy?"
                  classNames={{ base: "gap-[6px] ", wrapper: "gap-0", label: "text-base text-grey-dark-active" }}
                >
                  <Radio
                    key="everything"
                    value="everything"
                    disableAnimation={true}
                    classNames={{ base: "m-0 px-[10px] py-[8px]", wrapper: "w-[16px] h-[16px] group-data-[selected=true]:border-yellow group-data-[selected=true]:bg-yellow-light", control: "group-data-[selected=true]:bg-yellow" }}
                  >
                    <span className="text-base">Everything</span>
                  </Radio>

                  <Radio
                    key="task-only"
                    value="task-only"
                    disableAnimation={true}
                    classNames={{ base: "m-0 px-[10px] py-[8px]", wrapper: "w-[16px] h-[16px] group-data-[selected=true]:border-yellow group-data-[selected=true]:bg-yellow-light", control: "group-data-[selected=true]:bg-yellow" }}
                  >
                    <span className="text-base">Task only</span>
                  </Radio>

                  <Radio
                    key="customize"
                    value="customize"
                    disableAnimation={true}
                    classNames={{ base: "m-0 px-[10px] py-[8px]", wrapper: "w-[16px] h-[16px] group-data-[selected=true]:border-yellow group-data-[selected=true]:bg-yellow-light", control: "group-data-[selected=true]:bg-yellow" }}
                  >
                    <span className="text-base">Customize</span>
                  </Radio>
                </RadioGroup>

                <RadioGroup
                  defaultValue="no"
                  label="Do you want to include archived task?"
                  classNames={{ base: "gap-[6px] ", wrapper: "gap-0", label: "text-base text-grey-dark-active" }}
                >
                  <Radio
                    key="no"
                    value="no"
                    disableAnimation={true}
                    classNames={{ base: "m-0 px-[10px] py-[8px]", wrapper: "w-[16px] h-[16px] group-data-[selected=true]:border-yellow group-data-[selected=true]:bg-yellow-light", control: "group-data-[selected=true]:bg-yellow" }}
                  >
                    <span className="text-base">No</span>
                  </Radio>

                  <Radio
                    key="yes-archive"
                    value="yes-archive"
                    disableAnimation={true}
                    classNames={{ base: "m-0 px-[10px] py-[8px]", wrapper: "w-[16px] h-[16px] group-data-[selected=true]:border-yellow group-data-[selected=true]:bg-yellow-light", control: "group-data-[selected=true]:bg-yellow" }}
                  >
                    <span className="text-base">Yes, include archived task</span>
                  </Radio>

                  <Radio
                    key="yes-unarchive"
                    value="yes-unarchive"
                    disableAnimation={true}
                    classNames={{ base: "m-0 px-[10px] py-[8px]", wrapper: "w-[16px] h-[16px] group-data-[selected=true]:border-yellow group-data-[selected=true]:bg-yellow-light", control: "group-data-[selected=true]:bg-yellow" }}
                  >
                    <span className="text-base">Yes, include and unarchive task</span>
                  </Radio>
                </RadioGroup>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

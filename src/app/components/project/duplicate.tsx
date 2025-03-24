"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Radio, RadioGroup } from "@heroui/radio";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";
import { useState } from "react";

interface CustomCheckBox {
  value: string;
  label: string;
}

export const CustomRadio = ({ item }: { item: { value: string; label: string; } }) => {
  return (
    <Radio
      value={item.value}
      disableAnimation={true}
      classNames={{
        base: clsx(
          "max-w-full m-0 px-[10px] py-[8px] rounded-[8px]",
          "data-[hover=true]:bg-yellow-light-active",
        ),
        wrapper: "w-[16px] h-[16px] data-[hover=true]:bg-yellow-light-active group-data-[selected=true]:border-yellow group-data-[selected=true]:bg-yellow-light",
        control: "group-data-[selected=true]:bg-yellow",
      }}
    >
      <span className="text-base">{item.label}</span>
    </Radio>
  )
}

export const CustomCheckbox = ({
  view
}: {
  view: CustomCheckBox
}) => {
  return (
    <Checkbox
      size="sm"
      value={view.value}
      disableAnimation={true}
      classNames={{
        base: clsx(
          "inline-flex w-full max-w-md m-0",
          "cursor-pointer rounded-[8px] gap-[8px] px-[10px] py-[8px]",
          "data-[selected=true]:border-yellow",
        ),
        wrapper: clsx(
          "mr-0 rtl:ml-0",
          "text-white after:text-white",
          "after:bg-yellow",
          "rounded-[4px] before:rounded-[4px] after:rounded-[4px]",
          "group-data-[focus-visible=true]:ring-yellow",
        ),
        label: clsx("w-full", "text-[12px]"),
      }}
    >
      {view.label}
    </Checkbox>
  );
}

export default function DuplicateProject() {
  const { openModals, closeModal, closeAllModals, openModal } = useModalContext();
  const [whatToCopy, setWhatToCopy] = useState("everything");
  const [fetchedToCopy] = useState([
    { value: "due-dates", label: "Due dates" },
    { value: "subtasks", label: "Subtasks" },
    { value: "tags", label: "Tags" },
    { value: "attachments", label: "Attachments" },
    { value: "task-type", label: "Task type" },
    { value: "custom-fields", label: "Custom fields" },
    { value: "relationships", label: "Relationships" },
    { value: "assignees", label: "Assignees" },
    { value: "checklists", label: "Checklists" },
    { value: "dependencies", label: "Dependencies" },
    { value: "watchers", label: "Watchers" },
    { value: "task-statuses", label: "Task statuses" },
    { value: "automations", label: "Automations" },
    { value: "views", label: "Views" },
    { value: "recurring-settings", label: "Recurring settings" }
  ]);
  const [selectedCustomsToCopy, setSelectedCustomsToCopy] = useState(
    ["due-dates", "subtasks", "tags", "attachments", "task-type", "custom-fields",
      "relationships", "assignees", "checklists",
    ]
  );

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

            <Divider />

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
                  defaultValue={whatToCopy}
                  value={whatToCopy}
                  onValueChange={setWhatToCopy}
                  label="What would you like to copy?"
                  classNames={{ base: "gap-[6px] ", wrapper: "gap-0", label: "text-base text-grey-dark-active" }}
                >
                  <CustomRadio
                    item={{
                      value: "everything",
                      label: "Everything",
                    }}
                  />
                  <CustomRadio
                    item={{
                      value: "task-only",
                      label: "Task only",
                    }}
                  />
                  <CustomRadio
                    item={{
                      value: "customize",
                      label: "Customize",
                    }}
                  />
                  {whatToCopy === "customize" && (
                    <div className="flex">
                      <CheckboxGroup
                        label="Customize what will be duplicated"
                        value={selectedCustomsToCopy}
                        onValueChange={setSelectedCustomsToCopy}
                        classNames={{
                          base: "w-full rounded-[8px] border gap-0",
                          label: "px-[10px] py-[5px] text-base text-[12px] text-[grey-dark-active]",
                        }}
                      >
                        <div className="grid grid-cols-3">
                          {fetchedToCopy.map((item, index) => {
                            return (
                              <CustomCheckbox
                                key={`customs-to-copy-${index}`}
                                view={{
                                  value: `${item.value}`,
                                  label: `${item.label}`,
                                }}
                              />
                            );
                          })}
                        </div>
                      </CheckboxGroup>
                    </div>
                  )}
                </RadioGroup>

                <RadioGroup
                  defaultValue="no"
                  label="Do you want to include archived task?"
                  classNames={{ base: "gap-[6px] ", wrapper: "gap-0", label: "text-base text-grey-dark-active" }}
                >
                  <CustomRadio
                    item={{
                      value: "no",
                      label: "No",
                    }}
                  />
                  <CustomRadio
                    item={{
                      value: "yes-archive",
                      label: "Yes, include archived task",
                    }}
                  />
                  <CustomRadio
                    item={{
                      value: "yes-unarchive",
                      label: "Yes, include and unarchive task",
                    }}
                  />
                </RadioGroup>

                <div className="flex justify-end items-center">
                  <MyButton
                    color="yellow"
                    children="Continue"
                    onPress={() => { closeAllModals() }}
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

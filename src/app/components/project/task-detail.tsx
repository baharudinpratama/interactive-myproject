import MyButton from "@/app/components/button";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import {
  Accordion, AccordionItem, Avatar, Calendar, cn, Divider, Input,
  Modal, ModalBody, ModalContent, ModalHeader,
  Popover, PopoverContent, PopoverTrigger, Textarea
} from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";

export default function TaskDetail() {
  const { openModals, openModal, closeModal } = useModalContext();
  const [taskName, setTaskName] = useState("Survey");
  const [editMode, setEditMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("to-do");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>(["InterActive"]);
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["v1"]);
  const [inputDescription, setInputDescription] = useState("");
  const handleSelectAssignees = (assignee: string) => {
    setSelectedAssignees((prevAssignees) =>
      prevAssignees.includes(assignee)
        ? prevAssignees.filter((prevAssignee) => prevAssignee !== assignee)
        : [...prevAssignees, assignee]
    );
  }
  const handleSelectTags = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((prevTags) => prevTags !== tag)
        : [...prev, tag]
    );
  }

  return (
    <Modal isOpen={openModals["taskDetail"] ?? false} hideCloseButton={true} size="3xl">
      <ModalContent>
        <ModalHeader className="px-[16px] py-[12px]">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-[8px] self-stretch">
              <div className="flex flex-1 items-center gap-[8px]">
                <Avatar
                  name="R"
                  classNames={{ base: "w-[20px] h-[20px] rounded-[3px] bg-yellow-active", name: "text-base text-[12px] text-yellow-light-active" }}
                />
                RnD
                <Icon icon="solar:slash-linear" height={20} style={{ color: "var(--grey-lighter)" }} /> <Icon icon="solar:essentional-list-linear" />
                Project 1
              </div>
              <div className="flex w-[28px] items-center">
                <Icon icon="solar:menu-dots-bold" height={20} />
              </div>
              <Divider orientation="vertical" />
              <div className="flex w-[28px] justify-end items-center">
                <button type="button" onClick={() => openModal("closeModal")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 11 11" fill="none">
                    <path d="M9.9583 1.00004L1 9.95833M0.999962 1L9.95826 9.9583" stroke="#090B0E" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ModalHeader>

        <Divider />

        <ModalBody className="p-0">
          <div className="flex flex-1">
            <div className="flex p-[16px] flex-col justify-start flex-1">
              <div className="flex flex-col border-b border-white-active">
                <div className="flex justify-between items-center self-stretch font-semibold">
                  <div className="flex items-center" onClick={() => setEditMode(true)}>
                    {editMode && (
                      <Input
                        value={taskName}
                        onValueChange={setTaskName}
                        fullWidth={false}
                        classNames={{
                          input: "text-base !text-yellow-500 font-bold",
                          inputWrapper: "min-h-max h-auto bg-yellow-light-active data-[hover=true]:bg-yellow-light-active group-data-[focus=true]:bg-yellow-light-active"
                        }}
                      />
                    )}
                    {!editMode && (
                      taskName
                    )}
                  </div>
                  <Icon icon="solar:pen-2-linear" height={17} onClick={() => setEditMode(false)} />
                </div>
                <div className="grid grid-cols-2 pb-[16px] pt-[8px] gap-x-[16px] gap-y-[12px]">
                  <Popover placement="bottom-start">
                    <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                      <div className="flex items-center gap-[20px] cursor-pointer">
                        <div className="flex w-[88px] items-center gap-[8px]">
                          <Icon icon="solar:record-circle-original-linear" height={16} />
                          Status
                        </div>
                        <div className="flex text-grey-lighter">
                          Empty
                        </div>
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[248px] p-0 rounded-[8px] border-white-active">
                      <div className="flex flex-col self-stretch">
                        <div className="flex p-[8px]">
                          <Input
                            placeholder="Search status ..."
                            classNames={{
                              base: [
                                "text-base",
                                "bg-transparent",
                                "group-data-[has-label=true]:mt-[27px]",
                                "opacity-100",
                              ],
                              label: [
                                "text-grey-dark-active",
                                "group-data-[invalid=true]:!text-grey-dark-active",
                                "group-data-[disabled=true]:!text-grey-light-active",
                              ],
                              input: [
                                "text-grey-dark-active",
                                "placeholder:text-base placeholder:text-grey-light-active",
                                "group-data-[invalid=true]:!text-grey-dark-active",
                                "group-data-[disabled=true]:!text-grey-light-active",
                              ],
                              inputWrapper: [
                                "p-[8px]",
                                "bg-transparent",
                                "rounded-[8px]",
                                "border border-white-active",
                                "group-data-[hover=true]:bg-transparent",
                                "group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-grey-dark-active",
                                "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-transparent",
                                "group-data-[invalid=true]:!border-red-active group-data-[invalid=true]:!bg-red-light-hover",
                                "group-data-[disabled=true]:!bg-white-light-active",
                                "shadow-none",
                              ],
                              errorMessage: [
                                "text-[12px] text-red-active",
                              ],
                              helperWrapper: [
                                "p-0 pt-[2px]",
                              ],
                            }}
                          />
                        </div>
                        <Divider />
                        <ul>
                          <li key="to-do" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-light-active last:rounded-b-[8px]" onClick={() => setSelectedStatus("to-do")}>
                            <div className="flex items-center gap-[8px]">
                              <Icon icon="solar:record-circle-filled-linear" height={16} style={{ color: "#B2BBC6" }} />
                              <div className="text-base">
                                TO DO
                              </div>
                            </div>
                            {selectedStatus === "to-do" ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#B2BBC6" stroke-width="1.25" />
                              </svg>
                            )}
                          </li>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover placement="bottom-start">
                    <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                      <div className="flex items-center gap-[20px] cursor-pointer">
                        <div className="flex w-[88px] items-center gap-[8px]">
                          <Icon icon="lineicons:user-4" height={16} />
                          Assignees
                        </div>
                        <div className="flex text-grey-lighter">
                          Empty
                        </div>
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[248px] p-0 rounded-[8px] border-white-active">
                      <div className="flex flex-col self-stretch">
                        <div className="flex p-[8px]">
                          <Input
                            placeholder="Search user ..."
                            classNames={{
                              base: [
                                "text-base",
                                "bg-transparent",
                                "group-data-[has-label=true]:mt-[27px]",
                                "opacity-100",
                              ],
                              label: [
                                "text-grey-dark-active",
                                "group-data-[invalid=true]:!text-grey-dark-active",
                                "group-data-[disabled=true]:!text-grey-light-active",
                              ],
                              input: [
                                "text-grey-dark-active",
                                "placeholder:text-base placeholder:text-grey-light-active",
                                "group-data-[invalid=true]:!text-grey-dark-active",
                                "group-data-[disabled=true]:!text-grey-light-active",
                              ],
                              inputWrapper: [
                                "p-[8px]",
                                "bg-transparent",
                                "rounded-[8px]",
                                "border border-white-active",
                                "group-data-[hover=true]:bg-transparent",
                                "group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-grey-dark-active",
                                "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-transparent",
                                "group-data-[invalid=true]:!border-red-active group-data-[invalid=true]:!bg-red-light-hover",
                                "group-data-[disabled=true]:!bg-white-light-active",
                                "shadow-none",
                              ],
                              errorMessage: [
                                "text-[12px] text-red-active",
                              ],
                              helperWrapper: [
                                "p-0 pt-[2px]",
                              ],
                            }}
                          />
                        </div>
                        <Divider />
                        <ul>
                          <li key="InterActive" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-100 last:rounded-b-[8px]" onClick={() => handleSelectAssignees("InterActive")}>
                            <div className="flex items-center gap-[8px]">
                              <Avatar
                                name="I"
                                classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                              />
                              <div className="text-base">
                                InterActive
                              </div>
                            </div>
                            {selectedAssignees.includes("InterActive") ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#B2BBC6" stroke-width="1.25" />
                              </svg>
                            )}
                          </li>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover placement="bottom-start">
                    <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                      <div className="flex items-center gap-[20px] cursor-pointer">
                        <div className="flex w-[88px] items-center gap-[8px]">
                          <Icon icon="solar:calendar-linear" height={16} />
                          Due Date
                        </div>
                        <div className="flex text-grey-lighter">
                          Empty
                        </div>
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="p-0 rounded-[8px]">
                      <Calendar></Calendar>
                    </PopoverContent>
                  </Popover>
                  <Popover placement="bottom-start">
                    <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                      <div className="flex items-center gap-[20px] cursor-pointer">
                        <div className="flex w-[88px] items-center gap-[8px]">
                          <Icon icon="solar:flag-linear" height={16} />
                          Priority
                        </div>
                        <div className="flex text-grey-lighter">
                          Empty
                        </div>
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[200px] p-0 rounded-[8px] border-white-active">
                      <div className="flex flex-col self-stretch">
                        <ul>
                          <li key="high" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-100 first:rounded-t-[8px] last:rounded-b-[8px]" onClick={() => setSelectedPriority("high")}>
                            <div className="flex items-center gap-[8px]">
                              <Icon icon="solar:flag-bold" height={16} style={{ color: "#E20000" }} />
                              <div className="text-base">
                                High
                              </div>
                            </div>
                            {selectedPriority === "high" && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                              </svg>
                            )}
                          </li>
                          <li key="normal" className="flex h-[35px] justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-100 first:rounded-t-[8px] last:rounded-b-[8px]" onClick={() => setSelectedPriority("normal")}>
                            <div className="flex items-center gap-[8px]">
                              <Icon icon="solar:flag-bold" height={16} style={{ color: "#F96E15" }} />
                              <div className="text-base">
                                Normal
                              </div>
                            </div>
                            {selectedPriority === "normal" && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                              </svg>
                            )}
                          </li>
                          <li key="low" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-100 first:rounded-t-[8px] last:rounded-b-[8px]" onClick={() => setSelectedPriority("low")}>
                            <div className="flex items-center gap-[8px]">
                              <Icon icon="solar:flag-bold" height={16} style={{ color: "#B2BBC6" }} />
                              <div className="text-base">
                                Low
                              </div>
                            </div>
                            {selectedPriority === "low" && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                              </svg>
                            )}
                          </li>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover placement="bottom-start">
                    <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                      <div className="flex items-center gap-[20px] cursor-pointer">
                        <div className="flex w-[88px] items-center gap-[8px]">
                          <Icon icon="solar:tag-outline" height={16} />
                          Tags
                        </div>
                        <div className="flex text-grey-lighter">
                          Empty
                        </div>
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[248px] p-0 rounded-[8px] border-white-active">
                      <div className="flex flex-col self-stretch">
                        <div className="flex p-[8px]">
                          <Input
                            placeholder="Search tags ..."
                            classNames={{
                              base: [
                                "text-base",
                                "bg-transparent",
                                "group-data-[has-label=true]:mt-[27px]",
                                "opacity-100",
                              ],
                              label: [
                                "text-grey-dark-active",
                                "group-data-[invalid=true]:!text-grey-dark-active",
                                "group-data-[disabled=true]:!text-grey-light-active",
                              ],
                              input: [
                                "text-grey-dark-active",
                                "placeholder:text-base placeholder:text-grey-light-active",
                                "group-data-[invalid=true]:!text-grey-dark-active",
                                "group-data-[disabled=true]:!text-grey-light-active",
                              ],
                              inputWrapper: [
                                "p-[8px]",
                                "bg-transparent",
                                "rounded-[8px]",
                                "border border-white-active",
                                "group-data-[hover=true]:bg-transparent",
                                "group-data-[focus=true]:bg-transparent group-data-[focus=true]:border-grey-dark-active",
                                "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-transparent",
                                "group-data-[invalid=true]:!border-red-active group-data-[invalid=true]:!bg-red-light-hover",
                                "group-data-[disabled=true]:!bg-white-light-active",
                                "shadow-none",
                              ],
                              errorMessage: [
                                "text-[12px] text-red-active",
                              ],
                              helperWrapper: [
                                "p-0 pt-[2px]",
                              ],
                            }}
                          />
                        </div>
                        <Divider />
                        <ul>
                          <li key="v1" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-light-active last:rounded-b-[8px]" onClick={() => handleSelectTags("v1")}>
                            <div className="flex items-center gap-[8px]">
                              <Icon icon="solar:tag-linear" height={16} />
                              <div className="text-base">
                                V 1.0
                              </div>
                            </div>
                            {selectedTags.includes("v1") && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                              </svg>
                            )}
                          </li>
                          <li key="v2" className="flex justify-between items-center px-[10px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow-light-active last:rounded-b-[8px]" onClick={() => handleSelectTags("v2")}>
                            <div className="flex items-center gap-[8px]">
                              <Icon icon="solar:tag-linear" height={16} />
                              <div className="text-base">
                                V 2.0
                              </div>
                            </div>
                            {selectedTags.includes("v2") && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FEC031" />
                              </svg>
                            )}
                          </li>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex py-[16px] border-b border-white-active">
                <Textarea placeholder="Write description" value={inputDescription} onValueChange={setInputDescription} />
              </div>
              <div className="flex h-[30px]"></div>
              <div className="flex flex-col">
                <div className="flex items-center flex-1 border-b border-white-active">
                  <div
                    className={clsx("flex px-[16px] py-[5px] items-center gap-[8px] self-stretch cursor-pointer font-semibold border-b-[1.5px] border-yellow-500", {
                    })}>
                    <div className="flex flex-nowrap min-w-max items-center self-stretch">
                      Detail
                    </div>
                  </div>
                  <div
                    className={clsx("flex px-[16px] py-[5px] items-center gap-[8px] self-stretch cursor-pointer", {
                    })}>
                    <div className="flex flex-nowrap min-w-max items-center self-stretch text-grey-lighter">
                      Subtask
                    </div>
                  </div>
                </div>
                <Accordion showDivider={false} className="px-0">
                  <AccordionItem
                    key={1}
                    aria-label="Custom Field"
                    title="Custom Field"
                    classNames={{ base: cn("p-[16px] border-b border-white-active"), trigger: cn("p-0"), title: cn("text-base"), }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, dolorem!
                  </AccordionItem>
                  <AccordionItem
                    key={2}
                    aria-label="Attachment"
                    title="Attachment"
                    classNames={{ base: cn("p-[16px] border-b border-white-active"), trigger: cn("p-0"), title: cn("text-base"), }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, numquam.
                  </AccordionItem>
                  <AccordionItem
                    key={3}
                    aria-label="Link"
                    title="Link"
                    classNames={{ base: cn("p-[16px] border-b border-white-active"), trigger: cn("p-0"), title: cn("text-base"), }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, distinctio?
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="flex pt-[16px] justify-end items-center">
                <MyButton
                  color="yellow"
                  children="Save"
                  onPress={() => { closeModal("createTask"); openModal("taskDetail") }}
                  className="px-[24px]"
                />
              </div>
            </div>
            <div className="flex w-[338px] flex-col border-x border-white-active">
              <div className="flex flex-col flex-1">
                <div className="flex p-[16px] self-stretch font-semibold">
                  Activity
                </div>
                <div className="flex h-full flex-1 bg-white-normal">
                  <ul className="flex flex-col px-[16px] py-[12px] gap-[8px] flex-1">
                    <li className="flex items-center gap-[8px] text-grey-lighter">
                      <Icon icon="solar:dot-bold" height={6} style={{ color: "var(--grey-lighter)" }} />
                      <div className="flex flex-1">You created this task.</div>
                      2 min
                    </li>
                    <li className="flex items-center gap-[8px] text-grey-lighter">
                      <Icon icon="solar:dot-bold" height={6} style={{ color: "var(--grey-lighter)" }} />
                      <div className="flex flex-1">You updated this task.</div>
                      1 min
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex w-[52px] p-[8px] h-full flex-col items-center gap-[8px]">
              <div className="flex flex-col items-center">
                <div className="flex p-[8px] rounded-[8px] bg-yellow-100">
                  <Icon icon="solar:history-linear" height={18} style={{ color: "var(--yellow-600)" }} />
                </div>
                <div className="text-base !text-[12px]">
                  Act
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex p-[8px]">
                  <Icon icon="mynaui:chat-messages" height={18} style={{ color: "var(--yellow-600)" }} />
                </div>
                <div className="text-base !text-[12px]">
                  Chat
                </div>
              </div>
              <Divider />
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M11 6.00004L6 6.00004M6 6.00004L1 6.00004M6 6.00004L6 1M6 6.00004L6 11" stroke="#B2BBC6" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

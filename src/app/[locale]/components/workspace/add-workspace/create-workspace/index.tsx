"use client";

import MyButton from "@/app/[locale]/components/button";
import MyInput from "@/app/[locale]/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { fetchedUsers } from "@/app/data";
import { Icon } from "@iconify-icon/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Avatar, DatePicker, Divider, Modal, ModalBody, ModalContent, ModalHeader, Switch } from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";

export default function CreateWorkspace() {
  const { openModals, closeModal, closeAllModals, openModal } = useModalContext();
  const [nameInput, setNameInput] = useState("");

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPrivate, setPrivate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(fetchedUsers);

  const filteredUsers = users.filter(
    (user) => !user.added && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addedUsers = users.filter(
    (user) => user.added
  )

  const addUser = (userToAdd: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === userToAdd.name ? { ...user, added: true } : user
      )
    );
  };

  const deleteUser = (userToDelete: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === userToDelete.name ? { ...user, added: false } : user
      )
    );
  };

  const [useDueDate, setUseDueDate] = useState(false);
  const [issueDate, setIssueDate] = useState(today(getLocalTimeZone()));
  const [dueDate, setDueDate] = useState("");

  return (
    <Modal isOpen={openModals["createWorkspace"] ?? false} hideCloseButton={true}>
      <ModalContent className="overflow-visible">
        {() => (
          <>
            <ModalHeader className="px-[25px] py-[20px]">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-[8px] self-stretch">
                  <div className="flex flex-1 items-center gap-[8px]">
                    <div className="text-[16px] font-semibold">
                      Create Workspace
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
                  A workspace can represent teams, divisions, projects, and more.
                </div>
              </div>
            </ModalHeader>

            <Divider />

            <ModalBody className="px-[25px] py-[20px]">
              <div className="flex flex-col gap-[12px] self-stretch">
                <MyInput
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="e. g. Marketing, HR"
                  value={nameInput}
                  onValueChange={setNameInput}
                  maxLength={254}
                />

                <div className="flex flex-col self-stretch">
                  <div className="flex items-center gap-[8px] self-stretch">
                    <div className="flex flex-col flex-1">
                      <div className="">Make Private</div>
                      <span className="text-grey-lighter">
                        Only you and invited members have access
                      </span>
                    </div>

                    <div className="items-center">
                      <Switch
                        checked={isPrivate}
                        isSelected={isPrivate}
                        onChange={() => { setPrivate((prev) => !prev); isDropdownOpen && setDropdownOpen(false) }}
                        classNames={{
                          wrapper: "px-[2px] py-[4px] w-[28px] h-[16px] group-data-[focus-visible=true]:ring-yellow group-data-[selected=true]:bg-yellow",
                          thumb: [
                            "w-[12px] h-[12px]",
                            "group-data-[hover=true]:border-yellow",
                            "group-data-[pressed=true]:w-[12px]",
                            "group-data-[selected=true]:ml-[12px] rtl:group-data-[selected=true]:mr-[12px] group-data-[selected]:group-data-[pressed]:ml-[12px]",
                          ],
                        }}
                      />
                    </div>
                  </div>

                  <div className={clsx("transition-all duration-300", {
                    "max-h-[1000px] opacity-100": isPrivate,
                    "max-h-0 opacity-0": !isPrivate,
                  })}>
                    <div className="flex flex-col self-stretch border rounded-[8px]">
                      <div className="flex relative p-[8px] items-center gap-[8px] bg-white-hover rounded-t-[8px]">
                        <div className="flex flex-1">
                          Share only with:
                        </div>

                        <button type="button" className="appearance-none relative" onClick={() => setDropdownOpen((prev) => !prev)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                            <circle cx="10.9584" cy="8.4585" r="2.5" stroke="#090B0E" />
                            <circle cx="10.9583" cy="10.9583" r="8.33333" stroke="#090B0E" strokeLinecap="round" strokeDasharray="2.5 2.5" />
                            <path d="M15.9327 17.6252C15.8 15.2156 15.0623 13.4585 10.9583 13.4585C6.85438 13.4585 6.11663 15.2156 5.98401 17.6252" stroke="#090B0E" strokeLinecap="round" />
                          </svg>
                          <div className="absolute right-0 bottom-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <g clipPath="url(#clip0_2845_2044)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.45825 9.2085C3.69049 9.2085 2.8066 9.2085 2.25743 8.65932C1.70825 8.11015 1.70825 7.22626 1.70825 5.4585C1.70825 3.69073 1.70825 2.80685 2.25743 2.25767C2.8066 1.7085 3.69049 1.7085 5.45825 1.7085C7.22602 1.7085 8.1099 1.7085 8.65908 2.25767C9.20825 2.80685 9.20825 3.69073 9.20825 5.4585C9.20825 7.22626 9.20825 8.11015 8.65908 8.65932C8.1099 9.2085 7.22602 9.2085 5.45825 9.2085ZM5.45825 4.05225C5.61358 4.05225 5.7395 4.17817 5.7395 4.3335V5.17726H6.58325C6.73858 5.17726 6.8645 5.30318 6.8645 5.45851C6.8645 5.61384 6.73858 5.73976 6.58325 5.73976H5.7395L5.7395 6.5835C5.7395 6.73883 5.61358 6.86475 5.45825 6.86475C5.30292 6.86475 5.177 6.73883 5.177 6.5835V5.73976H4.33325C4.17792 5.73976 4.052 5.61384 4.052 5.45851C4.052 5.30318 4.17792 5.17726 4.33325 5.17726H5.177L5.177 4.3335C5.177 4.17817 5.30292 4.05225 5.45825 4.05225Z" fill="#090B0E" />
                                <path d="M5.7395 5.17726H5.3895V5.52726H5.7395V5.17726ZM5.7395 5.73976V5.38976H5.3895V5.73976L5.7395 5.73976ZM5.7395 6.5835H5.3895H5.7395ZM5.177 5.73976H5.527V5.38976H5.177V5.73976ZM4.052 5.45851H4.402H4.052ZM5.177 5.17726V5.52726H5.527L5.527 5.17726L5.177 5.17726ZM5.177 4.3335L5.527 4.3335V4.3335H5.177ZM5.45825 8.8585C4.56447 8.8585 3.92935 8.85775 3.4475 8.79297C2.97573 8.72954 2.70363 8.61055 2.50491 8.41183L2.00994 8.90681C2.3604 9.25727 2.80483 9.41286 3.35423 9.48673C3.89356 9.55924 4.58426 9.5585 5.45825 9.5585V8.8585ZM1.35825 5.4585C1.35825 6.33249 1.35751 7.02319 1.43002 7.56252C1.50388 8.11192 1.65948 8.55635 2.00994 8.90681L2.50491 8.41183C2.3062 8.21312 2.18721 7.94102 2.12378 7.46924C2.059 6.9874 2.05825 6.35227 2.05825 5.4585H1.35825ZM8.85825 5.4585C8.85825 6.35227 8.85751 6.9874 8.79273 7.46924C8.7293 7.94102 8.61031 8.21312 8.41159 8.41183L8.90656 8.90681C9.25702 8.55635 9.41262 8.11192 9.48648 7.56252C9.559 7.02319 9.55825 6.33249 9.55825 5.4585H8.85825ZM5.45825 9.5585C6.33224 9.5585 7.02294 9.55924 7.56227 9.48673C8.11167 9.41286 8.55611 9.25727 8.90656 8.90681L8.41159 8.41183C8.21287 8.61055 7.94078 8.72954 7.469 8.79297C6.98715 8.85775 6.35203 8.8585 5.45825 8.8585V9.5585ZM5.45825 2.0585C6.35203 2.0585 6.98715 2.05924 7.469 2.12402C7.94078 2.18745 8.21287 2.30644 8.41159 2.50516L8.90656 2.01018C8.55611 1.65973 8.11167 1.50413 7.56227 1.43026C7.02294 1.35775 6.33224 1.3585 5.45825 1.3585V2.0585ZM9.55825 5.4585C9.55825 4.58451 9.559 3.89381 9.48648 3.35447C9.41262 2.80508 9.25702 2.36064 8.90656 2.01018L8.41159 2.50516C8.61031 2.70388 8.7293 2.97597 8.79273 3.44775C8.85751 3.92959 8.85825 4.56472 8.85825 5.4585H9.55825ZM5.45825 1.3585C4.58426 1.3585 3.89356 1.35775 3.35423 1.43026C2.80483 1.50413 2.3604 1.65973 2.00994 2.01018L2.50491 2.50516C2.70363 2.30644 2.97573 2.18745 3.4475 2.12402C3.92935 2.05924 4.56447 2.0585 5.45825 2.0585V1.3585ZM2.05825 5.4585C2.05825 4.56472 2.059 3.92959 2.12378 3.44775C2.18721 2.97597 2.3062 2.70388 2.50491 2.50516L2.00994 2.01018C1.65948 2.36064 1.50388 2.80508 1.43002 3.35447C1.35751 3.89381 1.35825 4.58451 1.35825 5.4585H2.05825ZM6.0895 4.3335C6.0895 3.98487 5.80688 3.70225 5.45825 3.70225V4.40225C5.42028 4.40225 5.3895 4.37147 5.3895 4.3335H6.0895ZM6.0895 5.17726V4.3335H5.3895V5.17726H6.0895ZM6.58325 4.82726H5.7395V5.52726H6.58325V4.82726ZM7.2145 5.45851C7.2145 5.10988 6.93188 4.82726 6.58325 4.82726V5.52726C6.54528 5.52726 6.5145 5.49647 6.5145 5.45851H7.2145ZM6.58325 6.08976C6.93188 6.08976 7.2145 5.80714 7.2145 5.45851H6.5145C6.5145 5.42054 6.54528 5.38976 6.58325 5.38976V6.08976ZM5.7395 6.08976H6.58325V5.38976H5.7395V6.08976ZM6.0895 6.5835L6.0895 5.73976L5.3895 5.73976L5.3895 6.5835H6.0895ZM5.45825 7.21475C5.80688 7.21475 6.0895 6.93213 6.0895 6.5835H5.3895C5.3895 6.54553 5.42028 6.51475 5.45825 6.51475V7.21475ZM4.827 6.5835C4.827 6.93213 5.10962 7.21475 5.45825 7.21475V6.51475C5.49622 6.51475 5.527 6.54553 5.527 6.5835H4.827ZM4.827 5.73976V6.5835H5.527V5.73976H4.827ZM4.33325 6.08976H5.177V5.38976H4.33325V6.08976ZM3.702 5.45851C3.702 5.80714 3.98462 6.08976 4.33325 6.08976V5.38976C4.37122 5.38976 4.402 5.42054 4.402 5.45851H3.702ZM4.33325 4.82726C3.98462 4.82726 3.702 5.10988 3.702 5.45851H4.402C4.402 5.49647 4.37122 5.52726 4.33325 5.52726V4.82726ZM5.177 4.82726H4.33325V5.52726H5.177V4.82726ZM4.827 4.3335L4.827 5.17726L5.527 5.17726L5.527 4.3335L4.827 4.3335ZM5.45825 3.70225C5.10962 3.70225 4.827 3.98487 4.827 4.3335H5.527C5.527 4.37147 5.49622 4.40225 5.45825 4.40225V3.70225Z" fill="#F2F4F7" />
                              </g>
                              <defs>
                                <clipPath id="clip0_2845_2044">
                                  <rect width="9" height="9" fill="white" transform="translate(0.958252 0.958496)" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute top-[56px] left-[320px] w-[248px] bg-white border border-white-active rounded-[8px] shadow-md z-[100]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col">
                              <div className="flex p-[14px] items-center gap-[8px] self-stretch rounded-t-[8px] bg-white-hover">
                                <div className="flex">
                                  <Icon icon="solar:magnifer-linear" height={20} />
                                </div>

                                <div className="flex flex-1 items-center">
                                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-white-hover focus:outline-none" placeholder="Search user..." />
                                </div>
                              </div>
                            </div>

                            <ul className="max-h-[160px] gap-[4px] overflow-y-auto">
                              {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                  <li key={index} className="flex items-center px-[14px] py-[8px] gap-[8px] cursor-pointer hover:bg-yellow last:rounded-bl-[8px]" onClick={() => addUser(user)}>
                                    <Avatar
                                      name={user.initial}
                                      classNames={{ base: "w-[24px] h-[24px] bg-yellow-100", name: "text-base text-[10px] text-yellow-600" }}
                                    />
                                    <span className="text-sm">{user.name}</span>
                                  </li>
                                ))
                              ) : (
                                <li className="px-2 py-1 text-grey-lighter">No users found</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      <ul className="flex flex-col self-stretch">
                        {addedUsers.map((user, index) => {
                          return (
                            <li key={index} >
                              <div className="flex p-[8px] items-center gap-[8px]">
                                <div>
                                  <Avatar
                                    name={user.initial}
                                    classNames={{ base: "w-[24px] h-[24px] bg-yellow-100", name: "text-base text-[10px] text-yellow-600" }}
                                  />
                                </div>

                                <div className="flex flex-1">
                                  {user.name}
                                </div>

                                {index != 0 && (
                                  <button type="button" onClick={() => deleteUser(user)} className="flex">
                                    <Icon icon="solar:minus-square-bold" height={16} style={{ color: "var(--grey-lighter)" }} />
                                  </button>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-[8px] self-stretch">
                  <div className="flex flex-col flex-1">
                    <div className="">Due Date</div>
                    <span className="text-grey-lighter">
                      Easily set and track due dates
                    </span>
                  </div>

                  <div className="items-center">
                    <Switch
                      checked={useDueDate}
                      isSelected={useDueDate}
                      onChange={() => setUseDueDate((prev) => !prev)}
                      classNames={{
                        wrapper: "px-[2px] py-[4px] w-[28px] h-[16px] group-data-[focus-visible=true]:ring-yellow group-data-[selected=true]:bg-yellow",
                        thumb: [
                          "w-[12px] h-[12px]",
                          "group-data-[hover=true]:border-yellow",
                          "group-data-[pressed=true]:w-[12px]",
                          "group-data-[selected=true]:ml-[12px] rtl:group-data-[selected=true]:mr-[12px] group-data-[selected]:group-data-[pressed]:ml-[12px]",
                        ],
                      }}
                    />
                  </div>
                </div>

                <div className={clsx("transition-all duration-300", {
                  "max-h-[1000px] opacity-100": useDueDate,
                  "max-h-0 opacity-0": !useDueDate,
                })}>
                  <div className="grid grid-cols-2 gap-[12px] w-full">
                    <DatePicker
                      variant="bordered"
                      label="Issued On"
                      labelPlacement="outside"
                      // value={issueDate}
                      // onChange={(val) => setIssueDate(val)}
                      classNames={{ calendar: "bg-[#ffffff]" }}
                    />

                    <DatePicker variant="bordered" label="Due On" labelPlacement="outside" onChange={() => setDueDate} />
                  </div>
                </div>

                <div className="flex justify-end items-center self-stretch">
                  <MyButton
                    color="yellow"
                    children="Continue"
                    onPress={() => { closeModal("createWorkspace"); openModal("defineWorkflow") }}
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

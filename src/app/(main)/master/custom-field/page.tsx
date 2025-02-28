"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from "@nextui-org/react";
import { useState } from "react";

export function SettingTeam() {
  const { openModals, openModal, closeAllModals } = useModalContext();

  return (
    <Modal isOpen={openModals["settingTeam"] ?? false} hideCloseButton={true} size="xl">
      <ModalContent className="overflow-visible">
        <ModalHeader className="px-[25px] py-[20px]">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-[8px] self-stretch">
              <div className="flex flex-1 items-center gap-[8px]">
                <div className="text-[16px] font-semibold">
                  Setting Team
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
              Manage and configure your team settings to enhance collaboration and define roles effectively.
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
              placeholder="Enter Name"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <MyInput
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Enter Email"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <Select
              label="Project"
              labelPlacement="outside"
              placeholder="Choose one"
              classNames={{
                base: [
                  "text-base",
                  "opacity-100",
                ],
                trigger: [
                  "h-[46px]",
                  "p-[14px]",
                  "bg-transparent",
                  "rounded-[8px]",
                  "border border-grey-light-active",
                  "text-base text-grey-light-active",
                  "placeholder:text-grey-light-active",
                  "data-[hover=true]:bg-transparent",
                  "data-[focus=true]:bg-transparent data-[focus=true]:border-grey-dark-active",
                  "data-[focus-visible=true]:outline-0 data-[focus-visible=true]:outline-transparent",
                ],
              }}
            >
              <SelectItem key={"project-1"}>Project 1</SelectItem>
            </Select>

            <Select
              label="Type"
              labelPlacement="outside"
              placeholder="Choose one"
              classNames={{
                base: [
                  "text-base",
                  "opacity-100",
                ],
                trigger: [
                  "h-[46px]",
                  "p-[14px]",
                  "bg-transparent",
                  "rounded-[8px]",
                  "border border-grey-light-active",
                  "text-base text-grey-light-active",
                  "placeholder:text-grey-light-active",
                  "data-[hover=true]:bg-transparent",
                  "data-[focus=true]:bg-transparent data-[focus=true]:border-grey-dark-active",
                  "data-[focus-visible=true]:outline-0 data-[focus-visible=true]:outline-transparent",
                ],
              }}
            >
              <SelectItem key={"daily"}>Daily</SelectItem>
              <SelectItem key={"weekly"}>Weekly</SelectItem>
              <SelectItem key={"monthly"}>Monthly</SelectItem>
              <SelectItem key={"yearly"}>Yearly</SelectItem>
            </Select>

            <div className="flex justify-end items-center self-stretch">
              <MyButton
                color="yellow"
                children="Continue"
                onPress={() => { closeAllModals() }}
                className="px-[24px]"
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default function Page() {
  const { openModal } = useModalContext();
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedView, setSelectedView] = useState("all");

  return (
    <div className="flex flex-col p-[16px] items-start gap-[16px] flex-1 self-stretch bg-secondary">
      <div className="flex w-full flex-col p-[16px] rounded-[8px] border border-light-secondary bg-white">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col flex-1 gap-[4px]">
            <div className="flex text-base !text-[25px] font-bold">
              Custom Field
            </div>
            <span className="text-grey-25">
              Manage and configure custom fields to suit your project's needs.
            </span>
          </div>

          <div className="flex w-full flex-col">
            <Tabs
              aria-label="Views"
              variant="underlined"
              color="warning"
              selectedKey={selectedView}
              onSelectionChange={key => setSelectedView(key.toString())}
              classNames={{
                tabContent: "group-data-[selected=true]:text-foreground",
              }}
            >
              <Tab key="all" title="All">
                <div className="flex p-[16px] flex-col self-stretch gap-[8px]">
                  <div role="button" className="flex items-center self-stretch gap-[8px]" onClick={() => setIsExpanded(prev => !prev)}>
                    {isExpanded ? (
                      <Icon icon="solar:alt-arrow-down-bold" height={20} style={{ color: "#B2BBC6" }} />
                    ) : (
                      <Icon icon="solar:alt-arrow-right-bold" height={20} style={{ color: "#B2BBC6" }} />
                    )}
                    <div className="flex px-[8px] item-center gap-[8px] rounded-[5px] bg-white-hover">
                      <div className="flex items-center">
                        {/* Icon */}
                      </div>
                      <div className="flex items-center text-grey-lighter">
                        Text
                      </div>
                    </div>
                    <div className="flex items-center text-grey-lighter">
                      1
                    </div>
                    <Icon icon="solar:menu-dots-bold" height={21} style={{ color: "#B2BBC6" }} />
                  </div>

                  {isExpanded && (
                    <Table
                      aria-label="Table custom field"
                      removeWrapper={true}
                      checkboxesProps={{
                        classNames: {
                          wrapper: [
                            "text-white",
                            "after:bg-yellow after:text-white",
                            "group-data-[focus-visible=true]:ring-yellow",
                          ],
                        }
                      }}
                      classNames={{
                        wrapper: "p-0 shadow-none rounded-none border border-white-active",
                        thead: "[&>tr]:first:rounded-none",
                        th: "first:rounded-s-none last:rounded-e-none border-y border-white-active",
                        tr: "h-[42px] border-b border-white-active",
                      }}
                    >
                      <TableHeader className="bg-white-normal">
                        <TableColumn className="font-normal text-grey-lighter">Name</TableColumn>
                        <TableColumn className="font-normal text-grey-lighter">Location</TableColumn>
                        <TableColumn className="font-normal text-grey-lighter">Task</TableColumn>
                        <TableColumn className="font-normal text-grey-lighter">Created by</TableColumn>
                        <TableColumn className="font-normal text-grey-lighter">Created at</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow key="1">
                          <TableCell> {/* Icon */} Name</TableCell>
                          <TableCell>RnD</TableCell>
                          <TableCell>Project 1</TableCell>
                          <TableCell>Admin</TableCell>
                          <TableCell>Dec 8, 2025</TableCell>
                        </TableRow>
                        <TableRow key="last">
                          <TableCell colSpan={5} className="text-grey-lighter cursor-pointer" onClick={() => openModal("createTask")}>
                            <div className="flex py-[3px] items-center">
                              + Create Field
                            </div>
                          </TableCell>
                          <TableCell className="hidden"> </TableCell>
                          <TableCell className="hidden"> </TableCell>
                          <TableCell className="hidden"> </TableCell>
                          <TableCell className="hidden"> </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  )}
                </div>

                <div className="flex px-[20px] justify-between items-center">
                  <div className="flex">
                    1-2 of 2
                  </div>
                  <div className="flex items-center gap-[4px]">
                    Rows per page:

                    <select name="lol" id="lol" className="">
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>

                    <div className="flex items-center gap-[10px]">
                      <Button
                        isIconOnly={true}
                        disableAnimation={true}
                        className="px-[2px] py-[2px] min-w-min w-[24px] h-[26px] rounded-[6px] border border-[#464f6029] bg-white"
                      >
                        <Icon icon="solar:alt-arrow-left-linear" height={16} style={{ color: "#464F60" }} />
                      </Button>

                      1/2

                      <Button
                        isIconOnly={true}
                        disableAnimation={true}
                        className="px-[2px] py-[2px] min-w-min w-[24px] h-[26px] rounded-[6px] border border-[#464f6029] bg-white"
                      >
                        <Icon icon="solar:alt-arrow-right-linear" height={16} style={{ color: "#464F60" }} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab key="by-location" title="By Location">
                <Table
                  aria-label="Table product"
                  selectionMode="multiple"
                  removeWrapper={true}
                  checkboxesProps={{
                    classNames: {
                      wrapper: [
                        "text-white",
                        "after:bg-yellow after:text-white",
                        "group-data-[focus-visible=true]:ring-yellow",
                      ],
                    }
                  }}
                  classNames={{
                    wrapper: "p-0 shadow-none rounded-none border border-white-active",
                    thead: "[&>tr]:first:rounded-none",
                    th: "first:rounded-s-none last:rounded-e-none",
                  }}
                >
                  <TableHeader className="bg-white-normal">
                    <TableColumn className="font-normal text-grey-lighter">#</TableColumn>
                    <TableColumn className="font-normal text-grey-lighter">Location</TableColumn>
                    <TableColumn className="font-normal text-grey-lighter">Task</TableColumn>
                    <TableColumn className="font-normal text-grey-lighter">Created by</TableColumn>
                    <TableColumn className="font-normal text-grey-lighter">Action</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>1</TableCell>
                      <TableCell>RnD</TableCell>
                      <TableCell>Project 1</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>
                        <MyButton
                          variant="bordered"
                          size="sm"
                          color="yellow"
                          disableAnimation={true}
                        >
                          View
                        </MyButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="by-status" title="By Status">

              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <SettingTeam />
    </div>
  );
}

"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Select, SelectItem } from "@heroui/select";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Tab, Tabs } from "@heroui/tabs";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";
import { useState } from "react";

export function SettingCustomField() {
  const { openModals, openModal, closeAllModals } = useModalContext();
  const [selectedStatus, setSelectedStatus] = useState("");

  return (
    <Modal isOpen={openModals["settingCustomField"] ?? false} hideCloseButton={true} size="xl">
      <ModalContent className="overflow-visible">
        <ModalHeader className="px-[25px] py-[20px]">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-[8px] self-stretch">
              <div className="flex flex-1 items-center gap-[8px]">
                <div className="text-[16px] font-semibold">
                  Create New Field
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
              {/* Manage and configure your team settings to enhance collaboration and define roles effectively. */}
            </div>
          </div>
        </ModalHeader>

        <Divider />

        <ModalBody className="px-[25px] py-[20px]">
          <div className="flex flex-col gap-[20px] self-stretch">
            <MyInput
              id="name"
              name="name"
              label="Field Name"
              placeholder="Enter Name"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <Select
              selectionMode="multiple"
              label="Field Type"
              labelPlacement="outside"
              placeholder="Select field type"
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
              <SelectItem key={"checkbox"}>
                <div className="flex items-center gap-[8px]">
                  <Icon icon="solar:check-square-linear" height={16} />
                  Checkbox
                </div>
              </SelectItem>
              <SelectItem key={"date"}>
                <div className="flex items-center gap-[8px]">
                  <Icon icon="solar:calendar-date-linear" height={16} />
                  Date
                </div>
              </SelectItem>
              <SelectItem key={"dropdown"}>
                <div className="flex items-center gap-[8px]">
                  <Icon icon="solar:square-arrow-down-linear" height={16} />
                  Dropdown
                </div>
              </SelectItem>
              <SelectItem key={"files"}>
                <div className="flex items-center gap-[8px]">
                  <Icon icon="solar:paperclip-linear" height={16} />
                  Files
                </div>
              </SelectItem>
            </Select>

            <div className="flex flex-col gap-[4px]">
              <span className="text-[20px] font-bold">Status</span>
              <span className="text-grey-light-active">Select and add status</span>
            </div>

            <Popover placement="bottom-start">
              <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                <div className="flex items-center gap-[4px] self-stretch cursor-pointer">
                  <Icon icon="solar:add-circle-bold" height={16} style={{ color: "#FEC031" }} />
                  <div className="flex h-full items-center self-stretch text-grey-lighter">
                    Add Status
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

                  <Listbox aria-label="Select status" selectionMode="multiple">
                    <ListboxItem key="to-do">TODO</ListboxItem>
                    <ListboxItem key="on-going">ON GOING</ListboxItem>
                    <ListboxItem key="review">REVIEW</ListboxItem>
                  </Listbox>
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex flex-col gap-[4px]">
              <span className="text-[20px] font-bold">Location</span>
              <span className="text-grey-light-active">Select and add location</span>
            </div>

            <div className="flex items-end gap-[10px]">
              <Select
                selectionMode="multiple"
                label="Location"
                labelPlacement="outside"
                placeholder="Select location"
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
                <SelectItem key={"checkbox"}>
                  <div className="flex items-center gap-[8px]">
                    <Icon icon="solar:check-square-linear" height={16} />
                    Checkbox
                  </div>
                </SelectItem>
                <SelectItem key={"date"}>
                  <div className="flex items-center gap-[8px]">
                    <Icon icon="solar:calendar-date-linear" height={16} />
                    Date
                  </div>
                </SelectItem>
                <SelectItem key={"dropdown"}>
                  <div className="flex items-center gap-[8px]">
                    <Icon icon="solar:square-arrow-down-linear" height={16} />
                    Dropdown
                  </div>
                </SelectItem>
                <SelectItem key={"files"}>
                  <div className="flex items-center gap-[8px]">
                    <Icon icon="solar:paperclip-linear" height={16} />
                    Files
                  </div>
                </SelectItem>
              </Select>

              <Checkbox
                size="sm"
                // value={view.value}
                disableAnimation={true}
                classNames={{
                  base: clsx(
                    "inline-flex max-w-md m-0",
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
                Required
              </Checkbox>
            </div>

            <div className="flex justify-end items-center gap-[12px] self-stretch">
              <MyButton
                variant="bordered"
                color="yellow"
                children="Close"
                onPress={() => { closeAllModals() }}
                className="px-[24px]"
              />

              <MyButton
                color="yellow"
                children="Save"
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
          <div className="flex gap-[4px]">
            <div className="flex flex-col flex-1 gap-[4px]">
              <div className="flex text-base !text-[25px] font-bold">
                Custom Field
              </div>
              <span className="text-grey-25">
                Manage and configure custom fields to suit your project's needs.
              </span>
            </div>
            <div className="flex items-end">
              <MyButton
                color="yellow"
                children="Create New Field"
                onPress={() => openModal("settingCustomField")}
                className="px-[24px]"
              />
            </div>
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
                        wrapper: "p-0 shadow-none rounded-none",
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
                          <TableCell className="text-grey-lighter cursor-pointer" onClick={() => openModal("createTask")}>
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

      <SettingCustomField />
    </div>
  );
}

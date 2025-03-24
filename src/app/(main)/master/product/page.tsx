"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Icon } from "@iconify-icon/react";

export function SettingProduct() {
  const { openModals, openModal, closeAllModals } = useModalContext();

  return (
    <Modal isOpen={openModals["settingProduct"] ?? false} hideCloseButton={true} size="xl">
      <ModalContent className="overflow-visible">
        <ModalHeader className="px-[25px] py-[20px]">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-[8px] self-stretch">
              <div className="flex flex-1 items-center gap-[8px]">
                <div className="text-[16px] font-semibold">
                  Setting Product
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
              Customize your product settings to align with your team's workflow and optimize project management efficiency.
            </div>
          </div>
        </ModalHeader>

        <Divider />

        <ModalBody className="px-[25px] py-[20px]">
          <div className="flex flex-col gap-[12px] self-stretch">
            <MyInput
              id="code"
              name="code"
              label="Code"
              placeholder="Enter Code"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

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
              id="price"
              name="price"
              type="number"
              label="Price"
              placeholder="Enter Price"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

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

  return (
    <div className="flex flex-col w-full p-[16px] items-start gap-[16px] flex-1 bg-secondary">
      <div className="flex w-full flex-col p-[16px] rounded-[8px] border border-light-secondary bg-white">
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[4px]">
            <div className="flex flex-col flex-1 gap-[4px]">
              <div className="flex text-base !text-[25px] font-bold">
                Setting Product
              </div>
              <span className="text-grey-25">
                Customize your product settings to align with your team's workflow and optimize project management efficiency.
              </span>
            </div>
            <div className="flex items-end">
              <MyButton
                color="yellow"
                children="Add Product"
                onPress={() => openModal("settingProduct")}
                className="px-[24px]"
              />
            </div>
          </div>

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
              <TableColumn className="font-normal text-grey-lighter">CODE</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">NAME</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">PRICE</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">TYPE</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>1</TableCell>
                <TableCell>F4500</TableCell>
                <TableCell>Mesin Absensi Wajah InterActive F4500</TableCell>
                <TableCell className="text-end">4.040.000</TableCell>
                <TableCell className="text-center">Hardware</TableCell>
                <TableCell>
                  <Button
                    variant="light"
                    size="sm"
                    isIconOnly={true}
                    disableAnimation={true}
                  >
                    <Icon icon="solar:menu-dots-bold" className="rotate-90 cursor-pointer" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>2</TableCell>
                <TableCell>KIOSK</TableCell>
                <TableCell>Mesin Antrian AMQS Touch Screen untuk dinas rumah sakit tempat pelayanan umum (4 Loket)</TableCell>
                <TableCell className="text-end">46.000.000</TableCell>
                <TableCell className="text-center">Service</TableCell>
                <TableCell>
                  <Button
                    variant="light"
                    size="sm"
                    isIconOnly={true}
                    disableAnimation={true}
                  >
                    <Icon icon="solar:menu-dots-bold" className="rotate-90 cursor-pointer" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

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
        </div>
      </div>

      <SettingProduct />
    </div>
  );
}

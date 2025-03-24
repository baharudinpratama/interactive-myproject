"use client";

import MyButton from "@/app/components/button";
import MyInput from "@/app/components/input";
import { useModalContext } from "@/app/contexts/modal";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Icon } from "@iconify-icon/react";

export function SettingCustomer() {
  const { openModals, openModal, closeAllModals } = useModalContext();

  return (
    <Modal isOpen={openModals["settingCustomer"] ?? false} hideCloseButton={true} size="xl" scrollBehavior="inside">
      <ModalContent className="overflow-visible">
        <ModalHeader className="px-[25px] py-[20px]">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-[8px] self-stretch">
              <div className="flex flex-1 items-center gap-[8px]">
                <div className="text-[16px] font-semibold">
                  Setting Customer
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
              label="Company Name"
              placeholder="Enter Company Name"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <MyInput
              type="email"
              label="Company Address"
              placeholder="Enter Company Address"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <MyInput
              label="PIC Name"
              placeholder="Enter PIC Name"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <MyInput
              label="PIC Phone"
              placeholder="Enter PIC Phone"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <MyInput
              label="PIC Email"
              placeholder="Enter PIC Email"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <MyInput
              label="PIC Position"
              placeholder="Enter PIC Position"
              // value={nameInput}
              // onValueChange={setNameInput}
              maxLength={254}
            />

            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Description"
            />

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
    <div className="flex flex-col p-[16px] items-start gap-[16px] flex-1 self-stretch bg-secondary">
      <div className="flex w-full flex-col p-[16px] rounded-[8px] border border-light-secondary bg-white">
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[4px]">
            <div className="flex flex-col flex-1 gap-[4px]">
              <div className="flex text-base !text-[25px] font-bold">
                Setting Customer
              </div>
              <span className="text-grey-25">
                Manage and configure your team settings to enhance collaboration and define roles effectively.
              </span>
            </div>
            <div className="flex items-end">
              <MyButton
                color="yellow"
                children="Add Customer"
                onPress={() => openModal("settingCustomer")}
                className="px-[24px]"
              />
            </div>
          </div>

          <Table
            aria-label="Table team"
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
              <TableColumn className="text-center font-normal text-grey-lighter">COMPANY NAME</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">COMPANY ADDRESS</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">PIC NAME</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">PIC PHONE</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">PIC EMAIL</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">PIC POSITION</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">DESCRIPTION</TableColumn>
              <TableColumn className="text-center font-normal text-grey-lighter">ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>1</TableCell>
                <TableCell>PT Sejahtera Abadi</TableCell>
                <TableCell>Jl. Merdeka</TableCell>
                <TableCell>Budi Santoso</TableCell>
                <TableCell>0812-3456-7890</TableCell>
                <TableCell>budi@sejahteraabadi.co.id</TableCell>
                <TableCell>Manager Purchasing</TableCell>
                <TableCell>Pelanggan tetap sejak 2020, memiliki kontrak tahunan.</TableCell>
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

      <SettingCustomer />
    </div>
  );
}

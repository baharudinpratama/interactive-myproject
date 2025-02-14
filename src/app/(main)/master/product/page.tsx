"use client";

import MyButton from "@/app/components/button";
import { Avatar, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export default function Page() {
  return (
    <div className="flex flex-col p-[16px] items-start gap-[16px] flex-1 self-stretch bg-secondary">
      <div className="flex w-full flex-col p-[16px] rounded-[8px] border border-light-secondary bg-white">
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[4px]">
            <div className="flex flex-col flex-1">
              <div className="flex">
                Setting Product
              </div>
              <div className="flex">
                Customize your product settings to align with your team's workflow and optimize project management efficiency.
              </div>
            </div>
            <div className="flex items-end">
              <MyButton
                color="yellow"
                children="Add Product"
                // onPress={() => {
                //   router.push("sign-in?use-password");
                // }}
                className="px-[24px]"
              />
            </div>
          </div>
          <Table
            aria-label="Table custom field"
            selectionMode="multiple"
            // disableAnimation={true}
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
              td: "text-[12px]",
            }}
          >
            <TableHeader className="bg-white-normal">
              <TableColumn key={"#"} className="text-[12px] font-normal text-grey-lighter">#</TableColumn>
              <TableColumn key={"code"} className="text-[12px] font-normal text-grey-lighter">CODE</TableColumn>
              <TableColumn key={"name"} className="text-center text-[12px] font-normal text-grey-lighter">NAME</TableColumn>
              <TableColumn key={"price"} className="text-center text-[12px] font-normal text-grey-lighter">PRICE</TableColumn>
              <TableColumn key={"type"} className="text-center text-[12px] font-normal text-grey-lighter">TYPE</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key={"custom-field-1"}>
                <TableCell>1</TableCell>
                <TableCell>F4500</TableCell>
                <TableCell>Mesin Absensi Wajah InterActive F4500</TableCell>
                <TableCell className="text-end">4.040.000</TableCell>
                <TableCell className="text-center">Hardware</TableCell>
              </TableRow>
              <TableRow key={"custom-field-2"}>
                <TableCell>2</TableCell>
                <TableCell>KIOSK</TableCell>
                <TableCell>Mesin Antrian AMQS Touch Screen untuk dinas rumah sakit tempat pelayanan umum (4 Loket)</TableCell>
                <TableCell className="text-end">46.000.000</TableCell>
                <TableCell className="text-center">Service</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

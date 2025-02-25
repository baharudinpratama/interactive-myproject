"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "#",
    label: "#",
  },
  {
    key: "name",
    label: "Field Name",
  },
  {
    key: "role",
    label: "Field Type",
  },
  {
    key: "created-by",
    label: "Created By",
  },
  {
    key: "status",
    label: "",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col overflow-y-auto p-[16px] items-start gap-[16px] flex-1 self-stretch bg-secondary">
      <Table aria-label="Example table with dynamic content" selectionMode="multiple">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

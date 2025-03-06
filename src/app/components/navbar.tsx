"use client"

import Breadcrumb from "@/app/components/breadcrumb";
import { Icon } from "@iconify-icon/react";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="flex p-[16px] items-center gap-[16px] self-stretch border-b border-white-active">
      <div className="flex flex-1">
        <Breadcrumb />
      </div>

      Welcome, {
        session?.data?.user?.name
      }

      <Dropdown>
        <DropdownTrigger>
          <div className="flex p-[6px] items-center gap-[6px] rounded-full bg-white-active cursor-pointer">
            <Avatar
              name="IA"
              classNames={{ base: "w-[24px] h-[24px] bg-yellow-600", name: "text-base text-[12px] text-white" }}
            />
            <Icon icon="solar:alt-arrow-down-outline" size={18} />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions">
          <DropdownItem key="logout" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

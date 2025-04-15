"use client"

import Breadcrumb from "@/app/components/breadcrumb";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSidebarContext } from "../contexts/sidebar";

export default function Navbar() {
  const session = useSession();
  const t = useTranslations();
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();

  return (
    <div className="flex p-[16px] items-center gap-[16px] self-stretch border-b border-white-active">
      <div className="flex cursor-pointer">
        {!isSidebarOpen && <Icon icon="solar:sidebar-code-linear" height={16} onClick={() => toggleSidebar()} />}
      </div>

      <div className="flex flex-1">
        <Breadcrumb />
      </div>

      {t("welcome")}, {
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
          <DropdownItem key="logout" onPress={() => signOut({ callbackUrl: "/sign-in" })}>
            {t('signOut')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

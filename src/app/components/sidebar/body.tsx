"use client";

import { AddWorkspace } from "@/app/components/workspace/add-workspace";
import { useModalContext } from "@/app/contexts/modal";
import { useSidebarContext } from "@/app/contexts/sidebar";
import { fetchedMenuItems } from "@/app/data";
import { Icon } from "@iconify-icon/react";
import { Avatar, Divider } from "@nextui-org/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Body() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSidebarOpen } = useSidebarContext();
  const { openModal } = useModalContext();

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id)
        ? prev.filter((menuId) => menuId !== id)
        : [...prev, id]
    );
  };

  interface MenuItem {
    id: string;
    icon: string;
    label: string;
    url: string;
    children: MenuItem[];
  }

  const handleMenuClick = (menu: MenuItem) => {
    if (menu.children.length > 0) {
      toggleMenu(menu.id);
    } else if (menu.url) {
      router.push(menu.url);
    }
  };

  const renderMenu = (menu: MenuItem) => {
    const isActive = pathname === menu.url;
    const haveChildren = menu.children.length > 0;

    return (
      <div key={menu.id} className="flex flex-col gap-[8px] self-stretch transition-all duration-500">
        <div
          className={clsx("flex w-full min-h-[37px] p-[8px] items-center self-stretch rounded-[8px] cursor-pointer", {
            "gap-[8px]": isSidebarOpen,
            "font-semibold bg-[#F9E9B8]": isActive,
          })}
          onClick={() => handleMenuClick(menu)}
        >
          <div className="flex min-w-[24px] justify-center items-center self-stretch">
            <Icon icon={menu.icon} height={20} />
          </div>

          {isSidebarOpen && (
            <>
              <div className="flex flex-1 whitespace-nowrap overflow-hidden">
                {menu.label}
              </div>

              {haveChildren && (
                <Icon icon="solar:alt-arrow-left-linear" className={`transition-transform transform duration-500 ${openMenus.includes(menu.id) ? "-rotate-90" : ""}`} />
                // <LiAltArrowLeft className={`transition-transform transform duration-500 ${openMenus.includes(menu.id) ? "-rotate-90" : ""}`} />
              )}
            </>
          )}
        </div>

        <AnimatePresence initial={false}>
          {openMenus.includes(menu.id) && isSidebarOpen && (
            <motion.div
              key={menu.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col pl-[16px] gap-[8px]">
                {menu.children.map((child) => renderMenu(child))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full items-start self-stretch">
      <div className="flex flex-col p-[8px] justify-center items-start gap-[8px] self-stretch">
        {fetchedMenuItems.map((menu) => renderMenu(menu))}
      </div>

      <div className="flex px-[16px] self-stretch">
        <Divider />
      </div>
      <div className="flex flex-col justify-center items-start gap-[8px] self-stretch px-[8px] py-[12px]">
        <div className={clsx("flex min-h-[37px] min-w-[24px] px-[8px] justify-center items-center transform transition-all duration-500", {
          "self-stretch": isSidebarOpen
        })}>
          {isSidebarOpen ? (
            <div className="flex w-full items-center">
              <div className="flex flex-1 whitespace-nowrap overflow-hidden">
                Workspace
              </div>
              <div role="button" className="cursor-pointer" onClick={() => openModal("createWorkspace")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                  <path d="M9.50008 5.27706L5.02091 5.27706M5.02091 5.27706L0.541748 5.27706M5.02091 5.27706L5.02091 0.797852M5.02091 5.27706L5.02091 9.75619" stroke="#090B0E" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="flex min-w-[24px] justify-center items-center self-stretch">
              <Icon icon="solar:case-linear" height={20} />
            </div>
          )}
        </div>

        <>
          <div className="flex flex-col gap-[8px] self-stretch transition-all duration-500">
            <div
              className={clsx("flex w-full min-h-[37px] p-[8px] items-center self-stretch rounded-[8px] cursor-pointer", {
                "gap-[8px]": isSidebarOpen,
              })}
              onClick={() => { }}
            >
              <div className="flex justify-center items-center min-w-[24px] self-stretch">
                <Avatar
                  name="R"
                  classNames={{ base: "w-[20px] h-[20px] rounded-[3px] bg-[#6985FF]/[0.35]", name: "text-base text-[10px] font-bold text-[#6985FF]" }}
                />
              </div>

              {isSidebarOpen && (
                <div className="flex flex-1 whitespace-nowrap overflow-hidden">
                  RnD
                </div>
              )}
            </div>

            <div className="flex flex-col gap-[8px]">
              <div
                className={clsx("flex w-full min-h-[37px] p-[8px] pl-[16px] items-center self-stretch rounded-[8px] cursor-pointer font-semibold bg-[#F9E9B8]", {
                  "gap-[8px]": isSidebarOpen,
                })}
                onClick={() => { router.push("/project") }}
              >
                <div className="flex justify-center items-center min-w-[24px] self-stretch">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M3.54167 6.61068C3.54167 6.72574 3.44839 6.81901 3.33333 6.81901C3.21827 6.81901 3.125 6.72574 3.125 6.61068C3.125 6.49562 3.21827 6.40234 3.33333 6.40234C3.44839 6.40234 3.54167 6.49562 3.54167 6.61068Z" fill="#090B0E" stroke="#090B0E" strokeWidth="1.25" />
                    <path d="M3.54167 10.7777C3.54167 10.8927 3.44839 10.986 3.33333 10.986C3.21827 10.986 3.125 10.8927 3.125 10.7777C3.125 10.6626 3.21827 10.5693 3.33333 10.5693C3.44839 10.5693 3.54167 10.6626 3.54167 10.7777Z" fill="#090B0E" stroke="#090B0E" strokeWidth="1.25" />
                    <path d="M3.54167 14.9437C3.54167 15.0587 3.44839 15.152 3.33333 15.152C3.21827 15.152 3.125 15.0587 3.125 14.9437C3.125 14.8286 3.21827 14.7354 3.33333 14.7354C3.44839 14.7354 3.54167 14.8286 3.54167 14.9437Z" fill="#090B0E" stroke="#090B0E" strokeWidth="1.25" />
                    <path d="M6.61659 10.5693H16.7166C16.804 10.5693 16.8749 10.6402 16.8749 10.7277V10.8277C16.8749 10.9151 16.804 10.986 16.7166 10.986H6.61659C6.52914 10.986 6.45825 10.9151 6.45825 10.8277V10.7277C6.45825 10.6402 6.52914 10.5693 6.61659 10.5693Z" fill="#090B0E" stroke="#090B0E" strokeWidth="1.25" />
                    <path d="M6.61659 14.7354H16.7166C16.804 14.7354 16.8749 14.8062 16.8749 14.8937V14.9937C16.8749 15.0811 16.804 15.152 16.7166 15.152H6.61659C6.52914 15.152 6.45825 15.0811 6.45825 14.9937V14.8937C6.45825 14.8062 6.52914 14.7354 6.61659 14.7354Z" fill="#090B0E" stroke="#090B0E" strokeWidth="1.25" />
                    <path d="M16.7166 5.77734H6.61659C6.18396 5.77734 5.83325 6.12805 5.83325 6.56068V6.66068C5.83325 7.0933 6.18396 7.44401 6.61659 7.44401H16.7166C17.1492 7.44401 17.4999 7.0933 17.4999 6.66068V6.56068C17.4999 6.12805 17.1492 5.77734 16.7166 5.77734Z" fill="#090B0E" />
                  </svg>
                </div>

                {isSidebarOpen && (
                  <div className="flex flex-1 whitespace-nowrap overflow-hidden">
                    Project 1
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
      <div className="flex px-[16px] self-stretch">
        <Divider />
      </div>

      <AddWorkspace />
    </div >
  );
}

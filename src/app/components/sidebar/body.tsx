"use client";

import { AddWorkspace } from "@/app/components/workspace/add-workspace";
import { useModalContext } from "@/app/contexts/modal";
import { useSidebarContext } from "@/app/contexts/sidebar";
import { useWorkspaceContext } from "@/app/contexts/workspace";
import { fetchedMenuItems } from "@/app/data";
import { Divider } from "@heroui/divider";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

import { useWorkspaceStore } from "@/lib/store/workspace-store";

export default function Body() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const { workspace } = useWorkspaceStore();
  const { projects } = useWorkspaceContext();

  const { isSidebarOpen } = useSidebarContext();
  const { openModal } = useModalContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    setIsLoaded(true);
  }, []);

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

        {workspace.map((ws) => {
          return (
            <div key={ws.ws_id} className="flex flex-col gap-[8px] self-stretch transition-all duration-500">
              <div
                className={clsx("flex w-full min-h-[37px] p-[8px] items-center self-stretch rounded-[8px] cursor-pointer", {
                  "gap-[8px]": isSidebarOpen,
                })}
                onClick={() => { }}
              >
                <div className="flex justify-center items-center min-w-[24px] self-stretch">
                  {/* <Avatar
                      name={ws.ws_name[0]}
                      classNames={{ base: "w-[20px] h-[20px] rounded-[3px] bg-yellow-active", name: "text-base text-[10px] text-yellow-light-active" }}
                    /> */}
                  <Icon icon={ws.ws_icon} height={20} color={"#090b0e"} />
                </div>

                {isSidebarOpen && (
                  <div className="flex flex-1 whitespace-nowrap overflow-hidden">
                    {ws.ws_name}
                  </div>
                )}
              </div>

              {ws.projects.map((proj) => {
                const isActive = pathname === `/project/${proj.proj_id}`;

                return (
                  <div key={proj.proj_id} className="flex flex-col gap-[8px]">
                    <div
                      className={
                        clsx(["flex w-full min-h-[37px] p-[8px] pl-[16px] items-center self-stretch rounded-[8px] cursor-pointer"], {
                          "gap-[8px]": isSidebarOpen,
                          "font-semibold bg-[#F9E9B8]": isActive
                        })}
                      onClick={() => { router.push(`/project/${proj.proj_id}`) }}
                    >
                      <div className="flex justify-center items-center min-w-[24px] self-stretch">
                        {isLoaded && (
                          <Icon icon={proj.proj_icon} height={20} color={"#090b0e"} />
                        )}
                      </div>

                      {isSidebarOpen && (
                        <div className="flex flex-1 whitespace-nowrap overflow-hidden">
                          {proj.proj_name}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex px-[16px] self-stretch">
        <Divider />
      </div>

      <AddWorkspace />
    </div >
  );
}

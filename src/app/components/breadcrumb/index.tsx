"use client";

import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Input, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EditIcon from "./edit-icon";
import { useWorkspaceContext } from "@/app/contexts/workspace";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { projects } = useWorkspaceContext();
  const [isProject, setIsProject] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModalContext();

  const convertPathname = (str: string) => {
    const currentMenu = str.split("/")[1];
    const segments = currentMenu.replace(/^\//, "").split("-");
    return segments.map((segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1)).join(" ");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsProject(pathname.includes("/project"));
    }
  }, [pathname]);

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Breadcrumbs>
      <BreadcrumbItem classNames={{ base: "p-0 m-0" }}>
        {!isProject && (
          <div
            className="flex pl-[10px] pr-[12px] py-[5px] items-center gap-[8px] rounded-[8px]"
          >
            <span className="text-[20px] font-bold">
              {convertPathname(pathname)}
            </span>
          </div>
        )}

        {isProject && (
          <Popover placement="bottom-start" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} classNames={{ content: "w-[200px] p-[5px] rounded-[8px] border-white-active bg-white drop-shadow-sm" }}>
            <PopoverTrigger disabled={!isProject} className="aria-expanded:opacity-100 aria-expanded:scale-1 aria-expanded:bg-yellow-light-active">
              <div role="button" className="flex pl-[10px] pr-[12px] py-[5px] items-center gap-[8px] rounded-[8px]">
                <Icon icon={projects[0].icon} height={24} color={projects[0].iconColor} />

                <span className="text-[20px] font-bold">
                  {projects[0].name}
                </span>
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-[5px] rounded-[8px] border border-white-active bg-white drop-shadow-sm">
              <Listbox classNames={{ base: "p-0", list: "gap-0" }} aria-label="Action">
                <ListboxItem key="rename" onPress={() => { openModal("renameProject"); setIsOpen(false); }} classNames={{ base: "px-[10px] py-[8px] data-[focus=true]:bg-white data-[hover=true]:bg-yellow-light-active" }}>
                  <div className="flex items-center gap-[8px] flex-1">
                    <Icon icon="solar:pen-linear" height={16} />
                    <div className="flex flex-1">Rename</div>
                  </div>
                </ListboxItem>

                <ListboxItem key="copy-link" onPress={handleCopy} classNames={{ base: "p-0 px-[10px] py-[8px] data-[focus=true]:bg-white data-[hover=true]:bg-yellow-light-active" }}>
                  <div className="flex items-center gap-[8px] flex-1">
                    <Icon icon="solar:link-linear" height={16} />
                    <div className="flex flex-1">
                      {copied ? "Copied!" : "Copy Link"}
                    </div>
                  </div>
                </ListboxItem>

                <ListboxItem key="color-icon" classNames={{ base: "p-0 px-[10px] py-[8px] data-[focus=true]:bg-white data-[hover=true]:bg-yellow-light-active" }}>
                  <Popover placement="right-start">
                    <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                      <div className="flex items-center gap-[8px] flex-1">
                        <Icon icon="solar:pallete-2-outline" height={16} />
                        <div className="flex flex-1">Color & Icon</div>
                        <Icon icon="solar:alt-arrow-right-linear" height={16} />
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[200px] ml-[10px] p-[15px] rounded-[8px] border border-white-active bg-white drop-shadow-sm">
                      <EditIcon />
                    </PopoverContent>
                  </Popover>
                </ListboxItem>

                <ListboxItem key="setting" classNames={{ base: "p-0 px-[10px] py-[8px] data-[focus=true]:bg-white data-[hover=true]:bg-yellow-light-active" }}>
                  <Popover placement="right-start">
                    <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                      <div className="flex items-center gap-[8px] flex-1">
                        <Icon icon="solar:settings-linear" height={16} />
                        <div className="flex flex-1">Setting</div>
                        <Icon icon="solar:alt-arrow-right-linear" height={16} />
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[200px] ml-[10px] p-[5px] rounded-[8px] border border-white-active bg-white drop-shadow-sm">
                      <div className="flex flex-col self-stretch">
                        <Button
                          variant="light"
                          disableAnimation={true}
                          disableRipple={true}
                          children={
                            <div className="flex items-center gap-[8px] flex-1">
                              <Icon icon="solar:notification-unread-lines-linear" height={16} />

                              <div className="flex flex-1">
                                Project Statuses
                              </div>
                            </div>
                          }
                          className={"px-[10px] py-[8px] rounded-[8px] data-[focus-visible=true]:outline-yellow-light-active data-[hover=true]:bg-yellow-light-active"}
                        />

                        <Button
                          variant="light"
                          disableAnimation={true}
                          disableRipple={true}
                          children={
                            <div className="flex items-center gap-[8px] flex-1">
                              <Icon icon="solar:pen-new-square-linear" height={16} />

                              <div className="flex flex-1">
                                Custom Fields
                              </div>
                            </div>
                          }
                          className={"px-[10px] py-[8px] rounded-[8px] data-[focus-visible=true]:outline-yellow-light-active data-[hover=true]:bg-yellow-light-active"}
                        />

                        <Button
                          variant="light"
                          disableAnimation={true}
                          disableRipple={true}
                          onPress={() => { openModal("shareProject"); setIsOpen(false); }}
                          children={
                            <div className="flex items-center gap-[8px] flex-1">
                              <Icon icon="solar:link-linear" height={16} />

                              <div className="flex flex-1">
                                Sharing & Permissions
                              </div>
                            </div>
                          }
                          className={"px-[10px] py-[8px] rounded-[8px] data-[focus-visible=true]:outline-yellow-light-active data-[hover=true]:bg-yellow-light-active"}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </ListboxItem>

                <ListboxItem key="move" classNames={{ base: "p-0 px-[10px] py-[8px] data-[focus=true]:bg-white data-[hover=true]:bg-yellow-light-active" }}>
                  <Popover placement="right-start">
                    <PopoverTrigger className="aria-expanded:opacity-100 aria-expanded:scale-1">
                      <div className="flex items-center gap-[8px] flex-1">
                        <Icon icon="solar:login-3-linear" height={16} />
                        <div className="flex flex-1">Move</div>
                        <Icon icon="solar:alt-arrow-right-linear" height={16} />
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-[280px] ml-[10px] p-0 rounded-[8px] border border-white-active bg-white drop-shadow-sm">
                      <div className="flex flex-col self-stretch">
                        <Input
                          labelPlacement="outside"
                          startContent={
                            <Icon icon="solar:magnifer-linear" />
                          }
                          placeholder={
                            "Search"
                          }
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
                              "placeholder:text-grey-light-active placeholder:text-base",
                              "group-data-[invalid=true]:!text-grey-dark-active",
                              "group-data-[disabled=true]:!text-grey-light-active",
                            ],
                            inputWrapper: [
                              "h-[46px]",
                              "p-[14px]",
                              "bg-white-hover",
                              "rounded-t-[8px] rounded-b-[0px]",
                              "group-data-[hover=true]:bg-white-hover",
                              "group-data-[focus=true]:bg-white-hover",
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

                        <ul className="flex flex-col self-stretch">
                          <li className="group flex p-[8px] items-center gap-[8px]">
                            <Avatar
                              name="R"
                              classNames={{ base: "w-[20px] h-[20px] rounded-[3px] bg-yellow-100", name: "text-base text-[10px] text-yellow-600" }}
                            />
                            <div className="flex items-center flex-1">RnD 2</div>
                            <div className="flex items-center opacity-0 group-hover:opacity-100">
                              <Icon icon="solar:menu-dots-bold" size={16} />
                            </div>
                          </li>

                          <li className="group flex p-[8px] items-center gap-[8px]">
                            <Avatar
                              name="R"
                              classNames={{ base: "w-[20px] h-[20px] rounded-[3px] bg-red-light-active", name: "text-base text-[10px] text-red" }}
                            />
                            <div className="flex items-center flex-1">RnD 3</div>
                            <div className="flex items-center opacity-0 group-hover:opacity-100">
                              <Icon icon="solar:menu-dots-bold" size={16} />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                </ListboxItem>

                <ListboxItem key="duplicate" onPress={() => { openModal("duplicateProject"); setIsOpen(false); }} classNames={{ base: "px-[10px] py-[8px] data-[focus=true]:bg-white data-[hover=true]:bg-yellow-light-active" }}>
                  <div className="flex items-center gap-[8px] flex-1">
                    <Icon icon="solar:notes-linear" height={16} />
                    <div className="flex flex-1">Duplicate</div>
                  </div>
                </ListboxItem>

                <ListboxItem key="archive" onPress={() => { openModal("archiveProject"); setIsOpen(false); }} classNames={{ base: "px-[10px] py-[8px] data-[focus=true]:bg-white data-[hover=true]:bg-yellow-light-active" }}>
                  <div className="flex items-center gap-[8px] flex-1">
                    <Icon icon="solar:archive-linear" height={16} />
                    <div className="flex flex-1">Archive</div>
                  </div>
                </ListboxItem>

                <ListboxItem key="delete" onPress={() => { openModal("deleteProject"); setIsOpen(false); }} classNames={{ base: "px-[10px] py-[8px] text-red data-[focus=true]:bg-white data-[hover=true]:text-red data-[hover=true]:bg-red-light" }}>
                  <div className="flex items-center gap-[8px] flex-1">
                    <Icon icon="solar:trash-bin-trash-linear" height={16} />
                    <div className="flex flex-1">Delete</div>
                  </div>
                </ListboxItem>
              </Listbox>
            </PopoverContent>
          </Popover>
        )}
      </BreadcrumbItem>
    </Breadcrumbs >
  );
}

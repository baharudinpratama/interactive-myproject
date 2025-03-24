"use client";

import { Icon } from "@iconify-icon/react";
import { Button, Checkbox, cn, Switch } from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";

export default function Page() {
  const views = [
    { id: "view-list", name: "List", icon: "solar:checklist-linear" },
    { id: "view-calendar-fullcalendar", name: "Calendar", icon: "solar:calendar-linear" },
  ];

  const [currentView, setCurrentView] = useState("view-list");

  return (
    <>
      <div className="flex justify-between items-center self-stretch border-b overflow-auto">
        <div className="flex items-center self-stretch">
          {views.map((view) => (
            <div
              key={view.id}
              onClick={() => { setCurrentView(view.id); }}
              className={clsx("flex px-[16px] py-[8px] items-center gap-[8px] self-stretch cursor-pointer", {
                "font-semibold border-b-[1.5px] border-yellow-500": currentView === view.id,
              })}>
              <Icon icon={view.icon} height={16} style={{ strokeWidth: currentView === view.id ? 1.5 : 1 }} />
              <div className="flex flex-nowrap min-w-max items-center self-stretch">
                {view.name}
              </div>
            </div>
          ))}
        </div>

        <div className="flex">
          <div className="flex px-[16px] py-[8px] items-center self-stretch">
            <Switch
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full items-center",
                  "justify-between cursor-pointer rounded-[100px] gap-[4px] px-[8px] border border-light-secondary bg-light-primary",
                ),
                wrapper: "px-[2px] py-[4px] w-[20px] h-[12px] group-data-[focus-visible=true]:ring-1 group-data-[focus-visible=true]:ring-yellow group-data-[selected=true]:bg-yellow mr-0",
                label: "min-w-[80px]",
                thumb: cn(
                  "w-[8px] h-[8px]",
                  "group-data-[hover=true]:border-yellow",
                  "group-data-[pressed=true]:w-[8px]",
                  "group-data-[selected=true]:ml-[8px] rtl:group-data-[selected=true]:mr-[8px] group-data-[selected]:group-data-[pressed]:ml-[8px]",
                ),
              }}
            >
              <div className="flex text-[12px]">
                Complete task
              </div>
            </Switch>
          </div>

          <div className="flex px-[16px] py-[8px] items-center self-stretch">
            <Button
              fullWidth={false}
              disableAnimation={true}
              startContent={
                <Icon icon="solar:tag-linear" height={12} />
              }
              className="h-[24px] min-w-fit px-[8px] gap-[4px] rounded-[100px] border border-light-secondary bg-light-primary"
            >
              <div className="flex text-[12px]">
                Tags
              </div>
            </Button>
          </div>

          <div className="flex p-[16px] items-center gap-[8px] self-stretch">
            <Icon icon="solar:tuning-linear" height={16} /> Filter
          </div>
        </div>
      </div>

      <div className="flex w-full overflow-auto xs:px-[16px] xs:py-[16px] md:px-[240px] md:py-[16px] flex-1 gap-[16px]">
        <div className="flex w-full flex-col gap-[8px]">
          <div className="flex w-full flex-col p-[12px] gap-[16px] rounded-[8px] border border-light-secondary">
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <Checkbox radius="full"></Checkbox>
                Setup UI personal task
              </div>
              <div className="flex text-base text-dark-secondary">
                Build skeleton UI for personal task.
              </div>
            </div>

            <div className="flex">
              <Button
                fullWidth={false}
                disableAnimation={true}
                startContent={
                  <Icon icon="solar:calendar-linear" height={14} />
                }
                className="h-[24px] min-w-fit px-[8px] gap-[4px] rounded-[100px] border border-light-secondary bg-light-primary"
              >
                <div className="flex text-[12px] text-[#008F5D]">
                  Sep 10 - Sep 30
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

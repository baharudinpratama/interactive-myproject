"use client";

import Board from "@/app/components/project/board/board";
import DemoApp from "@/app/components/project/calendar/fullcalendar/calendar-fullcalendar";
import CreateTask from "@/app/components/project/create-task";
import DeleteTask from "@/app/components/project/delete-task";
import GanttMatematuk from "@/app/components/project/gantt/matematuk/gantt";
import List from "@/app/components/project/list";
import Overview from "@/app/components/project/overview/overview";
import Workload from "@/app/components/project/workload";
import { useProjectStore } from "@/lib/store/project-store";
import { Divider } from "@heroui/divider";
import { Tab, Tabs } from "@heroui/tabs";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: { id: string }
}) {
  const { fetchProject } = useProjectStore();

  useEffect(() => {
    fetchProject(params.id);
  }, []);

  const views = [
    { id: "view-overview", name: "Overview", icon: "solar:calendar-search-linear" },
    { id: "view-list", name: "List", icon: "solar:checklist-linear" },
    { id: "view-board", name: "Board", icon: "solar:align-top-linear" },
    { id: "view-calendar-fullcalendar", name: "Calendar", icon: "solar:calendar-linear" },
    { id: "view-gantt-matematuk", name: "Gantt", icon: "solar:align-left-linear" },
    { id: "view-workload", name: "Workload", icon: "solar:spedometer-low-broken" },
  ];

  const [currentView, setCurrentView] = useState("view-overview");

  return (
    <>
      <div className="flex justify-between items-center self-stretch border-b">
        <div className="flex items-center max-w-full self-stretch overflow-auto">
          <Tabs
            aria-label="Views"
            variant="underlined"
            color="warning"
            selectedKey={currentView}
            onSelectionChange={key => setCurrentView(key.toString())}
            classNames={{
              tabList: "p-0 pl-[22px]",
              tab: "p-0",
              tabContent: "group-data-[selected=true]:text-foreground",
            }}
          >
            {views.map(view => {
              return (
                <Tab key={view.id} title={
                  <div className="flex px-[16px] py-[8px] items-center gap-[8px] self-stretch cursor-pointer">
                    <Icon icon={view.icon} />
                    <div className="flex flex-nowrap min-w-max items-center self-stretch">
                      {view.name}
                    </div>
                  </div>
                }>
                </Tab>
              );
            })}
          </Tabs>
          <div className="flex py-[8px] self-stretch">
            <Divider orientation="vertical" />
          </div>
          <div className="flex px-[16px] py-[8px] items-center gap-[8px] self-stretch cursor-pointer">
            <Icon icon="heroicons:plus" height={14} style={{ color: "#B2BBC6" }} />
            <div className="flex h-full items-center self-stretch text-grey-lighter">
              View
            </div>
          </div>
          {/* <div className="flex max-w-[800px] items-center self-stretch overflow-x-auto">
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
          </div> */}
        </div>
      </div>

      <div className="flex flex-col overflow-auto p-[16px] items-start gap-[16px] flex-1 self-stretch">
        {currentView === "view-overview" && (
          <Overview />
        )}
        {currentView === "view-list" && (
          <List />
        )}
        {currentView === "view-board" && (
          <Board />
        )}
        {currentView === "view-calendar-fullcalendar" && (
          <div className="flex self-stretch">
            <div className="size-full">
              <DemoApp />
            </div>
          </div>
        )}
        {currentView === "view-gantt-matematuk" && (
          <GanttMatematuk />
        )}
        {currentView === "view-workload" && (
          <Workload />
        )}
      </div>

      <CreateTask />
      <DeleteTask />
    </>
  );
}

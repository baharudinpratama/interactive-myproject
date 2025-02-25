"use client";

import Board from "@/app/[locale]/components/project/board/board";
import DemoApp from "@/app/[locale]/components/project/calendar/fullcalendar/calendar-fullcalendar";
import CreateTask from "@/app/[locale]/components/project/create-task";
import DeleteTask from "@/app/[locale]/components/project/delete-task";
import GanttMatematuk from "@/app/[locale]/components/project/gantt/matematuk/gantt";
import List from "@/app/[locale]/components/project/list";
import Overview from "@/app/[locale]/components/project/overview/overview";
import Workload from "@/app/[locale]/components/project/workload";
import { Icon } from "@iconify-icon/react";
import { Divider } from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";
// import { default as DHTMLXCalendar, getData } from "@/app/components/project/calendar/dhtmlx/calendar-dhtmlx";
// import Calendar from "@/app/components/project/calendar/syncfusion/calendar";
// import GanttView from "@/app/components/project/gantt/dhtmlx/gantt";
// import GanttSyncfusion from "@/app/components/project/gantt/syncfusion/gantt";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const views = [
    { id: "view-overview", name: "Overview", icon: "solar:calendar-search-linear" },
    { id: "view-list", name: "List", icon: "solar:checklist-linear" },
    { id: "view-board", name: "Board", icon: "solar:align-top-linear" },
    { id: "view-calendar-fullcalendar", name: "Calendar", icon: "solar:calendar-linear" },
    { id: "view-gantt-matematuk", name: "Gantt", icon: "solar:align-left-linear" },
    { id: "view-workload", name: "Workload", icon: "solar:spedometer-low-broken" },
    // { id: "view-calendar-dhtmlx", name: "Calendar DHTMLX", icon: "solar:calendar-linear" },
    // { id: "view-calendar-syncfusion", name: "Calendar Syncfusion", icon: "solar:calendar-linear" },
    // { id: "view-gantt-dhtmlx", name: "Gantt DHTMLX", icon: "solar:align-left-linear" },
    // { id: "view-gantt-syncfusion", name: "Gantt Syncfusion", icon: "solar:align-left-linear" },
  ];

  const [currentView, setCurrentView] = useState("view-overview");

  return (
    <>
      <div className="flex justify-between items-center self-stretch border-b">
        <div className="flex items-center self-stretch">
          <div className="flex max-w-[800px] items-center self-stretch overflow-x-auto">
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
          <div className="flex py-[8px] self-stretch">
            <Divider orientation="vertical" />
          </div>
          <div className="flex px-[16px] py-[8px] items-center gap-[8px] self-stretch">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M11 6.00004L6 6.00004M6 6.00004L1 6.00004M6 6.00004L6 1M6 6.00004L6 11" stroke="#B2BBC6" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
            <div className="flex h-full items-center self-stretch text-grey-lighter">
              View
            </div>
          </div>
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
        {/* {currentView === "view-calendar-dhtmlx" && (
          <DHTMLXCalendar events={getData()} date={new Date()} />
        )} */}
        {/* {currentView === "view-calendar-syncfusion" && (
          <Calendar />
        )} */}
        {/* {currentView === "view-gantt-dhtmlx" && (
          <GanttView />
        )} */}
        {/* {currentView === "view-gantt-syncfusion" && (
          <GanttSyncfusion />
        )} */}
      </div>

      <CreateTask />
      <DeleteTask />
    </>
  );
}

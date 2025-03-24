"use client";

import { useSidebarContext } from "@/app/contexts/sidebar";
import clsx from "clsx";
import Body from "./body";
import Header from "./header";
import HelpButton from "./help-button";

export default function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <aside className={clsx("flex flex-col items-start self-stretch border-r bg-yellow duration-500 overflow-auto", {
      "w-[242px]": isSidebarOpen,
      "w-[56px] ": !isSidebarOpen,
    })}>
      <Header />
      <Body />
      <HelpButton />
    </aside>
  );
}

"use client";

import { useSidebarContext } from "@/app/contexts/sidebar";
import clsx from "clsx";
import Body from "./body";
import Header from "./header";
import HelpButton from "./help-button";

export default function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <aside className={clsx("flex flex-col min-h-screen h-full items-start border-r bg-yellow duration-500 overflow-auto", {
      "sm:min-w-[56px] md:min-w-[242px]": isSidebarOpen,
      "w-0": !isSidebarOpen,
    })}>
      <Header />
      <Body />
      <HelpButton />
    </aside>
  );
}

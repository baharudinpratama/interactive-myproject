import { useSidebarContext } from "@/app/contexts/sidebar";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";

export default function HelpButton() {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <div className={clsx("absolute size-[40px] rounded-full bg-yellow-light-active shadow-lg transform transition-all duration-500", {
      "bottom-[16px] left-[16px]": isSidebarOpen,
      "bottom-[8px] left-[8px]": !isSidebarOpen,
    })}>
      <button className="flex size-full justify-center items-center flex-1 self-stretch">
        <Icon icon="solar:question-circle-linear" width={20} />
      </button>
    </div>
  );
}

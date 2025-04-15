import { useSidebarContext } from "@/app/contexts/sidebar";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();

  return (
    <div className={clsx("flex min-h-[75px] p-[16px] py-[11px] items-center self-stretch transition-all duration-500", {
      "gap-[8px]": isSidebarOpen,
    })}>
      <div
        className={clsx("flex justify-center items-center flex-1 transition-all duration-500 cursor-pointer", {
          "max-w-full": isSidebarOpen,
          "max-w-0": !isSidebarOpen,
        })}
        onClick={() => router.push("/dashboard")}
      >
        <Image src={"/logo-myproject-white.png"} alt={"logo-myproject"} width={170} height={52} priority />
      </div>

      <button type="button" onClick={toggleSidebar} className="duration-500">
        {isSidebarOpen ? <Icon icon="solar:sidebar-code-linear" height={16} /> : <Image src={"/icon-myproject-rounded.png"} alt={""} width={23} height={23} />}
      </button >
    </div>
  );
}

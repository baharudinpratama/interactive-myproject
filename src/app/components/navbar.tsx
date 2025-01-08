import Breadcrumb from "@/app/components/breadcrumb";
import { Icon } from "@iconify-icon/react";
import { Avatar } from "@nextui-org/react";

export default function Navbar() {
  return (
    <div className="flex p-[16px] items-center gap-[16px] self-stretch border-b border-white-active">
      <div className="flex flex-1">
        <Breadcrumb />
      </div>

      <div className="flex p-[6px] items-center gap-[6px] rounded-full bg-white-active">
        <Avatar
          name="IA"
          classNames={{ base: "w-[24px] h-[24px] bg-[#6985FF]", name: "text-base text-white" }}
        />
        <Icon icon="solar:alt-arrow-down-outline" size={18} />
      </div>
    </div>
  );
}

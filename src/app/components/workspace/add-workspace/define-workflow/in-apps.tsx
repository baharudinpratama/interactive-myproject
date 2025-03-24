import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Tooltip } from "@heroui/tooltip";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";
import { useState } from "react";

interface CustomCheckBox {
  value: string;
  label: string;
  icon: string;
  tooltipTitle: string;
  tooltipText: string;
}

export const CustomCheckbox = ({
  view
}: {
  view: CustomCheckBox
}) => {
  return (
    <Checkbox
      size="sm"
      value={view.value}
      disableAnimation={true}
      classNames={{
        base: clsx(
          "inline-flex w-full max-w-md m-0",
          "cursor-pointer rounded-[8px] gap-[8px] p-[10px] border border-white-active",
          "data-[selected=true]:border-yellow",
        ),
        wrapper: clsx(
          "mr-0 rtl:ml-0",
          "text-white after:text-white",
          "after:bg-yellow",
          "rounded-[4px] before:rounded-[4px] after:rounded-[4px]",
          "group-data-[focus-visible=true]:ring-yellow",
        ),
        label: clsx("w-full"),
      }}
    >
      <div className="flex items-center gap-[8px]">
        <div className="flex flex-1 items-center gap-[5px]">
          <Icon icon={view.icon} height={16} />
          {view.label}
        </div>

        <Tooltip showArrow={true} placement="right" delay={1000} classNames={{ content: "bg-[#FFF8F0] p-0 rounded-[8px]", arrow: "bg-[#FFF8F0]" }}
          content={
            <div className="flex flex-col max-w-[343px] p-[10px] rounded-[8px] bg-secondary">
              <span className="text-[10px] font-semibold">{view.tooltipTitle}</span>
              <p className="text-[10px] text-grey leading-4 text-justify">{view.tooltipText}</p>
            </div>
          }
        >
          <div className="flex">
            <Icon icon="solar:info-circle-bold" size={16} style={{ color: "var(--yellow)" }} />
          </div>
        </Tooltip>
      </div>
    </Checkbox>
  );
}

export default function InApps() {
  const fetchedInApps = [
    { id: "custom-field", name: "Custom Field", icon: "solar:pen-new-square-linear", tooltipTitle: "Custom Field", tooltipText: "Add Custom Fields to your tasks to literally use Interactive MyProject for anything: dates, phone numbers, emails, drop-downs, checkboxes, links, currencies, and numbers." },
    { id: "tags", name: "Tags", icon: "solar:tag-linear", tooltipTitle: "", tooltipText: "" },
    { id: "priority", name: "Priority", icon: "solar:flag-2-linear", tooltipTitle: "", tooltipText: "" },
    { id: "time-estimate", name: "Time Estimate", icon: "solar:hourglass-line-outline", tooltipTitle: "", tooltipText: "" },
    { id: "multi-assigness", name: "Multi Assigness", icon: "solar:users-group-two-rounded-linear", tooltipTitle: "", tooltipText: "" },
    { id: "fixed-task", name: "Fixed Task", icon: "solar:checklist-linear", tooltipTitle: "", tooltipText: "" },
    { id: "master-product", name: "Master Product", icon: "solar:list-up-bold", tooltipTitle: "", tooltipText: "" },
    { id: "master-customer", name: "Master Customer", icon: "solar:list-down-bold", tooltipTitle: "", tooltipText: "" },
  ];
  const [selectedInApps, setSelectedInApps] = useState([""]);

  return (
    <div className="flex flex-col min-h-[184px]">
      <CheckboxGroup
        label="Enable InApps"
        value={selectedInApps}
        onValueChange={setSelectedInApps}
        classNames={{
          label: "text-base text-[grey-dark-active]",
        }}
      >
        <div className="grid grid-cols-2 gap-[16px]">
          {fetchedInApps.map(item => {
            return (
              <CustomCheckbox
                key={item.id}
                view={{
                  value: `${item.id}`,
                  label: `${item.name}`,
                  icon: `${item.icon}`,
                  tooltipTitle: `${item.tooltipTitle}`,
                  tooltipText: `${item.tooltipText}`,
                }}
              />
            );
          })}
        </div>
      </CheckboxGroup>
    </div>
  );
}

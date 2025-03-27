import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Switch } from "@heroui/switch";
import { Icon } from "@iconify-icon/react";
import clsx from "clsx";
import { useState } from "react";

interface CustomCheckBox {
  value: string;
  label: string;
  icon: string;
  isDefault: boolean;
}

export const CustomCheckbox = ({
  view,
  onDefaultChange
}: {
  view: CustomCheckBox;
  onDefaultChange: (value: string) => void;
}) => {
  const handleSwitchClick = () => {
    onDefaultChange(view.value);
  };

  return (
    <div key={`view-${view.value}`} className="relative">
      <Checkbox
        size="sm"
        value={view.value}
        disableAnimation={true}
        classNames={{
          base: clsx(
            "inline-flex w-full max-w-md m-0",
            "cursor-pointer rounded-[8px] gap-[10px] p-[10px] border border-white-active",
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
        <div className="flex items-center gap-[10px]">
          <div className="flex flex-1 items-center gap-[5px]">
            <Icon icon={view.icon} height={16} />
            {view.label}
          </div>

          {view.isDefault && (
            <div className="flex items-center">
              Default View
            </div>
          )}

          <div className="flex w-[28px] h-[16px]" />
        </div>
      </Checkbox>

      <div className="absolute right-1 top-[12px]">
        <Switch
          isSelected={view.isDefault}
          onValueChange={handleSwitchClick}
          aria-label={`Set ${view.label} as default view`}
          classNames={{
            wrapper: "px-[2px] py-[4px] w-[28px] h-[16px] group-data-[focus-visible=true]:ring-yellow group-data-[selected=true]:bg-yellow",
            thumb: [
              "w-[12px] h-[12px]",
              "group-data-[hover=true]:border-yellow",
              "group-data-[pressed=true]:w-[12px]",
              "group-data-[selected=true]:ml-[12px] rtl:group-data-[selected=true]:mr-[12px] group-data-[selected]:group-data-[pressed]:ml-[12px]",
            ],
          }}
        />
      </div>
    </div>
  );
}

export default function AdvancedViews() {
  const [selectedViews, setSelectedViews] = useState(["list"]);
  const [defaultView, setDefaultView] = useState("list");

  const handleSelectView = (views: string[]) => {
    if (views.length === 0 || !views.includes(defaultView)) {
      return;
    }
    setSelectedViews(views);
  }

  const handleDefaultChange = (value: string) => {
    if (selectedViews.includes(value)) {
      setDefaultView(value);
    }
  }

  return (
    <div className="flex flex-col min-h-[184px]">
      <CheckboxGroup
        label="Advanced Views"
        value={selectedViews}
        onValueChange={handleSelectView}
        classNames={{
          label: "text-base text-[grey-dark-active]",
        }}
      >
        <CustomCheckbox
          view={{
            value: "list",
            label: "List",
            icon: "heroicons:list-bullet",
            isDefault: "list" === defaultView
          }}
          onDefaultChange={handleDefaultChange}
        />
        <CustomCheckbox
          view={{
            value: "board",
            label: "Board",
            icon: "solar:align-top-linear",
            isDefault: "board" === defaultView
          }}
          onDefaultChange={handleDefaultChange}
        />
        <CustomCheckbox
          view={{
            value: "calendar",
            label: "Calendar",
            icon: "solar:calendar-minimalistic-linear",
            isDefault: "calendar" === defaultView
          }}
          onDefaultChange={handleDefaultChange}
        />
        <CustomCheckbox
          view={{
            value: "gantt",
            label: "Gantt",
            icon: "solar:align-left-linear",
            isDefault: "gantt" === defaultView
          }}
          onDefaultChange={handleDefaultChange}
        />
        <CustomCheckbox
          view={{
            value: "workload",
            label: "Workload",
            icon: "solar:spedometer-low-broken",
            isDefault: "workload" === defaultView
          }}
          onDefaultChange={handleDefaultChange}
        />
      </CheckboxGroup>
    </div>
  );
}

import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="flex px-[16px] py-[8px] items-center gap-[10px]">
      <button
        className="px-[8px] py-[4px] border-[1px] rounded-[8px]"
        onClick={() => onViewModeChange(ViewMode.Hour)}
      >
        Hour
      </button>
      {/* <button
        className="px-[8px] py-[4px] border-[1px] rounded-[8px]"
        onClick={() => onViewModeChange(ViewMode.QuarterDay)}
      >
        Quarter of Day
      </button> */}
      {/* <button
        className="px-[8px] py-[4px] border-[1px] rounded-[8px]"
        onClick={() => onViewModeChange(ViewMode.HalfDay)}
      >
        Half of Day
      </button> */}
      <button
        className="px-[8px] py-[4px] border-[1px] rounded-[8px]"
        onClick={() => onViewModeChange(ViewMode.Day)}
      >
        Day
      </button>
      <button
        className="px-[8px] py-[4px] border-[1px] rounded-[8px]"
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Week
      </button>
      <button
        className="px-[8px] py-[4px] border-[1px] rounded-[8px]"
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </button>
      {/* <button
        className="px-[8px] py-[4px] border-[1px] rounded-[8px]"
        onClick={() => onViewModeChange(ViewMode.Year)}
      >
        Year
      </button> */}
      {/* <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div> */}
    </div>
  );
};

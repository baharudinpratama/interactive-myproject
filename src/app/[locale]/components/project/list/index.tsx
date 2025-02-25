import MyButton from "@/app/[locale]/components/button";
import CreateTask from "@/app/[locale]/components/project/create-task";
import TaskDetail from "@/app/[locale]/components/project/task-detail";
import { useModalContext } from "@/app/contexts/modal";
import { Icon } from "@iconify-icon/react";
import { Avatar, Image } from "@nextui-org/react";
import { useState } from "react";

export default function List() {
  const { openModal } = useModalContext();
  const [isEmpty, setIsEmpty] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      {isEmpty && (
        <div className="flex w-full h-full px-[80px] flex-col justify-center items-center gap-[30px]">
          <Image src="/empty-box.svg" height={310} />
          <div className="flex flex-col items-center gap-[15px]">
            <div className="flex flex-col items-center">
              <span className="text-base !text-[25px] font-semibold">This Space is empty</span>
              <span className="text-base !text-[20px]">Create a List to get Started</span>
            </div>
            <MyButton
              color="yellow"
              size="lg"
              children="Create List"
              onPress={() => openModal("createTask")}
              className="px-[30px]"
            />
          </div>
        </div>
      )}

      {!isEmpty && (
        <div className="flex flex-col self-stretch gap-[8px]">
          <div role="button" className="flex items-center self-stretch gap-[8px]" onClick={() => setIsExpanded(prev => !prev)}>
            {isExpanded ? (
              <Icon icon="solar:alt-arrow-down-bold" height={20} style={{ color: "#B2BBC6" }} />
            ) : (
              <Icon icon="solar:alt-arrow-right-bold" height={20} style={{ color: "#B2BBC6" }} />
            )}
            <div className="flex px-[8px] item-center gap-[8px] rounded-[5px] bg-white-hover">
              <div className="flex items-center">
                <Icon icon="solar:record-circle-filled-linear" height={16} style={{ color: "#B2BBC6" }} />
              </div>
              <div className="flex items-center text-grey-lighter">
                TO DO
              </div>
            </div>
            <div className="flex items-center text-grey-lighter">
              1
            </div>
            <Icon icon="solar:menu-dots-bold" height={21} style={{ color: "#B2BBC6" }} />
          </div>
          {isExpanded && (
            <div className="w-full grid grid-cols-4">
              <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Name</div>
              <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Assignee</div>
              <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Priority</div>
              <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Due date</div>

              <div className="p-[8px] items-center border-y border-white-active">Survey</div>
              <div className="p-[8px] items-center border-y border-white-active">
                <Avatar
                  name="I"
                  classNames={{ base: "w-[24px] h-[24px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
                />
              </div>
              <div className="p-[8px] items-center border-y border-white-active">
                <div className="flex items-center gap-[8px]">
                  <Icon icon="solar:flag-bold" height={16} style={{ color: "#F96E15" }} />
                  <span className="text-grey-dark-active">Normal</span>
                </div>
              </div>
              <div className="p-[8px] items-center border-y border-white-active">
                <span className="text-green">Dec 8, 2025</span>
              </div>

              <div className="p-[8px] h-[42px] col-span-4 items-center gap-[18px] border-b border-white-active text-grey-lighter cursor-pointer" onClick={() => openModal("createTask")}>
                + Add Task
              </div>
            </div>
          )}
        </div>
      )}

      {/* <CreateTask /> */}
      <TaskDetail setIsEmpty={setIsEmpty} />
    </>
  );
}

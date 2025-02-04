import MyButton from "@/app/components/button";
import CreateTask from "@/app/components/project/create-task";
import TaskDetail from "@/app/components/project/task-detail";
import { useModalContext } from "@/app/contexts/modal";
import { Image } from "@nextui-org/react";

export default function List() {
  const { openModal } = useModalContext();
  const isEmpty = true;

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
          <div className="flex items-center self-stretch gap-[8px]">
            Task list <span className="text-grey-light-active">(0)</span>
          </div>
          <div className="w-full grid grid-cols-4">
            <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Name</div>
            <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Assignee</div>
            <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Priority</div>
            <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Due date</div>

            <div className="p-[8px] h-[42px] col-span-4 items-center gap-[18px] border-b border-white-active text-grey-lighter cursor-pointer" onClick={() => openModal("createTask")}>
              + Add Task
            </div>
          </div>
        </div>
      )}

      <CreateTask />
      <TaskDetail />
    </>

  );
}

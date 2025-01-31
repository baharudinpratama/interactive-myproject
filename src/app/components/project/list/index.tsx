export default function List() {
  return (
    <div className="flex flex-col self-stretch gap-[8px]">
      <div className="flex items-center self-stretch gap-[8px]">
        Task list <span className="text-grey-light-active">(0)</span>
      </div>
      <div className="w-full grid grid-cols-4">
        <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Name</div>
        <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Assignee</div>
        <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Priority</div>
        <div className="p-[8px] items-center bg-white-dark border-y border-white-active text-grey-lighter">Due date</div>

        <div className="p-[8px] h-[42px] col-span-4 items-center gap-[18px] border-b border-white-active text-grey-lighter cursor-pointer">
          + Add Task
        </div>
      </div>
    </div>
  );
}

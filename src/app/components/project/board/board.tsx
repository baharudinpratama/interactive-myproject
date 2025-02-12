"use client";

import { useModalContext } from "@/app/contexts/modal";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, useDroppable } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify-icon/react";
import { Avatar } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import IconColumnTitle from "../icon-column-title";
import IconUser from "../icon-user";

type Id = string | number;

type Column = {
  id: Id;
  title: string;
  count: number;
  color: string;
};

type Task = {
  id: Id;
  columnId: Id;
  title: string;
  priority: string;
  priorityColor: string;
}

const TaskCard = ({ task }: { task: Task }) => {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: task.id,
    data: { task, type: "task" },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex flex-col w-full p-[8px] gap-[8px] rounded-[8px] bg-white">
      <span className="text-[16px] font-semibold">{task.title}</span>
      <div className="flex flex-col items-start self-stretch gap-[8px]">
        <div className="flex items-center gap-[10px]">
          <IconUser />
          <Avatar
            name="I"
            classNames={{ base: "w-[20px] h-[20px] bg-yellow-light-active", name: "text-base text-[10px] text-yellow-600" }}
          />
        </div>
        <div className="flex items-center gap-[10px]">
          <Icon icon="solar:calendar-linear" height={16} style={{ color: "#B2BBC6" }} />
          -
        </div>
        <div className="flex items-center gap-[10px]">
          <Icon icon="solar:flag-bold" height={16} style={{ color: task.priorityColor }} />
          {task.priority.toWellFormed()}
        </div>
      </div>
    </div>
  );
}

const ColumnItem = ({ column, tasks }: { column: Column, tasks: Task[] }) => {
  const { openModal } = useModalContext();
  const taskIds = useMemo(() => tasks.map(task => task.id), [tasks]);
  const { setNodeRef } = useDroppable({ id: column.id, data: { type: "column" } });

  return (
    <div ref={setNodeRef} className="flex flex-col min-w-[240px] min-h-[80px] p-[4px] items-start gap-[4px] rounded-[8px] bg-white-hover">
      <div className="flex items-center gap-[8px]">
        <div className={`flex px-[8px] py-[4px] items-center gap-[8px] rounded-[8px]`} style={{ backgroundColor: column.color }}>
          <IconColumnTitle />
          <span className="mix-blend-normal">{column.title}</span>
        </div>

        {column.count}
      </div>
      <div className="flex flex-col self-stretch gap-[4px]">
        <SortableContext items={taskIds}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      <div className="p-[8px] w-full items-center gap-[18px] text-grey-lighter cursor-pointer" onClick={() => openModal("createTask")}>
        + Add Task
      </div>
    </div>
  );
}

export default function Board() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "to-do", title: "TO DO", count: 2, color: "#B2BBC6" },
    { id: "on-going", title: "ON GOING", count: 2, color: "#F96E15" },
    { id: "review", title: "REVIEW", count: 0, color: "#54AF48" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: "task-1", columnId: "to-do", title: "Task 1", priority: "high", priorityColor: "#E20000" },
    { id: "task-2", columnId: "to-do", title: "Task 2", priority: "low", priorityColor: "#B2BBC6" },
    { id: "task-3", columnId: "on-going", title: "Task 3", priority: "high", priorityColor: "#E20000" },
    { id: "task-4", columnId: "on-going", title: "Task 4", priority: "normal", priorityColor: "#F96E15" },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.data.current?.task);
    return;
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (columns.some(col => col.id === over.id)) {
      setTasks(currentTasks => {
        return currentTasks.map(task =>
          task.id === active.id
            ? { ...task, columnId: over.id }
            : task
        );
      });
      return;
    }

    setTasks(tasks => {
      const activeTaskIndex = tasks.findIndex(task => task.id === active.id);
      const overTaskIndex = tasks.findIndex(task => task.id === over?.id);

      tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

      return arrayMove(tasks, activeTaskIndex, overTaskIndex);
    });
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const isOverColumn = over?.data.current?.type === "column";
    const isOverTask = over?.data.current?.type === "task";

    if (!over) return;

    if (isOverColumn) {
      setTasks(tasks => {
        const activeTaskIndex = tasks.findIndex(task => task.id === active.id);

        tasks[activeTaskIndex].columnId = over?.id;

        return arrayMove(tasks, activeTaskIndex, 0);
      });
    }

    if (isOverTask) {
      setTasks(tasks => {
        const activeTaskIndex = tasks.findIndex(task => task.id === active.id);
        const overTaskIndex = tasks.findIndex(task => task.id === over?.id);

        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }
  }

  return (
    <div className="flex flex-col flex-1 self-stretch bg-white">
      <div className="flex flex-col gap-[16px] flex-1 self-stretch">
        <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
          <div className="flex gap-[16px]">
            {columns.map(column => (<ColumnItem key={column.id} column={column} tasks={tasks.filter(task => task.columnId === column.id)} />))}
          </div>

          {createPortal(
            <DragOverlay>
              {activeTask && (
                <TaskCard task={activeTask} />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
}

"use client";

import MyButton from "@/app/components/button";
import { useModalContext } from "@/app/contexts/modal";
import type { Active, Over } from "@dnd-kit/core";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Icon } from "@iconify-icon/react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import IconColumnTitle from "../icon-column-title";
import IconUser from "../icon-user";
import { Status } from "@/lib/types/status";
import { useStatusStore } from "@/lib/store/status-store";

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
  const { openModal } = useModalContext();
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
      <div className="flex justify-between items-center">
        <span className="text-[16px] font-semibold">{task.title}</span>
        <div className="flex justify-center items-center" onClick={(e) => { e.stopPropagation(); openModal("deleteTask") }} >
          <Icon icon="solar:trash-bin-trash-linear" height={16} style={{ color: "#E20000" }} />
        </div>
      </div>
      <div className="grid grid-rows-3 grid-flow-col self-stretch gap-[8px]">
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
        <div className="flex items-center gap-[10px]">
          <Icon icon="solar:tag-linear" height={16} style={{ color: "#B2BBC6" }} />
          V 1.0
        </div>
        <div className="flex items-center gap-[10px]">
          <Icon icon="solar:map-point-linear" height={16} style={{ color: "#B2BBC6" }} />
          Surabaya
        </div>
        <div className="flex items-center gap-[10px]">
          <Icon icon="solar:dollar-minimalistic-linear" height={16} style={{ color: "#B2BBC6" }} />
          Rp. 50.000.000
        </div>
      </div>
    </div>
  );
}

const ColumnItem = ({ column, tasks }: { column: Status, tasks: Task[] }) => {
  const taskIds = useMemo(() => tasks.map(task => task.id), [tasks]);
  const { setNodeRef } = useDroppable({ id: column.stat_id, data: { type: "column" } });

  return (
    <div ref={setNodeRef} className="flex flex-col min-w-[240px] p-[4px] gap-[4px] rounded-[8px] bg-white-hover">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <div className={`flex px-[8px] py-[4px] items-center gap-[8px] rounded-[8px]`} style={{ backgroundColor: column.stat_color as string }}>
            <Icon icon={column.stat_icon ?? 'solar:record-bold-duotone'} height={16} style={{ color: "white" }} />
            <span className="mix-blend-normal text-white">{column.stat_name}</span>
          </div>

          <div className="flex">
            {/* {column.count} */}
          </div>
        </div>

        <div className="flex">
          <Button variant="light" size="sm" isIconOnly={true} fullWidth={false} >
            <Icon icon="solar:menu-dots-bold" height={16} />
          </Button>

          <Button variant="light" size="sm" isIconOnly={true} fullWidth={false} >
            <Icon icon="heroicons:plus" height={16} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-[4px]">
        <SortableContext items={taskIds}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      <div className="flex p-[8px] w-full items-end gap-[18px]">
        Total : Rp. 50.000.000
      </div>
    </div>
  );
}

export function ConfirmModal({ onCancel, onConfirm }:
  {
    onCancel: () => void,
    onConfirm: () => void
  }) {
  const { openModals } = useModalContext();

  return (
    <Modal isOpen={openModals["confirmModal"] ?? false} hideCloseButton={true} size="xs" className="w-[300px]">
      <ModalContent className="overflow-visible">
        <ModalBody className="px-[25px] py-[20px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-[8px] self-stretch">
                <div className="text-[16px] font-semibold">
                  Move
                </div>
                <div className="flex">
                  <Icon icon="solar:info-circle-bold" height={16} style={{ color: "var(--yellow)" }} />
                </div>
              </div>

              <div className="text-grey-lighter text-base font-normal">
                Are you sure to move this task?
              </div>
            </div>

            <div className="flex w-full justify-center items-center gap-[12px]">
              <MyButton
                variant="bordered"
                color="yellow"
                children="Cancel"
                onPress={onCancel}
                className="w-full px-[24px]"
              />
              <MyButton
                color="yellow"
                children="Continue"
                onPress={onConfirm}
                className="w-full px-[24px]"
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default function Board() {
  const { status, fetchStatus } = useStatusStore();
  const { openModal, closeAllModals } = useModalContext();

  const [columns, setColumns] = useState<Column[]>([
    { id: "to-do", title: "TO DO", count: 2, color: "#B2BBC6" },
    { id: "on-going", title: "ON GOING", count: 2, color: "#F96E15" },
    { id: "review", title: "REVIEW", count: 0, color: "#54AF48" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: "task-1", columnId: "2", title: "Task 1", priority: "high", priorityColor: "#E20000" },
    { id: "task-2", columnId: "2", title: "Task 2", priority: "low", priorityColor: "#B2BBC6" },
    { id: "task-3", columnId: "3", title: "Task 3", priority: "high", priorityColor: "#E20000" },
    { id: "task-4", columnId: "3", title: "Task 4", priority: "normal", priorityColor: "#F96E15" },
  ]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
  );

  const [activeTask, setActiveTask] = useState<Active | null>(null);
  const [taskDropOver, setTaskDropOver] = useState<Over | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active);
    console.log(event.active)
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
    const { over } = event;

    if (!over) return;

    setTaskDropOver(over);

    openModal("confirmModal");

    // if (isOverColumn) {
    //   setTasks(tasks => {
    //     const activeTaskIndex = tasks.findIndex(task => task.id === active.id);

    //     tasks[activeTaskIndex].columnId = over?.id;

    //     return arrayMove(tasks, activeTaskIndex, 0);
    //   });
    // }

    // if (isOverTask) {
    //   setTasks(tasks => {
    //     const activeTaskIndex = tasks.findIndex(task => task.id === active.id);
    //     const overTaskIndex = tasks.findIndex(task => task.id === over?.id);

    //     tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

    //     return arrayMove(tasks, activeTaskIndex, overTaskIndex);
    //   });
    // }
  }

  const handleMoveCancel = () => {
    setTasks(tasks => {
      const activeTaskIndex = tasks.findIndex(task => task.id === activeTask?.data.current?.task.id);

      tasks[activeTaskIndex].columnId = activeTask?.data.current?.task.columnId as string;

      return arrayMove(tasks, activeTask?.data.current?.sortable.index, activeTask?.data.current?.sortable.index as number);
    });
    closeAllModals();
  }

  const handleMoveConfirm = () => {
    // if (taskDropOver?.data.current?.type === "column") {
    //   setTasks(tasks => {
    //     const activeTaskIndex = tasks.findIndex(task => task.id === activeTask?.id);

    //     tasks[activeTaskIndex].columnId = taskDropOver?.id;

    //     return arrayMove(tasks, activeTaskIndex, 0);
    //   });
    // }

    console.log(tasks)
    // if (taskDropOver?.data.current?.type === "column") {
    //   setTasks(tasks => {
    //     const activeTaskIndex = tasks.findIndex(task => task.id === activeTask?.id);
    //     const overTaskIndex = tasks.findIndex(task => task.id === taskDropOver?.data.current?.id);

    //     tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

    //     return arrayMove(tasks, activeTaskIndex, overTaskIndex);
    //   });
    // }

    closeAllModals();
  }

  useEffect(() => {
    fetchStatus('1');
  }, []);

  return (
    <>
      <div className="flex flex-col flex-1 self-stretch bg-white">
        <div className="flex flex-col gap-[16px] flex-1 self-stretch">
          <DndContext onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} sensors={sensors}>
            <div className="flex h-full gap-[16px]">
              {/* {columns.map(column => (
                <ColumnItem key={column.id} column={column} tasks={tasks.filter(task => task.columnId === column.id)} />
              ))} */}

              {status?.map((status: Status) => {
                return (
                  <ColumnItem key={status.stat_id} column={status} tasks={tasks.filter(task => task.columnId == status.stat_id)} />
                );
              })}

              <div className="flex max-h-min p-[8px] items-center gap-[8px] cursor-pointer">
                <Icon icon="heroicons:plus" height={12} style={{ color: "#B2BBC6" }} />
                <div className="flex items-center text-base text-grey-lighter">
                  New Status
                </div>
              </div>
            </div>

            {createPortal(
              <DragOverlay>
                {activeTask && (
                  <TaskCard task={activeTask.data.current?.task} />
                )}
              </DragOverlay>,
              document.body
            )}

          </DndContext>
        </div>
      </div>

      <ConfirmModal onCancel={handleMoveCancel} onConfirm={handleMoveConfirm} />
    </>
  );
}

"use client";

import MyButton from "@/app/components/button";
import { Icon } from "@iconify-icon/react";
import { Avatar } from "@nextui-org/react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useState } from "react";
import { getStartEndDateForProject, initTasks } from "./helper";
import "./index.css";
import { ViewSwitcher } from "./view-switcher";

export default function GanttMatematuk() {
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // let columnWidth = 65;
  // if (view === ViewMode.Year) {
  //   columnWidth = 350;
  // } else if (view === ViewMode.Month) {
  //   columnWidth = 300;
  // } else if (view === ViewMode.Week) {
  //   columnWidth = 250;
  // }

  const handleAddTask = () => {
    const currentDate = new Date();
    const newTask = {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 14),
      name: "Doing something new",
      id: "Task 10",
      type: "task",
      progress: 0,
      dependencies: ["Task 4"],
      project: "ProjectSample",
      displayOrder: 6,
    } as Task
    setTasks((prevTasks) => {
      // Add the new task to the array
      const updatedTasks = [...prevTasks, newTask];

      // Sort tasks by `displayOrder`, ignoring undefined values
      updatedTasks.sort((a, b) => {
        if (a.displayOrder === undefined && b.displayOrder === undefined) {
          return 0; // Keep relative order if both are undefined
        }
        if (a.displayOrder === undefined) {
          return 1; // Place `a` after `b` if `a.displayOrder` is undefined
        }
        if (b.displayOrder === undefined) {
          return -1; // Place `b` after `a` if `b.displayOrder` is undefined
        }
        return a.displayOrder - b.displayOrder; // Sort normally if both are defined
      });

      return updatedTasks;
    });
  }

  const handleUpdateTask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTask?.id
          ? { ...task, progress: 100 }
          : task
      )
    );
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure delete " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDoubleClick = (task: Task) => {
    // alert("On Double Click event Id:" + task.id);
    handleTaskDelete(task);
  };

  const handleClick = (task: Task) => {
    // console.log(task);
    console.log(tasks);
    setSelectedTask(task);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div className="w-full">
      <div className="flex w-1/3 pb-3 gap-3">
        <MyButton onPress={() => handleAddTask()}>Add task</MyButton>
        <MyButton onPress={() => handleUpdateTask()}>Update task</MyButton>
      </div>
      <div className="flex justify-end">
        <ViewSwitcher
          onViewModeChange={viewMode => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />
      </div>
      {/* <h3>Gantt With Unlimited Height</h3> */}
      <div className="flex">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex border-y-[1px] h-[50px]">
            <div className="flex min-w-[155px] p-[8px] items-center">
              Name
            </div>
            <div className="flex min-w-[100px] p-[8px] items-center">
              Start Date
            </div>
            <div className="flex min-w-[100px] p-[8px] items-center">
              Due Date
            </div>
            <div className="flex min-w-[100px] p-[8px] items-center">
              Assignee
            </div>
          </div>
          {/* Body */}
          <div className="flex flex-col">
            {tasks.map(task => {
              return (
                <div key={task.id} className="flex border-b-[1px] h-[50px]">
                  <div className="flex min-w-[155px] max-w-[155px] p-[8px] items-center">
                    <div className="flex items-center gap-[4px]">
                      {task.type === "project" && <Icon icon="solar:alt-arrow-down-bold" />}
                      {task.name}
                    </div>
                  </div>
                  <div className="flex min-w-[100px] p-[8px] items-center">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(task.start)}
                  </div>
                  <div className="flex min-w-[100px] p-[8px] items-center">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(task.end)}
                  </div>
                  <div className="flex min-w-[100px] p-[8px] items-center">
                    <Avatar
                      name="IA"
                      classNames={{ base: "w-[20px] h-[20px] bg-[#ECEFFF]", name: "text-base text-[8px] text-[#6985FF]" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="max-w-[39rem]">
          <Gantt
            tasks={tasks}
            viewMode={view}
            onDateChange={handleTaskChange}
            onDelete={handleTaskDelete}
            onProgressChange={handleProgressChange}
            onDoubleClick={handleDoubleClick}
            onClick={handleClick}
            onSelect={handleSelect}
            onExpanderClick={handleExpanderClick}
            listCellWidth={isChecked ? "155px" : ""}
          // columnWidth={columnWidth}
          />
        </div>
      </div>
    </div>
  );
}

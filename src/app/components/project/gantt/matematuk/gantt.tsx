"use client";

import MyButton from "@/app/components/button";
import { useWorkspaceContext } from "@/app/contexts/workspace";
import { Icon } from "@iconify-icon/react";
import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from "react";
import { getStartEndDateForProject } from "./helper";
import "./index.css";
import { ViewSwitcher } from "./view-switcher";
import clsx from "clsx";

export default function GanttMatematuk() {
  const { workspaces, projects, tasks, getTaskById, addTask, updateTask, deleteTask } = useWorkspaceContext();
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [formattedTasks, setFormattedTasks] = useState<Task[]>([]);
  // const [projects, setProjects] = useState(tasks.filter(task => task.type === "project"));
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

  useEffect(() => {
    const tempTasks: Task[] = [];

    projects.forEach(project => {
      tempTasks.push({
        id: project.id,
        type: project.type,
        name: project.name,
        start: project.start,
        end: project.end,
        progress: project.progress,
      });

      project.tasks.forEach(taskId => {
        const tempTask = getTaskById(taskId);
        if (tempTask) {
          tempTasks.push({
            id: tempTask.id,
            type: tempTask.type,
            name: tempTask.name,
            start: tempTask.start,
            end: tempTask.end,
            progress: tempTask.progress,
            project: tempTask.project,
            dependencies: tempTask.dependencies,
          });
        }
      });
    });

    tasks.forEach(tempTask => {
      if (!tempTask.project) {
        tempTasks.push({
          id: tempTask.id,
          type: tempTask.type,
          name: tempTask.name,
          start: tempTask.start,
          end: tempTask.end,
          progress: tempTask.progress,
          project: tempTask.project,
          dependencies: tempTask.dependencies,
        });
      }
    });

    setFormattedTasks(tempTasks);
    // workspaces.forEach((workspace) => {
    //   workspace.projects.forEach((project) => {
    //     tasks.push({
    //       id: project.id,
    //       type: project.type,
    //       name: project.name,
    //       start: project.start,
    //       end: project.end,
    //       progress: project.progress
    //     });

    //     project.tasks.forEach((task) => {
    //       tasks.push({
    //         id: task.id,
    //         type: task.type,
    //         name: task.name,
    //         start: task.start,
    //         end: task.end,
    //         progress: task.progress,
    //         project: task.project,
    //         dependencies: task.dependencies,
    //       });
    //     });
    //   });
    // });
  }, [projects, tasks]);

  const handleAddTask = () => {
    const currentDate = new Date();
    // const newTask = {
    //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7, 8, 30),
    //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 14, 17, 30),
    //   name: "Doing something new",
    //   id: "Task 10",
    //   type: "task",
    //   progress: 0,
    //   dependencies: ["task-4"],
    //   project: "ProjectSample",
    //   displayOrder: 6,
    // }

    addTask({
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7, 8, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 14, 17, 30),
      name: "Doing something new",
      type: "task",
      progress: 0,
      dependencies: ["task-4"],
      project: "project-1",
      displayOrder: 6,
    });

    // setFormattedTasks((prevTasks) => {
    //   const updatedTasks = [...prevTasks, newTask];

    //   updatedTasks.sort((a, b) => {
    //     if (a.displayOrder === undefined && b.displayOrder === undefined) {
    //       return 0;
    //     }
    //     if (a.displayOrder === undefined) {
    //       return 1;
    //     }
    //     if (b.displayOrder === undefined) {
    //       return -1;
    //     }
    //     return a.displayOrder - b.displayOrder;
    //   });

    //   return updatedTasks;
    // });
  }

  const handleUpdateTask = () => {
    setFormattedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTask?.id
          ? { ...task, progress: 100 }
          : task
      )
    );
  }

  const handleTaskChange = (updatedTask: Task) => {
    const newTasks = formattedTasks.map(formattedTask => (formattedTask.id === updatedTask.id ? updatedTask : formattedTask));
    setFormattedTasks(newTasks);

    updateTask(updatedTask.id, {
      start: updatedTask.start,
      end: updatedTask.end,
    });

    // if (updatedTask.project) {
    //   const [start, end] = getStartEndDateForProject(newTasks, updatedTask.project);
    //   const project = newTasks.find(t => t.id === updatedTask.project);
    //   if (project && (project.start.getTime() !== start.getTime() ||
    //     project.end.getTime() !== end.getTime())) {
    //     const updatedWorkspaces = workspaces.map(workspace => ({
    //       ...workspace,
    //       projects: workspace.projects.map(project =>
    //         project.id === updatedTask.project
    //           ? {
    //             ...project,
    //             start,
    //             end,
    //             tasks: project.tasks.map(task =>
    //               task.id === updatedTask.id
    //                 ? { ...task, start: updatedTask.start, end: updatedTask.end }
    //                 : task
    //             )
    //           }
    //           : project
    //       )
    //     }));
    //     setWorkspaces(updatedWorkspaces);
    //     return;
    //   }
    // }

    // updateTask(updatedTask.id, {
    //   start: updatedTask.start,
    //   end: updatedTask.end,
    // });
  };

  const handleTaskDelete = (taskToDelete: Task) => {
    const conf = window.confirm("Are you sure delete " + taskToDelete.name + " ?");
    if (conf) {
      setFormattedTasks(formattedTasks.filter(t => t.id !== taskToDelete.id));
      deleteTask(taskToDelete.id);
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setFormattedTasks(formattedTasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
    updateTask(task.id, {
      progress: task.progress
    });
  };

  const handleDoubleClick = (task: Task) => {
    // alert("On Double Click event Id:" + task.id);
    handleTaskDelete(task);
  };

  const handleClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    // setFormattedTasks(formattedTasks.map(t => (t.id === task.id ? task : t)));
    // console.log("On expander click Id:" + task.id);
    setFormattedTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === task.id
          ? { ...task, hideChildren: !task.hideChildren }
          : prevTask
      )
    );
  };

  return (
    <div className="w-full">
      <div className="flex w-1/3 pb-3 gap-3">
        <MyButton onPress={() => handleAddTask()}>Add task</MyButton>
        {/* <MyButton onPress={() => handleUpdateTask()}>Update task</MyButton> */}
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
            {formattedTasks.map(formattedTask => {
              const parentProject = formattedTasks.find(project => project.id === formattedTask.project);

              if ((formattedTask.type === "task" || formattedTask.type === "milestone") && parentProject?.hideChildren) {
                return;
              }

              let startContent = <></>;

              if (formattedTask.type === "project") {
                if (formattedTask.hideChildren) {
                  startContent = <Icon icon="solar:alt-arrow-right-bold" height={21} onClick={() => handleExpanderClick(formattedTask)} />
                } else {
                  startContent = <Icon icon="solar:alt-arrow-down-bold" height={21} onClick={() => handleExpanderClick(formattedTask)} />
                }
              } else {
                startContent = <div className="size-[21px]"></div>
              }

              return (
                <div key={formattedTask.id} className="flex border-b-[1px] h-[50px]">
                  <div className="flex min-w-[155px] max-w-[155px] p-[8px] items-center">
                    <div className="flex items-center gap-[4px]">
                      {startContent}
                      {formattedTask.name}
                    </div>
                  </div>
                  <div className="flex min-w-[100px] p-[8px] items-center">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(formattedTask.start)}
                  </div>
                  <div className="flex min-w-[100px] p-[8px] items-center">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(formattedTask.end)}
                  </div>
                  <div className="flex min-w-[100px] p-[8px] items-center">
                    <AvatarGroup>
                      <Avatar
                        name="I"
                        classNames={{
                          base: clsx(
                            "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                            "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                          ),
                          name: "text-base text-[10px] text-yellow-600"
                        }}
                      />
                      <Avatar
                        name="D"
                        classNames={{
                          base: clsx(
                            "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                            "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                          ),
                          name: "text-base text-[10px] text-yellow-600"
                        }}
                      />
                      <Avatar
                        name="B"
                        classNames={{
                          base: clsx(
                            "w-[24px] h-[24px] border border-white bg-yellow-light-active",
                            "!-ms-[6px] data-[hover=true]:-translate-x-[4px] rtl:data-[hover=true]:translate-x-[4px] transition-transform",
                          ),
                          name: "text-base text-[10px] text-yellow-600"
                        }}
                      />
                    </AvatarGroup>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sm:max-w-[39rem] md:max-w-[39rem] lg:max-w-[39rem] xl:max-w-[39rem] 2xl:max-w-6xl">
          {formattedTasks.length !== 0 && (
            <Gantt
              tasks={formattedTasks}
              viewMode={view}
              onDateChange={handleTaskChange}
              onDelete={handleTaskDelete}
              onProgressChange={handleProgressChange}
              onDoubleClick={handleDoubleClick}
              onClick={handleClick}
              onSelect={handleSelect}
              onExpanderClick={handleExpanderClick}
              listCellWidth={isChecked ? "155px" : ""}
            // barCornerRadius={8}
            // rowHeight={20}
            // columnWidth={columnWidth}
            />
          )}
        </div>
      </div>
    </div>
  );
}

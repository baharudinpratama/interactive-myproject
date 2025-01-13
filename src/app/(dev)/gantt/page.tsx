"use client";

import { Button } from "@nextui-org/react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useState } from "react";
import { getStartEndDateForProject, initTasks } from "./helper";
import "./index.css";
import { ViewSwitcher } from "./view-switcher";

export default function Page() {
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = useState(true);
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
    setTasks([
      ...tasks,
      {
        id: "Task 10",
        type: "task",
        name: "Doing something new",
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
        end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 14),
        progress: 0,
        project: "ProjectSample",
        dependencies: ["Task 4"],
        displayOrder: 6,
      }
    ]);
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
    <>
      <div className="flex flex-col w-1/3 pb-3 gap-3">
        <Button onPress={() => handleAddTask()}>Add task</Button>
        <Button onPress={() => handleUpdateTask()}>Update task</Button>
      </div>
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <div className="bg-white">
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
        // listCellWidth={isChecked ? "155px" : ""}
        // columnWidth={columnWidth}
        />
      </div>
    </>
  );
}

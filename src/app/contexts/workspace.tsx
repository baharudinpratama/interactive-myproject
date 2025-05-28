"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Workspace = {
  id: string;
  name: string;
  projects: string[];
}

export type Project = {
  id: string;
  name: string;
  type: "project";
  start: Date;
  end: Date;
  progress: number;
  icon: string;
  iconColor: string;
  displayOrder?: number;
  tasks: string[];
};

export type Task = {
  start: Date;
  end: Date;
  name: string;
  id: string;
  progress: number;
  type: "task" | "milestone";
  dependencies?: string[];
  project?: string;
  displayOrder?: number;
};

type WorkspaceContextType = {
  workspaces: Workspace[];
  projects: Project[];
  tasks: Task[];
  getProjectById: (projectId: string) => Project | undefined;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  getTaskById: (taskId: string) => Task | undefined;
  addTask: (task: Partial<Task>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentDate = new Date();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: "rnd",
      name: "RnD",
      projects: ["project-1"],
    },
  ]);
  const [projects, setProjects] = useState<Project[]>([
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 8, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15, 17, 30),
      name: "Project 1",
      id: "project-1",
      type: "project",
      progress: 25,
      icon: "solar:essentional-list-linear",
      iconColor: "#090b0e",
      displayOrder: 1,
      tasks: ["task-0", "task-1", "task-2", "task-3", "task-4", "task-5", "task-6"],
    },
  ]);
  const [tasks, setTasks] = useState<Task[]>([
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 8, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 17, 30),
      name: "Idea",
      id: "task-0",
      progress: 45,
      type: "task",
      project: "project-1",
      displayOrder: 2,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 8, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 17, 30),
      name: "Research",
      id: "task-1",
      progress: 25,
      dependencies: ["task-0"],
      type: "task",
      project: "project-1",
      displayOrder: 3,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 8, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 17, 30),
      name: "Discussion with team",
      id: "task-2",
      progress: 10,
      dependencies: ["task-1"],
      type: "task",
      project: "project-1",
      displayOrder: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 8, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 17, 30),
      name: "Developing",
      id: "task-3",
      progress: 2,
      dependencies: ["task-2"],
      type: "task",
      project: "project-1",
      displayOrder: 5,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6, 0, 0),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Review",
      id: "task-4",
      type: "task",
      progress: 70,
      dependencies: ["task-2"],
      project: "project-1",
      displayOrder: 6,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15, 8, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15, 17, 30),
      name: "Release",
      id: "task-6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["task-4"],
      project: "project-1",
      displayOrder: 7,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20, 8, 30),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20, 17, 30),
      name: "Private",
      id: "task-7",
      progress: currentDate.getMonth(),
      type: "task",
      dependencies: [],
      project: "",
      displayOrder: 8,
    },
  ]);

  const getProjectById = (projectId: string) =>
    projects.find(project => project.id === projectId);

  const getTaskById = (taskId: string) =>
    tasks.find(task => task.id === taskId);

  const calculateProjectDates = (tasks: Task[]) => {
    if (tasks.length === 0) return null;

    const { start: earliestStart, end: latestEnd } = tasks.reduce(
      (bounds, task) => ({
        start: task.start < bounds.start ? task.start : bounds.start,
        end: task.end > bounds.end ? task.end : bounds.end
      }),
      { start: tasks[0].start, end: tasks[0].end }
    );

    return { start: earliestStart, end: latestEnd };
  };

  const handleStartEndProject = (projectId: string, allTasks: Task[]) => {
    const project = getProjectById(projectId);
    if (project) {
      const projectTasks = allTasks.filter(task => task.project === projectId);
      const newDates = calculateProjectDates(projectTasks);

      if (newDates && (project.start !== newDates.start || project.end !== newDates.end)) {
        updateProject(project.id, {
          start: newDates.start,
          end: newDates.end,
        });
      }
    }
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(currentProjects =>
      currentProjects.map(project =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/calendar");
      const data = await response.json();

      if (!data.items) return;

      console.log(data.items);

      // try {
      //   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/google`, {
      //     method: "POST",
      //     body: JSON.stringify(data.items),
      //   });
      // } catch (error) {
      //   console.log("Sync google calendar task failed:", error);
      // }

      data.items.forEach((item: any) => {
        if (item.start && item.end) {
          if (item.start.dateTime && item.end.dateTime) {
            addTask({
              id: item.id,
              name: item.summary,
              start: new Date(item.start.dateTime),
              end: new Date(item.end.dateTime),
              type: "task",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addTask = (task: Partial<Task>) => {
    const generatedId = `task-${new Date().getTime()}`
    if (task.start && task.end && task.name && task.type) {
      const newTask = {
        start: task.start,
        end: task.end,
        name: task.name,
        id: task.id ?? generatedId,
        progress: 0,
        type: task.type,
        dependencies: task.dependencies,
        project: task.project,
        displayOrder: task.displayOrder,
      }

      setTasks((prevTasks) => [...prevTasks, newTask]);

      if (task.project) {
        const relatedProjectTasks = getProjectById(task.project)?.tasks;
        if (relatedProjectTasks) {
          relatedProjectTasks.push(generatedId);
          updateProject(task.project, {
            tasks: relatedProjectTasks
          });
        }
        // handleStartEndProject(task.project);
      }
    }
  }

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(currentTasks => {
      const newTasks = currentTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      );

      const updatedTask = newTasks.find(task => task.id === taskId);
      if (updatedTask?.project) {
        handleStartEndProject(updatedTask.project, newTasks);
      }

      return newTasks;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId))
  }

  const contextValue = useMemo(() => ({
    workspaces,
    projects,
    tasks,
    getProjectById,
    getTaskById,
    updateProject,
    addTask,
    updateTask,
    deleteTask
  }), [workspaces, projects, tasks, getProjectById, getTaskById, addTask, updateTask, updateProject]);

  return (
    <WorkspaceContext.Provider value={contextValue}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaceContext = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspaceContext must be used within a ProjectProvider");
  }
  return context;
};

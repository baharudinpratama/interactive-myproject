"use client";

import { createContext, useState, useContext, ReactNode } from "react";

export type Workspace = {
  id: string;
  name: string;
  projects: Project[];
}

export type Project = {
  id: string;
  name: string;
  type: "project";
  start: Date;
  end: Date;
  progress: number;
  displayOrder?: number;
  tasks: Task[];
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
  setWorkspaces: (workspaces: Workspace[]) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentDate = new Date();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: "rnd",
      name: "RnD",
      projects: [
        {
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
          name: "Project 1",
          id: "project-1",
          progress: 25,
          type: "project",
          displayOrder: 1,
          tasks: [
            {
              start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
              end: new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                2,
                12,
                28
              ),
              name: "Idea",
              id: "Task 0",
              progress: 45,
              type: "task",
              project: "project-1",
              displayOrder: 2,
            },
            {
              start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
              end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
              name: "Research",
              id: "Task 1",
              progress: 25,
              dependencies: ["Task 0"],
              type: "task",
              project: "project-1",
              displayOrder: 3,
            },
            {
              start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
              end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
              name: "Discussion with team",
              id: "Task 2",
              progress: 10,
              dependencies: ["Task 1"],
              type: "task",
              project: "project-1",
              displayOrder: 4,
            },
            {
              start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
              end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
              name: "Developing",
              id: "Task 3",
              progress: 2,
              dependencies: ["Task 2"],
              type: "task",
              project: "project-1",
              displayOrder: 5,
            },
            {
              start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
              end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
              name: "Review",
              id: "Task 4",
              type: "task",
              progress: 70,
              dependencies: ["Task 2"],
              project: "project-1",
              displayOrder: 6,
            },
            {
              start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
              end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
              name: "Release",
              id: "Task 6",
              progress: currentDate.getMonth(),
              type: "milestone",
              dependencies: ["Task 4"],
              project: "project-1",
              displayOrder: 7,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <WorkspaceContext.Provider value={{ workspaces, setWorkspaces }}>
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

import React from "react";

type Task = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;
};

type GanttChartProps = {
  tasks: Task[];
};

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  // Example utility to calculate widths
  const getDaysBetween = (start: Date, end: Date) => {
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const today = new Date();

  return (
    <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
      <div className="min-w-[600px] grid grid-cols-[150px_repeat(30,_1fr)]">
        {/* Header */}
        <div className="sticky top-0 bg-white p-2 font-bold">Task</div>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="sticky top-0 bg-gray-100 p-2 text-center font-medium text-xs"
          >
            {new Date(today.getTime() + i * 24 * 60 * 60 * 1000).toDateString()}
          </div>
        ))}
        {/* Tasks */}
        {tasks.map((task) => {
          const duration = getDaysBetween(task.startDate, task.endDate);
          const offset = getDaysBetween(today, task.startDate);

          return (
            <React.Fragment key={task.id}>
              <div className="p-2 border-t border-gray-200">{task.name}</div>
              <div className="col-span-30 relative">
                <div
                  className="absolute h-6 bg-blue-500"
                  style={{
                    width: `${duration * 20}px`,
                    marginLeft: `${offset * 20}px`,
                  }}
                >
                  <div
                    className="bg-blue-700 h-full"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const tasks = [
  {
    id: "1",
    name: "Task 1",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-10"),
    progress: 50,
  },
  {
    id: "2",
    name: "Task 2",
    startDate: new Date("2024-01-05"),
    endDate: new Date("2024-01-15"),
    progress: 75,
  },
];

const Page = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gantt Chart</h1>
      <GanttChart tasks={tasks} />
    </div>
  );
};

export default Page;

const currentDate = new Date();

const fetchedUsers = [
  { id: "user-1", name: "InterActive (You)", initial: "IA", added: true },
  { id: "user-2", name: "Ardan", initial: "A", added: false },
  { id: "user-3", name: "Baharudin", initial: "B", added: false },
  { id: "user-4", name: "Dea", initial: "D", added: false },
  { id: "user-5", name: "Edwin", initial: "E", added: false },
  { id: "user-6", name: "Faris", initial: "F", added: false },
  { id: "user-7", name: "Irul", initial: "I", added: false },
];

const fetchedMenuItems = [
  {
    id: "menu-1",
    icon: "solar:chart-square-linear",
    label: "Dashboard",
    url: "/dashboard",
    children: [],
  },
  {
    id: "menu-2",
    icon: "solar:widget-linear",
    label: "Master",
    url: "",
    children: [
      {
        id: "menu-2-1",
        icon: "solar:checklist-linear",
        label: "Product",
        url: "/master/product",
        children: [],
      },
      {
        id: "menu-2-2",
        icon: "solar:checklist-linear",
        label: "Custom Field",
        url: "/master/custom-field",
        children: [],
      },
      {
        id: "menu-2-3",
        icon: "solar:checklist-linear",
        label: "Team",
        url: "/master/team",
        children: [],
      },
      {
        id: "menu-2-4",
        icon: "solar:checklist-linear",
        label: "Security & Permission",
        url: "/master/authorization",
        children: [],
      },
    ]
  },
  {
    id: "menu-3",
    icon: "solar:document-add-linear",
    label: "Personal Task",
    url: "/personal-task",
    children: [],
  },
];

const fetchedViews = [
  { id: 1, name: "List" },
  { id: 2, name: "Board" },
  { id: 3, name: "Calendar" },
  { id: 4, name: "Gantt" },
  { id: 5, name: "Workload" },
]

const fetchedProjects = [
  {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    name: "Some Project",
    id: "ProjectSample",
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
        project: "ProjectSample",
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
        project: "ProjectSample",
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
        project: "ProjectSample",
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
        project: "ProjectSample",
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
        project: "ProjectSample",
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
        project: "ProjectSample",
        displayOrder: 7,
      },
    ],
  },
]

export { fetchedMenuItems, fetchedUsers };

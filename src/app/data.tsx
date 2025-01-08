const fetchedUsers = [
  { id: "user-1", name: "InterActive (You)", initial: "IA", added: true },
  { id: "user-2", name: "Ardan", initial: "A", added: false },
  { id: "user-3", name: "Baharudin", initial: "B", added: false },
  { id: "user-4", name: "Dea", initial: "D", added: false },
  { id: "user-5", name: "Edwin", initial: "E", added: false },
  { id: "user-6", name: "Faris", initial: "F", added: false },
  { id: "user-7", name: "Irul", initial: "I", added: false },
  { id: "user-8", name: "Khariza", initial: "K", added: false },
];

const fetchedMenuItemsOri = [
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

const fetchedMenuItems = fetchedMenuItemsOri;

const fetchedViews = [
  {id: 1, name: "List" },
  {id: 2, name: "Board" },
  {id: 3, name: "Calendar" },
  {id: 4, name: "Gantt" },
  {id: 5, name: "Workload" },
]

export { fetchedMenuItems, fetchedUsers };

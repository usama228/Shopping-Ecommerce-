import { PATH } from "../config";

export const navigations = [
  { name: "Dashboard", forAll: true, path: PATH.DASHBOARD, icon: "dashboard", forRole: ['superAdmin', 'admin', 'consumer'] },
  {
    name: "Admins",
    icon: "group",
    forRole: ['superAdmin'],
    children: [
      { name: "Add New Admin", path: PATH.ADDUSER.replace(':role', 'admin').replace(':id', 'new'), iconText: "E", forRole: ['superAdmin'], },
      { name: "All Admins", path: PATH.USERS.replace(':role', 'admin'), iconText: "E", forRole: ['superAdmin'] },
    ]

  },
  {
    name: "Consumers",
    icon: "group",
    forRole: ['superAdmin', 'admin'],
    children: [
      { name: "Add New Consumer", path: PATH.ADDUSER.replace(':role', 'consumer').replace(':id', 'new'), iconText: "E", forRole: ['superAdmin', 'admin'], },
      { name: "All Consumers", path: PATH.USERS.replace(':role', 'consumer'), iconText: "E", forRole: ['superAdmin', 'admin'] },
    ]
  },
  {
    name: "Products",
    path: PATH.PRODUCTS,
    icon: "group",
    forRole: ['superAdmin', 'admin'],
    children: [
      { name: "Add Product", path: PATH.ADDPRODUCT.replace(':id', 'new'), iconText: "E", forRole: ['superAdmin', 'admin'], },
      { name: "All Products", path: PATH.PRODUCTS, iconText: "E", forRole: ['superAdmin', 'admin'], },

    ]
  },
  {
    name: "Categories",
    path: PATH.CATEGORIES,
    icon: "group",
    forRole: ['superAdmin', 'admin'],
    children: [
      { name: "Add Category", path: PATH.ADDCATEGORY.replace(':id', 'new'), iconText: "E", forRole: ['superAdmin', 'admin'], },
      { name: "All Categories", path: PATH.CATEGORIES, iconText: "E", forRole: ['superAdmin', 'admin'], },

    ]
  },

  {
    name: "Purchase Orders",
    path: PATH.ORDERS,
    icon: "group",
    forRole: ['superAdmin', 'admin','consumer'],
    children: [
      { name: "Add Order", path: PATH.ADDORDER.replace(':id', 'new'), iconText: 'E', forRole: ['superAdmin', 'admin', 'consumer'], },
      { name: "All Orders", path: PATH.ORDERS, iconText: "E", forRole: ['superAdmin', 'admin'], },
    ]
  },

  // { label: "PAGES", type: "label" },
  // {
  //   name: "Session/Auth",
  //   icon: "security",
  //   children: [
  //     { name: "Sign in", iconText: "SI", path: "/session/signin" },
  //     { name: "Sign up", iconText: "SU", path: "/session/signup" },
  //     { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
  //     { name: "Error", iconText: "404", path: "/session/404" }
  //   ]
  // },
  // { label: "Components", type: "label" },
  // {
  //   name: "Components",
  //   icon: "favorite",
  //   badge: { value: "30+", color: "secondary" },
  //   children: [
  //     { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
  //     { name: "Buttons", path: "/material/buttons", iconText: "B" },
  //     { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
  //     { name: "Dialog", path: "/material/dialog", iconText: "D" },
  //     { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
  //     { name: "Form", path: "/material/form", iconText: "F" },
  //     { name: "Icons", path: "/material/icons", iconText: "I" },
  //     { name: "Menu", path: "/material/menu", iconText: "M" },
  //     { name: "Progress", path: "/material/progress", iconText: "P" },
  //     { name: "Radio", path: "/material/radio", iconText: "R" },
  //     { name: "Switch", path: "/material/switch", iconText: "S" },
  //     { name: "Slider", path: "/material/slider", iconText: "S" },
  //     { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
  //     { name: "Table", path: "/material/table", iconText: "T" }
  //   ]
  // },
  // {
  //   name: "Charts",
  //   icon: "trending_up",
  //   children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }]
  // },
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }
];

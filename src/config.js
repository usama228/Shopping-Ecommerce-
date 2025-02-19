export const auth0Config = {
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};
export const PATH = {
  LOGIN: '/',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/user-profile',
  USERS: '/users/:role',
  FORGOTPASSWORD: '/forgot-password',
  PRODUCTS: '/products',
  EDITPRODUCT: '/edit-product/:id',
  ADDPRODUCT: '/add-product/:id',
  EDITPROFILE: '/edit-profile/:id',
  ADDUSER: '/add-user/:role/:id',
  ORDERS: '/orders',
  ADDORDER: '/add-order/:id',
  CATEGORIES: '/categories',
  ADDCATEGORY: '/add-category/:id',
  EDITCATEGORY: '/edit-category/:id',
  USERDETAIL: '/user-detail/:id',
  USERITEMSIZE: '/user/:associationId',
  EDITUSERITEMSIZE: '/user/:userId/item/:itemId',
  PRINTSIZE: '/print-size/:associationId',
  ORDERVIEW: '/order-view'
}
const PAGE_LIMIT = 10;
const baseUrl = "http://192.168.1.11:2000/api";
const APP_SETTINGS = {
  API_PATH: {
    AVATAR: {
      addImage: baseUrl + '/images/avatar'
    },
    USER: {
      login: baseUrl + "/login",
      register: baseUrl + "/register",
      logout: baseUrl + "/logout/:id",
      getAllUsers: baseUrl + "/users",
      changePassword: baseUrl + "/users/changepassword",

      create: baseUrl + "/users",
      getAllConsumers: baseUrl + '/consumer',
      getAllAdmins: baseUrl + '/admin',
      getUser: baseUrl + "/user/:id",
      editUser: baseUrl + "/edituser/:id",
      deleteUser: baseUrl + "/users/:id",



      getUsersByRole: baseUrl + '/users/getUsers'

    },
    PRODUCT: {
      addProduct: baseUrl + '/products',
      createCategory: baseUrl + '/categories',
      getCategories: baseUrl + '/allCategories',
      getProductById: baseUrl + '/products/:id',
      editProduct: baseUrl + "/products/:id",
      deleteProduct: baseUrl + "/products/:id",
      getCategoryById: baseUrl + "/categories/:id",
      updateCategory: baseUrl + "/updatecategories/:id",
      deleteCategory: baseUrl + "/categorie/:id",
      createVariant: baseUrl + '/variants',
      getProducts: baseUrl + '/all',
    },
    ORDER: {
      add: baseUrl + "/order",
      edit: baseUrl + "/order",
      getAll: baseUrl + "/order",
      getByFilter: baseUrl + "/orderfilter",
      getById: baseUrl + "/order",
      delete: baseUrl + "/order",
      getAllItemsAndFabrics: baseUrl + '/all-items-and-fabrics',

      createPurchaseOrder: baseUrl + "/createorder",
      getAllPurchaseOrders: baseUrl + "/orders",
      getPurchaseOrderById: baseUrl + "/order/:id",
      updatePurchaseOrder: baseUrl + "/update/:id",
      deletePurchaseOrder: baseUrl + "/order/:id",
    }
  }
};

const STATUSFILTER = [
  {
    id: 'active',
    name: 'Active'
  },
  {
    id: 'inactive',
    name: 'Inactive'
  }
];

const ROLE = [

  {
    id: 'admin',
    value: "Admin"
  },
  {
    id: 'consumer',
    value: "Consumer"
  }
]
const USER_ROLE_LIST = {
  ADMIN: 'admin',
  SUPERADMIN: 'superAdmin',
  Consumer: 'consumer'
}
const ORDERSTATUS = [

  {
    title: 'Pending',
    id: 'pending'
  },
  {
    title: 'In-Progress',
    id: 'inProgress'
  },
  {
    title: 'Completed',
    id: 'completed'
  },
  {
    title: 'Delivered',
    id: 'delivered'
  }
]
export { USER_ROLE_LIST, ORDERSTATUS, ROLE, APP_SETTINGS, PAGE_LIMIT, STATUSFILTER }
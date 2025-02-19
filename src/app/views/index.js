import Login from "./login";
import Dashboard from './dashboard';
import Register from "./register";
import Profile from "./profile";
import Users from "./users"
import ForgotPassword from "./forgot-password";
import Products from "./Products";
import EditProduct from "./Products/EditProduct";
import AddProduct from "./Products/AddProduct";
import EditProfile from "./profile/EditProfile"
import AddUser from "./users/AddUser";
import UserDetail from "./userDetails";
import UserItemSize from "./userItemSize";
import PrintSize from "./print/PrintSize";
import Orders from "./orders";
import AddOrder from "./orders/AddOrder";
import OrderView from "./orders/OrderView";
import Categories from "./category";
import AddCategory from "./category/AddCategory";
import EditCategory from "./category/EditCategory";
export const WEB_PAGES = {
    LOGIN: Login,
    REGISTER: Register,
    DASHBOARD: Dashboard,
    PROFILE: Profile,
    USERS: Users,
    FORGOTPASSWORD: ForgotPassword,
    PRODUCTS: Products,
    EDITPRODUCT: EditProduct,
    ADDPRODUCT: AddProduct,
    EDITPROFILE: EditProfile,
    ADDUSER: AddUser,
    CATEGORIES: Categories,
    ADDCATEGORY: AddCategory,
    EDITCATEGORY: EditCategory,
    USERDETAIL: UserDetail,
    USERITEMSIZE: UserItemSize,
    PRINTSIZE: PrintSize,
    ORDERS: Orders,
    ADDORDER: AddOrder,
    ORDERVIEW: OrderView
}
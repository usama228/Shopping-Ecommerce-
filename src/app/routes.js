// import { lazy } from "react";
// import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
// import { authRoles } from "./auth/authRoles";

// import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

// import sessionRoutes from "./views/sessions/session-routes";
// import materialRoutes from "app/views/material-kit/MaterialRoutes";
import { PATH } from "../config";
import { WEB_PAGES } from "./views";

// E-CHART PAGE
// const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// // DASHBOARD PAGE
// const Analytics = Loadable(lazy(() => import("app/views/dashboard")));

const routes = [
  {
    path: PATH.LOGIN,
    element: <WEB_PAGES.LOGIN />
  },
  {
    path: PATH.REGISTER,
    element: <WEB_PAGES.REGISTER />
  },
  {
    path: PATH.FORGOTPASSWORD,
    element: <WEB_PAGES.FORGOTPASSWORD />,
  },
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      // ...materialRoutes,
      // dashboard route
      {
        path: PATH.DASHBOARD,
        element: <WEB_PAGES.DASHBOARD />,
        // auth: authRoles.admin
      },
      {
        path: PATH.PROFILE,
        element: <WEB_PAGES.PROFILE />,
      },
      {
        path: PATH.USERS,
        element: <WEB_PAGES.USERS />,
      },
      {
        path: PATH.PRODUCTS,
        element: <WEB_PAGES.PRODUCTS />,
      },
      {
        path: PATH.ADDPRODUCT,
        element: <WEB_PAGES.ADDPRODUCT />,
      },
      {
        path: PATH.EDITPRODUCT,
        element: <WEB_PAGES.EDITPRODUCT />,
      },
      {
        path: PATH.ADDUSER,
        element: <WEB_PAGES.ADDUSER />,
      },
      {
        path: PATH.EDITPROFILE,
        element: <WEB_PAGES.EDITPROFILE />,
      },

      {
        path: PATH.CATEGORIES,
        element: <WEB_PAGES.CATEGORIES />,
      },
      {
        path: PATH.ADDCATEGORY,
        element: <WEB_PAGES.ADDCATEGORY />,
      },
      {
        path: PATH.EDITCATEGORY,
        element: <WEB_PAGES.EDITCATEGORY />,
      },
      {
        path: PATH.USERDETAIL,
        element: <WEB_PAGES.USERDETAIL />,
      },
      {
        path: PATH.USERITEMSIZE,
        element: <WEB_PAGES.USERITEMSIZE />,
      },
      {
        path: PATH.PRINTSIZE,
        element: <WEB_PAGES.PRINTSIZE />,
      },
      {
        path: PATH.ORDERS,
        element: <WEB_PAGES.ORDERS />,
      },
      {
        path: PATH.ADDORDER,
        element: <WEB_PAGES.ADDORDER />,
      },
      {
        path: PATH.ORDERVIEW,
        element: <WEB_PAGES.ORDERVIEW />
      }

      // e-chart route
      // {
      //   path: "/charts/echarts",
      //   element: <AppEchart />,
      //   auth: authRoles.editor
      // }
    ]
  },

  // // session pages route
  // ...sessionRoutes
];

export default routes;

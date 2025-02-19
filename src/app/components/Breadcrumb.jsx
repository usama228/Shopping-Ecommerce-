import { NavLink } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { PATH } from "../../config";
import {  BreadcrumbRoot,  StyledIcon, SubName } from "app/assets";


export default function Breadcrumb({ routeSegments }) {
  return (
    <BreadcrumbRoot>

      <Breadcrumbs
        separator={<NavigateNext sx={{ color: "text.hint" }} />}
        sx={{ display: "flex", alignItems: "center", position: "relative" }}>
        <NavLink to={PATH.DASHBOARD}>
          <StyledIcon color="primary" />
        </NavLink>
        {routeSegments
          ? routeSegments.map((route, index) => {
            return index !== routeSegments.length - 1 ? (
              <NavLink key={index} to={route.path}>
                <SubName>{route.name}</SubName>
              </NavLink>
            ) : (
              <SubName key={index}>{route.name}</SubName>
            );
          })
          : null}
      </Breadcrumbs>
    </BreadcrumbRoot>
  );
}

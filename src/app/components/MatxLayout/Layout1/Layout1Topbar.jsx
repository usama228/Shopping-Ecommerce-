import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  Hidden,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery
} from "@mui/material";
import { NotificationProvider } from "app/contexts/NotificationContext";
import useSettings from "app/hooks/useSettings";
import { Span } from "app/components/Typography";
import { MatxMenu} from "app/components";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { topBarHeight } from "app/utils/constant";
import {
  Home,
  Menu,
  Person,
  Settings,
  PowerSettingsNew
} from "@mui/icons-material";
import { useAuth } from "app/hooks/useAuth";
import { PATH } from "../../../../config";
import { useSelector } from "react-redux";


// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease"
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));


const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const auth = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('user');
    navigate(PATH.LOGIN)
  }
  const user = useSelector((state) => state.user)
  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Menu />
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
  

          <NotificationProvider>

          </NotificationProvider>
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                     <strong>{user?.user ? user.user.first_name : auth.first_name} {user?.user ? user.user.last_name : auth.last_name}</strong>
                  </Span>
                </Hidden>
                <Avatar src={user?.user ? user.user.avatar : auth.avatar} sx={{ cursor: "pointer" }} />
              </UserMenu>
            }>
            <StyledItem>
              <Link to={PATH.DASHBOARD}>
                <Home />
                <Span>Home</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to={PATH.PROFILE}>
                <Person />
                <Span>Profile</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Settings />
              <Span>Settings</Span>
            </StyledItem>

            <StyledItem >
              <PowerSettingsNew />
              <Span onClick={
                logout
              }>Logout</Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);

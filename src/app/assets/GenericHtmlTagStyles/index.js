import { Home } from "@mui/icons-material";
import { Box, Card, Table, TextField } from "@mui/material";

const { default: styled } = require("@emotion/styled");

export const Error = styled("div")({
    gap: 10,
    display: "flex",
    alignItems: "center",
    "& p": { width: '100%', color: 'red', textAlign: 'center' }
});
export const TextField1 = styled(TextField)(() => ({
    width: "100%",
    marginBottom: "16px"
}));

//#region BREADCRUMP STYLED TAG

export const BreadcrumbRoot = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
});

export const BreadcrumbName = styled("h4")(({ theme }) => ({
    margin: 0,
    fontSize: "16px",
    paddingBottom: "1px",
    verticalAlign: "middle",
    textTransform: "capitalize",
    [theme.breakpoints.down("xs")]: { display: "none" }
}));

export const SubName = styled("span")(({ theme }) => ({
    textTransform: "capitalize",
    color: theme.palette.text.secondary
}));

export const Separator = styled("h4")(({ theme }) => ({
    margin: 0,
    marginLeft: 8,
    paddingBottom: "3px",
    color: theme.palette.text.hint,
    [theme.breakpoints.down("xs")]: { display: "none" }
}));

export const StyledIcon = styled(Home)({
    marginLeft: 8,
    marginBottom: "4px",
    verticalAlign: "middle"
});

//#endregion


//#region  SIMPLE CARD STYLED TAG
export const CardRoot = styled(Card)({
    height: "100%",
    padding: "20px 24px"
});

export const CardTitle = styled("div")(({ subtitle }) => ({
    fontSize: "1rem",
    fontWeight: "500",
    textTransform: "capitalize",
    marginBottom: !subtitle && "16px"
}));
//#endregion

export const EDITROOT = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});
export const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
}));

export const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
    },
}));
export const FlexBox = styled(Box)({
    display: "flex"
});



export const Logo = styled("div")({
    gap: 10,
    display: "flex",
    alignItems: "center",
    "& span": { fontSize: 26, lineHeight: 1.3, fontWeight: 800 }
});

export const LoginRoot = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#1A2038",
    minHeight: "100vh !important",
    "& .card": { maxWidth: 800, margin: "1rem" },
    "& .cardLeft": {
        color: "#fff",
        height: "100%",
        display: "flex",
        padding: "32px 56px",
        flexDirection: "column",
        backgroundSize: "cover",
        background: "#161c37 url(/assets/images/bg-3.png) no-repeat",
        [theme.breakpoints.down("sm")]: { minWidth: 200 },
        "& img": { width: 32, height: 32 }
    },
    "& .mainTitle": { fontSize: 18, lineHeight: 1.3, marginBottom: 24 },
    "& .features": {
        "& .item": {
            position: "relative",
            marginBottom: 12,
            paddingLeft: 16,
            "&::after": {
                top: 8,
                left: 0,
                width: 4,
                height: 4,
                content: '""',
                borderRadius: 4,
                position: "absolute",
                backgroundColor: theme.palette.error.main
            }
        }
    }
}));
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
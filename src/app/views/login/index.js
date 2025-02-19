import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, Card, Grid, TextField, IconButton, InputAdornment, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "app/redux/actions";
import { PATH } from "../../../config";
import { Paragraph } from "app/components/Typography";
import { FlexBox, LoginRoot, Logo, SnackbarComponent } from "app/assets";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const initialValues = {
    user_name: "",
    password: "",
    remember: true,
};

const validationSchema = Yup.object().shape({
    user_name: Yup.string()
        .required("Username is required!"),
    password: Yup.string()
        .required("Password is required!"),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false); 
    const [showSnackbar, setShowSnackbar] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user, loginError, loginLoading } = useSelector((state) => state.user);
    const { state } = useLocation();
    const navigate = useNavigate();

    // Effect to navigate after successful login
   
    useEffect(() => {
        if (user) {
            navigate(state?.from || PATH.DASHBOARD, { replace: true });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

  
    const handleFormSubmit = (values) => {
        dispatch(LOGIN(values, moveToNext));
    };

    const moveToNext = () => {
        navigate(PATH.DASHBOARD);
    };


    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        if (loginError) {
            setShowSnackbar(true);
            const timer = setTimeout(() => setShowSnackbar(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [loginError]);

    const closeSnackbar = () => setShowSnackbar(false);

    return (
        <LoginRoot>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <div className="cardLeft">
                            <Logo>
                                <span>Legion-Simplify Premium</span>
                            </Logo>
                        </div>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        {showSnackbar && (
                            <SnackbarComponent
                                show={showSnackbar}
                                message={loginError}
                                onClose={closeSnackbar}
                            />
                        )}

                        <Box p={4}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleFormSubmit}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="user_name"
                                            label="Username"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.user_name}
                                            onChange={handleChange}
                                            helperText={touched.user_name && errors.user_name}
                                            error={Boolean(errors.user_name && touched.user_name)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            label="Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={touched.password && errors.password}
                                            error={Boolean(errors.password && touched.password)}
                                            sx={{ mb: 1.5 }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={togglePasswordVisibility}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <FlexBox justifyContent="space-between">
                                            <NavLink
                                                to="/session/forgot-password"
                                                style={{ color: theme.palette.primary.main }}
                                            >
                                                Forgot password?
                                            </NavLink>
                                        </FlexBox>

                                        <LoadingButton
                                            type="submit"
                                            color="primary"
                                            loading={loginLoading}
                                            variant="contained"
                                            sx={{ my: 2 }}
                                        >
                                            Login
                                        </LoadingButton>

                                        <Paragraph>
                                            Don't have an account?
                                            <NavLink
                                                to={PATH.REGISTER}
                                                style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                                            >
                                                Register
                                            </NavLink>
                                        </Paragraph>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </LoginRoot>
    );
}

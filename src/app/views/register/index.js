import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    Box, Card, Grid,  TextField, useTheme,
    MenuItem, Avatar, IconButton,
    InputAdornment
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import MatxLogo from "app/components/MatxLogo";
import { Paragraph, Span } from "app/components/Typography";
import { PATH } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER } from "app/redux/actions/users";
import { LoginRoot, Logo, SnackbarComponent, } from "app/assets";
import { useState } from "react";
import { convertBase64, createImageFromInitials } from "app/assets/genericActions";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const role = [
    {
        id: 'superAdmin',
        value: "Super Admin"
    },
    {
        id: 'admin',
        value: "Admin"
    },
    {
        id: 'consumer',
        value: "Consumer"
    }
]
const initialValues = {
    user_name: "",
    first_name: "",
    last_name: "",
    phoneNumber: '',
    role: "",
    avatar: "",
    email: "",
    password: "",
    cnic: "",
};

const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("Enter UserName"),
    first_name: Yup.string().required("Enter First Name"),
    last_name: Yup.string().required("Enter Last Name"),
    role: Yup.string().required("Enter Role"),
    avatar: Yup.string(),
    phoneNumber: Yup.string().matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
    password: Yup.string()
        .min(8, "Password must be 8 character length")
        .required("Password is required!"),
    email: Yup.string().email("Invalid Email address").required("Email is required!"),
    cnic: Yup.string()
    .length(13, 'CNIC must be exactly 13 digits')
    .matches(/^\d{13}$/, 'CNIC must contain only digits')
    .required('CNIC is required'),
    status: Yup.string().required('Status is required'),
});

export default function Register() {
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const { state } = useLocation();
    const navigate = useNavigate();
    const handleFormSubmit = (values) => {

        if (!values.avatar) {
            const data = { ...values, avatar: createImageFromInitials(`${values.first_name} ${values.last_name}`) }
            dispatch(REGISTER(data, registerSuccessfully, failure))

        } else {
            dispatch(REGISTER(values, registerSuccessfully, failure))
        }
    };
    function registerSuccessfully() {
        navigate(state ? state.from : PATH.LOGIN);
    }
    const [file, setFile] = useState(null);
    const uploadFile = (e) => {
        let file_ = e.target.files[0];
        if (file_) {
            convertBase64(file_).then((getValue) => {
                setFile(getValue)
            });
        }
    }
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    
    function failure() {
        setShow(true)
    }
    return (
        <LoginRoot>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <div className="cardLeft">
                            <Logo>
                                <MatxLogo /> <span>MatX Pro</span>
                            </Logo>

                            <h1 className="mainTitle">Admin Dashboard</h1>

                            <div className="features">
                                <div className="item">JWT, Firebase & Auth0 Authentication</div>
                                <div className="item">Clean & Organised code</div>
                                <div className="item">Limitless Pages & Components</div>
                            </div>

                            <Span flexGrow={1}></Span>

                            <a href="https://ui-lib.com/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/images/logos/ui-lib.png" alt="UI Lib Logo" />
                            </a>
                        </div>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        {
                            user
                            &&
                            user.registerError
                            &&
                            <SnackbarComponent
                                show={show} message={user.registerError} />
                        }
                        <Box p={4}>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema} >
                                {(props) => {
                                    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>
                                                <label htmlFor="upload">

                                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                                        <Avatar
                                                            id="avatar"
                                                            src={file}
                                                            style={{
                                                                width: "125px",
                                                                height: "125px"
                                                            }} />
                                                    </IconButton>
                                                </label>
                                            </div>
                                            <input type="file" name='avatar'
                                                onChange={(event) => {
                                                    uploadFile(event)
                                                }}
                                                id="upload"
                                                accept="image/*"
                                                style={{ display: "none" }} />
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="text"
                                                name="user_name"
                                                label="Username"
                                                varient="outlined"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                helperText={touched.user_name && errors.user_name}
                                                error={Boolean(errors.user_name && touched.user_name)}
                                                sx={{ mb: 3, mt: 3 }}
                                                required
                                            />
                                          
                                    <TextField
                                        fullWidth
                                         size="small"
                                        name="cnic"
                                        type="text"
                                        label="CNIC Number"
                                        varient="outlined"
                                        value={values.cnic}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.cnic && errors.cnic)}
                                        helperText={touched.cnic && errors.cnic}
                                        sx={{ mb: 3, mt: 3 }}
                                                required
                                    />
                                    <TextField
                                        fullWidth
                                        name="status"
                                        label="Status"
                                         size="small"
                                        varient="outlined"
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.status && errors.status)}
                                        helperText={touched.status && errors.status}
                                        sx={{ mb: 3, mt: 3 }}
                                                required
                                    >
                                        <option value="" disabled></option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </TextField>
                               
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="text"
                                                name="first_name"
                                                label="First Name"
                                                varient="outlined"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                helperText={touched.first_name && errors.first_name}
                                                error={Boolean(errors.first_name && touched.first_name)}
                                                sx={{ mb: 3 }}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="text"
                                                name="last_name"
                                                label="Last Name"
                                                varient="outlined"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                helperText={touched.last_name && errors.last_name}
                                                error={Boolean(errors.last_name && touched.last_name)}
                                                sx={{ mb: 3 }}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="email"
                                                name="email"
                                                label="Email"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.email}
                                                onChange={handleChange}
                                                helperText={touched.email && errors.email}
                                                error={Boolean(errors.email && touched.email)}
                                                sx={{ mb: 3 }}
                                                required
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
                                                sx={{ mb: 3 }}
                                                required
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
                                            <Box>
                                                <TextField
                                                    size="small"
                                                    select
                                                    name="role"
                                                    label="Role"
                                                    variant="outlined"
                                                    defaultValue="Admin"
                                                    fullWidth
                                                    onBlur={handleBlur}
                                                    value={values.role}
                                                    helperText={touched.role && errors.role}
                                                    error={Boolean(errors.role && touched.role)}
                                                    onChange={handleChange}
                                                    sx={{ mb: 3 }}
                                                    required
                                                >
                                                    {
                                                        role.map((item) =>
                                                            <MenuItem key={item.id} value={item.id}>
                                                                {item.value}
                                                            </MenuItem>
                                                        )
                                                    }
                                                </TextField>
                                            </Box>

                                            <TextField
                                                fullWidth
                                                size="small"
                                                name="phoneNumber"
                                                type="text"
                                                label="Phone"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                                helperText={touched.phoneNumber && errors.phoneNumber}
                                                error={Boolean(errors.phoneNumber && touched.phoneNumber)}
                                                sx={{ mb: 3 }}
                                                required
                                            />

                                            <LoadingButton
                                                type="submit"
                                                color="primary"
                                                loading={user.registerLoading}
                                                variant="contained"
                                                sx={{ my: 2 }}
                                            >
                                                Register
                                            </LoadingButton>

                                            <Paragraph>
                                                Already have an account?
                                                <NavLink
                                                    to={PATH.LOGIN}
                                                    style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                                                >
                                                    Login
                                                </NavLink>
                                            </Paragraph>

                                        </form>
                                    )
                                }}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </LoginRoot>

    );
}

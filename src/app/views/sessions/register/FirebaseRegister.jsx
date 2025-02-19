import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,  Card, Grid, styled, TextField, useTheme,
  MenuItem, Avatar, IconButton
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import { Paragraph } from "app/components/Typography";



const RegisterRoot = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": { maxWidth: 500, margin: 16, borderRadius: 12 }
});

// initial login credentials
const initialValues = {
  user_name: "",
  first_name: "",
  last_name: "",
  phoneNumber: '',
  role: "",
  avatar: "",
  email: "",
  password: "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
  user_name: Yup.string().required("Enter UserName"),
  first_name: Yup.string().required("Enter First Name"),
  last_name: Yup.string().required("Enter Last Name"),
  role: Yup.string().required("Enter Role"),
  avatar: Yup.string(),
  phoneNumber: Yup.string(),
  password: Yup.string()
    .min(8, "Password must be 8 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function FirebaseRegister() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const handleFormSubmit = async (values) => {

  };

  const [file, setFile] = useState(null);
  const handleChangeTwo = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };


  return (
    <RegisterRoot>
      <Card className="card">
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>

            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
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
                    <input type="file" name='avatar' onChange={handleChangeTwo} id="upload" accept="image/*" style={{ display: "none" }} />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="user_name"
                      label="Username"
                      varient="outlined"
                      onBlur={handleBlur}
                      // value={value.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3, mt: 3 }}
                      required
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="first_name"
                      label="First Name"
                      varient="outlined"
                      onBlur={handleBlur}
                      // value={value.username}
                      onChange={handleChange}
                      helperText={touched.firstname && errors.firstname}
                      error={Boolean(errors.firstname && touched.firstname)}
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
                      // value={value.username}
                      onChange={handleChange}
                      helperText={touched.lastname && errors.lastname}
                      error={Boolean(errors.lastname && touched.lastname)}
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
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 3 }}
                      required
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
                      type="number"
                      label="Phone"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      helperText={touched.phone && errors.phone}
                      error={Boolean(errors.phone && touched.phone)}
                      sx={{ mb: 3 }}
                      required
                    />

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Register
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>

                  </form>
                )}
              </Formik>
            </Box>
          </Grid>

        </Grid>
      </Card>
    </RegisterRoot>
  );
}

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
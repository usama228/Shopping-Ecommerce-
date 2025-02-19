import React from 'react'
import {
    Avatar, Box, Button, Grid, IconButton,
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDITUSER, GETUSER,} from 'app/redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from 'app/hooks/useAuth';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { addImage } from 'app/redux/api';
import { TextField1 } from 'app/assets';
import { PATH } from 'config';
import PasswordChangeDialog from 'app/assets/genericComponents/PasswordChangeDialog';


const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("Enter UserName"),
    first_name: Yup.string().required("Enter First Name"),
    last_name: Yup.string().required("Enter Last Name"),
    role: Yup.string(),
    avatar: Yup.string().nullable(),
    // phoneNumber: Yup.string().matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
    email: Yup.string().email("Invalid Email address").required("Email is required!")
});

const EditProfile = () => {
    const param = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(GETUSER(param.id))
    }, [dispatch, param])

    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const auth = useAuth()

    const handleFormSubmit = (values) => {
        values = { ...values, avatar: file }
        dispatch(EDITUSER(values, moveToNextOnSubmit, updateSuccessfully))
    };

    function updateSuccessfully() {
        navigate(-1);
    }

    const moveToNextOnSubmit = () => {
        navigate(PATH.PROFILE);
    };

    const [file, setFile] = useState(null);
    const [initialValues, setInitailValues] = useState(null)

    useEffect(() => {
        setInitailValues(user.user)
    }, [user.user])

    useEffect(() => {
        if (initialValues) {
            setFile(user.user.avatar)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues])

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };


    const uploadFile = (e) => {
        let file_ = e.target.files[0];
        if (file_) {
            const formData = new FormData();
            formData.append('avatar', file_);
            addImage(formData).then(
                response => {
                    if (response.data.succeeded === true) {
                        setFile(response.data.data.path)

                    }
                    else {

                    }
                }, error => {

                }
            )
        }
    }
    if (!initialValues) {
        return (<React.Fragment></React.Fragment>)
    }
    return (

        <SimpleCard>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Profile", path: "/user-profile" }, { name: "Edit Profile" }]} />
            </Box>
            {
                user.userSuccess === true
                &&
                user.user
                &&
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema} >
                    {(props) => {
                        const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <div>
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
                                                        width: "100px",
                                                        height: "100px"
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

                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                                        <Button variant="outlined" onClick={handleDialogOpen}>
                                            Change Password
                                        </Button>
                                    </Grid>
                                    <Grid container spacing={6}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                            <TextField1
                                                type="text"
                                                name="username"
                                                value={values.user_name}
                                                label="User Name"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <TextField1
                                                type="text"
                                                name="first_name"
                                                value={values.first_name}
                                                label="First Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                helperText={touched.first_name && errors.first_name}
                                                error={Boolean(errors.first_name && touched.first_name)}
                                                sx={{ mb: 3, mt: 3 }}
                                                required
                                            />
                                            <TextField1
                                                select
                                                name='role'
                                                label="Role"
                                                SelectProps={{ native: true }}
                                                value={values.role}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.role && errors.role)}
                                                helperText={touched.role && errors.role}
                                            >
                                                <option value="" disabled>Select a role</option>
                                                <option value="admin">Admin</option>
                                                <option value="consumer">Consumer</option>
                                            </TextField1>

                                        </Grid>

                                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                            <TextField1
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                label="Email"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <TextField1
                                                type="text"
                                                name="last_name"
                                                value={values.last_name}
                                                label="Last Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                helperText={touched.last_name && errors.last_name}
                                                error={Boolean(errors.last_name && touched.last_name)}
                                                sx={{ mb: 3, mt: 3 }}
                                                required
                                            />

                                            <TextField1
                                                fullWidth
                                                name="status"
                                                label="Status"
                                                select
                                                SelectProps={{ native: true }}
                                                value={values.status}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.status && errors.status)}
                                                helperText={touched.status && errors.status}
                                            >
                                                <option value="" disabled></option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </TextField1>


                                        </Grid>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                        <LoadingButton
                                            type="button"
                                            onClick={updateSuccessfully}
                                            color="secondary"
                                            loading={user.updateLoading}
                                            variant="contained"
                                            sx={{ my: 2, mx: 1 }}
                                        >
                                            Cancel
                                        </LoadingButton>
                                        <LoadingButton
                                            type="submit"
                                            color="primary"
                                            loading={user.updateLoading}
                                            variant="contained"
                                            sx={{ my: 2 }}
                                        >
                                            Update
                                        </LoadingButton>

                                    </Grid>
                                </div>
                            </form>)
                    }}
                </Formik>
            }
            <PasswordChangeDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
            />
        </SimpleCard>


    );
};

export default EditProfile;



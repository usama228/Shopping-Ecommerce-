import React from 'react'
import {
    Avatar, Box, Grid, IconButton,
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDITFABRIC, GETFABRICBYID } from 'app/redux/actions';
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { addImage } from 'app/redux/api';
import { Container, TextField1 } from 'app/assets';

const EditCategory = () => {
    const param = useParams()
    const dispatch = useDispatch()
    const fabrics = useSelector((state) => state.fabric)
    useEffect(() => {
        dispatch(GETFABRICBYID(param.id))
    }, [dispatch, param])
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Enter Title"),
        description: Yup.string().required("Enter Description"),
        avatar: Yup.string(),
        price: Yup.string().required("Enter Price")

    });
    const [file, setFile] = useState(null);
    const [initialValues, setInitailValues] = useState(null)

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
    const handleFormSubmit = (values) => {
        values = { ...values, avatar: file }
        dispatch(EDITFABRIC(values, updateSuccessfully))
    };

    const navigate = useNavigate();
    function updateSuccessfully() {
        navigate(-1);
    }
    useEffect(() => {
        setInitailValues(fabrics.getFabric)
    }, [fabrics.getFabric])
    useEffect(() => {
        if (initialValues) {
            setFile(fabrics.getFabric.avatar)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues])
    if (!initialValues) {
        return (<React.Fragment></React.Fragment>)
    }
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}  >
            {(props) => {
                const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props
                return (
                    <SimpleCard>
                        <Container>
                            <Box>
                                <Breadcrumb routeSegments={[{ name: "Fabric", path: "/fabric" }, { name: "Edit Fabric" }]} />
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
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
                                            <Grid container spacing={6}>
                                                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                    <TextField1
                                                        type="text"
                                                        name="title"
                                                        label="Title"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.title}
                                                        helperText={touched.title && errors.title}
                                                        error={Boolean(errors.title && touched.title)}
                                                        sx={{ mb: 3, mt: 3 }}
                                                        required
                                                    />
                                                    <TextField1
                                                        type="number"
                                                        name="price"
                                                        label="Price"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.price}
                                                        helperText={touched.price && errors.price}
                                                        error={Boolean(errors.price && touched.price)}
                                                        sx={{ mb: 3, mt: 3 }}
                                                        required
                                                    />


                                                </Grid>

                                                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                    <TextField1
                                                        type="text"
                                                        name="description"
                                                        label="Description"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.description}
                                                        helperText={touched.description && errors.description}
                                                        error={Boolean(errors.description && touched.description)}
                                                        sx={{ mb: 3, mt: 3 }}
                                                        required
                                                    />
                                                    <TextField1
                                                        type="number"
                                                        name="quantity"
                                                        label="Quantity"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.quantity}
                                                        helperText={touched.quantity && errors.quantity}
                                                        error={Boolean(errors.quantity && touched.quantity)}
                                                        sx={{ mb: 3, mt: 3 }}
                                                        required
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                <LoadingButton
                                                    type="button"
                                                    color="secondary"
                                                    loading={fabrics.editFabricLoading}
                                                    variant="contained"
                                                    sx={{ my: 1, mx: 1 }}
                                                    onClick={() => { updateSuccessfully() }} >
                                                    Cancel
                                                </LoadingButton>
                                                <LoadingButton
                                                    type="submit"
                                                    color="primary"
                                                    loading={fabrics.editFabricLoading}
                                                    variant="contained"
                                                    sx={{ my: 1 }}
                                                >
                                                    Edit
                                                </LoadingButton>
                                            </Grid>
                                        </div>
                                    </form>

                                </Grid>

                            </Grid>
                        </Container>
                    </SimpleCard>)
            }}
        </Formik>
    )
};

export default EditCategory;



import {
    Avatar, Box, Stack,
    Grid, Button,
} from "@mui/material";
import { Formik, } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { createImageFromInitials } from 'app/assets/genericActions';
import { SimpleCard, Breadcrumb } from 'app/components';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, ErrorMessage, TextField1 } from 'app/assets';
import { addImage } from 'app/redux/api';
import { CREATECATEGORY, GETCATEGORYBYID, UPDATECATEGORY, } from 'app/redux/actions/products';
import { useState } from "react";
import { PATH } from "config";
import { useEffect } from "react";

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        avatar: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Enter Title"),
        description: Yup.string().required("Enter Description"),
        avatar: Yup.string().nullable(),
    });

    useEffect(() => {
        if (param.id !== 'new') {
            dispatch(GETCATEGORYBYID(param.id, moveToNext, onFailure));
        }
    }, [param.id, dispatch]);


    const handleFormSubmit = async (values) => {
        const data = {
            ...values,
            avatar: values.avatar || createImageFromInitials(values.title),
        };
        if (param.id !== 'new') {
            dispatch(UPDATECATEGORY(data, moveToNextOnSubmit, onFailure));
        } else {
            dispatch(CREATECATEGORY(data, moveToNextOnSubmit, onFailure));
        }
    };

    const moveToNext = (data) => {
        setInitialValues(data);
    };

    const moveToNextOnSubmit = () => {
        navigate(PATH.CATEGORIES);
    };


    const onFailure = (msg) => {
        setSnackbarOpen(true);
        setError(msg);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setError('');
    };



    const uploadFile = (e, setFieldValue, fieldName, setPreview) => {
        const file_ = e.target.files[0];

        if (file_) {
            const formData = new FormData();
            formData.append('avatar', file_);

            addImage(formData).then((response) => {
                if (response.data.succeeded === true) {
                    setFieldValue(fieldName, response.data.data.path);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (setPreview) {
                            setPreview(reader.result);
                        }
                    };
                    reader.readAsDataURL(file_);
                }
            });
        }
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
        >

            {(props) => {
                const { values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit } = props;
                return (
                    <Container>
                        <Box className="breadcrumb">
                            <Breadcrumb routeSegments={[{ name: "Categories", path: "/categories" }, { name: "Add Category" }]} />
                        </Box>
                        <Stack spacing={2}>
                            <SimpleCard>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                                            <label htmlFor="avatar-upload">
                                                <Avatar
                                                    sx={{ width: 100, height: 100, cursor: 'pointer' }}
                                                    src={values?.avatar ? values.avatar : undefined}
                                                />
                                                <input
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={(event) => uploadFile(event, setFieldValue, 'avatar')}
                                                />
                                            </label>
                                            {touched.avatar && errors.avatar && (
                                                <div style={{ color: 'red', marginTop: '8px' }}>{errors.avatar}</div>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item lg={6}>
                                            <TextField1
                                                fullWidth
                                                name="title"
                                                label="Title"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.title}
                                                error={Boolean(touched.title && errors.title)}
                                                helperText={touched.title && errors.title}

                                            />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <TextField1
                                                fullWidth
                                                name="description"
                                                label="Description"
                                                multiline
                                                maxRows={4}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                onChange={handleChange}
                                                error={Boolean(touched.description && errors.description)}
                                                helperText={touched.description && errors.description}

                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                        <Button
                                            type="button"
                                            color="secondary"
                                            variant="contained"
                                            sx={{ my: 2, mx: 1 }}
                                            onClick={() => navigate(PATH.CATEGORIES)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            sx={{ my: 2 }}
                                        >
                                            {param.id === 'new' ? 'Create' : 'Update'}
                                        </Button>
                                    </Grid>
                                </form>
                            </SimpleCard>
                        </Stack>
                        <ErrorMessage
                            snackbarOpen={snackbarOpen}
                            handleSnackbarClose={handleSnackbarClose}
                            message={error}
                        />
                    </Container>
                )
            }}
        </Formik>

    );
};

export default AddCategory;

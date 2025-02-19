/* eslint-disable no-unused-vars */
import {
    Avatar, Box, Button, Grid,
    IconButton
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useDispatch } from 'react-redux';
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { createImageFromInitials } from 'app/assets/genericActions';
import { useNavigate, useParams } from 'react-router-dom';
import { addImage } from 'app/redux/api';
import { ErrorMessage, TextField1 } from 'app/assets';
import { ADDPRODUCT, EDITPRODUCT, GETPRODUCTBYID } from 'app/redux/actions/products';
import { PATH } from "config";
import { useState, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel'; // Import CancelIcon


const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();

    // eslint-disable-next-line no-unused-vars
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        avatar: '',
        variants: [{ size: '', price: '', stockQuantity: '', purchasePrice: '', sellingPrice: '' }]
    });


    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Enter Title"),
        description: Yup.string().required("Enter Description"),
        avatar: Yup.string().optional(),
        variants: Yup.array().of(
            Yup.object().shape({
                size: Yup.string().required("Enter Size"),
                price: Yup.number().required("Enter Price").positive("Price must be positive"),
                stockQuantity: Yup.number()
                    .required("Enter Stock Quantity")
                    .integer("Must be an integer")
                    .min(0, "Cannot be negative"),
                purchasePrice: Yup.number()
                    .required("Enter Purchase Price")
                    .positive("Purchase Price must be positive"),
                sellingPrice: Yup.number()
                    .required("Enter Selling Price")
                    .positive("Selling Price must be positive"),
            })
        )
    });

    useEffect(() => {
        if (param.id !== 'new') {
            dispatch(GETPRODUCTBYID(param.id, moveToNext, onFailure));
        }
    }, [param.id, dispatch]);

    const handleFormSubmit = async (values) => {
        const productData = {
            ...values,
            avatar: values.avatar || createImageFromInitials(values.title),
        };

        if (param.id !== 'new') {
            dispatch(EDITPRODUCT(productData, moveToNextOnSubmit, onFailure));
        } else {
            dispatch(ADDPRODUCT(productData, moveToNextOnSubmit, onFailure));
        }
    };

    const onFailure = (msg) => {
        setSnackbarOpen(true);
        setError(msg);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setError('');
    };

    const moveToNextOnSubmit = () => {
        navigate(PATH.PRODUCTS);
    };

    const moveToNext = (data) => {
        setInitialValues(data);
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
        <SimpleCard>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Products", path: "/products" }, { name: "Add Product" }]} />
            </Box>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
            >
                {(props) => {
                    const { values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                                    <label htmlFor="avatar-upload">
                                        <Avatar
                                            sx={{ width: 100, height: 100, cursor: 'pointer' }}
                                            src={values.avatar || undefined}
                                        />
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(event) => uploadFile(event, setFieldValue)}
                                        />
                                    </label>
                                    {touched.avatar && errors.avatar && (
                                        <div style={{ color: 'red', marginTop: '8px' }}>{errors.avatar}</div>
                                    )}
                                </Grid>
                            </Grid>

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
                                     
                                    />
                                </Grid>
                            </Grid>

                            <FieldArray
                                name="variants"
                                render={(arrayHelpers) => (
                                    <div>
                                        <Button variant="outlined" onClick={() => arrayHelpers.push({ size: '', price: '', stockQuantity: '', purchasePrice: '', sellingPrice: '' })}>
                                            Add Variant
                                        </Button>
                                        {values.variants.map((variant, index) => {
                                            return (
                                                <>

                                                    <Grid container spacing={2} sx={{ mt: 2 }} key={index}>
                                                        <Grid item lg={3}>
                                                            <TextField1
                                                                fullWidth
                                                                label="Size"
                                                                name={`variants[${index}].size`}
                                                                variant="outlined"
                                                                value={variant.size}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.variants && errors.variants && errors.variants[index]?.size)}
                                                                helperText={touched.variants && errors.variants && errors.variants[index]?.size}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                label="Price"
                                                                name={`variants[${index}].price`}
                                                                variant="outlined"
                                                                value={variant.price}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.variants && errors.variants && errors.variants[index]?.price)}
                                                                helperText={touched.variants && errors.variants && errors.variants[index]?.price}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                label="Stock Quantity"
                                                                name={`variants[${index}].stockQuantity`}
                                                                variant="outlined"
                                                                value={variant.stockQuantity}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.variants && errors.variants && errors.variants[index]?.stockQuantity)}
                                                                helperText={touched.variants && errors.variants && errors.variants[index]?.stockQuantity}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                label="Purchase Price"
                                                                name={`variants[${index}].purchasePrice`}
                                                                variant="outlined"
                                                                value={variant.purchasePrice}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.variants && errors.variants && errors.variants[index]?.purchasePrice)}
                                                                helperText={touched.variants && errors.variants && errors.variants[index]?.purchasePrice}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                label="Selling Price"
                                                                name={`variants[${index}].sellingPrice`}
                                                                variant="outlined"
                                                                value={variant.sellingPrice}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.variants && errors.variants && errors.variants[index]?.sellingPrice)}
                                                                helperText={touched.variants && errors.variants && errors.variants[index]?.sellingPrice}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={1}>
                                                            <IconButton
                                                                color="secondary"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                                aria-label="remove"
                                                            >
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )
                                        })}

                                    </div>
                                )}
                            />

                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <Button
                                    type="button"
                                    color="secondary"
                                    variant="contained"
                                    sx={{ my: 2, mx: 1 }}
                                    onClick={() => navigate(PATH.PRODUCTS)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{ my: 2, mx: 1 }}
                                >
                                    {param.id === 'new' ? 'Create' : 'Update'}
                                </Button>
                            </Grid>
                        </form>
                    );
                }}
            </Formik>
            <ErrorMessage
                snackbarOpen={snackbarOpen}
                handleSnackbarClose={handleSnackbarClose}
                message={error}
            />
        </SimpleCard>
    );
};

export default AddProduct;

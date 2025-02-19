import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Button,
    InputAdornment,

} from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'app/hooks/useAuth';
import { SimpleCard, Breadcrumb } from 'app/components';
import { CREATEPURCHASEORDER, GETALLCONSUMERS, UPDATEPURCHASEORDER } from 'app/redux/actions';
import { ErrorMessage, TextField1 } from 'app/assets';
import { GETALLCATEGORIES, GETALLPRODUCTS } from 'app/redux/actions/products';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { ORDERSTATUS } from '../../../config';

export default function AddOrder() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useAuth();
    const param = useParams();
    const users = useSelector(state => state.user);
    const products = useSelector(state => state.product);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');

    // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
        orderNumber: '',
        consumer: '',
        orderDate: dayjs(),
        status: '',
        products: [{ product: '', category: '', variant: '', size: '', price: '', stockQuantity: '', purchasePrice: '', sellingPrice: '', salePrice: '' }],
        sellingPriceCommission: '',
        salePriceCommission: '',
        quantity: '',
        totalAmount: '',
    });

    const validationSchema = Yup.object().shape({
        orderNumber: Yup.string().required('Order number is required'),
        consumer: Yup.string(),
        orderDate: Yup.date().required('Order date is required').min(dayjs().subtract(1, 'year').toDate(), 'Order date cannot be older than 1 year'),
        status: Yup.string(),
        products: Yup.array().of(
            Yup.object().shape({
                product: Yup.string().required('Product is required'),
                category: Yup.string().required('Category is required'),
                variant: Yup.string().required('Variant is required'),
                size: Yup.string(),
                price: Yup.number().required('Price is required').positive('Price must be a positive number'),
                stockQuantity: Yup.number().required('Stock Quantity is required').positive('Stock Quantity must be a positive number'),
                purchasePrice: Yup.number().required('Purchase Price is required').positive('Purchase Price must be a positive number'),
                sellingPrice: Yup.number().required('Selling Price is required').positive('Selling Price must be a positive number'),
                salePrice: Yup.number().required('Sale Price is required').positive('Sale Price must be a positive number'),
            })
        ),
        sellingPriceCommission: Yup.string().required("SellingPrice Commission"),
        salePriceCommission: Yup.string().required("SalePrice Commission"),
        quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
        totalAmount: Yup.number().required('Total amount is required').positive('Total amount must be a positive number'),

    });

    useEffect(() => {
        dispatch(GETALLCONSUMERS({ page: 1, limit: 1000 }, auth));
        dispatch(GETALLCATEGORIES({ page: 1, limit: 1000 }, auth));
        dispatch(GETALLPRODUCTS({ page: 1, limit: 1000 }, auth));
    }, [dispatch, auth]);

    const handleFormSubmit = (values) => {
        const orderData = { ...values };

        if (param.id !== 'new') {
            dispatch(UPDATEPURCHASEORDER(orderData, moveToNextOnSubmit, onFailure));
        } else {
            dispatch(CREATEPURCHASEORDER(orderData, moveToNextOnSubmit, onFailure));
        }
    };

    const moveToNextOnSubmit = () => {
        navigate('/orders');
    };

    const onFailure = (msg) => {
        setSnackbarOpen(true);
        setError(msg);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setError('');
    };

    return (
        <SimpleCard>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Orders", path: "/orders" }, { name: 'Add Order' }]} />
            </Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
                enableReinitialize
            >
                {(props) => {
                    const { setFieldValue, values, errors, touched, handleChange, handleBlur, handleSubmit } = props;

                    return (
                        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
                            <Grid container spacing={6}>
                                {auth.role === 'superAdmin' && (
                                    <>
                                        <Grid item lg={6}>
                                            <TextField1
                                                fullWidth
                                                select
                                                name="consumer"
                                                label="Select Consumer"
                                                SelectProps={{ native: true }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.consumer}
                                                helperText={touched.consumer && errors.consumer}
                                                error={Boolean(errors.consumer && touched.consumer)}
                                            >
                                                <option value="" disabled></option>
                                                {users?.allConsumers?.consumers?.map(consumer => (
                                                    <option key={consumer.id} value={consumer.user_name}>
                                                        {consumer.user_name}
                                                    </option>
                                                ))}
                                            </TextField1>
                                        </Grid>

                                        <Grid item lg={6}>
                                            {/* Content for the second field goes here */}
                                        </Grid>
                                    </>
                                )}


                                <Grid item lg={6}>
                                    <TextField1
                                        type="text"
                                        name="orderNumber"
                                        label="Order Number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.orderNumber}
                                        helperText={touched.orderNumber && errors.orderNumber}
                                        error={Boolean(errors.orderNumber && touched.orderNumber)}

                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{ width: "100%" }}
                                            label="Order Date"
                                            name="orderDate"
                                            value={values.orderDate}
                                            onChange={(newValue) => setFieldValue('orderDate', newValue)}
                                            helperText={touched.orderDate && errors.orderDate}
                                            error={Boolean(errors.orderDate && touched.orderDate)}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <FieldArray name="products">
                                    {({ push, remove }) => (
                                        <Grid item lg={12}>
                                            {values.products.map((product, index) => (
                                                <Box key={index} sx={{ borderBottom: '1px solid #ddd', paddingBottom: 2, marginBottom: 2 }}>
                                                    <Grid container spacing={2}>

                                                        <Grid item lg={4}>
                                                            <TextField1
                                                                fullWidth
                                                                select
                                                                name={`products[${index}].category`}
                                                                label="Select Category"
                                                                SelectProps={{ native: true }}
                                                                value={product.category}
                                                                onChange={handleChange}
                                                                helperText={touched.products?.[index]?.category && errors.products?.[index]?.category}
                                                                error={Boolean(errors.products?.[index]?.category && touched.products?.[index]?.category)}
                                                            >
                                                                <option value="" disabled></option>
                                                                {products?.categories?.categories?.map(cat => (
                                                                    <option key={cat.id} value={cat.title}>
                                                                        {cat.title}
                                                                    </option>
                                                                ))}
                                                            </TextField1>
                                                        </Grid>

                                                        <Grid item lg={4}>
                                                            <TextField1
                                                                fullWidth
                                                                select
                                                                name={`products[${index}].product`}
                                                                label="Select Product"
                                                                SelectProps={{ native: true }}
                                                                value={product.product}
                                                                onChange={handleChange}
                                                                helperText={touched.products?.[index]?.product && errors.products?.[index]?.product}
                                                                error={Boolean(errors.products?.[index]?.product && touched.products?.[index]?.product)}
                                                            >
                                                                <option value="" disabled></option>
                                                                {products?.products?.products?.map(prod => (
                                                                    <option key={prod.id} value={prod.title}>
                                                                        {prod.title}
                                                                    </option>
                                                                ))}
                                                            </TextField1>
                                                        </Grid>
                                                        <Grid item lg={4}>
                                                            <TextField1
                                                                fullWidth
                                                                select
                                                                name={`products[${index}].variant`}
                                                                label="Select Variant"
                                                                SelectProps={{ native: true }}
                                                                value={product.variant}
                                                                onChange={handleChange}
                                                                helperText={touched.products?.[index]?.variant && errors.products?.[index]?.variant}
                                                                error={Boolean(errors.products?.[index]?.variant && touched.products?.[index]?.variant)}
                                                            >
                                                                <option value="" disabled></option>
                                                                {/* {products?.products?.products?.map(prod => (
                                                                    <option key={prod.id} value={prod.title}>
                                                                        {prod.title}
                                                                    </option>
                                                                ))} */}
                                                            </TextField1>
                                                        </Grid>

                                                        {/* Add other fields for size, price, stock quantity, purchase price, selling price */}
                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                name={`products[${index}].size`}
                                                                label="Size"
                                                                value={product.size}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>

                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                name={`products[${index}].price`}
                                                                label="Price"
                                                                value={product.price}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>

                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                name={`products[${index}].stockQuantity`}
                                                                label="Stock Quantity"
                                                                value={product.stockQuantity}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>

                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                name={`products[${index}].purchasePrice`}
                                                                label="Purchase Price"
                                                                value={product.purchasePrice}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>

                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                name={`products[${index}].sellingPrice`}
                                                                label="Selling Price"
                                                                value={product.sellingPrice}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={2}>
                                                            <TextField1
                                                                fullWidth
                                                                name={`products[${index}].salePrice`}
                                                                label="Sale Price"
                                                                value={product.salePrice}
                                                                onChange={handleChange}
                                                            />
                                                        </Grid>


                                                    </Grid>

                                                    <Button color="error" onClick={() => remove(index)} variant="outlined">
                                                        Remove Product
                                                    </Button>
                                                    <Button onClick={() => push({ product: '', category: '', size: '', price: '', stockQuantity: '', purchasePrice: '', sellingPrice: '', quantity: '' })}
                                                        variant="contained"
                                                        sx={{ marginLeft: "10px" }}
                                                    >
                                                        Add Product
                                                    </Button>
                                                </Box>
                                            ))}


                                        </Grid>
                                    )}
                                </FieldArray>
                                <Grid item lg={6}>
                                    <TextField1
                                        type="number"
                                        name="sellingPriceCommission"
                                        label="Selling Price Commission"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.sellingPriceCommission}
                                        helperText={touched.sellingPriceCommission && errors.sellingPriceCommission}
                                        error={Boolean(errors.sellingPriceCommission && touched.sellingPriceCommission)}

                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item lg={6}>
                                    <TextField1
                                        type="text"
                                        name="salePriceCommission"
                                        label="Sale Price Commission"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.salePriceCommission}
                                        helperText={touched.salePriceCommission && errors.salePriceCommission}
                                        error={Boolean(errors.salePriceCommission && touched.salePriceCommission)}

                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                {auth.role === 'superAdmin' && (
                                    <>
                                        <Grid item lg={6}>
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
                                                {ORDERSTATUS.map(status => (
                                                    <option key={status.id} value={status.title}>
                                                        {status.title}
                                                    </option>
                                                ))}
                                            </TextField1>
                                        </Grid>


                                    </>
                                )}

                                <Grid item lg={6}>
                                    <TextField1
                                        type="text"
                                        name="quantity"
                                        label="Quantity"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.quantity}
                                        helperText={touched.quantity && errors.quantity}
                                        error={Boolean(errors.quantity && touched.quantity)}

                                    />
                                </Grid>

                                <Grid item lg={6}>
                                    <TextField1
                                        type="text"
                                        name="totalAmount"
                                        label="Total Amount"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.totalAmount}
                                        helperText={touched.totalAmount && errors.totalAmount}
                                        error={Boolean(errors.totalAmount && touched.totalAmount)}

                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                                <Grid item lg={6}>
                                    <Button
                                        type="button"
                                        color="secondary"
                                        variant="contained"
                                        sx={{ marginRight: "10px" }}
                                        onClick={() => navigate('/orders')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"

                                    >
                                        {param.id === 'new' ? 'Create' : 'Update'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    );
                }}
            </Formik>
            <ErrorMessage snackbarOpen={snackbarOpen} handleSnackbarClose={handleSnackbarClose} message={error} />
        </SimpleCard>
    );
}

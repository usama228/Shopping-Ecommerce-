import React, { useState } from 'react';
import { Box, Button, Grid, Avatar } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { CREATEUSER, EDITUSER, GETUSER, } from 'app/redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import { ErrorMessage, TextField1 } from 'app/assets';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addImage } from 'app/redux/api';
import { PATH, } from '../../../config';
import Loading from 'app/components/MatxLoading';
import { createImageFromInitials } from 'app/assets/genericActions';
import { useAuth } from 'app/hooks/useAuth';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { REQUEST, USER_REQUEST } from 'app/redux/actions/utilities';

const AddUser = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const auth = useAuth();
    const navigate = useNavigate();
    const param = useParams();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [initialValues, setInitialValues] = useState(null);

    const [checkbookPreview, setCheckbookPreview] = useState(null);
    const [cnicFrontPreview, setCnicFrontPreview] = useState(null);
    const [cnicBackPreview, setCnicBackPreview] = useState(null);
    const [contractPreview, setContractPreview] = useState(null);

    const validationSchema = Yup.object().shape({
        user_name: Yup.string().required('User name is required'),
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        company_name: Yup.string(),
        status: Yup.string().required('Status is required'),
        role: Yup.string().required('Role is required'),
        cnic: Yup.string()
            .length(13, 'CNIC must be exactly 13 digits')
            .matches(/^\d{13}$/, 'CNIC must contain only digits')
            .required('CNIC is required'),
        avatar: Yup.string().optional(),
        phoneNumber: Yup.string().required('Phone Number is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        contractPicture: Yup.string().nullable().default(null),
        cnic_front: Yup.string().nullable().default(null).required('CNIC front is required'),
        cnic_back: Yup.string().nullable().default(null).required('CNIC back is required'),
        checkbookPicture: Yup.string().nullable().default(null),
        contractStartDate: Yup.date().nullable(),
        contractEndDate: Yup.date()
            .nullable()
            .min(Yup.ref('contractStartDate'), 'End date must be after start date'),
    });


    const moveToNext = (data) => {
        setInitialValues({
            ...data,
            contractStartDate: data.contractStartDate ? dayjs(data.contractStartDate).format('YYYY-MM-DD') : '',
            contractEndDate: data.contractEndDate ? dayjs(data.contractEndDate).format('YYYY-MM-DD') : '',
        }
        );
    };


    useEffect(() => {
        dispatch(REQUEST(USER_REQUEST.RESET_USER_DATA));
        setInitialValues(null);
        if (param.id !== 'new') {
            dispatch(GETUSER(param.id, moveToNext, onFailure));
        } else {
            setInitialValues({
                user_name: '',
                first_name: '',
                last_name: '',
                status: '',
                role: param.role === 'admin' ? 'admin' : 'consumer',
                cnic: '',
                company_name: '',
                avatar: null,
                phoneNumber: '',
                email: '',
                contractPicture: null,
                cnic_front: null,
                cnic_back: null,
                checkbookPicture: null,
                contractStartDate: dayjs().startOf('day'),
                contractEndDate: dayjs().startOf('day'),
            })
        }
    }, [param.id, dispatch, param.role]);



    const onFailure = (msg) => {
        console.log("msg", msg)
        setSnackbarOpen(true);
        setError(msg);
    };

    const moveToNextOnSubmit = () => {
        navigate(PATH.USERS.replace(':role', param.role));
    };

    const handleSubmit = async (values) => {
        const userData = {
            ...values,
            avatar: values.avatar || createImageFromInitials(values.user_name),

        };
        if (param.id !== 'new') {
            dispatch(EDITUSER(userData, moveToNextOnSubmit, onFailure));
        } else {
            dispatch(CREATEUSER(userData, moveToNextOnSubmit, onFailure));
        }
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

    const handleMoveToAll = () => {
        if (param.role === 'admin') {
            navigate(PATH.USERS.replace(':role', param.role));
        } else {
            navigate(PATH.USERS.replace(':role', param.role));
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setError('');
    };

    if (!initialValues) return <Loading />;
    return (
        <SimpleCard>
            <Box>
                <Breadcrumb routeSegments={[{ name: param.role === 'consumer' ? 'Add consumer' : 'Add Admin' }]} />
            </Box>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {(formikProps) => {
                    const { values, handleChange, handleSubmit, handleBlur, setFieldValue, errors, touched } = formikProps;
                    return (
                        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
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
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField1
                                        fullWidth
                                        name="user_name"
                                        label="User Name"
                                        value={values.user_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.user_name && errors.user_name)}
                                        helperText={touched.user_name && errors.user_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField1
                                        fullWidth
                                        name="first_name"
                                        label="First Name"
                                        value={values.first_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.first_name && errors.first_name)}
                                        helperText={touched.first_name && errors.first_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField1
                                        fullWidth
                                        name="last_name"
                                        label="Last Name"
                                        value={values.last_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.last_name && errors.last_name)}
                                        helperText={touched.last_name && errors.last_name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField1
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={6}>
                                    <TextField1
                                        fullWidth
                                        name="phoneNumber"
                                        label="Phone Number"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                        helperText={touched.phoneNumber && errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField1
                                        fullWidth
                                        name="cnic"
                                        label="CNIC Number"
                                        value={values.cnic}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.cnic && errors.cnic)}
                                        helperText={touched.cnic && errors.cnic}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField1
                                        fullWidth
                                        name="role"
                                        label="Role"
                                        value={values.role}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.role && errors.role)}
                                        helperText={touched.role && errors.role}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
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


                                {param.role === 'consumer' && (
                                    <>
                                        <Grid item xs={12} sm={6}>
                                            <TextField1
                                                fullWidth
                                                name="contractStartDate"
                                                label="Contract Start Date"
                                                type="date"
                                                value={values.contractStartDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.contractStartDate && errors.contractStartDate)}
                                                helperText={touched.contractStartDate && errors.contractStartDate}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField1
                                                fullWidth
                                                name="contractEndDate"
                                                label="Contract End Date"
                                                type="date"
                                                value={values.contractEndDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.contractEndDate && errors.contractEndDate)}
                                                helperText={touched.contractEndDate && errors.contractEndDate}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField1
                                                fullWidth
                                                name="company_name"
                                                label="Company name"
                                                value={values.company_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={Boolean(touched.company_name && errors.company_name)}
                                                helperText={touched.company_name && errors.company_name}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} container direction="column" alignItems="start">
                                            {contractPreview && (
                                                <img
                                                    src={contractPreview}
                                                    alt="Contract Preview"
                                                    style={{ width: '100px', height: '50px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                                />
                                            )}
                                            <Button component="label" variant="outlined" startIcon={<AttachFileIcon />} sx={{ marginLeft: '20px' }}>
                                                Upload Contract Picture
                                                <input
                                                    name="contractPicture"
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    required
                                                    onChange={(event) => uploadFile(event, setFieldValue, 'contractPicture', setContractPreview)}
                                                />
                                            </Button>
                                        </Grid>
                                    </>
                                )}


                                {/* File Uploads */}
                                <Grid item xs={12} sm={6} container direction="column" alignItems="start">
                                    {cnicFrontPreview && (
                                        <img
                                            src={cnicFrontPreview}
                                            alt="CNIC Front Preview"
                                            style={{ width: '100px', height: '50px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                        />
                                    )}
                                    <Button component="label" variant="outlined" startIcon={<AttachFileIcon />} sx={{ marginLeft: '20px' }}>
                                        Upload CNIC Front
                                        <input
                                            name="cnic_front"
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(event) => uploadFile(event, setFieldValue, 'cnic_front', setCnicFrontPreview)}
                                        />
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={6} container direction="column" alignItems="start">
                                    {cnicBackPreview && (
                                        <img
                                            src={cnicBackPreview}
                                            alt="CNIC Back Preview"
                                            style={{ width: '100px', height: '50px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                        />
                                    )}
                                    <Button component="label" variant="outlined" startIcon={<AttachFileIcon />} sx={{ marginLeft: '20px' }}>
                                        Upload CNIC Back
                                        <input
                                            name="cnic_back"
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(event) => uploadFile(event, setFieldValue, 'cnic_back', setCnicBackPreview)}
                                        />
                                    </Button>
                                </Grid>


                                {param.role === 'consumer' && (
                                    <>
                                        <Grid item xs={12} sm={6} container direction="column" alignItems="start">
                                            {checkbookPreview && (
                                                <img
                                                    src={checkbookPreview}
                                                    alt="Checkbook Preview"
                                                    style={{ width: '100px', height: '50px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                                />
                                            )}
                                            <Button component="label" variant="outlined" startIcon={<AttachFileIcon />} sx={{ marginLeft: '20px' }}>
                                                Upload Checkbook
                                                <input
                                                    name="checkbookPicture"
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    required
                                                    onChange={(event) => uploadFile(event, setFieldValue, 'checkbookPicture', setCheckbookPreview)}
                                                />
                                            </Button>
                                        </Grid>
                                    </>
                                )}
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleMoveToAll()}
                                        sx={{ marginRight: "10px" }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained">
                                        {param.id === 'new' ? 'Create' : 'Update'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
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

export default AddUser;

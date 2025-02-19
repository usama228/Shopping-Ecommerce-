import React, { useState, useEffect } from 'react';
import { SimpleCard, Breadcrumb } from 'app/components';
import { Box, Grid, TextField, IconButton, Avatar, Typography, Button } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { EDITITEM, GETITEMBYID } from 'app/redux/actions';
import { addImage } from 'app/redux/api';
import { SIZE_REQUEST, SUCCESS } from 'app/redux/actions/utilities';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Container, ResponsiveDeleteConfirmationDialog, TextField1 } from 'app/assets';

function EditItem() {
    const param = useParams()
    const dispatch = useDispatch()
    const items = useSelector((state) => state.items)
    useEffect(() => {
        dispatch(GETITEMBYID(param.id))
    }, [dispatch, param])
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Enter Title"),
        description: Yup.string().required("Enter Description"),
        avatar: Yup.string(),
        price: Yup.string().required("Enter Price"),
        size: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Title is Required'),
                id: Yup.string().required('ID is Required'),
            })
        ).required('Sizes are required'),

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
        dispatch(EDITITEM(values, updateSuccessfully))
    };

    const navigate = useNavigate();
    function updateSuccessfully() {
        navigate(-1);
    }
    useEffect(() => {
        setInitailValues(items.getItem)
    }, [items.getItem])
    useEffect(() => {
        if (initialValues) {
            setFile(items.getItem.avatar)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues])
    const addSize = () => {
        dispatch(SUCCESS(SIZE_REQUEST.ADD_ITEM_SIZE_LIST, {
            id: uuidv4(),
            title: '',
        }))
    }
    const removeSize = (id) => {
        if (deleteConfirmation.id) {
            dispatch(SUCCESS(SIZE_REQUEST.REMOVE_ITEM_SIZE_LIST, deleteConfirmation.id))
            moveToForward()
        }
    }
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        id: null,
        open: false,
        message: null
    });
    const moveToForward = () => {
        setDeleteConfirmation({
            id: null,
            open: false,
            message: null
        })
    }

    const size = useSelector((state) => state.size);
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
                                <Breadcrumb routeSegments={[{ name: "Products", path: "/products" }, { name: "Edit Product" }]} />
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

                                                </Grid>

                                                <Grid item lg={12}>
                                                    <Box>
                                                        <Typography>
                                                            {"Item Size"}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                                                        <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={addSize} sx={{ marginLeft: "20px" }}>
                                                            Add Size
                                                        </Button>
                                                    </Box>
                                                    {
                                                        (size.itemSizeList)
                                                            .map((_size, index) => {

                                                                return (
                                                                    <div key={index}
                                                                        sx={{ display: "flex", justifyContent: "center" }}
                                                                    >

                                                                        <Grid container spacing={2}>
                                                                            <Grid item lg={6} md={6} sm={10} xs={10}>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    type="text"
                                                                                    name={`size[${index}][title]`}
                                                                                    id={`size_${index}_title`}
                                                                                    label="Title"
                                                                                    varient="outlined"
                                                                                    onBlur={handleBlur}
                                                                                    onChange={(e) => {
                                                                                        props.setFieldValue(`size[${index}][id]`, _size.id)
                                                                                        handleChange(e)
                                                                                    }}
                                                                                    value={values['size'][index]?.title ? values['size'][index].title : ''}

                                                                                    sx={{ mb: 2, mt: 2 }}
                                                                                    required />
                                                                            </Grid>

                                                                            <Grid item lg={2} md={2} sm={2} xs={2}>
                                                                                {
                                                                                    index !== 0
                                                                                    &&
                                                                                    <DeleteIcon
                                                                                        sx={{ mt: 3, mr: 1 }}
                                                                                        onClick={() => {
                                                                                            setDeleteConfirmation({
                                                                                                open: true,
                                                                                                id: _size.id,
                                                                                                message: `Are You Sure You Want To Delete ${values['size'][index]?.title ? values['size'][index].title : ''} ?`
                                                                                            })
                                                                                        }}
                                                                                    />
                                                                                }
                                                                            </Grid>
                                                                        </Grid>

                                                                    </div>

                                                                )
                                                            }
                                                            )
                                                    }
                                                </Grid>
                                            </Grid>
                                            <ResponsiveDeleteConfirmationDialog
                                                deleteObject={deleteConfirmation}
                                                handleClose={() => setDeleteConfirmation({
                                                    id: null,
                                                    open: false,
                                                    message: null
                                                })}
                                                onYes={removeSize} />
                                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                <LoadingButton
                                                    type="button"
                                                    color="secondary"
                                                    onClick={() => { navigate(-1) }}
                                                    loading={items.addItemLoading}
                                                    variant="contained"
                                                    sx={{ my: 2, mx: 1 }}
                                                >
                                                    Cancel
                                                </LoadingButton>
                                                <LoadingButton
                                                    type="submit"
                                                    color="primary"
                                                    loading={items.addItemLoading}
                                                    variant="contained"
                                                    sx={{ my: 2 }}
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
}

export default EditItem

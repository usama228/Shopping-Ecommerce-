import React from 'react';
import { Avatar, Box, Button, IconButton, Stack, TextField, Typography, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { Container, SnackbarComponent } from 'app/assets';
import Loading from 'app/components/MatxLoading';
import { Breadcrumb, SimpleCard } from 'app/components';
import { ADDSIZE, EDITSIZE, GETUSERANDITEM } from 'app/redux/actions';
import { LoadingButton } from '@mui/lab';
import { useAuth } from 'app/hooks/useAuth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { PATH } from '../../../config';



export default function UserItemSize() {
    const param = useParams();
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    useEffect(() => {
        dispatch(GETUSERANDITEM(param))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <Container>
                {
                    items.getItemLoading === true
                    &&
                    <Loading />
                }
                {
                    items.getItemFailure === true
                    &&
                    items.getItemError
                    &&
                    <SnackbarComponent
                        // show={show} 
                        message={items.getItemError} />
                }
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "All Consumers", path: "/users/consumer" }, { name: 'Consumer Detail', path: "/user-detail/6634d6dc5c57689c9c92d1d5" }, { name: "Item Size" }]} Item Size />
                </Box>

                {
                    items.getItemSuccess === true
                    &&
                    <React.Fragment>
                        <SimpleCard>
                            <Stack sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                                <Box style={{ display: 'flex' }}>
                                    <label htmlFor="upload">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <Avatar
                                                id="avatar"
                                                src={items.getItem.user_avatar}
                                                style={{
                                                    width: "100px",
                                                    height: "100px"
                                                }} />
                                        </IconButton>
                                    </label>
                                    <div style={{ margin: 'auto' }}>
                                        <div>
                                            {`${items.getItem.first_name} ${items.getItem.last_name}`}
                                        </div>
                                        <div style={{ marginTop: 5 }}>
                                            {`${items.getItem.user_name}`}
                                        </div>
                                    </div>
                                </Box>
                            </Stack>
                        </SimpleCard>
                        <SizeForm />
                    </React.Fragment>
                }
            </Container >
        </div>
    )
}


function SizeForm() {
    const dispatch = useDispatch();
    const param = useParams();
    const items = useSelector((state) => state.items);
    const size = useSelector((state) => state.size);
    let auth = useAuth();
    const validationSchema = Yup.object().shape({
        size: Yup.array().of(
            Yup.object().shape({

                title: Yup.string().required('Title is Required'),
                value: Yup.number().required('Size Value is Required'),
            })
        ).required('Sizes are required'),
    });
    const initialValues = {
        size: items.getItem.size
    }
    const handleFormSubmit = (values) => {
        let data = {
            userId: items.getItem.userId,
            itemId: items.getItem.itemId,
            size: values.size
        }
        if (size.sizeId) {
            data = { ...data, sizeId: size.sizeId }
            dispatch(EDITSIZE(data, auth))
        } else {
            dispatch(ADDSIZE(data, auth))
        }


    }
     const navigate = useNavigate();

    return (
        <React.Fragment>
            <Box className="breadcrumb" sx={{ marginTop: "30px" }}>
                <Typography variant="h6" component="h6">
                    Item
                </Typography>
            </Box>
            <SimpleCard>
                <Stack sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                    <Box style={{ display: 'flex' }}>
                        <label htmlFor="upload">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <Avatar
                                    id="avatar"
                                    src={items.getItem.avatar}
                                    style={{
                                        width: "100px",
                                        height: "100px"
                                    }} />
                            </IconButton>
                        </label>
                        <div style={{ margin: 'auto' }}>
                            <div>
                                {`${items.getItem.title}`}
                            </div>
                            <div style={{ marginTop: 5 }}>
                                {`${items.getItem.description}`}
                            </div>
                        </div>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Button variant="outlined" startIcon={<VisibilityIcon />}
                            onClick={() => { navigate(PATH.PRINTSIZE.replace(":associationId", param.associationId)) }}
                        >
                            View Size
                        </Button>
                        {/* <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={addSize} sx={{ marginLeft: "20px" }}>
                            Add Size
                        </Button> */}
                    </Box>
                </Stack>

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}  >
                    {(props) => {
                        const { values,
                            // errors, touched,                         
                            handleChange,
                            handleBlur, handleSubmit } = props
                        return (

                            <form onSubmit={handleSubmit} >
                                <Container>
                                    <Typography >
                                        {"Item Size"}
                                    </Typography>
                                    {
                                        (items.getItem.size || [])
                                            .map((_size, index) => {

                                                return (
                                                    <div key={index}
                                                        sx={{ display: "flex", justifyContent: "center" }}
                                                    >

                                                        <Grid container spacing={2}>
                                                            <Grid item md={4}>
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"
                                                                    type="text"
                                                                    name={`size[${index}][title]`}
                                                                    id={`size_${index}_title`}
                                                                    label="Title"
                                                                    varient="outlined"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    value={values['size'][index]?.title ? values['size'][index].title : ''}

                                                                    sx={{ mb: 2, mt: 2 }}
                                                                    required />
                                                            </Grid>
                                                            <Grid item md={4}>
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"
                                                                    name={`size[${index}][value]`}
                                                                    id={`size_${index}_value`}
                                                                    type="number"
                                                                    label="Value"
                                                                    variant="outlined"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    value={values['size'][index]?.value ? values['size'][index].value : ''}

                                                                    sx={{ mb: 2, mt: 2 }}
                                                                    required />
                                                            </Grid>
                                                            {/* <Grid item md={2}>
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
                                                            </Grid> */}

                                                        </Grid>

                                                    </div>

                                                )
                                            }
                                            )
                                    }
                                    {/* <ResponsiveDeleteConfirmationDialog
                                        deleteObject={deleteConfirmation}
                                        handleClose={() => setDeleteConfirmation({
                                            id: null,
                                            open: false,
                                            message: null
                                        })}
                                        onYes={removeSize} /> */}

                                    <Box sx={{ display: "flex", justifyContent: "start" }}>

                                        <LoadingButton
                                            type="button"
                                            color="secondary"
                                            loading={size.sizeId ? size.editItemSizeLoading : size.addItemSizeLoading}
                                            variant="contained"
                                            sx={{ my: 1, mx: 1 }} >
                                            Cancel
                                        </LoadingButton>
                                        <LoadingButton
                                            type="submit"
                                            color="primary"
                                            loading={size.sizeId ? size.editItemSizeLoading : size.addItemSizeLoading}
                                            variant="contained"
                                            sx={{ my: 1 }} >
                                            {size.sizeId ? 'Save' : 'Add'}
                                        </LoadingButton>

                                    </Box>
                                </Container>
                            </form>

                        )
                    }}
                </Formik>
            </SimpleCard>
        </React.Fragment >
    )
}
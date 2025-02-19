import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, useMediaQuery } from "@mui/material";
import { ADDUSERITEM, GETALLITEMS } from "app/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from '@mui/lab';
import Loading from "app/components/MatxLoading";

export default function AddItem(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { open, handleClose } = props
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">Item List</DialogTitle>
            <AddItemBody {...props} />
        </Dialog>
    )
}
function AddItemBody(props) {
    const { handleClose } = props
    const param = useParams();
    const dispatch = useDispatch()
    const handleFormSubmit = (values) => {
        dispatch(ADDUSERITEM(values, handleClose))
    }
    const items = useSelector((state) => state.items);
    useEffect(() => {
        dispatch(GETALLITEMS())
    }, [dispatch])
    const initialValues = {
        itemId: '',
        userId: param.id
    }
    const validationSchema = Yup.object().shape({
        itemId: Yup.string().required("Enter Item"),
        userId: Yup.string().required("Enter User "),
    });
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}  >
            {(props_) => {
                const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props_
                return (
                    <form onSubmit={handleSubmit} >
                        {
                            items.getAllItemsLoading === true
                            &&
                            <Loading />
                        }
                        {
                            items.getAllItemsSuccess === true
                            &&
                            <React.Fragment>
                                <DialogContent>
                                    <DialogContentText sx={{ width: "300px" }}>
                                        <Box>
                                            <TextField
                                                size="small"
                                                select
                                                name="itemId"
                                                label="Item"
                                                variant="outlined"
                                                defaultValue="Admin"
                                                fullWidth
                                                onBlur={handleBlur}
                                                value={values.itemId}
                                                helperText={touched.itemId && errors.itemId}
                                                error={Boolean(errors.itemId && touched.itemId)}
                                                onChange={handleChange}
                                                sx={{ mb: 3 }}
                                                required
                                            >
                                                {
                                                    items.getAllItems.map((item) =>
                                                        <MenuItem key={item._id} value={item._id}>
                                                            {item.title}
                                                        </MenuItem>
                                                    )
                                                }
                                            </TextField>
                                        </Box>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{ display: "flex", justifyContent: "start" }}>
                                    <LoadingButton
                                        type="button"
                                        color="secondary"
                                        loading={items.addUserItemsLoading}
                                        onClick={handleClose}
                                        variant="contained"
                                        sx={{ my: 1 }} >
                                        Cancel
                                    </LoadingButton>
                                    <LoadingButton
                                        type="submit"
                                        color="primary"
                                        loading={items.addUserItemsLoading}
                                        variant="contained"
                                        sx={{ my: 1 }} >
                                        Add
                                    </LoadingButton>
                                </DialogActions>
                            </React.Fragment>
                        }
                    </form>)
            }}
        </Formik>
    )
}
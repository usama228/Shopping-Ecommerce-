import React, { useState } from 'react';
import {
    Box,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Button,
    Grid,
    IconButton
} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { REMOVEUSER } from 'app/redux/actions/users';
import Loading from 'app/components/MatxLoading';
import { Container, PaginationComponent, SnackbarComponent, StyledTable, TextField1 } from 'app/assets';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'app/hooks/useAuth';
import { ORDERSTATUS, PAGE_LIMIT, PATH } from '../../../config';
import { ResponsiveDeleteConfirmationDialog } from 'app/assets';
import { DELETEPURCHASEORDER, GETALLPURCHASEORDERS } from 'app/redux/actions';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

function Orders() {
    // eslint-disable-next-line no-unused-vars
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders);
    console.log("orders", orders)
    const [page, setPage] = useState(1)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [searchValue, setSearchValue] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [searchAdmin, setSearchAdmin] = useState('')
    const [status, setStatus] = useState('all')
    const auth = useAuth();



    useEffect(() => {
        dispatch(GETALLPURCHASEORDERS({
            page: page,
            limit: PAGE_LIMIT,
            searchValue: '',
            status: ''
        }))
    }, [dispatch, page,])

    const handlePageChange = (value) => {
        setPage(value)
    }

    const onBlurSearchFields = (name, value) => {
        if (name === 'byName') {
            dispatch(GETALLPURCHASEORDERS({
                page: page,
                limit: PAGE_LIMIT,
                searchValue: value,
                status: status
            }))
        } else if (name === 'status') {
            dispatch(GETALLPURCHASEORDERS({
                page: page,
                limit: PAGE_LIMIT,
                status: value,
            }))
        }

    }

    const [deleteConfirmation, setDeleteConfirmation] = useState({
        id: null,
        open: false,
        message: null
    });

    const moveToNext = () => {
        setDeleteConfirmation({
            id: null,
            open: false,
            message: null
        })
    }
    function removeUserItem() {
        if (deleteConfirmation.id) {

            dispatch(REMOVEUSER(deleteConfirmation.id, auth, moveToNext))
        }
    }

    const handleEditClick = (id) => {
        navigate(PATH.ADDORDER.replace(':id', id));
    };

    const navigate = useNavigate();


    const handleDeleteClick = (id) => {
        setOrderToDelete(id);
        setDialogOpen(true);
    };

    const confirmDelete = () => {
        dispatch(DELETEPURCHASEORDER(orderToDelete, moveToNextOnDelete, onError));
        setDialogOpen(false);
        setOrderToDelete(null);
    };

    const moveToNextOnDelete = () => {
        dispatch(GETALLPURCHASEORDERS({
            page: page,

        }));
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setOrderToDelete(null);
    };

    const onError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };


    return (
        <div>
            <SimpleCard>
                <Container>
                    <Box className="breadcrumb">
                        <Breadcrumb routeSegments={[{ name: "Orders" }]} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                        <Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={() => navigate(PATH.ADDORDER.replace(':id', 'new'))}>
                                    Add Order
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                    <Grid container spacing={2}>

                        <Grid item lg={3}>
                            <TextField1
                                id="outlined-basic"
                                label="Search by Name"
                                type="text"
                                name='byName'
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                    onBlurSearchFields(e.target.name, e.target.value)
                                }}
                                sx={{ margin: "5px" }}
                            />
                        </Grid>

                        <Grid item lg={3}>
                            <TextField1
                                size="small"
                                select
                                fullWidth
                                name="status"
                                label="Status"
                                variant="outlined"
                                SelectProps={{ native: true }}
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value)
                                    onBlurSearchFields(e.target.name, e.target.value)
                                }}
                                sx={{ margin: "5px" }} >
                                <option value="" disabled selected></option>
                                {
                                    ORDERSTATUS.map((order, index) => {
                                        return (
                                            <option key={index} value={order.id}>
                                                {order.title}
                                            </option>
                                        )
                                    })
                                }
                            </TextField1>
                        </Grid>


                    </Grid>
                    {orders.getAllPurchaseOrdersLoading && <Loading />}
                    {orders.getAllPurchaseOrdersSuccess && (
                        <Box width="100%" overflow="auto">
                            {orders?.getAllPurchaseOrders?.length === 0 ? (
                                <span>No Order</span>
                            ) : (
                                <React.Fragment>
                                    <StyledTable>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Order Date</TableCell>
                                                <TableCell align="center">Order Number</TableCell>
                                                <TableCell align="center">Consumer</TableCell>
                                                <TableCell align="center">Product</TableCell>
                                                <TableCell align="center">Status</TableCell>
                                                <TableCell align="center">Total Amount</TableCell>
                                                <TableCell align="center">Actions</TableCell>


                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {orders?.getAllPurchaseOrders?.purchaseOrders?.map((order) => {
                                                return (
                                                    <TableRow key={order.id}>
                                                        <TableCell align="center">
                                                            {new Date(order.orderDate).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell align="center">{order.orderNumber}</TableCell>
                                                        <TableCell align="center">{order.consumer}</TableCell>
                                                        <TableCell align="center">{order.product}</TableCell>
                                                        <TableCell align="center">{order.status}</TableCell>
                                                        <TableCell align="center">{order.totalAmount}</TableCell>

                                                        <TableCell align="center">
                                                            <IconButton color="primary" onClick={() => handleEditClick(order.id)}>
                                                                <EditOutlined />
                                                            </IconButton>
                                                            <IconButton color="error" onClick={() => handleDeleteClick(order.id)}>
                                                                <DeleteOutline />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </StyledTable>

                                </React.Fragment>
                            )}
                            {orders.getAllPurchaseOrders.totalPages && (
                                <PaginationComponent
                                    count={orders.getAllPurchaseOrders.totalPages}
                                    page={page}
                                    handlePageChange={handlePageChange}
                                />
                            )}
                        </Box>
                    )}

                    <ResponsiveDeleteConfirmationDialog
                        deleteObject={deleteConfirmation}
                        handleClose={() => setDeleteConfirmation({
                            id: null,
                            open: false,
                            message: null
                        })}
                        onYes={removeUserItem} />
                </Container>

                <SnackbarComponent
                    show={snackbarOpen}
                    message={snackbarMessage}
                />

                <ResponsiveDeleteConfirmationDialog
                    open={dialogOpen}
                    handleClose={handleDialogClose}
                    onYes={confirmDelete}
                    message="Do you want to delete this product ?"
                />
            </SimpleCard>
        </div>
    )
}

export default Orders

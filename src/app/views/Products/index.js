import React, { useState, useEffect } from 'react';
import {
    Box,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Button,
    Avatar,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'app/components/MatxLoading';
import { Container, PaginationComponent, ResponsiveDeleteConfirmationDialog, SnackbarComponent, StyledTable } from 'app/assets';
import { PAGE_LIMIT, PATH } from '../../../config';
import { DELETEPRODUCT, GETALLPRODUCTS } from 'app/redux/actions/products';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useAuth } from 'app/hooks/useAuth';


function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useAuth();
    const [page, setPage] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const products = useSelector(state => state.product);

    useEffect(() => {
        dispatch(GETALLPRODUCTS({
            page: page,
            limit: PAGE_LIMIT,
        }, auth));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, auth, page]);

    const handlePageChange = (value) => {
        setPage(value);
    };

    const handleEditClick = (id) => {
        navigate(PATH.ADDPRODUCT.replace(':id', id));
    };

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setDialogOpen(true);
    };

    const confirmDelete = () => {
        dispatch(DELETEPRODUCT(productToDelete, moveToNextOnDelete, onError));
        setDialogOpen(false);
        setProductToDelete(null);
    };

    const moveToNextOnDelete = () => {
        dispatch(GETALLPRODUCTS({
            page: page,

        }));
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setProductToDelete(null);
    };

    const onError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };



    return (
        <SimpleCard>
            <Container>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "Products" }]} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={() => navigate("/add-product/new")} >
                        Add
                    </Button>
                </Box>

                {products.getAllProductsLoading && <Loading />}
                {products.getAllProductsSuccess && (
                    <Box width="100%" overflow="auto">
                        {products?.products?.products?.length === 0 ? (
                            <span>No Product</span>
                        ) : (
                            <React.Fragment>
                                <StyledTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Profile</TableCell>
                                            <TableCell align="center">Title</TableCell>
                                            <TableCell align="center">Description</TableCell>
                                            <TableCell align="center">Actions</TableCell>


                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {products?.products?.products?.map((product) => {
                                            return (
                                                <TableRow key={product.id}>
                                                    <TableCell align="center">
                                                        <Avatar alt="Remy Sharp" src={product.avatar} style={{ margin: 'auto' }} />
                                                    </TableCell>
                                                    <TableCell align="center">{product.title}</TableCell>
                                                    <TableCell align="center">{product.description}</TableCell>

                                                    <TableCell align="center">
                                                        <IconButton color="primary" onClick={() => handleEditClick(product.id)}>
                                                            <EditOutlined />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDeleteClick(product.id)}>
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
                        {products.products.totalPages && (
                            <PaginationComponent
                                count={products.products.totalPages}
                                page={page}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </Box>
                )}

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
    )
}

export default Products

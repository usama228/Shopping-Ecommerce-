import React from 'react';
import {
    Box,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Button,
    Avatar,
    IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from 'app/components/MatxLoading';
import { Container, PaginationComponent, ResponsiveDeleteConfirmationDialog, SnackbarComponent, StyledTable } from 'app/assets';
import { useState } from 'react';
import { useAuth } from 'app/hooks/useAuth';
import { DELETECATEGORY, GETALLCATEGORIES } from 'app/redux/actions/products';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { PATH } from 'config';
function Categories() {

    const dispatch = useDispatch()
    const auth = useAuth()
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const [page, setPage] = useState(1);
    const products = useSelector(state => state.product);

    useEffect(() => {
        dispatch(GETALLCATEGORIES({
            // page: page,
            // limit: PAGE_LIMIT,
        }, auth));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, auth]);

    const handlePageChange = (value) => {
        setPage(value);
    };

    const handleEditClick = (id) => {
        navigate(PATH.ADDCATEGORY.replace(':id', id));
    };

    const handleDeleteClick = (id) => {
        setCategoryToDelete(id);
        setDialogOpen(true);
    };

    const confirmDelete = () => {
        dispatch(DELETECATEGORY(categoryToDelete, moveToNextOnDelete, onError));
        setDialogOpen(false);
        setCategoryToDelete(null);
    };

    const moveToNextOnDelete = () => {
        dispatch(GETALLCATEGORIES({
            page: page,

        }));
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setCategoryToDelete(null);
    };

    const onError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    return (
        <SimpleCard>
            <Container>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "Categories", path: "/categories" }]} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={() => navigate("/add-category/new")} >
                        Add Category
                    </Button>
                </Box>
                {products.getAllCategoriesLoading && <Loading />}
                {products.getAllCategoriesSuccess && (
                    <Box width="100%" overflow="auto">
                        {products?.categories?.length === 0 ? (
                            <span>No Category</span>
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
                                        {products?.categories?.categories?.map((category) => {
                                            return (
                                                <TableRow key={category.id}>
                                                    <TableCell align="center">
                                                        <Avatar alt="Remy Sharp" src={category.avatar} style={{ margin: 'auto' }} />
                                                    </TableCell>
                                                    <TableCell align="center">{category.title}</TableCell>
                                                    <TableCell align="center">{category.description}</TableCell>

                                                    <TableCell align="center">
                                                        <IconButton color="primary" onClick={() => handleEditClick(category.id)}>
                                                            <EditOutlined />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDeleteClick(category.id)}>
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
                        {products.categories.totalPages && (
                            <PaginationComponent
                                count={products.categories.totalPages}
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
                message="Do you want to delete this category ?"
            />
        </SimpleCard>
    )
}

export default Categories;


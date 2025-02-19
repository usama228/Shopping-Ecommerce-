/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Box,
    TableRow,
    TableBody,
    TableCell,
    Avatar,
    TableHead,
    IconButton,
    Grid,
    Button,
} from "@mui/material";

import { Breadcrumb, SimpleCard } from 'app/components';
import { useDispatch, useSelector } from 'react-redux';
import { DELETEUSER, GETALLADMINS, GETALLCONSUMERS, GETALLUSERS } from 'app/redux/actions/users';
import Loading from 'app/components/MatxLoading';
import { PaginationComponent, ResponsiveDeleteConfirmationDialog, SnackbarComponent, StyledTable, TextField1 } from 'app/assets';

import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from 'app/hooks/useAuth';
import { PAGE_LIMIT, PATH, STATUSFILTER } from '../../../config';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

function Users() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [status, setStatus] = useState('active');
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const param = useParams();
    const dispatch = useDispatch();
    const users = useSelector(state => state.user);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (param.role === 'consumer') {
            dispatch(GETALLCONSUMERS({
                page: page,
                limit: PAGE_LIMIT,
                role: param.role
            }, auth, onError));
        } else {
            dispatch(GETALLADMINS({
                page: page,
                limit: PAGE_LIMIT,
                role: param.role
            }, auth, onError));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, auth, page, param.role]);




    const handlePageChange = (value) => {
        setPage(value);
    };

    const onError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };


    const onBlurSearchFields = (name, value) => {
        if (name === 'byName' && param.role === 'consumer') {
            dispatch(GETALLCONSUMERS({
                page: page,
                limit: PAGE_LIMIT,
                searchValue: value,
                role: param.role,
                status: status

            }, auth, onError));
        } else if (name === 'byName' && param.role === 'admin') {
            dispatch(GETALLADMINS({
                page: page,
                limit: PAGE_LIMIT,
                searchValue: value,
                role: param.role,
                status: status

            }, onError));
        } else if (name === 'bystatus' && param.role === 'admin') {
            dispatch(GETALLCONSUMERS({
                page: page,
                limit: PAGE_LIMIT,
                role: param.role,
                status: value

            }, auth, onError));
        }
    }

    const handleEditClick = (id) => {
        const pathWithId = PATH.ADDUSER.replace(':role', param.role).replace(':id', id);
        navigate(pathWithId);
    };

    const handleDeleteClick = (id) => {
        setEmployeeToDelete(id);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEmployeeToDelete(null);
    };

    const confirmDelete = () => {
        dispatch(DELETEUSER(employeeToDelete, moveToNextOnDelete, onError));
        setDialogOpen(false);
        setEmployeeToDelete(null);
    };

    const moveToNextOnDelete = () => {
        if (param.role === 'admin') {
            dispatch(GETALLADMINS({
                page: page,
                role: param.role
            }, auth));
        } else {
            dispatch(GETALLCONSUMERS({
                page: page,
                role: param.role
            }, auth));
        }

    }

    const handleMoveToAdd = () => {
        if (param.role === 'admin') {
            navigate(PATH.ADDUSER.replace(':role', param.role).replace(":id", 'new'));
        } else {
            navigate(PATH.ADDUSER.replace(':role', param.role).replace(":id", 'new'));
        }
    }



    return (
        <SimpleCard>
            <Box>
                <Breadcrumb routeSegments={[{ name: param.role === 'consumer' ? 'All Consumers' : 'All Admins' }]} />
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField1
                        id="outlined-basic"
                        label="Search by Name"
                        type="text"
                        name='byName'
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                            onBlurSearchFields(e.target.name, e.target.value)
                        }}
                        sx={{ margin: "10px" }} />
                </Grid>
                <Grid item xs={3}>
                    <TextField1
                        select
                        name="bystatus"
                        size="small"
                        label="Search by Status"
                        value={status}
                        SelectProps={{ native: true }}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            onBlurSearchFields(e.target.name, e.target.value);
                        }}
                        sx={{ margin: "10px" }}
                    >
                        <option value="" disabled selected></option>
                        {STATUSFILTER.map((status) => {
                            return (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            );
                        })}
                    </TextField1>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={() => handleMoveToAdd()}
                        >
                            {param.role === 'admin' ? 'Add Admin' : 'Add Consumer'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {(param.role === 'consumer' && users?.allConsumersLoading) && <Loading />}
            {(param.role === 'consumer' && users?.allConsumersSuccess) && (
                <Box width="100%" overflow="auto">
                    {users?.allConsumers?.consumers?.length === 0 ? (
                        <span>No Consumers</span>
                    ) : (
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Image</TableCell>
                                    {/* <TableCell align="center">Name</TableCell> */}
                                    <TableCell align="center">User Name</TableCell>
                                    <TableCell align="center">CNIC</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Phone Number</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Company name</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users?.allConsumers?.consumers?.map(consumer => (
                                    <TableRow key={consumer.id}>
                                        <TableCell align="center">
                                            <Avatar
                                                alt="User Avatar"
                                                src={consumer.avatar}
                                                style={{ margin: 'auto' }}
                                            />
                                        </TableCell>
                                        {/* <TableCell align="center">{`${consumer.first_name} ${consumer.last_name}`}</TableCell> */}
                                        <TableCell align="center">{consumer.user_name}</TableCell>
                                        <TableCell align="center">{consumer.cnic}</TableCell>
                                        <TableCell align="center">{consumer.email}</TableCell>
                                        <TableCell align="center">{consumer.phoneNumber}</TableCell>
                                        <TableCell align="center">{consumer.role}</TableCell>
                                        <TableCell align="center">{consumer.status}</TableCell>
                                        <TableCell align="center">{consumer.company_name}</TableCell>

                                        <TableCell align="center">
                                            <IconButton color="primary" onClick={() => handleEditClick(consumer.id)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDeleteClick(consumer.id)}>
                                                <DeleteOutline />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </StyledTable>
                    )}
                    {users.allConsumers.totalPages && (
                        <PaginationComponent
                            count={users.allConsumers.totalPages}
                            page={page}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </Box>

            )}
            {(param.role === 'admin' && users?.allAdminsLoading) && <Loading />}
            {(param.role === 'admin' && users?.allAdminsSuccess) && (
                <Box width="100%" overflow="auto">
                    {users?.allAdmins?.admins?.length === 0 ? (
                        <span>No Admins</span>
                    ) : (
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">User Name</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Phone Number</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users?.allAdmins?.admins?.map(admin => (
                                    <TableRow key={admin.id}>
                                        <TableCell align="center">
                                            <Avatar
                                                alt="User Avatar"
                                                src={admin.avatar}
                                                style={{ margin: 'auto' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{`${admin.first_name} ${admin.last_name}`}</TableCell>
                                        <TableCell align="center">{admin.user_name}</TableCell>
                                        <TableCell align="center">{admin.email}</TableCell>
                                        <TableCell align="center">{admin.phoneNumber}</TableCell>
                                        <TableCell align="center">{admin.role}</TableCell>
                                        <TableCell align="center">{admin.status}</TableCell>
                                        <TableCell align="center">
                                            <IconButton color="primary" onClick={() => handleEditClick(admin.id)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDeleteClick(admin.id)}>
                                                <DeleteOutline />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </StyledTable>
                    )}
                    {users.allAdmins.totalPages && (
                        <PaginationComponent
                            count={users.allAdmins.totalPages}
                            page={page}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </Box>
            )}

            <SnackbarComponent
                show={snackbarOpen}
                message={snackbarMessage}
            />

            <ResponsiveDeleteConfirmationDialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                onYes={confirmDelete}
                message="Do you want to delete this employee ?"
            />
        </SimpleCard>
    );
}

export default Users;

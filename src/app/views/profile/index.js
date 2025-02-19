import React from 'react'
import {
    Avatar, Box, Button, Grid,
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useAuth } from "app/hooks/useAuth";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GETUSER } from 'app/redux/actions';
import {  TextField1 } from 'app/assets';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../config';

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const auth = useAuth()
    useEffect(() => {
        dispatch(GETUSER(auth.id))
    }, [dispatch, auth])

    const navigate = useNavigate();
    return (


        <SimpleCard>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Profile" }]} />
            </Box>
            {
                user.userSuccess === true
                &&
                user.user
                &&
                <div>
                    <Grid sx={{ display: "flex", justifyContent: "center" }} >
                        <Avatar src={user.user.avatar} sx={{ width: 100, height: 100 }} />
                    </Grid>

                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField1
                                type="text"
                                name="username"
                                id="standard-basic"
                                value={user.user.user_name}
                                label="Username "
                                InputProps={{
                                    readOnly: true,
                                }} />
                            <TextField1
                                type="text"
                                name="firstName"
                                value={user.user.first_name}
                                label="First Name"
                                InputProps={{
                                    readOnly: true,
                                }} />
                            <TextField1
                                name="role"
                                type="text"
                                label="Role"
                                value={user.user.role}
                                InputProps={{
                                    readOnly: true,
                                }} />

                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField1
                                type="email"
                                name="email"
                                value={user.user.email}
                                label="Email"
                                InputProps={{
                                    readOnly: true,
                                }} />
                            <TextField1
                                name="lastName"
                                type="text"
                                label="Last Name"
                                value={user.user.last_name}
                                InputProps={{
                                    readOnly: true,
                                }} />
                            <TextField1
                                name="status"
                                type="text"
                                label="Status"
                                value={user.user.status}
                                InputProps={{
                                    readOnly: true,
                                }} />

                        </Grid>
                    </Grid>
                    <Button variant="contained"
                        onClick={() => navigate(PATH.EDITPROFILE.replace(':id', auth.id))}>
                        Edit Profile
                    </Button>
                </div>
            }

        </SimpleCard>

    );
};

export default Profile;



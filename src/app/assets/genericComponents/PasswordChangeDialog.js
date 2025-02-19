import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordChangeDialog = ({ open, onClose, onSubmit }) => {
    const [passwordVisibility, setPasswordVisibility] = React.useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const passwordValidationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string().required('New password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={passwordValidationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, handleChange, handleSubmit, errors, touched }) => (
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                margin="dense"
                                label="Old Password"
                                type={passwordVisibility.oldPassword ? 'text' : 'password'}
                                fullWidth
                                name="oldPassword"
                                value={values.oldPassword}
                                onChange={handleChange}
                                error={Boolean(touched.oldPassword && errors.oldPassword)}
                                helperText={touched.oldPassword && errors.oldPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => togglePasswordVisibility('oldPassword')}
                                                edge="end"
                                            >
                                                {passwordVisibility.oldPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="dense"
                                label="New Password"
                                type={passwordVisibility.newPassword ? 'text' : 'password'}
                                fullWidth
                                name="newPassword"
                                value={values.newPassword}
                                onChange={handleChange}
                                error={Boolean(touched.newPassword && errors.newPassword)}
                                helperText={touched.newPassword && errors.newPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => togglePasswordVisibility('newPassword')}
                                                edge="end"
                                            >
                                                {passwordVisibility.newPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                margin="dense"
                                label="Confirm Password"
                                type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                                fullWidth
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                                edge="end"
                                            >
                                                {passwordVisibility.confirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <DialogActions>
                                <Button onClick={onClose}>Cancel</Button>
                                <Button type="submit">Change Password</Button>
                            </DialogActions>
                        </Box>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default PasswordChangeDialog;

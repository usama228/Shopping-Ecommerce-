import React from 'react';
import { Alert, Snackbar } from '@mui/material';


export function ErrorMessage(props) {
    const { snackbarOpen, handleSnackbarClose, message, alertType = 'error', variant = 'filled', width = '100%',
        vertical = 'top', horizontal = 'right', autoHideDuration = 6000
    } = props
    return (
        <Snackbar
            anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
            open={snackbarOpen}
            autoHideDuration={autoHideDuration}
            onClose={handleSnackbarClose}
            message={message} >
            <Alert
                onClose={handleSnackbarClose}
                severity={alertType}
                variant={variant}
                sx={{ width: width }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
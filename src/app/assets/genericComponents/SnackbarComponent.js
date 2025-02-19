import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';
import { Alert } from '@mui/material';

export function SnackbarComponent(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;
  useEffect(() => {
    setState({ ...state, open: props.show });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        key={vertical + horizontal}>
        <Alert onClose={handleClose}
          severity="error"
          sx={{ width: '100%' }}
          variant="filled">
          {props.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
import * as React from 'react';
// import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export function PaginationComponent(props) {
    const { count, page, handlePageChange } = props
    const handleChange = (event, value) => {
        handlePageChange(value);
    };
    return (
        <Stack style={{ float: 'right', marginTop: 10 }} spacing={2} >
            {/* <Typography>Page: {page}</Typography> */}
            <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
    );
}
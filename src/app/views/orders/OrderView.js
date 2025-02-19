import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/components';
import {
    Box,
    Grid,
    Typography
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Container } from 'app/assets';

function OrderView() {
    const TAX_RATE = 0.07;

    // function ccyFormat(num) {
    //     return `${num.toFixed(2)}`;
    // }

    function priceRow(qty, unit) {
        return qty * unit;
    }

    function createRow(desc, qty, unit) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price };
    }

    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    const rows = [
        createRow('Paperclips (Box)', 100, 1.15),
        createRow('Paper (Case)', 10, 45.99),
        createRow('Waste Basket', 2, 17.99),
    ];

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    // eslint-disable-next-line no-unused-vars
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    return (
        <div>
            <Container>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "Order-view", path: "/order" }, { name: 'Consumer Detail', path: "/user-detail/6634d6dc5c57689c9c92d1d5" }, { name: "Print Size" }]} Print Size />
                </Box>

                <SimpleCard>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex', marginBottom: "20px" }}>
                            <Typography variant='h6'>Order No</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 400, marginLeft: "10px" }}>1</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex' }}>
                            <Typography variant='h6'>Name</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 400, marginLeft: "10px" }}>Naveed</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex' }}>
                            <Typography variant='h6'>Price</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 400, marginLeft: "10px" }}>250</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex' }}>
                            <Typography variant='h6'>Booking Date</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 400, marginLeft: "10px" }}>02-07-2024</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex' }}>
                            <Typography variant='h6'>Delivery Date</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 400, marginLeft: "10px" }}>05-07-2024</Typography>
                        </Grid>
                    </Grid>
                </SimpleCard>
                <Box className="breadcrumb" sx={{ marginTop: "30px" }}>
                    <Typography variant="h6" component="h6">
                        Detail
                    </Typography>
                </Box>
                <SimpleCard>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={2}>
                                        Details
                                    </TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Shirt</TableCell>
                                    <TableCell>Fabric</TableCell>
                                    <TableCell align="right">Sum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell align="right">3</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell>Subtotal</TableCell>
                                    <TableCell align="right">100</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell align="right">200</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell align="right">300</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </SimpleCard>
            </Container>

        </div>
    )
}

export default OrderView


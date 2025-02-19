import React, { useEffect } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components';
import {
    Box,
    Button,
    Grid,
    Typography
} from "@mui/material";
import { Container } from 'app/assets';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GETUSERANDITEM } from 'app/redux/actions';
import './style.css'

const data =
{
    username: "MrAli123",
    firtsName: "Mr",
    lastName: "Ali",
    serial: 1,
    item: "pent",
    size: {
        sacdas: 11,
        sas: 12
    }
}

function handlePrint() {
    window.print()
}


function PrintSize() {
    const param = useParams();
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    useEffect(() => {
        dispatch(GETUSERANDITEM(param))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Container>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "All Consumers", path: "/users/consumer" }, { name: 'Consumer Detail', path: "/user-detail/6634d6dc5c57689c9c92d1d5" }, { name: "Print Size" }]} Print Size />
                </Box>
            </Container>
            <div className='size-set' id="print-data">
                <Container>
                <SimpleCard>
                    <Container>
                        <div className='display-data' id="print-data">
                            <Box display='flex' justifyContent='end' id="print-btn">
                                <Button variant="contained" onClick={handlePrint}>Print</Button>
                            </Box>
                            {/* <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography variant='h6'>Username</Typography>
                                    <Typography variant='h6'>{items.getItem?.user_name}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant='h6'>Serial Number</Typography>
                                    <Typography variant='h6'>{items.getItem?.serial_no}</Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant='h6'>Name</Typography>
                                    <Typography variant='h6'>{items.getItem?.first_name + '' + items.getItem?.last_name} </Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant='h6'>Item</Typography>
                                    <Typography variant='h6'>{items.getItem?.title} </Typography>
                                </Grid>
                            </Grid> */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex' }}>
                                    <Typography variant='h6'>Username:</Typography>
                                    <Typography variant='h6' sx={{fontWeight: 400, marginLeft: "10px"}}>{items.getItem?.user_name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex' }}>
                                    <Typography variant='h6'>Serial Number:</Typography>
                                    <Typography variant='h6' sx={{fontWeight: 400, marginLeft: "10px"}}>{items.getItem?.serial_no}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex' }}>
                                    <Typography variant='h6'>Name:</Typography>
                                    <Typography variant='h6' sx={{fontWeight: 400, marginLeft: "10px"}}>{items.getItem?.first_name + '' + items.getItem?.last_name} </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={3} sx={{ display: 'flex' }}>
                                    <Typography variant='h6'>Item: </Typography>
                                    <Typography variant='h6' sx={{fontWeight: 400, marginLeft: "10px"}}>{items.getItem?.title} </Typography>

                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </SimpleCard>
                    <Box className="breadcrumb" sx={{ marginTop: "30px" }}>
                        <Typography variant="h6" component="h6">
                            Size
                        </Typography>
                    </Box>
                </Container>
                <Container>
                    <SimpleCard>
                        <Container>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    {
                                        items.getItem
                                        &&
                                        items.getItem.size
                                        &&
                                        <div>
                                            {
                                                items.getItem?.size?.map((size, index) => {
                                                    return (
                                                        <Grid key={index} container spacing={6}>
                                                            <Grid item xs={2}>
                                                                <Typography variant='h6'>{size.title}</Typography>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Typography variant='h6' sx={{fontWeight: 400}}>{size.value}</Typography>
                                                            </Grid>
                                                        </Grid>

                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                    <Typography variant='h5'>{data.s}</Typography>
                                </Grid>

                            </Grid>
                        </Container>
                    </SimpleCard>
                </Container>

            </div>
        </div>
    )
}

export default PrintSize

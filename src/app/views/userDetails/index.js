import React from 'react'
import { useState } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import {
  Box,
  Button,
  Avatar,
  Stack,
  IconButton,
  TableBody, TableCell, TableHead, TableRow,
  Typography
} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GETUSER, GETALLUSERITEMS } from 'app/redux/actions';
import { useParams } from 'react-router-dom';
import Loading from 'app/components/MatxLoading';
import { Container, SnackbarComponent } from 'app/assets';
import AddItem from './AddUserItem';
import UserItemsList from './UserItemsList';
import { StyledTable } from "app/assets";


function UserDetail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const param = useParams();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(GETUSER(param.id, failure))
    dispatch(GETALLUSERITEMS(param.id))
  }, [param.id, dispatch])

  function failure() {
    setShow(true)
  }
  return (
    <div>
      <Container>
        {
          user.userLoading === true
          &&
          <Loading />
        }
        {
          user.userFailure === true
          &&
          user.userError
          &&
          <SnackbarComponent
            show={show} message={user.userError} />
        }
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "All Consumers", path: '/users/consumer' }, { name: 'Consumer Detail', path: '/user-detail/6634d6dc5c57689c9c92d1d5' }]} User Detail />
        </Box>
        <SimpleCard>
          {
            user.userSuccess === true
            &&
           
            <Stack>
              <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <label htmlFor="upload">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <Avatar
                      id="avatar"
                      src={user.user.avatar}
                      style={{
                        width: "100px",
                        height: "100px"
                      }} />
                  </IconButton>
                </label>
              </Box>
              <Box style={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" startIcon={<AddOutlinedIcon />} onClick={handleClickOpen}>
                  Add Item
                </Button>
              </Box>
              <Box>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">{'First Name'}</TableCell>
                      <TableCell align="center">{'Last Name'}</TableCell>
                      <TableCell align="center">{'User Name'}</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow>
                      <TableCell align="center">
                        <Typography variant='p'>{user.user.first_name}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='p'>{user.user.last_name}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='p'>{user.user.user_name}</Typography>
                      </TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableBody>
                </StyledTable>
              </Box>
            </Stack>
          }

        </SimpleCard>
        <UserItemsList />
        <AddItem open={open}
          handleClose={handleClose} />
      </Container >
    </div>
  )
}

export default UserDetail
import React, { useState } from "react";
import { Box, Button, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { ResponsiveDeleteConfirmationDialog, StyledTable } from "app/assets";
import { SimpleCard } from "app/components";
import Loading from "app/components/MatxLoading";
import { useDispatch, useSelector } from "react-redux";
import { REMOVEUSERITEM } from "app/redux/actions";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../config";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function UserItemsList() {

    const dispatch = useDispatch();
    const items = useSelector((state) => state.items);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        id: null,
        open: false,
        message: null
    });
    function removeUserItem() {
        if (deleteConfirmation.id) {
            dispatch(REMOVEUSERITEM(deleteConfirmation.id, moveToNext))
        }
    }
    const moveToNext = () => {
        setDeleteConfirmation({
            id: null,
            open: false,
            message: null
        })
    }
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Box className="breadcrumb" sx={{ marginTop: "30px" }}>
                <Typography variant="h6" component="h6">
                    Item List
                </Typography>
            </Box>
            {
                items.getAllUserItemsLoading === true
                &&
                <Loading />
            }
            {
                items.getAllUserItemsSuccess === true
                &&
                items.getAllUserItems
                &&
                <SimpleCard>
                    <Box>
                        {
                            items.getAllUserItems.length <= 0
                                ?
                                <p>
                                    No Item To Show
                                </p>
                                :
                                <Box>
                                    <StyledTable>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">{'Sr #'}</TableCell>
                                                <TableCell align="center">{'Item Name'}</TableCell>
                                                <TableCell align="center">{'Size'}</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.getAllUserItems?.map((Item, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell align="center">{index+1}</TableCell>
                                                        <TableCell align="center">{Item.title}</TableCell>
                                                        <TableCell align="center">
                                                            <Button variant="outlined"
                                                                onClick={() => { navigate(PATH.USERITEMSIZE.replace(':associationId', Item._id)) }} >
                                                                {"Size"}
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <VisibilityIcon sx={{ marginRight: "5px" }}
                                                                onClick={() => { navigate(PATH.PRINTSIZE.replace(':associationId', Item._id)) }} />
                                                            <DeleteIcon
                                                                onClick={() => {
                                                                    setDeleteConfirmation({
                                                                        open: true,
                                                                        id: Item._id,
                                                                        message: `Are You Sure You Want To Delete ${Item.title} ?`
                                                                    })
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </StyledTable>
                                </Box>
                        }
                    </Box>
                </SimpleCard>
            }
            <ResponsiveDeleteConfirmationDialog
                deleteObject={deleteConfirmation}
                handleClose={() => setDeleteConfirmation({
                    id: null,
                    open: false,
                    message: null
                })}
                onYes={removeUserItem} />
        </React.Fragment>
    )
}


import { removeUserItem, addItem, addUserItems, editItem, getAllItems, getAllUserItems, getById, removeItem, getUserAndItemDetails } from "../../api";
import { FAILURE, REQUEST, SUCCESS, ITEM_REQUEST, SIZE_REQUEST } from "../utilities";
import { v4 as uuidv4 } from 'uuid';

export function GETALLITEMS() {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.GET_ALL_ITEMS_REQUEST))
        getAllItems().then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(ITEM_REQUEST.GET_ALL_ITEMS_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.GET_ALL_ITEMS_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.GET_ALL_ITEMS_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function GETITEMBYID(itemId) {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.GET_ITEM_REQUEST))
        getById(itemId).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(ITEM_REQUEST.GET_ITEM_SUCCESS, response.data.data))
                    dispatch(SUCCESS(SIZE_REQUEST.SIZE_LIST, {
                        // sizeId: response.data.data.sizeId,
                        size: response.data.data.size
                    }))
                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.GET_ITEM_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.GET_ITEM_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function REMOVEITEM(itemId, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.REMOVE_ITEM_REQUEST))
        removeItem(itemId).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(ITEM_REQUEST.REMOVE_ITEM_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.REMOVE_ITEM_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.REMOVE_ITEM_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function ADDITEM(itemData, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.ADD_ITEM_REQUEST))
        addItem(itemData).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(ITEM_REQUEST.ADD_ITEM_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.ADD_ITEM_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.ADD_ITEM_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function EDITITEM(itemData, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.EDIT_ITEM_REQUEST))
        editItem(itemData).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(ITEM_REQUEST.EDIT_ITEM_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.EDIT_ITEM_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.EDIT_ITEM_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function GETALLUSERITEMS(userId) {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.GET_ALL_USER_ITEMS_REQUEST))
        getAllUserItems(userId).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(ITEM_REQUEST.GET_ALL_USER_ITEMS_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.GET_ALL_USER_ITEMS_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.GET_ALL_USER_ITEMS_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function ADDUSERITEM(itemData, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.ADD_USER_ITEMS_REQUEST))
        addUserItems(itemData).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(ITEM_REQUEST.ADD_USER_ITEMS_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.ADD_USER_ITEMS_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.ADD_USER_ITEMS_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function REMOVEUSERITEM(itemId, moveToNext) {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.REMOVE_USER_ITEM_REQUEST))
        removeUserItem(itemId).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(ITEM_REQUEST.REMOVE_USER_ITEM_SUCCESS, response.data.data))
                    if (moveToNext) {
                        moveToNext()
                    }
                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.REMOVE_USER_ITEM_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.REMOVE_USER_ITEM_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function GETUSERANDITEM(data) {
    return dispatch => {
        dispatch(REQUEST(ITEM_REQUEST.GET_ITEM_REQUEST))
        getUserAndItemDetails(data).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(ITEM_REQUEST.GET_ITEM_SUCCESS, response.data.data))
                    if (response.data.data.sizeId) {
                        dispatch(SUCCESS(SIZE_REQUEST.SIZE_LIST, {
                            sizeId: response.data.data.sizeId,
                            size: response.data.data.size
                        }))
                    } else {
                        dispatch(SUCCESS(SIZE_REQUEST.SIZE_LIST, {
                            sizeId: null,
                            size: [{
                                id: uuidv4(), title: '',
                                value: ''
                            }]
                        }))
                    }
                }
                else {
                    dispatch(FAILURE(ITEM_REQUEST.GET_ITEM_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ITEM_REQUEST.GET_ITEM_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
// export function UPDATEUSER(userId, auth, moveToNext) {
//     return dispatch => {
//         dispatch(REQUEST(ITEM_REQUEST.UPDATE_ITEM_REQUEST))
//         updateUSer(userId, auth).then(
//             response => {
//                 if (response.data.succeeded === true) {
//                     let data = JSON.parse(localStorage.getItem('user')) || {};
//                     let final_data = response.data.data
//                     final_data = { ...final_data, token: data.token }
//                     localStorage.setItem('user', JSON.stringify(final_data));
//                     dispatch(SUCCESS(ITEM_REQUEST.UPDATE_USER_SUCCESS, response.data.data))
//                     if (moveToNext) {
//                         moveToNext()
//                     }
//                 }
//                 else {
//                     dispatch(FAILURE(ITEM_REQUEST.UPDATE_USER_FAILURE, response.data.message))
//                 }
//             }, error => {
//                 dispatch(FAILURE(ITEM_REQUEST.UPDATE_USER_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
//             }
//         )
//     }
// }
import { addFabric, editFabric, getAllFabrics, getFabricById, removeFabric } from "../../api";
import { FAILURE, REQUEST, SUCCESS, FABRIC_REQUEST } from "../utilities";


export function GETALLFABRICS() {
    return dispatch => {
        dispatch(REQUEST(FABRIC_REQUEST.GET_ALL_FABRIC_REQUEST))
        getAllFabrics().then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(FABRIC_REQUEST.GET_ALL_FABRIC_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(FABRIC_REQUEST.GET_ALL_FABRIC_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(FABRIC_REQUEST.GET_ALL_FABRIC_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function GETFABRICBYID(itemId) {
    return dispatch => {
        dispatch(REQUEST(FABRIC_REQUEST.GET_FABRIC_REQUEST))
        getFabricById(itemId).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(FABRIC_REQUEST.GET_FABRIC_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(FABRIC_REQUEST.GET_FABRIC_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(FABRIC_REQUEST.GET_FABRIC_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function REMOVEFABRIC(itemId, moveToNext) {
    return dispatch => {
        dispatch(REQUEST(FABRIC_REQUEST.REMOVE_FABRIC_REQUEST))
        removeFabric(itemId).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(FABRIC_REQUEST.REMOVE_FABRIC_SUCCESS, response.data.data))
                    if (moveToNext) {
                        moveToNext()
                    }
                }
                else {
                    dispatch(FAILURE(FABRIC_REQUEST.REMOVE_FABRIC_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(FABRIC_REQUEST.REMOVE_FABRIC_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function ADDFABRIC(itemData, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(FABRIC_REQUEST.ADD_FABRIC_REQUEST))
        addFabric(itemData).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(FABRIC_REQUEST.ADD_FABRIC_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(FABRIC_REQUEST.ADD_FABRIC_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(FABRIC_REQUEST.ADD_FABRIC_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function EDITFABRIC(itemData, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(FABRIC_REQUEST.ADD_FABRIC_REQUEST))
        editFabric(itemData).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(FABRIC_REQUEST.ADD_FABRIC_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(FABRIC_REQUEST.ADD_FABRIC_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(FABRIC_REQUEST.ADD_FABRIC_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
import { addSize, editSize, getSizesByItemIdAndUserId } from "../../api";
import { FAILURE, REQUEST, SUCCESS, SIZE_REQUEST } from "../utilities";


export function ADDSIZE(sizeData, auth, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(SIZE_REQUEST.ADD_SIZE_REQUEST))
        addSize(sizeData, auth).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(SIZE_REQUEST.ADD_SIZE_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(SIZE_REQUEST.ADD_SIZE_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(SIZE_REQUEST.ADD_SIZE_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}

export function EDITSIZE(sizeData, auth, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(SIZE_REQUEST.EDIT_SIZE_REQUEST))
        editSize(sizeData, auth).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(SIZE_REQUEST.EDIT_SIZE_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(SIZE_REQUEST.EDIT_SIZE_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(SIZE_REQUEST.EDIT_SIZE_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function GETSIZEBYITEMIDANDUSERID(sizeData, auth, moveToNExt) {
    return dispatch => {
        dispatch(REQUEST(SIZE_REQUEST.GET_SIZE_REQUEST))
        getSizesByItemIdAndUserId(sizeData, auth).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(SIZE_REQUEST.GET_SIZE_SUCCESS, response.data.data))
                    if (moveToNExt) {
                        moveToNExt()
                    }
                }
                else {
                    dispatch(FAILURE(SIZE_REQUEST.GET_SIZE_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(SIZE_REQUEST.GET_SIZE_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
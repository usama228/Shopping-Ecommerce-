import { getAllItemsAndFabrics, getAllOrders, addOrder, createPurchaseOrder, getAllPurchaseOrders, getPurchaseOrderById, updatePurchaseOrder, deletePurchaseOrder } from "../../api";
import { FAILURE, REQUEST, SUCCESS, ORDER_REQUEST } from "../utilities";


export function GETALLORDERS(data, auth) {
    return dispatch => {
        dispatch(REQUEST(ORDER_REQUEST.GET_ALL_ORDERS_REQUEST))
        getAllOrders(data, auth).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(ORDER_REQUEST.GET_ALL_ORDERS_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(ORDER_REQUEST.GET_ALL_ORDERS_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ORDER_REQUEST.GET_ALL_ORDERS_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function ADDORDER(data, auth) {
    return dispatch => {
        dispatch(REQUEST(ORDER_REQUEST.ADD_ORDER_REQUEST))
        addOrder(data, auth).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(ORDER_REQUEST.ADD_ORDER_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(ORDER_REQUEST.ADD_ORDER_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ORDER_REQUEST.ADD_ORDER_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function GETALLITEMSANDFABRICS(auth) {
    return dispatch => {
        dispatch(REQUEST(ORDER_REQUEST.GET_ALL_ITEMS_AND_FABRICS_REQUEST))
        getAllItemsAndFabrics(auth).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(ORDER_REQUEST.GET_ALL_ITEMS_AND_FABRICS_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(ORDER_REQUEST.GET_ALL_ITEMS_AND_FABRICS_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ORDER_REQUEST.GET_ALL_ITEMS_AND_FABRICS_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}

// New

export function CREATEPURCHASEORDER(orderData, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(ORDER_REQUEST.CREATE_PURCHASE_ORDER_REQUEST))
        createPurchaseOrder(orderData).then(
            response => {

                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(ORDER_REQUEST.CREATE_PURCHASE_ORDER_SUCCESS, response.data.data))
                    if (moveToNext) {
                        moveToNext();
                    }
                }
                else {
                    dispatch(FAILURE(ORDER_REQUEST.CREATE_PURCHASE_ORDER_FAILURE, response.data.message))
                    if (failure) {
                        failure()
                    }
                }
            }, error => {
                dispatch(FAILURE(ORDER_REQUEST.CREATE_PURCHASE_ORDER_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
};
export function GETALLPURCHASEORDERS(data, failure) {
    return dispatch => {
        dispatch(REQUEST(ORDER_REQUEST.GET_ALL_PURCHASE_ORDERS_REQUEST))
        getAllPurchaseOrders(data).then(
            response => {
                if (response.data.succeeded === true) {

                    dispatch(SUCCESS(ORDER_REQUEST.GET_ALL_PURCHASE_ORDERS_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(ORDER_REQUEST.GET_ALL_PURCHASE_ORDERS_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(ORDER_REQUEST.GET_ALL_PURCHASE_ORDERS_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
}

export function GETPURCHASEORDERBYID(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(ORDER_REQUEST.GET_PURCHASE_ORDER_BY_ID_REQUEST))
        getPurchaseOrderById(id).then(
            response => {

                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(ORDER_REQUEST.GET_PURCHASE_ORDER_BY_ID_SUCCESS, response.data.data))
                    if (moveToNext) {
                        moveToNext(response.data.data)
                    }
                }
                else {
                    dispatch(FAILURE(ORDER_REQUEST.GET_PURCHASE_ORDER_BY_ID_FAILURE, response.data.message))
                    if (failure) {
                        failure(response.data.message)
                    }
                }
            }, error => {
                dispatch(FAILURE(ORDER_REQUEST.GET_PURCHASE_ORDER_BY_ID_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
}

export function UPDATEPURCHASEORDER(data, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(ORDER_REQUEST.UPDATE_PURCHASE_ORDER_REQUEST));
        updatePurchaseOrder(data).then(

            response => {
                console.log("response,", response)
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(ORDER_REQUEST.UPDATE_PURCHASE_ORDER_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(ORDER_REQUEST.UPDATE_PURCHASE_ORDER_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(ORDER_REQUEST.UPDATE_PURCHASE_ORDER_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};

export function DELETEPURCHASEORDER(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(ORDER_REQUEST.DELETE_PURCHASE_ORDER_REQUEST));
        deletePurchaseOrder(id).then(
            response => {
                if (response.data.succeeded) {
                    dispatch(SUCCESS(ORDER_REQUEST.DELETE_PURCHASE_ORDER_SUCCESS, id));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(ORDER_REQUEST.DELETE_PURCHASE_ORDER_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(ORDER_REQUEST.DELETE_PURCHASE_ORDER_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }

            }
        );
    };
}




import { v4 as uuidv4 } from 'uuid';
import { ORDER_REQUEST } from "../../actions/utilities";
const INITIAL_STATE = {
    getAllOrdersLoading: false,
    getAllOrdersSuccess: false,
    getAllOrdersFailure: false,
    getAllOrdersError: null,
    getAllOrders: null,

    getAllItemsAndFabricsLoading: false,
    getAllItemsAndFabricsSuccess: false,
    getAllItemsAndFabricsFailure: false,
    getAllItemsAndFabricsError: null,
    getAllItemsAndFabrics: null,


    order_list: [{
        id: uuidv4(),
        itemId: '',
        itemTitle: '',
        fabricTitle: '',
        fabricId: '',
        price: 0
    }],

    // New state properties for purchase order creation
    createPurchaseOrderLoading: false,
    createPurchaseOrderSuccess: false,
    createPurchaseOrderFailure: false,
    createPurchaseOrderError: null,
    createdPurchaseOrder: null,


    // New state properties for purchase orders
    getAllPurchaseOrdersLoading: false,
    getAllPurchaseOrdersSuccess: false,
    getAllPurchaseOrdersFailure: false,
    getAllPurchaseOrdersError: null,
    getAllPurchaseOrders: null,

    // New state properties for getting a purchase order by ID
    getPurchaseOrderByIdLoading: false,
    getPurchaseOrderByIdSuccess: false,
    getPurchaseOrderByIdFailure: false,
    getPurchaseOrderByIdError: null,
    purchaseOrderById: null,

    // New state properties for updating a purchase order
    updatePurchaseOrderLoading: false,
    updatePurchaseOrderSuccess: false,
    updatePurchaseOrderFailure: false,
    updatePurchaseOrderError: null,
    updatedPurchaseOrder: null,

    // New state properties for deleting a purchase order
    deletePurchaseOrderLoading: false,
    deletePurchaseOrderSuccess: false,
    deletePurchaseOrderFailure: false,
    deletePurchaseOrderError: null,
    deletedPurchaseOrder: null,
};

export const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDER_REQUEST.RESET_ORDER_LIST:
            return {
                ...state,
                order_list: action.payload
            }
        case ORDER_REQUEST.ADD_ORDER_LIST:
            const list = state.order_list;
            list.push(action.payload)
            return {
                ...state,
                order_list: list
            }
        case ORDER_REQUEST.REMOVE_ORDER_LIST:

            const order_list = state.order_list;
            for (let i = 0; i < order_list.length; i++) {
                if (order_list[i].id === action.payload) {
                    order_list.splice(i, 1)
                }
            }
            return {
                ...state,
                order_list: order_list
            }
        case ORDER_REQUEST.GET_ALL_ORDERS_REQUEST:
            return {
                ...state,
                getAllOrdersLoading: true,
                getAllOrdersSuccess: false,
                getAllOrdersFailure: false,
                getAllOrdersError: null,
                getAllOrders: null
            }
        case ORDER_REQUEST.GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                getAllOrdersLoading: false,
                getAllOrdersSuccess: true,
                getAllOrdersFailure: false,
                getAllOrdersError: null,
                getAllOrders: action.payload
            }
        case ORDER_REQUEST.GET_ALL_ORDERS_FAILURE:
            return {
                ...state,
                getAllOrdersLoading: false,
                getAllOrdersSuccess: false,
                getAllOrdersFailure: false,
                getAllOrdersError: action.payload,
                getAllOrders: null
            }
        case ORDER_REQUEST.GET_ALL_ITEMS_AND_FABRICS_REQUEST:
            return {
                ...state,
                getAllItemsAndFabricsLoading: true,
                getAllItemsAndFabricsSuccess: false,
                getAllItemsAndFabricsFailure: false,
                getAllItemsAndFabricsError: null,
                getAllItemsAndFabrics: null
            }
        case ORDER_REQUEST.GET_ALL_ITEMS_AND_FABRICS_SUCCESS:
            return {
                ...state,
                getAllItemsAndFabricsLoading: false,
                getAllItemsAndFabricsSuccess: true,
                getAllItemsAndFabricsFailure: false,
                getAllItemsAndFabricsError: null,
                getAllItemsAndFabrics: action.payload
            }
        case ORDER_REQUEST.GET_ALL_ITEMS_AND_FABRICS_FAILURE:
            return {
                ...state,
                getAllItemsAndFabricsLoading: false,
                getAllItemsAndFabricsSuccess: false,
                getAllItemsAndFabricsFailure: false,
                getAllItemsAndFabricsError: action.payload,
                getAllItemsAndFabrics: null
            }

        // New cases for CREATE_PURCHASE_ORDER
        case ORDER_REQUEST.CREATE_PURCHASE_ORDER_REQUEST:
            return {
                ...state,
                createPurchaseOrderLoading: true,
                createPurchaseOrderSuccess: false,
                createPurchaseOrderFailure: false,
                createPurchaseOrderError: null,
                createdPurchaseOrder: null
            };
        case ORDER_REQUEST.CREATE_PURCHASE_ORDER_SUCCESS:
            return {
                ...state,
                createPurchaseOrderLoading: false,
                createPurchaseOrderSuccess: true,
                createPurchaseOrderFailure: false,
                createPurchaseOrderError: null,
                createdPurchaseOrder: action.payload
            };
        case ORDER_REQUEST.CREATE_PURCHASE_ORDER_FAILURE:
            return {
                ...state,
                createPurchaseOrderLoading: false,
                createPurchaseOrderSuccess: false,
                createPurchaseOrderFailure: true,
                createPurchaseOrderError: action.payload,
                createdPurchaseOrder: null
            };

        // New cases for GET_ALL_PURCHASE_ORDERS
        case ORDER_REQUEST.GET_ALL_PURCHASE_ORDERS_REQUEST:
            return {
                ...state,
                getAllPurchaseOrdersLoading: true,
                getAllPurchaseOrdersSuccess: false,
                getAllPurchaseOrdersFailure: false,
                getAllPurchaseOrdersError: null,
                getAllPurchaseOrders: null
            };
        case ORDER_REQUEST.GET_ALL_PURCHASE_ORDERS_SUCCESS:
            return {
                ...state,
                getAllPurchaseOrdersLoading: false,
                getAllPurchaseOrdersSuccess: true,
                getAllPurchaseOrdersFailure: false,
                getAllPurchaseOrdersError: null,
                getAllPurchaseOrders: action.payload
            };
        case ORDER_REQUEST.GET_ALL_PURCHASE_ORDERS_FAILURE:
            return {
                ...state,
                getAllPurchaseOrdersLoading: false,
                getAllPurchaseOrdersSuccess: false,
                getAllPurchaseOrdersFailure: true,
                getAllPurchaseOrdersError: action.payload,
                getAllPurchaseOrders: null
            };

        // New cases for GET_PURCHASE_ORDER_BY_ID
        case ORDER_REQUEST.GET_PURCHASE_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                getPurchaseOrderByIdLoading: true,
                getPurchaseOrderByIdSuccess: false,
                getPurchaseOrderByIdFailure: false,
                getPurchaseOrderByIdError: null,
                purchaseOrderById: null
            };
        case ORDER_REQUEST.GET_PURCHASE_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                getPurchaseOrderByIdLoading: false,
                getPurchaseOrderByIdSuccess: true,
                getPurchaseOrderByIdFailure: false,
                getPurchaseOrderByIdError: null,
                purchaseOrderById: action.payload
            };
        case ORDER_REQUEST.GET_PURCHASE_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                getPurchaseOrderByIdLoading: false,
                getPurchaseOrderByIdSuccess: false,
                getPurchaseOrderByIdFailure: true,
                getPurchaseOrderByIdError: action.payload,
                purchaseOrderById: null
            };

        // New cases for UPDATE_PURCHASE_ORDER
        case ORDER_REQUEST.UPDATE_PURCHASE_ORDER_REQUEST:
            return {
                ...state,
                updatePurchaseOrderLoading: true,
                updatePurchaseOrderSuccess: false,
                updatePurchaseOrderFailure: false,
                updatePurchaseOrderError: null,
                updatedPurchaseOrder: null
            };

        case ORDER_REQUEST.UPDATE_PURCHASE_ORDER_SUCCESS:
            return {
                ...state,
                updatePurchaseOrderLoading: false,
                updatePurchaseOrderSuccess: true,
                updatePurchaseOrderFailure: false,
                updatePurchaseOrderError: null,
                updatedPurchaseOrder: action.payload
            };

        case ORDER_REQUEST.UPDATE_PURCHASE_ORDER_FAILURE:
            return {
                ...state,
                updatePurchaseOrderLoading: false,
                updatePurchaseOrderSuccess: false,
                updatePurchaseOrderFailure: true,
                updatePurchaseOrderError: action.payload,
                updatedPurchaseOrder: null
            };

        // New cases for DELETE_PURCHASE_ORDER
        case ORDER_REQUEST.DELETE_PURCHASE_ORDER_REQUEST:
            return {
                ...state,
                deletePurchaseOrderLoading: true,
                deletePurchaseOrderSuccess: false,
                deletePurchaseOrderFailure: false,
                deletePurchaseOrderError: null,
            };

        case ORDER_REQUEST.DELETE_PURCHASE_ORDER_SUCCESS:
            return {
                ...state,
                deletePurchaseOrderLoading: false,
                deletePurchaseOrderSuccess: true,
                deletePurchaseOrderFailure: false,
                deletePurchaseOrderError: null,
            };

        case ORDER_REQUEST.DELETE_PURCHASE_ORDER_FAILURE:
            return {
                ...state,
                deletePurchaseOrderLoading: false,
                deletePurchaseOrderSuccess: false,
                deletePurchaseOrderFailure: true,
                deletePurchaseOrderError: action.payload,
            };



        default:
            return state;
    }
};

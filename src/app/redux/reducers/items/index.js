import { ITEM_REQUEST } from "../../actions/utilities";
const INITIAL_STATE = {
    getAllItemsLoading: false,
    getAllItemsSuccess: false,
    getAllItemsFailure: false,
    getAllItemsError: null,
    getAllItems: null,

    getItemLoading: false,
    getItemSuccess: false,
    getItemFailure: false,
    getItemError: null,
    getItem: null,

    addItemLoading: false,
    addItemSuccess: false,
    addItemFailure: false,
    addItemError: null,

    editItemLoading: false,
    editItemSuccess: false,
    editItemFailure: false,
    editItemError: null,

    removeItemLoading: false,
    removeItemSuccess: false,
    removeItemFailure: false,
    removeItemError: null,

    getAllUserItemsLoading: false,
    getAllUserItemsSuccess: false,
    getAllUserItemsFailure: false,
    getAllUserItemsError: null,
    getAllUserItems: null,

    addUserItemsLoading: false,
    addUserItemsSuccess: false,
    addUserItemsFailure: false,
    addUserItemsError: null,
    addUserItems: null,

    removeUserItemLoading: false,
    removeUserItemSuccess: false,
    removeUserItemFailure: false,
    removeUserItemError: null,
};

export const itemReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_REQUEST.ADD_USER_ITEMS_REQUEST:
            return {
                ...state,
                addUserItemsLoading: true,
                addUserItemsSuccess: false,
                addUserItemsFailure: false,
                addUserItemsError: null,
                addUserItems: null
            }
        case ITEM_REQUEST.ADD_USER_ITEMS_SUCCESS:
            const newItemList = state.getAllUserItems;
            newItemList.push(action.payload)
            return {
                ...state,
                addUserItemsLoading: false,
                addUserItemsSuccess: true,
                addUserItemsFailure: false,
                addUserItemsError: null,
                getAllUserItems: newItemList
            }
        case ITEM_REQUEST.ADD_USER_ITEMS_FAILURE:
            return {
                ...state,
                addUserItemsLoading: false,
                addUserItemsSuccess: false,
                addUserItemsFailure: false,
                addUserItemsError: action.payload,
                addUserItems: null
            }
        case ITEM_REQUEST.GET_ALL_USER_ITEMS_REQUEST:
            return {
                ...state,
                getAllUserItemsLoading: true,
                getAllUserItemsSuccess: false,
                getAllUserItemsFailure: false,
                getAllUserItemsError: null,
                getAllUserItems: null
            }
        case ITEM_REQUEST.GET_ALL_USER_ITEMS_SUCCESS:
            return {
                ...state,
                getAllUserItemsLoading: false,
                getAllUserItemsSuccess: true,
                getAllUserItemsFailure: false,
                getAllUserItemsError: null,
                getAllUserItems: action.payload
            }
        case ITEM_REQUEST.GET_ALL_USER_ITEMS_FAILURE:
            return {
                ...state,
                getAllUserItemsLoading: false,
                getAllUserItemsSuccess: false,
                getAllUserItemsFailure: false,
                getAllUserItemsError: action.payload,
                getAllUserItems: null
            }
        case ITEM_REQUEST.GET_ALL_ITEMS_REQUEST:
            return {
                ...state,
                getAllItemsLoading: true,
                getAllItemsSuccess: false,
                getAllItemsFailure: false,
                getAllItemsError: null,
                getAllItems: null
            }
        case ITEM_REQUEST.GET_ALL_ITEMS_SUCCESS:
            return {
                ...state,
                getAllItemsLoading: false,
                getAllItemsSuccess: true,
                getAllItemsFailure: false,
                getAllItemsError: null,
                getAllItems: action.payload
            }
        case ITEM_REQUEST.GET_ALL_ITEMS_FAILURE:
            return {
                ...state,
                getAllItemsLoading: false,
                getAllItemsSuccess: false,
                getAllItemsFailure: false,
                getAllItemsError: action.payload,
                getAllItems: null
            }
        case ITEM_REQUEST.GET_ITEM_REQUEST:
            return {
                ...state,
                getItemLoading: true,
                getItemSuccess: false,
                getItemFailure: false,
                getItemError: null,
                getItem: null
            }
        case ITEM_REQUEST.GET_ITEM_SUCCESS:
            return {
                ...state,
                getItemLoading: false,
                getItemSuccess: true,
                getItemFailure: false,
                getItemError: null,
                getItem: action.payload
            }
        case ITEM_REQUEST.GET_ITEM_FAILURE:
            return {
                ...state,
                getItemLoading: false,
                getItemSuccess: false,
                getItemFailure: false,
                getItemError: action.payload,
                getItem: null
            }
        case ITEM_REQUEST.ADD_ITEM_REQUEST:
            return {
                ...state,
                addItemLoading: true,
                addItemSuccess: false,
                addItemFailure: false,
                addItemError: null,

            }
        case ITEM_REQUEST.ADD_ITEM_SUCCESS:

            return {
                ...state,
                addItemLoading: false,
                addItemSuccess: true,
                addItemFailure: false,
                addItemError: null,
            }
        case ITEM_REQUEST.ADD_ITEM_FAILURE:
            return {
                ...state,
                addItemLoading: false,
                addItemSuccess: false,
                addItemFailure: false,
                addItemError: action.payload,

            }
        case ITEM_REQUEST.EDIT_ITEM_REQUEST:
            return {
                ...state,
                editItemLoading: true,
                editItemSuccess: false,
                editItemFailure: false,
                editItemError: null,

            }
        case ITEM_REQUEST.EDIT_ITEM_SUCCESS:

            return {
                ...state,
                editItemLoading: false,
                editItemSuccess: true,
                editItemFailure: false,
                editItemError: null,
                getItem: action.payload
            }
        case ITEM_REQUEST.EDIT_ITEM_FAILURE:
            return {
                ...state,
                editItemLoading: false,
                editItemSuccess: false,
                editItemFailure: false,
                editItemError: action.payload,

            }
        case ITEM_REQUEST.REMOVE_ITEM_REQUEST:
            return {
                ...state,
                removeItemLoading: true,
                removeItemSuccess: false,
                removeItemFailure: false,
                removeItemError: null,

            }
        case ITEM_REQUEST.REMOVE_ITEM_SUCCESS:
            const items = state.getAllItems;
            for (let i = 0; i < items.length; i++) {
                if (items[i]._id === action.payload._id) {
                    items.splice(i, 1)
                }
            }
            return {
                ...state,
                removeItemLoading: false,
                removeItemSuccess: true,
                removeItemFailure: false,
                removeItemError: null,
                getAllItems: items
            }
        case ITEM_REQUEST.REMOVE_ITEM_FAILURE:
            return {
                ...state,
                removeItemLoading: false,
                removeItemSuccess: false,
                removeItemFailure: false,
                removeItemError: action.payload,

            }
        case ITEM_REQUEST.REMOVE_USER_ITEM_REQUEST:
            return {
                ...state,
                removeUserItemLoading: true,
                removeUserItemSuccess: false,
                removeUserItemFailure: false,
                removeUserItemError: null,

            }
        case ITEM_REQUEST.REMOVE_USER_ITEM_SUCCESS:
            const items_ = state.getAllUserItems;
            for (let i = 0; i < items_.length; i++) {
                if (items_[i]._id === action.payload._id) {
                    items_.splice(i, 1)
                }
            }
            return {
                ...state,
                removeUserItemLoading: false,
                removeUserItemSuccess: true,
                removeUserItemFailure: false,
                removeUserItemError: null,
                getAllUserItems: items_
            }
        case ITEM_REQUEST.REMOVE_USER_ITEM_FAILURE:
            return {
                ...state,
                removeUserItemLoading: false,
                removeUserItemSuccess: false,
                removeUserItemFailure: false,
                removeUserItemError: action.payload,

            }
        default:
            return state;
    }
};

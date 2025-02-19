import { v4 as uuidv4 } from 'uuid';
import { SIZE_REQUEST } from "../../actions/utilities";
const INITIAL_STATE = {
    sizeId: null,
    itemSizeList: [{
        id: uuidv4(), title: ''
    }],
    addItemSizeLoading: false,
    addItemSizeSuccess: false,
    addItemSizeFailure: false,
    addItemSizeError: null,

    getSizeLoading: false,
    getSizeSuccess: false,
    getSizeFailure: false,
    getSizeError: null,
    getSize: null,

    editItemSizeLoading: false,
    editItemSizeSuccess: false,
    editItemSizeFailure: false,
    editItemSizeError: null,

};

export const sizeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIZE_REQUEST.EDIT_SIZE_REQUEST:
            return {
                ...state,
                editItemSizeLoading: true,
                editItemSizeSuccess: false,
                editItemSizeFailure: false,
                editItemSizeError: null,
            }
        case SIZE_REQUEST.EDIT_SIZE_SUCCESS:
            return {
                ...state,
                editItemSizeLoading: false,
                editItemSizeSuccess: true,
                editItemSizeFailure: false,
                editItemSizeError: null,
            }
        case SIZE_REQUEST.EDIT_SIZE_FAILURE:
            return {
                ...state,
                editItemSizeLoading: false,
                editItemSizeSuccess: false,
                editItemSizeFailure: true,
                editItemSizeError: action.payload,
            }
        case SIZE_REQUEST.SIZE_LIST:
            return {
                ...state,
                itemSizeList: action.payload.size,
                sizeId: action.payload.sizeId,
            }
        case SIZE_REQUEST.GET_SIZE_REQUEST:
            return {
                ...state,
                getSizeLoading: true,
                getSizeSuccess: false,
                getSizeFailure: false,
                getSizeError: null,
                getSize: null
            }
        case SIZE_REQUEST.GET_SIZE_SUCCESS:
            return {
                ...state,
                getSizeLoading: false,
                getSizeSuccess: true,
                getSizeFailure: false,
                getSizeError: null,
                getSize: action.payload
            }
        case SIZE_REQUEST.GET_SIZE_FAILURE:
            return {
                ...state,
                getSizeLoading: false,
                getSizeSuccess: false,
                getSizeFailure: true,
                getSizeError: action.payload,
                getSize: null
            }
        case SIZE_REQUEST.ADD_SIZE_REQUEST:
            return {
                ...state,
                addItemSizeLoading: true,
                addItemSizeSuccess: false,
                addItemSizeFailure: false,
                addItemSizeError: null,
            }
        case SIZE_REQUEST.ADD_SIZE_SUCCESS:
            return {
                ...state,
                addItemSizeLoading: false,
                addItemSizeSuccess: true,
                addItemSizeFailure: false,
                addItemSizeError: null,
            }
        case SIZE_REQUEST.ADD_SIZE_FAILURE:
            return {
                ...state,
                addItemSizeLoading: false,
                addItemSizeSuccess: false,
                addItemSizeFailure: true,
                addItemSizeError: action.payload,
            }
        case SIZE_REQUEST.RESET_ITEM_SIZE_LIST:
            return {
                itemSizeList: action.payload
            }
        case SIZE_REQUEST.ADD_ITEM_SIZE_LIST:
            const list = state.itemSizeList;
            list.push(action.payload)
          

            return {
                ...state,
                itemSizeList: list
            }
        case SIZE_REQUEST.REMOVE_ITEM_SIZE_LIST:

            const item_list = state.itemSizeList;
            for (let i = 0; i < item_list.length; i++) {
                if (item_list[i].id === action.payload) {
                    item_list.splice(i, 1)
                }
            }
            return {
                ...state,
                itemSizeList: item_list
            }
        default:
            return state;
    }
};

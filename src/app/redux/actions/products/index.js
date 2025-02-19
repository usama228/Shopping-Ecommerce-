import { addProduct, createCategory, createVariant, deleteCategory, deleteProduct, editProduct, getCategories, getCategoryById, getProductById, getProducts, updateCategory } from "app/redux/api/products";
import { FAILURE, REQUEST, SUCCESS, PRODUCT_REQUEST } from "../utilities";





export function ADDPRODUCT(productData, moveToNext, failure) {
    return async dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.ADD_PRODUCT_REQUEST));
        try {
            const response = await addProduct(productData);
            if (response.data.succeeded === true) {
                dispatch(SUCCESS(PRODUCT_REQUEST.ADD_PRODUCT_SUCCESS, response.data.data));
                if (moveToNext) {
                    moveToNext();
                }
            } else {
                dispatch(FAILURE(PRODUCT_REQUEST.ADD_PRODUCT_FAILURE, response.data.message));
                if (failure) {
                    failure();
                }
            }
        } catch (error) {
            dispatch(FAILURE(PRODUCT_REQUEST.ADD_PRODUCT_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
            if (failure) {
                failure(error?.response?.data?.message ? error.response.data.message : error.message);
            }
        }
    };
}

export function CREATECATEGORY(data, moveToNext, failure) {
    return async dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.CREATE_CATEGORY_REQUEST));
        try {
            const response = await createCategory(data);

            if (response.data.succeeded === true) {
                dispatch(SUCCESS(PRODUCT_REQUEST.CREATE_CATEGORY_SUCCESS, response.data.category));
                if (moveToNext) {
                    moveToNext(response.data.category);
                }
            } else {
                dispatch(FAILURE(PRODUCT_REQUEST.CREATE_CATEGORY_FAILURE, response.data.message));
                if (failure) {
                    failure();
                }
            }
        } catch (error) {
            dispatch(FAILURE(PRODUCT_REQUEST.CREATE_CATEGORY_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
            if (failure) {
                failure(error?.response?.data?.message ? error.response.data.message : error.message);
            }
        }
    };
}

export function CREATEVARIANT(data, moveToNext, failure) {
    return async dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.CREATE_VARIANT_REQUEST));
        try {
            const response = await createVariant(data);
            if (response.data.succeeded === true) {
                dispatch(SUCCESS(PRODUCT_REQUEST.CREATE_VARIANT_SUCCESS, response.data.variant));
                if (moveToNext) {
                    moveToNext(response.data.variant);
                }
            } else {
                dispatch(FAILURE(PRODUCT_REQUEST.CREATE_VARIANT_FAILURE, response.data.message));
                if (failure) {
                    failure();
                }
            }
        } catch (error) {
            dispatch(FAILURE(PRODUCT_REQUEST.CREATE_VARIANT_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
            if (failure) {
                failure(error?.response?.data?.message ? error.response.data.message : error.message);
            }
        }
    };
}

export function GETALLPRODUCTS(data, auth, failure) {
    return dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.GET_ALL_PRODUCTS_REQUEST))
        getProducts(data, auth).then(
            response => {

                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(PRODUCT_REQUEST.GET_ALL_PRODUCTS_SUCCESS, response.data.data))
                }
                else {
                    dispatch(FAILURE(PRODUCT_REQUEST.GET_ALL_PRODUCTS_FAILURE, response.data.message))
                    if (failure) {
                        failure()
                    }
                }
            }, error => {
                dispatch(FAILURE(PRODUCT_REQUEST.GET_ALL_PRODUCTS_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
};

export function GETALLCATEGORIES(data, auth, failure) {
    return dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.GET_ALL_CATEGORIES_REQUEST))
        getCategories(data, auth).then(

            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(PRODUCT_REQUEST.GET_ALL_CATEGORIES_SUCCESS, response.data.data))
                }
                else {
                    dispatch(FAILURE(PRODUCT_REQUEST.GET_ALL_CATEGORIES_FAILURE, response.data.message))
                    if (failure) {
                        failure()
                    }
                }
            }, error => {
                dispatch(FAILURE(PRODUCT_REQUEST.GET_ALL_CATEGORIES_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
};

export function GETPRODUCTBYID(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.GET_PRODUCT_BY_ID_REQUEST))
        getProductById(id).then(
            response => {

                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(PRODUCT_REQUEST.GET_PRODUCT_BY_ID_SUCCESS, response.data.data))
                    if (moveToNext) {
                        moveToNext(response.data.data)
                    }
                }
                else {
                    dispatch(FAILURE(PRODUCT_REQUEST.GET_PRODUCT_BY_ID_FAILURE, response.data.message))
                    if (failure) {
                        failure(response.data.message)
                    }
                }
            }, error => {
                dispatch(FAILURE(PRODUCT_REQUEST.GET_PRODUCT_BY_ID_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
}

export function EDITPRODUCT(userData, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.EDIT_PRODUCT_REQUEST));
        editProduct(userData).then(

            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(PRODUCT_REQUEST.EDIT_PRODUCT_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(PRODUCT_REQUEST.EDIT_PRODUCT_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(PRODUCT_REQUEST.EDIT_PRODUCT_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};
export function DELETEPRODUCT(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.DELETE_PRODUCT_REQUEST));
        deleteProduct(id).then(
            response => {
                if (response.data.succeeded) {
                    dispatch(SUCCESS(PRODUCT_REQUEST.DELETE_PRODUCT_SUCCESS, id));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(PRODUCT_REQUEST.DELETE_PRODUCT_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(PRODUCT_REQUEST.DELETE_PRODUCT_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }

            }
        );
    };
}

export function GETCATEGORYBYID(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.GET_CATEGORY_BY_ID_REQUEST))
        getCategoryById(id).then(
            response => {

                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(PRODUCT_REQUEST.GET_CATEGORY_BY_ID_SUCCESS, response.data.data))
                    if (moveToNext) {
                        moveToNext(response.data.data)
                    }
                }
                else {
                    dispatch(FAILURE(PRODUCT_REQUEST.GET_CATEGORY_BY_ID_FAILURE, response.data.message))
                    if (failure) {
                        failure(response.data.message)
                    }
                }
            }, error => {
                dispatch(FAILURE(PRODUCT_REQUEST.GET_CATEGORY_BY_ID_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
}

export function UPDATECATEGORY(userData, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.UPDATE_CATEGORY_REQUEST));
        updateCategory(userData).then(

            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(PRODUCT_REQUEST.UPDATE_CATEGORY_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(PRODUCT_REQUEST.UPDATE_CATEGORY_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(PRODUCT_REQUEST.UPDATE_CATEGORY_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};

export function DELETECATEGORY(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(PRODUCT_REQUEST.DELETE_CATEGORY_REQUEST));
        deleteCategory(id).then(
            response => {
                if (response.data.succeeded) {
                    dispatch(SUCCESS(PRODUCT_REQUEST.DELETE_CATEGORY_SUCCESS, id));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(PRODUCT_REQUEST.DELETE_CATEGORY_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(PRODUCT_REQUEST.DELETE_CATEGORY_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }

            }
        );
    };
}


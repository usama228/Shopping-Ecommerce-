import { PRODUCT_REQUEST } from "app/redux/actions/utilities";

const INITIAL_STATE = {
    addProductLoading: false,
    addProductSuccess: false,
    addProductFailure: false,
    addProductError: null,

    createCategoryLoading: false,
    createCategorySuccess: false,
    createCategoryFailure: false,
    createCategoryError: null,

    createVariantLoading: false,
    createVariantSuccess: false,
    createVariantFailure: false,
    createVariantError: null,

    getAllProductsLoading: false,
    getAllProductsSuccess: false,
    getAllProductsFailure: false,
    getAllProductsError: null,
    products: null,

    getAllCategoriesLoading: false,
    getAllCategoriesSuccess: false,
    getAllCategoriesFailure: false,
    getAllCategoriesError: null,
    categories: null,

    getProductByIdLoading: false,
    getProductByIdSuccess: false,
    getProductByIdFailure: false,
    getProductByIdError: null,
    product: null,

    editProductLoading: false,
    editProductSuccess: false,
    editProductFailure: false,
    editProductError: null,

    deleteProductLoading: false,
    deleteProductSuccess: false,
    deleteProductFailure: false,
    deleteProductError: null,

    getCategoryByIdLoading: false,
    getCategoryByIdSuccess: false,
    getCategoryByIdFailure: false,
    getCategoryByIdError: null,
    category: null,

    updateCategoryLoading: false,
    updateCategorySuccess: false,
    updateCategoryFailure: false,
    updateCategoryError: null,

    deleteCategoryLoading: false,
    deleteCategorySuccess: false,
    deleteCategoryFailure: false,
    deleteCategoryError: null,


};

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case PRODUCT_REQUEST.ADD_PRODUCT_REQUEST:
            return {
                ...state,
                addProductLoading: true,
                addProductSuccess: false,
                addProductFailure: false,
                addProductError: null,

            }
        case PRODUCT_REQUEST.ADD_PRODUCT_SUCCESS:

            return {
                ...state,
                addProductLoading: false,
                addProductSuccess: true,
                addProductFailure: false,
                addProductError: null,
            }
        case PRODUCT_REQUEST.ADD_PRODUCT_FAILURE:
            return {
                ...state,
                addProductLoading: false,
                addProductSuccess: false,
                addProductFailure: false,
                addProductError: action.payload,

            }
        // Category actions
        case PRODUCT_REQUEST.CREATE_CATEGORY_REQUEST:
            return {
                ...state,
                createCategoryLoading: true,
                createCategorySuccess: false,
                createCategoryFailure: false,
                createCategoryError: null,
            };
        case PRODUCT_REQUEST.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                createCategoryLoading: false,
                createCategorySuccess: true,
                createCategoryFailure: false,
                createCategoryError: null,
            };
        case PRODUCT_REQUEST.CREATE_CATEGORY_FAILURE:
            return {
                ...state,
                createCategoryLoading: false,
                createCategorySuccess: false,
                createCategoryFailure: true,
                createCategoryError: action.payload,
            };
        case PRODUCT_REQUEST.CREATE_VARIANT_REQUEST:
            return {
                ...state,
                createVariantLoading: true,
                createVariantSuccess: false,
                createVariantFailure: false,
                createVariantError: null,
            };
        case PRODUCT_REQUEST.CREATE_VARIANT_SUCCESS:
            return {
                ...state,
                createVariantLoading: false,
                createVariantSuccess: true,
                createVariantFailure: false,
                createVariantError: null,
            };
        case PRODUCT_REQUEST.CREATE_VARIANT_FAILURE:
            return {
                ...state,
                createVariantLoading: false,
                createVariantSuccess: false,
                createVariantFailure: true,
                createVariantError: action.payload,
            };
        // Get all products actions
        case PRODUCT_REQUEST.GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                getAllProductsLoading: true,
                getAllProductsSuccess: false,
                getAllProductsFailure: false,
                getAllProductsError: null,
            };
        case PRODUCT_REQUEST.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                getAllProductsLoading: false,
                getAllProductsSuccess: true,
                getAllProductsFailure: false,
                getAllProductsError: null,
                products: action.payload,
            };
        case PRODUCT_REQUEST.GET_ALL_PRODUCTS_FAILURE:
            return {
                ...state,
                getAllProductsLoading: false,
                getAllProductsSuccess: false,
                getAllProductsFailure: true,
                getAllProductsError: action.payload,
            };
        // Get all categories actions
        case PRODUCT_REQUEST.GET_ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                getAllCategoriesLoading: true,
                getAllCategoriesSuccess: false,
                getAllCategoriesFailure: false,
                getAllCategoriesError: null,
            };
        case PRODUCT_REQUEST.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                getAllCategoriesLoading: false,
                getAllCategoriesSuccess: true,
                getAllCategoriesFailure: false,
                getAllCategoriesError: null,
                categories: action.payload,
            };
        case PRODUCT_REQUEST.GET_ALL_CATEGORIES_FAILURE:
            return {
                ...state,
                getAllCategoriesLoading: false,
                getAllCategoriesSuccess: false,
                getAllCategoriesFailure: true,
                getAllCategoriesError: action.payload,
            };

        // Get product by ID actions
        case PRODUCT_REQUEST.GET_PRODUCT_BY_ID_REQUEST:
            return {
                ...state,
                getProductByIdLoading: true,
                getProductByIdSuccess: false,
                getProductByIdFailure: false,
                getProductByIdError: null,
            };
        case PRODUCT_REQUEST.GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                getProductByIdLoading: false,
                getProductByIdSuccess: true,
                getProductByIdFailure: false,
                getProductByIdError: null,
                product: action.payload,
            };
        case PRODUCT_REQUEST.GET_PRODUCT_BY_ID_FAILURE:
            return {
                ...state,
                getProductByIdLoading: false,
                getProductByIdSuccess: false,
                getProductByIdFailure: true,
                getProductByIdError: action.payload,
            };

        // Edit product actions
        case PRODUCT_REQUEST.EDIT_PRODUCT_REQUEST:
            return {
                ...state,
                editProductLoading: true,
                editProductSuccess: false,
                editProductFailure: false,
                editProductError: null,
            };
        case PRODUCT_REQUEST.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                editProductLoading: false,
                editProductSuccess: true,
                editProductFailure: false,
                editProductError: null,
            };
        case PRODUCT_REQUEST.EDIT_PRODUCT_FAILURE:
            return {
                ...state,
                editProductLoading: false,
                editProductSuccess: false,
                editProductFailure: true,
                editProductError: action.payload,
            };

        // Delete product actions
        case PRODUCT_REQUEST.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                deleteProductLoading: true,
                deleteProductSuccess: false,
                deleteProductFailure: false,
                deleteProductError: null,
            };
        case PRODUCT_REQUEST.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deleteProductLoading: false,
                deleteProductSuccess: true,
                deleteProductFailure: false,
                deleteProductError: null,

            };

        case PRODUCT_REQUEST.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                deleteProductLoading: false,
                deleteProductSuccess: false,
                deleteProductFailure: true,
                deleteProductError: action.payload,
            };

        // Get category by ID actions 
        case PRODUCT_REQUEST.GET_CATEGORY_BY_ID_REQUEST:
            return {
                ...state,
                getCategoryByIdLoading: true,
                getCategoryByIdSuccess: false,
                getCategoryByIdFailure: false,
                getCategoryByIdError: null,
            };
        case PRODUCT_REQUEST.GET_CATEGORY_BY_ID_SUCCESS:
            return {
                ...state,
                getCategoryByIdLoading: false,
                getCategoryByIdSuccess: true,
                getCategoryByIdFailure: false,
                getCategoryByIdError: null,
                category: action.payload,
            };
        case PRODUCT_REQUEST.GET_CATEGORY_BY_ID_FAILURE:
            return {
                ...state,
                getCategoryByIdLoading: false,
                getCategoryByIdSuccess: false,
                getCategoryByIdFailure: true,
                getCategoryByIdError: action.payload,
            };

        // Update category actions
        case PRODUCT_REQUEST.UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                updateCategoryLoading: true,
                updateCategorySuccess: false,
                updateCategoryFailure: false,
                updateCategoryError: null,
            };
        case PRODUCT_REQUEST.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                updateCategoryLoading: false,
                updateCategorySuccess: true,
                updateCategoryFailure: false,
                updateCategoryError: null,

            };
        case PRODUCT_REQUEST.UPDATE_CATEGORY_FAILURE:
            return {
                ...state,
                updateCategoryLoading: false,
                updateCategorySuccess: false,
                updateCategoryFailure: true,
                updateCategoryError: action.payload,
            };

        // Delete category actions
        case PRODUCT_REQUEST.DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                deleteCategoryLoading: true,
                deleteCategorySuccess: false,
                deleteCategoryFailure: false,
                deleteCategoryError: null,
            };
        case PRODUCT_REQUEST.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                deleteCategoryLoading: false,
                deleteCategorySuccess: true,
                deleteCategoryFailure: false,
                deleteCategoryError: null,

            };
        case PRODUCT_REQUEST.DELETE_CATEGORY_FAILURE:
            return {
                ...state,
                deleteCategoryLoading: false,
                deleteCategorySuccess: false,
                deleteCategoryFailure: true,
                deleteCategoryError: action.payload,
            };

        default:
            return state;
    }
};
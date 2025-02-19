import { USER_REQUEST } from "../../actions/utilities";
const INITIAL_STATE = {
    loginLoading: false,
    loginSuccess: false,
    loginFailure: false,
    loginError: null,

    registerLoading: false,
    registerSuccess: false,
    registerFailure: false,
    registerError: null,
    logOutLoading: false,
    logOutSuccess: false,
    logOutFailure: false,
    logOutError: null,

    allUsersLoading: false,
    allUsersSuccess: false,
    allUsersFailure: false,
    allUsersError: false,
    allUsers: null,

    allConsumersLoading: false,
    allConsumersSuccess: false,
    allConsumersFailure: false,
    allConsumersError: false,
    allConsumers: [],

    allAdminsLoading: false,
    allAdminsSuccess: false,
    allAdminsFailure: false,
    allAdminsError: false,
    allAdmins: [],

    deleteLoading: false,
    deleteSuccess: false,
    deleteFailure: false,
    deleteError: null,

    // eslint-disable-next-line no-dupe-keys
    allUsers: {
        users: [], // Ensure this is initialized as an empty array
    },

    editLoading: false,
    editSuccess: false,
    editFailure: false,
    editError: null,

    userLoading: false,
    userSuccess: false,
    userFailure: false,
    userError: null,
    user: null,

    createLoading: false,
    createSuccess: false,
    createFailure: false,
    createError: null,

    userByRoleLoading: false,
    userByRoleSuccess: false,
    userByRoleFailure: false,
    userByRoleError: null,
    userByRole: [],

};

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_REQUEST.RESET_USER_DATA:
            return {
                ...state,
                userLoading: false,
                userSuccess: false,
                userFailure: false,
                userError: null,
                user: null,
                createLoading: false,
                createSuccess: false,
                createFailure: false,
                createError: null,
            }

        case USER_REQUEST.USER_BY_ROLE_REQUEST:
            return {
                ...state,
                userByRoleLoading: true,
                userByRoleSuccess: false,
                userByRoleFailure: false,
                userByRoleError: null,
                userByRole: [],
            }
        case USER_REQUEST.USER_BY_ROLE_SUCCESS:
            return {
                ...state,
                userByRoleLoading: false,
                userByRoleSuccess: true,
                userByRoleFailure: false,
                userByRoleError: null,
                userByRole: action.payload
            }
        case USER_REQUEST.USER_BY_ROLE_FAILURE:
            return {
                ...state,
                userByRoleLoading: false,
                userByRoleSuccess: false,
                userByRoleFailure: true,
                userByRoleError: action.payload,
                userByRole: [],
            }
        case USER_REQUEST.LOGIN_REQUEST:
            return {
                ...state,
                loginLoading: true,
                loginSuccess: false,
                loginFailure: false,
                loginError: null,
                user: null,
            }
        case USER_REQUEST.LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loginSuccess: true,
                loginFailure: false,
                loginError: null,
            }
        case USER_REQUEST.LOGIN_FAILURE:
            return {
                ...state,
                loginLoading: false,
                loginSuccess: false,
                loginFailure: true,
                loginError: action.payload,
                user: null,
            }
        case USER_REQUEST.REGISTER_REQUEST:
            return {
                ...state,
                registerLoading: true,
                registerSuccess: false,
                registerFailure: false,
                registerError: null,
            }
        case USER_REQUEST.REGISTER_SUCCESS:
            return {
                ...state,
                registerLoading: false,
                registerSuccess: true,
                registerFailure: false,
                registerError: null,
            }
        case USER_REQUEST.REGISTER_FAILURE:
            return {
                ...state,
                registerLoading: false,
                registerSuccess: false,
                registerFailure: true,
                registerError: action.payload,
            }
        case USER_REQUEST.LOGOUT_REQUEST:
            return {
                ...state,
                logOutLoading: true,
                logOutSuccess: false,
                logOutFailure: false,
                logOutError: null,
            }
        case USER_REQUEST.LOGOUT_SUCCESS:
            return {
                ...state,
                logOutLoading: false,
                logOutSuccess: true,
                logOutFailure: false,
                logOutError: null,
            }
        case USER_REQUEST.LOGOUT_FAILURE:
            return {
                ...state,
                logOutLoading: false,
                logOutSuccess: false,
                logOutFailure: true,
                logOutError: action.payload,
            }
        case USER_REQUEST.GET_ALL_USERS_REQUEST:
            return {
                ...state,
                allUsersLoading: true,
                allUsersSuccess: false,
                allUsersFailure: false,
                allUsersError: null,
                allUsers: null
            }
        case USER_REQUEST.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                allUsersLoading: false,
                allUsersSuccess: true,
                allUsersFailure: false,
                allUsersError: null,
                allUsers: action.payload
            }
        case USER_REQUEST.GET_ALL_USERS_FAILURE:
            return {
                ...state,
                allUsersLoading: false,
                allUsersSuccess: false,
                allUsersFailure: true,
                allUsersError: action.payload
            }
        // Get All Consumers
        case USER_REQUEST.GET_ALL_CONSUMERS_REQUEST:
            return {
                ...state,
                allConsumersLoading: true,
                allConsumersSuccess: false,
                allConsumersFailure: false,
                allConsumersError: null,
                allConsumers: null,
            }
        case USER_REQUEST.GET_ALL_CONSUMERS_SUCCESS:
            return {
                ...state,
                allConsumersLoading: false,
                allConsumersSuccess: true,
                allConsumersFailure: false,
                allConsumersError: null,
                allConsumers: action.payload
            }
        case USER_REQUEST.GET_ALL_CONSUMERS_FAILURE:
            return {
                ...state,
                allConsumersLoading: false,
                allConsumersSuccess: false,
                allConsumersFailure: true,
                allConsumers: action.payload
            }

        //Get All Admins
        case USER_REQUEST.GET_ALL_ADMINS_REQUEST:
            return {
                ...state,
                allAdminsLoading: true,
                allAdminsSuccess: false,
                allAdminsFailure: false,
                allAdminsError: null,
                allAdmins: null,
            }
        case USER_REQUEST.GET_ALL_ADMINS_SUCCESS:
            return {
                ...state,
                allAdminsLoading: false,
                allAdminsSuccess: true,
                allAdminsFailure: false,
                allAdminsError: null,
                allAdmins: action.payload
            }
        case USER_REQUEST.GET_ALL_ADMINS_FAILURE:
            return {
                ...state,
                allAdminsLoading: false,
                allAdminsSuccess: false,
                allAdminsFailure: true,
                allAdmins: action.payload
            }
        case USER_REQUEST.DELETE_USER_REQUEST:
            return {
                ...state,
                deleteLoading: true,
                deleteSuccess: false,
                deleteFailure: false,
                deleteError: null,
            }
        case USER_REQUEST.DELETE_USER_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                deleteSuccess: true,
                deleteFailure: false,
                deleteError: null,
              
            };
        case USER_REQUEST.DELETE_USER_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                deleteSuccess: false,
                deleteFailure: true,
                deleteError: action.payload,
            }

        case USER_REQUEST.EDIT_USER_REQUEST:
            return {
                ...state,
                editLoading: true,
                editSuccess: false,
                editFailure: false,
                editError: null,
            }
        case USER_REQUEST.EDIT_USER_SUCCESS:
            return {
                ...state,
                editLoading: false,
                editSuccess: true,
                editFailure: false,
                editError: null,
                user: action.payload
            }
        case USER_REQUEST.EDIT_USER_FAILURE:
            return {
                ...state,
                editLoading: false,
                editSuccess: false,
                editFailure: true,
                editError: action.payload,
            }

        case USER_REQUEST.GET_USER_REQUEST:
            return {
                ...state,
                userLoading: true,
                userSuccess: false,
                userFailure: false,
                userError: null,
                user: null
            }
        case USER_REQUEST.GET_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                userSuccess: true,
                userFailure: false,
                userError: null,
                user: action.payload
            }
        case USER_REQUEST.GET_USER_FAILURE:
            return {
                ...state,
                userLoading: false,
                userSuccess: false,
                userFailure: true,
                userError: action.payload,
                user: null
            }

        case USER_REQUEST.CREATE_REQUEST:
            return {
                ...state,
                createLoading: true,
                createSuccess: false,
                createFailure: false,
                createError: null,
            }
        case USER_REQUEST.CREATE_SUCCESS:
            return {
                ...state,
                createLoading: false,
                createSuccess: true,
                createFailure: false,
                createError: null,
            }
        case USER_REQUEST.CREATE_FAILURE:
            return {
                ...state,
                createLoading: false,
                createSuccess: false,
                createFailure: true,
                createError: action.payload,

            }
        default:
            return state;
    }
};

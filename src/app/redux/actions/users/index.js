import { getAllUsers, getUser, login, create, logout, register, removeUser, getUsersByRole, getAllConsumers, getAllAdmins, editUser, deleteUser } from "../../api";
import { FAILURE, REQUEST, SUCCESS, USER_REQUEST } from "../utilities";

export function LOGIN(userData, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.LOGIN_REQUEST));
        login(userData)
            .then(response => {

                if (response.data.succeeded === true) {
                    const DASHBOARD = response.data.user;
                    localStorage.setItem('user', JSON.stringify(DASHBOARD));
                    dispatch(SUCCESS(USER_REQUEST.LOGIN_SUCCESS, DASHBOARD));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(USER_REQUEST.LOGIN_FAILURE, response.data.message));
                    if (failure) {
                        failure();
                    }
                }
            })
            .catch(error => {
                dispatch(FAILURE(USER_REQUEST.LOGIN_FAILURE, error.message));
                if (failure) {
                    failure();
                }
            });
    };
}
export function REGISTER(registerData, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.REGISTER_REQUEST))
        register(registerData).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.REGISTER_SUCCESS, response.data.data))
                    if (moveToNext) {
                        moveToNext()
                    }
                }
                else {
                    dispatch(FAILURE(USER_REQUEST.REGISTER_FAILURE, response.data.message))
                    if (failure) {
                        failure()
                    }
                }
            }, error => {
                dispatch(FAILURE(USER_REQUEST.REGISTER_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
                if (failure) {
                    failure()
                }
            }
        )
    }
}
export function LOGOUT(registerData) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.LOGOUT_REQUEST))
        logout(registerData).then(
            response => {
                if (response.data.succeeded === true) {
                    localStorage.removeItem('user');
                    dispatch(SUCCESS(USER_REQUEST.LOGIN_SUCCESS, response.data.data))
                }
                else {
                    dispatch(FAILURE(USER_REQUEST.LOGOUT_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(USER_REQUEST.LOGOUT_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}
export function CREATEUSER(userData, moveToNext, failure) {
    return async dispatch => {
        dispatch(REQUEST(USER_REQUEST.CREATE_REQUEST));
        create(userData).then(response => {

            if (response.data.succeeded === true) {
                console.log("response", response)
                dispatch(SUCCESS(USER_REQUEST.CREATE_SUCCESS, response.data.data));
                if (moveToNext) {
                    moveToNext();
                }
            } else {
                dispatch(FAILURE(USER_REQUEST.CREATE_FAILURE, response.data.message));

                if (failure) {
                    failure(response.data.message);
                }
            }
        })
            .catch(error => {
                console.log("error.....", error.response.data)
                dispatch(FAILURE(USER_REQUEST.CREATE_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            });
    };
};

export function GETALLCONSUMERS(data, auth, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.GET_ALL_CONSUMERS_REQUEST))
        getAllConsumers(data, auth).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.GET_ALL_CONSUMERS_SUCCESS, response.data.data))
                }
                else {
                    dispatch(FAILURE(USER_REQUEST.GET_ALL_CONSUMERS_FAILURE, response.data.message))
                    if (failure) {
                        failure()
                    }
                }
            }, error => {
                dispatch(FAILURE(USER_REQUEST.GET_ALL_CONSUMERS_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
};

export function GETALLADMINS(data, auth, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.GET_ALL_ADMINS_REQUEST))
        getAllAdmins(data, auth).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.GET_ALL_ADMINS_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(USER_REQUEST.GET_ALL_ADMINS_FAILURE, response.data.message))
                    if (failure) {
                        failure()
                    }
                }
            }, error => {
                dispatch(FAILURE(USER_REQUEST.GET_ALL_ADMINS_SUCCESS, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
};

export function GETALLUSERS(data, auth, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.GET_ALL_USERS_REQUEST))
        getAllUsers(data, auth).then(
            response => {

                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.GET_ALL_USERS_SUCCESS, response.data.data))
                }
                else {
                    dispatch(FAILURE(USER_REQUEST.GET_ALL_USERS_FAILURE, response.data.message))
                    if (failure) {
                        failure()
                    }
                }
            }, error => {
                dispatch(FAILURE(USER_REQUEST.GET_ALL_USERS_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
                if (failure) {
                    failure()
                }
            }
        )
    }
}

export function GETUSER(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.GET_USER_REQUEST))
        getUser(id).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.GET_USER_SUCCESS, response.data.user))
                    if (moveToNext) {
                        moveToNext(response.data.user)
                    }
                }
                else {
                    dispatch(FAILURE(USER_REQUEST.GET_USER_FAILURE, response.data.message))
                    if (failure) {
                        failure(response.data.message)
                    }
                }
            }, error => {
                dispatch(FAILURE(USER_REQUEST.GET_USER_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message))
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message)
                }
            }
        )
    }
}

export function REMOVEUSER(userId, auth, moveToNext) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.REMOVE_USER_REQUEST))
        removeUser(userId, auth).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.REMOVE_USER_SUCCESS, response.data.data))
                    if (moveToNext) {
                        moveToNext()
                    }
                }
                else {
                    dispatch(FAILURE(USER_REQUEST.REMOVE_USER_FAILURE, response.data.message))
                }
            }, error => {
                dispatch(FAILURE(USER_REQUEST.REMOVE_USER_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))
            }
        )
    }
}

export function EDITUSER(userData, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.EDIT_USER_REQUEST));
        editUser(userData).then(

            response => {

                if (response.data.succeeded) {

                    dispatch(SUCCESS(USER_REQUEST.EDIT_USER_SUCCESS, response.data.data));
                    if (moveToNext) {
                        moveToNext();
                    }
                } else {
                    dispatch(FAILURE(USER_REQUEST.EDIT_USER_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(USER_REQUEST.EDIT_USER_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }
            }
        );
    };
};

export function DELETEUSER(id, moveToNext, failure) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.DELETE_USER_REQUEST));
        deleteUser(id).then(
            response => {
                if (response.data.succeeded) {
                    dispatch(SUCCESS(USER_REQUEST.DELETE_USER_SUCCESS, id));
                    if (moveToNext) {
                        moveToNext(id);
                    }
                } else {
                    dispatch(FAILURE(USER_REQUEST.DELETE_USER_FAILURE, response.data.message));
                    if (failure) {
                        failure(response.data.message);
                    }
                }
            },
            error => {
                dispatch(FAILURE(USER_REQUEST.DELETE_USER_FAILURE, error?.response?.data?.message ? error.response.data.message : error.message));
                if (failure) {
                    failure(error?.response?.data?.message ? error.response.data.message : error.message);
                }

            }
        );
    };
}


export function GETUSERBYROLE(role, auth) {
    return dispatch => {
        dispatch(REQUEST(USER_REQUEST.USER_BY_ROLE_REQUEST))

        getUsersByRole(role, auth).then(
            response => {
                if (response.data.succeeded === true) {
                    dispatch(SUCCESS(USER_REQUEST.USER_BY_ROLE_SUCCESS, response.data.data))

                }
                else {
                    dispatch(FAILURE(USER_REQUEST.USER_BY_ROLE_FAILURE, response.data.message))

                }
            }, error => {
                dispatch(FAILURE(USER_REQUEST.USER_BY_ROLE_FAILURE, (error && error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message)))

            }
        )
    }
}
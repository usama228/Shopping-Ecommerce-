import axios from "axios";
import { APP_SETTINGS } from "../../../../config";
import { getAuthHeaders, getFilteredQuery } from "app/assets/genericActions";

export function login(loginData) {
    return axios.post(APP_SETTINGS.API_PATH.USER.login, loginData)
}


export function register(registerData) {
    return axios.post(APP_SETTINGS.API_PATH.USER.register, registerData)
}

export function create(userData) {
    return axios.post(APP_SETTINGS.API_PATH.USER.create, userData)
}

export function removeUser(userId, auth) {
    return axios.delete(`${APP_SETTINGS.API_PATH.USER.remove}/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + auth.token
        },
    })
}
export function getAllUsers(data, auth) {

    return axios.get(`${APP_SETTINGS.API_PATH.USER.getAllUsers}?${getFilteredQuery(data)}`, {
        headers: {
            Authorization: 'Bearer ' + auth.token
        },
    })
}

export function getAllConsumers(data, auth) {

    return axios.get(`${APP_SETTINGS.API_PATH.USER.getAllConsumers}?${getFilteredQuery(data)}`, getAuthHeaders(auth))
}

export function getAllAdmins(data, auth) {

    return axios.get(`${APP_SETTINGS.API_PATH.USER.getAllAdmins}?${getFilteredQuery(data)}`, getAuthHeaders(auth))
}

export function getUser(id) {
    return axios.get(`${APP_SETTINGS.API_PATH.USER.getUser.replace(":id", id)}`)
}

export function editUser(userData) {
    const id = userData.id;
    return axios.put(`${APP_SETTINGS.API_PATH.USER.editUser.replace(":id", id)}`, userData);
}

export function deleteUser(userId) {
    return axios.delete(`${APP_SETTINGS.API_PATH.USER.deleteUser.replace(":id", userId)}`)
}


export function changePassword(userData) {
    return axios.put(`${APP_SETTINGS.API_PATH.USER.changePassword}`, userData)
}
export function logout() {
    return axios.post(`${APP_SETTINGS.API_PATH.USER.logout}`)
}
export function getUsersByRole(role, auth) {
    return axios.get(`${APP_SETTINGS.API_PATH.USER.getUsersByRole}/${role}`, {
        headers: {
            Authorization: 'Bearer ' + auth.token
        }
    })
}
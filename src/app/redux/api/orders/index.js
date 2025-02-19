import axios from "axios";
import { APP_SETTINGS } from "../../../../config";
import { getFilteredQuery } from "app/assets/genericActions";


export function getAllOrders(data, auth) {
    return axios.get(`${APP_SETTINGS.API_PATH.ORDER.getAll}?${getFilteredQuery(data)}`, {
        headers: {
            Authorization: 'Bearer ' + auth.token
        },
    })
}
export function addOrder(data, auth) {
    return axios.post(`${APP_SETTINGS.API_PATH.ORDER.add}`, data, {
        headers: {
            Authorization: 'Bearer ' + auth.token
        },
    })
}
export function getAllItemsAndFabrics(auth) {
    return axios.get(`${APP_SETTINGS.API_PATH.ORDER.getAllItemsAndFabrics}`, {
        headers: {
            Authorization: 'Bearer ' + auth.token
        },
    })
}

// New

export function createPurchaseOrder(orderData) {
    return axios.post(APP_SETTINGS.API_PATH.ORDER.createPurchaseOrder, orderData)
}

export function getAllPurchaseOrders(data, auth) {
    return axios.get(`${APP_SETTINGS.API_PATH.ORDER.getAllPurchaseOrders}?${getFilteredQuery(data)}`)
}

export function getPurchaseOrderById(id) {
    return axios.get(`${APP_SETTINGS.API_PATH.ORDER.getPurchaseOrderById.replace(":id", id)}`)
}

export function updatePurchaseOrder(data) {
    const id = data.id;
    return axios.put(`${APP_SETTINGS.API_PATH.ORDER.updatePurchaseOrder.replace(":id", id)}`, data);
}

export function deletePurchaseOrder(id) {
    return axios.delete(`${APP_SETTINGS.API_PATH.ORDER.deletePurchaseOrder.replace(":id", id)}`)
}
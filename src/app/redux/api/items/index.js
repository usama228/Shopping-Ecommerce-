import axios from "axios";
import { APP_SETTINGS } from "../../../../config";

export function getAllItems() {
    return axios.get(APP_SETTINGS.API_PATH.ITEM.getAll)
}
export function getById(itemId) {
    return axios.get(`${APP_SETTINGS.API_PATH.ITEM.getById}/${itemId}`)
}
export function addItem(itemData) {
    return axios.post(APP_SETTINGS.API_PATH.ITEM.add, itemData)
}
export function editItem(itemData) {
    return axios.patch(APP_SETTINGS.API_PATH.ITEM.edit, itemData)
}
export function removeItem(itemData) {
    return axios.delete(`${APP_SETTINGS.API_PATH.ITEM.delete}/${itemData}`)
}

export function getAllUserItems(userId) {
    return axios.get(APP_SETTINGS.API_PATH.ITEM.userItems.replace(":userId", userId))
}

export function addUserItems(itemData) {
    return axios.post(APP_SETTINGS.API_PATH.ITEM.adduserItems, itemData)
}

export function removeUserItem(itemData) {
    return axios.delete(`${APP_SETTINGS.API_PATH.ITEM.removeUserItems}/${itemData}`)
}
export function getUserAndItemDetails(data) {
    return axios.get(APP_SETTINGS.API_PATH.ITEM.getUserAndItemDetail.replace(":associationId", data.associationId))
}

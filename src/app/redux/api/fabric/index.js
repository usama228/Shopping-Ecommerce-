import axios from "axios";
import { APP_SETTINGS } from "../../../../config";

export function getAllFabrics() {
    return axios.get(APP_SETTINGS.API_PATH.FABRIC.getAll)
}
export function getFabricById(fabricId) {
    return axios.get(`${APP_SETTINGS.API_PATH.FABRIC.getById}/${fabricId}`)
}
export function addFabric(fabricData) {
    return axios.post(APP_SETTINGS.API_PATH.FABRIC.add, fabricData)
}
export function editFabric(fabricData) {
    return axios.put(APP_SETTINGS.API_PATH.FABRIC.edit, fabricData)
}
export function removeFabric(fabricData) {
    return axios.delete(`${APP_SETTINGS.API_PATH.FABRIC.delete}/${fabricData}`)
}
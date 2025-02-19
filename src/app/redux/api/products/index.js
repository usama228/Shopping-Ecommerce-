import axios from "axios";
import { APP_SETTINGS } from "../../../../config";
import { getAuthHeaders, getFilteredQuery } from "app/assets/genericActions";


export function addProduct(productData) {
    return axios.post(APP_SETTINGS.API_PATH.PRODUCT.addProduct, productData)
}
export function createCategory(data) {
    return axios.post(APP_SETTINGS.API_PATH.PRODUCT.createCategory, data)
}
export function createVariant(data) {
    return axios.post(APP_SETTINGS.API_PATH.PRODUCT.createVariant, data)
}

export function getProducts(data, auth) {
    return axios.get(`${APP_SETTINGS.API_PATH.PRODUCT.getProducts}?${getFilteredQuery(data)}`, getAuthHeaders(auth))
}

export function getCategories(data, auth) {
    return axios.get(`${APP_SETTINGS.API_PATH.PRODUCT.getCategories}?${getFilteredQuery(data)}`, getAuthHeaders(auth))
}

export function getProductById(id) {
    return axios.get(`${APP_SETTINGS.API_PATH.PRODUCT.getProductById.replace(":id", id)}`)
}

export function editProduct(userData) {
    const id = userData.id;
    return axios.put(`${APP_SETTINGS.API_PATH.PRODUCT.editProduct.replace(":id", id)}`, userData);
}

export function deleteProduct(userId) {
    return axios.delete(`${APP_SETTINGS.API_PATH.PRODUCT.deleteProduct.replace(":id", userId)}`)
}

export function getCategoryById(id) {
    return axios.get(`${APP_SETTINGS.API_PATH.PRODUCT.getCategoryById.replace(":id", id)}`)
}

export function updateCategory(userData) {
    const id = userData.id;
    return axios.put(`${APP_SETTINGS.API_PATH.PRODUCT.updateCategory.replace(":id", id)}`, userData);
}

export function deleteCategory(userId) {
    return axios.delete(`${APP_SETTINGS.API_PATH.PRODUCT.deleteCategory.replace(":id", userId)}`)
}


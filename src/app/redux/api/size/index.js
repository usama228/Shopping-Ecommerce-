import axios from "axios";
import { APP_SETTINGS } from "../../../../config";

export function addSize(sizeData, auth) {
    return axios.post(APP_SETTINGS.API_PATH.SIZE.add, sizeData, {
        headers: {
            Authorization: 'Bearer ' + auth.token
        },
    })
}
export function editSize(sizeData, auth) {
    return axios.put(`${APP_SETTINGS.API_PATH.SIZE.edit}/${sizeData.sizeId}`, sizeData, {
        headers: {
            Authorization: 'Bearer ' + auth.token
        },
    })
}
export function getSizesByItemIdAndUserId(sizeData, auth) {
    return axios.get(APP_SETTINGS.API_PATH.SIZE.getSizesByItemIdAndUserId.replace(':itemId', sizeData.itemId).replace(':userId', sizeData.userId), {
        headers: {
            Authorization: 'Bearer ' + auth.token
        },
    })
}
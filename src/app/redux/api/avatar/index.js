import axios from "axios";
import { APP_SETTINGS } from "../../../../config";
export function addImage(avatarData) {
    return axios.post(APP_SETTINGS.API_PATH.AVATAR.addImage, avatarData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
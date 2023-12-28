import { SHIFT_URL } from "../constants/apiConstants";
import { doApiGet, doApiMethod } from "./apiService.ts";
import { toast } from "react-toastify";

export async function getShiftsByOutpostId(outpostId) {
    let url = SHIFT_URL + "/outpost/" + outpostId;
    try {
        let resp = await doApiGet(url);
        if (resp.status === 200) {
            return resp.data;
        }
        else toast.error(resp.message);
    }
    catch (err) {
        console.log(err);
        toast.error("יש בעיה בבקשה נסה מאוחר יותר");
    }
}


export async function deleteShift(shiftId) {
    let url = SHIFT_URL + "/" + shiftId;
    try {
        let resp = await doApiMethod(url, "DELETE");
        if (resp.status === 200) {
            return resp.data;
        }
    }
    catch (err) {
        console.log(err);
    }
}

export async function createOrUpdateShift(bodyFormData, method = "POST") {
    try {
        let resp = await doApiMethod(SHIFT_URL, method, bodyFormData);
        if (resp.status >= 200 && resp.status < 300) {
            return resp.data;
        } else {
            toast.error(resp.message);
        }

    } catch (err) {
        throw err;
    }
}
import { SHIFT_URL } from "../constants/apiConstants";
import { doApiGet, doApiMethod } from "./apiService";
import { toast } from "react-toastify";

export async function getShiftsByOutpostId(outpostId) {
    let url = SHIFT_URL + "/outpost/" + outpostId;
    try {
        let resp = await doApiGet(url);
        if (resp.status === 200) {
            // console.log(resp.data);
            return resp.data;
        }
        else toast.error(resp.message);
    }
    catch (err) {
        console.log(err);
        toast.error("יש בעיה בבקשה נסה מאוחר יותר");
    }
}


export async function createOrUpdateShift(bodyFormData, method, getValues, item) {
    try {
        let resp = await doApiMethod(SHIFT_URL, method, bodyFormData);
        if (resp.status === 201 && method === "POST")
            toast.success(`משמרת ${getValues('dayId')} נוספה בהצלחה`);
        else if (resp.status === 200 && method === "PUT")
            toast.success(`משמרת ${item.dayId} התעדכנה בהצלחה`);
        else toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
  
    } catch (err) {
        console.error(`An error occurred while ${method} משמרת`, err);
        toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
        throw err;
    }
}
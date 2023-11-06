import { CAMP_URL } from "../constants/apiConstants";
import { doApiGet, doApiMethod } from "./apiService";
import { toast } from "react-toastify";

export async function getCamps() {
    let url = CAMP_URL + "/all"
    try {
        let resp = await doApiGet(url);
        return resp.data
    }
    catch (err) {
        console.log(err);
        toast.error("יש בעיה בבקשה נסה מאוחר יותר");
    }
}

export async function createOrUpdateCamp(bodyFormData, method, getValues, item) {
    try {
        let resp = await doApiMethod(CAMP_URL, method, bodyFormData);
        if (resp.status === 201 && method === "POST")
            toast.success(`בסיס ${getValues('dayId')} נוסף בהצלחה`);
        else if (resp.status === 200 && method === "PUT")
            toast.success(`בסיס ${item.dayId} התעדכן בהצלחה`);
        else toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
  
    } catch (err) {
        console.error(`An error occurred while ${method} בסיס`, err);
        toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
        throw err;
    }
}
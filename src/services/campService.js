import { toast } from "react-toastify";
import { CAMP_URL } from "../constants/apiConstants";
import { doApiGet, doApiMethod } from "./apiService.ts";

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

export async function createOrUpdateCamp(bodyFormData, method, prevItemForUpdate) {
    try {
        let resp = await doApiMethod(CAMP_URL, method, bodyFormData);
        if (resp.status === 201 && method === "POST")
            toast.success(`בסיס ${resp.data.name} נוסף בהצלחה`);
        else if (resp.status === 200 && method === "PUT")
            toast.success(`בסיס ${prevItemForUpdate.name} התעדכן בהצלחה`);
        else toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
    } catch (err) {
        console.error(`An error occurred while ${method} בסיס`, err);
        toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
        throw err;
    }
}
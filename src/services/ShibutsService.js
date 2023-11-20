import { SHIBUTS_URL } from "../constants/apiConstants";
import { doApiGet, doApiMethod } from "./apiService";
import { toast } from "react-toastify";
import { formatDate, getTimeStr } from "../lib/utils/dateUtils";

export async function createOrUpdateShibuts(bodyFormData) {
    try {
        let resp = await doApiMethod(SHIBUTS_URL, "PUT", bodyFormData);
        if (resp.status === 200)
            toast.success(`שיבוץ של ${bodyFormData.guardName} בעמדה ${bodyFormData.outpostName} בשעות 
                            ${getTimeStr(bodyFormData.start.getHours())} - ${getTimeStr(bodyFormData.end.getHours())} נשמר בהצלחה`);
        else toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
  
    } catch (err) {
        console.error(err);
        toast.error("יש בעיה בשמירת השיבוץ, בבקשה נסה מאוחר יותר");
        throw err;
    }
}

export async function getShibutsimOfCurrentWeekByCampId(campId) {
    let curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6
    let firstday = formatDate(new Date(curr.setDate(first)),'ddMMyyyy');
    let lastday = formatDate(new Date(curr.setDate(last)),'ddMMyyyy');
    let url = SHIBUTS_URL + "/" + campId + "/" + firstday + "/" + lastday;
    try {
        let resp = await doApiGet(url);
        if (resp.status === 200) {
            return resp.data;
        }
        else toast.error(resp.message);
    }
    catch (err) {
        console.log(err);
        toast.error("יש בעיה בשליפת בשיבוצים נסה מאוחר יותר");
    }
}

export async function deleteShibuts(shibutsId){
    let url = SHIBUTS_URL + "/" + shibutsId;
    try {
        let resp = await doApiMethod(url, "DELETE");
        if (resp.status === 200) {
            toast.success(`מחיקת שיבוץ בוצעה בהצלחה`);
        }
        else toast.error(resp.message);
    }
    catch (err) {
        console.log(err);
        toast.error("יש בעיה במחיקה נסה מאוחר יותר");
    }
}



import { SHIBUTS_URL } from "../constants/apiConstants";
import { doApiGet, doApiMethod } from "./apiService";
import { toast } from "react-toastify";
import { formatDate, getTimeStr, getFirstDayAndLastDayOfCurrentWeek } from "../utils/dateUtils";

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
    let firstAndLastDays = getFirstDayAndLastDayOfCurrentWeek();
    let url = SHIBUTS_URL + "/" + campId + "/" + firstAndLastDays.first + "/" + firstAndLastDays.last;
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

export async function getAutoShibutsimOfCurrentWeekByCampId(campId) {
    let firstAndLastDays = getFirstDayAndLastDayOfCurrentWeek();
    let currentDay = formatDate(new Date(), 'ddMMyyyy');
    let url = SHIBUTS_URL + "/create/" + campId + "/" + currentDay + "/" + firstAndLastDays.last;
    try {
        let resp = await doApiGet(url);
        if (resp.status === 200) {
            return resp.data;
        }
        else toast.error(resp.message);
    }
    catch (err) {
        console.log(err);
        toast.error("יש בעיה בשיבוץ האוטומטי, נסה מאוחר יותר");
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



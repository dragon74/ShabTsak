import { OUTPOST_URL } from "../constants/apiConstants";
import { doApiGet, doApiMethod } from "./apiService";
import { toast } from "react-toastify";

export async function getOutpostsByCampId(campId) {
    let url = OUTPOST_URL + "/camp/" + campId;
    try {
        let resp = await doApiGet(url);
        if (resp.status === 200) {
            console.log(resp.data);
            return resp.data;
        }
        else {
            toast.error(resp.message);
        }
    }
    catch (err) {
        console.log(err);
        toast.error("יש בעיה בבקשה נסה מאוחר יותר");
    }
}

export async function postOrPutOutpost(bodyFormData, method, getValues, item, reset, setOpenDialog, queryClient) {
    try {
        let resp = await doApiMethod(OUTPOST_URL, method, bodyFormData);
        if (resp.status === 201 && method === "POST")
            toast.success(`בסיס ${getValues('name')} נוסף בהצלחה`);
        else if (resp.status === 200 && method === "PUT")
            toast.success(`בסיס ${item.name} התעדכן בהצלחה`);
        else toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
        //  clear the camp query 
        queryClient.invalidateQueries(['outposts'])
        setOpenDialog(false);
        reset();
    } catch (err) {
        console.error(`An error occurred while ${method} בסיס`, err);
        toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
    }
}
import { OUTPOST_URL } from "../constants/apiConstants";
import { doApiGet } from "./apiService";
import { toast } from "react-toastify";

export const getOutpostsByCampId = async (campId) => {
    return doApiGet(`${OUTPOST_URL}/camp/${campId}`)
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                console.log(error);
                toast.error("יש בעיה בבקשה נסה מאוחר יותר");
            });
          
};
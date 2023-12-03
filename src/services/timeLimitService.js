import { doApiGet, doApiMethod } from "@/services/apiService.ts";
import { GUARD_TIMELIMIT_URL } from "@/constants/apiConstants.js";
import { toast } from "react-toastify";

export const deleteTimeLimit = async (timeLimitId) => {
  try {
    let resp = await doApiMethod(`${GUARD_TIMELIMIT_URL}/${timeLimitId}`, "DELETE");
    if (resp.status === 200) {
      toast.success(`מחיקת הגבלה בוצעה בהצלחה`);
    } else toast.error(resp.message);
  } catch (err) {
    console.log(err);
    toast.error("יש בעיה במחיקה נסה מאוחר יותר");
  }
};

export const createTimeLimit = async (timeLimit) => {
  try {
    let resp = await doApiMethod(GUARD_TIMELIMIT_URL, "POST", timeLimit);
    if (resp.status === 201) toast.success("הגבלת זמן נוספה בהצלחה!");
    return resp;
  } catch (err) {
    console.error(`An error occurred`, err);
    toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
    throw err;
  }
};

export const getGuardTimeLimits = (guardId) => {
  return doApiGet(`${GUARD_TIMELIMIT_URL}/guard/${guardId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      toast.error("Failed to fetch guard details. Please try again.");
    });
};

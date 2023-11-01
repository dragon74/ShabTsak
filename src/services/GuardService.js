import { GUARD_URL } from "../constants/apiConstants";
import { doApiGet } from "./apiService";
import { toast } from "react-toastify";

const GuardService = {
  getGuardsByCampId(campId) {
    return doApiGet(`${GUARD_URL}/camp/${campId}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Error fetching guards for the selected camp.");
      });
  },
  getGuardDetails(guardId) {
    return doApiGet(`${GUARD_URL}/${guardId}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch guard details. Please try again.");
      });
  },
};

export default GuardService;

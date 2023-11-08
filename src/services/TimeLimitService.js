import { doApiGet, doApiMethod } from "@/services/apiService.js";
import { GUARD_TIMELIMIT_URL } from "@/constants/apiConstants.js";
import { toast } from "react-toastify";

const TimeLimitService = {
  deleteTimeLimit(timeLimitId) {
    return doApiMethod(`${GUARD_TIMELIMIT_URL}/${timeLimitId}`, "DELETE").catch((err) => {
      console.error("Error deleting time limit:", err);
    });
  },
  createTimeLimit(timeLimit) {
    return doApiMethod(GUARD_TIMELIMIT_URL, timeLimit, "POST");
  },
  getGuardTimeLimits(guardId) {
    return doApiGet(`${GUARD_TIMELIMIT_URL}/guard/${guardId}`)
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

export default TimeLimitService;

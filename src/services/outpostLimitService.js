import { doApiMethod, doApiGet } from "@/services/apiService.ts";
import { GUARD_OUTPOST_URL } from "@/constants/apiConstants.js";

export const getGuardOutpostLimitByGuardId = async (guardId, campId) => {
  try {
    const response = await doApiGet(`${GUARD_OUTPOST_URL}/guard/${guardId}/${campId}`);
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch outpost limit");
  }
};

export const createGuardOutpostLimit = async (guardId, campId, outpostId) => {
  const payload = {
    campId,
    guardId,
    outpostId,
  };

  try {
    const response = await doApiMethod(GUARD_OUTPOST_URL, "POST", payload);
    return response;
  } catch (error) {
    // Handle the error or rethrow it if necessary
    console.error("Error creating guard outpost limit:", error);
    throw error;
  }
};

export const deleteOutpostLimit = (outpostLimitId) => {
  return doApiMethod(`${GUARD_OUTPOST_URL}/${outpostLimitId}`, "DELETE");
};

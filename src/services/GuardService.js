import { GUARD_URL } from "../constants/apiConstants";
import { doApiGet, doApiMethod } from "./apiService";
import { toast } from "react-toastify";

const handleApiError = (error, errorMessage) => {
  console.error(error);
  toast.error(errorMessage);
  throw new Error(errorMessage);
};

export async function getGuardsByCampId(campId) {
  try {
    const res = await doApiGet(`${GUARD_URL}/camp/${campId}`);
    return res.data;
  } catch (error) {
    handleApiError(error, "Error fetching guards for the selected camp.");
  }
}

export async function getGuardDetails(guardId) {
  try {
    const res = await doApiGet(`${GUARD_URL}/${guardId}`);
    return res.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch guard details. Please try again.");
  }
}

export async function deleteGuard(guardId) {
  try {
    return await doApiMethod(`${GUARD_URL}/${guardId}`, "DELETE");
  } catch (error) {
    handleApiError(error, "Failed to delete guard. Please try again.");
  }
}

export async function addNewGuard(newGuardDetails) {
  try {
    return await doApiMethod(GUARD_URL, "POST", newGuardDetails);
  } catch (error) {
    handleApiError(error, "Failed to add a new guard. Please try again.");
  }
}

export async function updateGuard(guardDetails) {
  try {
    return await doApiMethod(GUARD_URL, "PUT", guardDetails);
  } catch (error) {
    handleApiError(error, "Failed to update guard. Please try again.");
  }
}

export async function getGuardsAndLimitsForCampId(campId) {
  try {
    const res = await doApiGet(`${GUARD_URL}/all/full/${campId}`);
    return res.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch guard details and limits. Please try again.");
  }
}

// Exporting the handleApiError function for reuse if needed
export { handleApiError };

import md5 from "md5";
import dayjs from 'dayjs';
export function getGravatarUrl(email) {
  const base = "https://www.gravatar.com/avatar/";
  const formattedEmail = (email || "").trim().toLowerCase();
  const hash = md5(formattedEmail);
  return `${base}${hash}?d=identicon`;
}
export const getDayName = (dayId) => {
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  return days[dayId];
};

dayjs
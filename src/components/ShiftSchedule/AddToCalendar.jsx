import { toast } from "react-toastify";
import { Button } from "@mobiscroll/react";

const formatToISOString = (date) => date.toISOString().replace(/[-:.]/g, "");

const AddToCalendar = ({ shibuts = {}, guards, outposts }) => {
  if (!shibuts.campId) {
    toast.error("אנא בחר מחנה לפני הוספת האירוע ליומן");
    return;
  }

  if (!shibuts || Object.keys(shibuts).length === 0) {
    toast.error("אין נתוני שיבוצים זמינים להוספה ליומן");
    return;
  }

  const addToGoogleCalendar = () => {
    const { guardId, guardName, start, end, outpostId } = shibuts;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const startTime = formatToISOString(startDate);
    const endTime = formatToISOString(endDate);

    const guard = guards.find((g) => g.value === guardId);
    const outpost = outposts.find((o) => o.id === outpostId);

    if (!guard) {
      throw new Error("שומר לא נמצא עבור השיבוץ");
    }

    const eventLink = `https://www.google.com/calendar/event?action=TEMPLATE&text=משמרת+לשומר+${guardName}&dates=${startTime}/${endTime}&details=שומר:+${guardName}%0Aעמדה:+${outpost.name}%0Aאימייל:+${guard.guardMail}%0Aטלפון:+${guard.guardPhone}&add=${guard.guardMail}`;
    window.open(eventLink, "_blank");

    toast.success("קישור לאירוע ביומן של גוגל נוצר בהצלחה");
  };

  return (
    <Button className="mbsc-button-block" variant="outline" onClick={addToGoogleCalendar}>
      <span className="mbsc-font-icon mbsc-icon-line-calendar" style={{ margin: 5 }} />
      <span>הוספה ליומן</span>
    </Button>
  );
};

export default AddToCalendar;

// Import necessary libraries and components
import { toast } from "react-toastify";
import { Button } from "@mobiscroll/react";

// AddToCalendar component
const AddToCalendar = ({ shibuts, guards, outposts }) => {
  const addToGoogleCalendar = () => {
    if (!shibuts.campId) {
      toast.error("אנא בחר מחנה לפני הוספת האירוע ליומן");
      return;
    }

    if (!shibuts || Object.keys(shibuts).length === 0) {
      toast.error("אין נתוני שיבוצים זמינים להוספה ליומן");
      return;
    }

    const startDate = new Date(shibuts.start);
    const endDate = new Date(shibuts.end);

    const startTime = startDate.toISOString().replace(/[-:.]/g, "");
    const endTime = endDate.toISOString().replace(/[-:.]/g, "");

    const guard = guards.find((g) => g.value === shibuts.guardId);
    const outpost = outposts.find((o) => o.id === shibuts.outpostId);

    if (guard) {
      const eventLink = `https://www.google.com/calendar/event?action=TEMPLATE&text=משמרת+לשומר+${shibuts.guardName}&dates=${startTime}/${endTime}&details=שומר:+${shibuts.guardName},+עמדה:+${outpost.name},+אימייל:+${guard.guardMail},+טלפון:+${guard.guardPhone}`;
      window.open(eventLink, "_blank");
    } else {
      console.error("שומר לא נמצא עבור שיבוץ:", shibuts);
      toast.error("שגיאה: שומר לא נמצא עבור השיבוץ");
      return;
    }

    toast.success("קישור לאירוע ביומן של גוגל נוצר בהצלחה");
  };

  return (
    <Button className="mbsc-button-block" variant="outline" onClick={addToGoogleCalendar}>
      <span className="mbsc-font-icon mbsc-icon-line-calendar" style={{ margin: 5 }} />
      הוספה ליומן
    </Button>
  );
};

export default AddToCalendar;

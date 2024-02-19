import { useState, useMemo, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, setOptions, Popup, Button, Select, formatDate, localeHe, Datepicker } from "@mobiscroll/react";
import { getOutpostsAndShiftsForCampId } from "@/services/outpostService.js";
import { createOrUpdateShibuts, getShibutsimOfCurrentWeekByCampId, deleteShibuts, getAutoShibutsimOfCurrentWeekByCampId, deleteAutoShibutsim } from "@/services/shibutsService.js";
import { useQuery, useQueryClient } from "react-query";
import SelectCamp from "components/general_comps/SelectCamp.jsx";
import { getTimeStr, getDayStr, getDayNumber, getHourNumber, getDateAndTime } from "../../utils/dateUtils";
import { toast } from "react-toastify";
import LoadingComp from "../general_comps/LoadingComp.jsx";
import { getGuardsAndLimitsForCampId } from "@/services/guardService.js";
import AddToCalendar from "./AddToCalendar";

setOptions({
  locale: localeHe,
  theme: "ios",
  themeVariant: "light",
});

const responsivePopup = {
  medium: {
    display: "center",
    width: 400,
    fullScreen: false,
    touchUi: false,
    showOverlay: false,
  },
};

function useLoading() {
  const [isLoading, setLoading] = useState(false);

  // Function to wrap around API calls and manage loading state
  const withLoading = async (apiCall) => {
    setLoading(true);
    try {
      const response = await apiCall();
      return response; // Return API response
    } finally {
      setLoading(false);
    }
  };

  return [isLoading, withLoading];
}

function ShiftSchedule() {
  const queryClient = useQueryClient();
  const [headerText, setHeader] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [tempShibuts, setTempShibuts] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [campId, setCampId] = useState(null);
  const [autoShibutsDates, setAutoShibutsDates] = useState(null);
  const [isLoading, withLoading] = useLoading();

  const colors = useMemo(() => {
    return ["red", "green", "blue", "yellow", "orange", "purple", "navy", "maroon", "olive", "silver"];
  }, []);

  const shiftsCssClasses = useMemo(() => {
    return ["md-g-stripes-bg", "md-r-stripes-bg", "md-y-stripes-bg"];
  }, []);

  const view = useMemo(() => {
    return {
      timeline: {
        type: "day",
        startDay: 0,
        endDay: 7,
      },
    };
  }, []);

  const { isLoading: guardsLoading, data: guards } = useQuery({
    queryKey: ["guardsAndLimits", campId],
    queryFn: () => getGuardsAndLimitsForCampId(campId),
    enabled: !!campId,
    select: (data) => {
      let mappedGuards = data;
      if (data.length > 0) {
        mappedGuards = data.map((g) => ({
          value: g.guard.id,
          text: g.guard.name,
          guardPhone: g.guard.phone,
          guardMail: g.guard.mail,
          color: colors[g.guard.id % 10],
          outpostLimits: g.outpostLimits,
          timeLimits: g.timeLimits,
        }));
      }
      console.log("GuardsPage", mappedGuards);
      return mappedGuards;
    },
  });

  const { isLoading: outpostsLoading, data: outposts } = useQuery({
    queryKey: ["outpostsAndShifts", campId],
    queryFn: () => getOutpostsAndShiftsForCampId(campId),
    enabled: !!campId,
    select: (data) => {
      return data.map((o) => o.outpost);
    },
  });

  const { isLoading: shiftsLoading, data: shifts } = useQuery({
    queryKey: ["outpostsAndShifts", campId],
    enabled: false,
    select: (data) => {
      const allMappendShifts = [];
      if (data.length > 0) {
        data.forEach(({ shifts }) => {
          if (shifts.length > 0) {
            const mappedShifts = shifts.map((s, index) => ({
              id: s.id,
              start: getTimeStr(s.fromHour),
              end: getTimeStr(s.toHour),
              resource: s.outpostId,
              recurring: {
                repeat: "weekly",
                weekDays: getDayStr(s.dayId),
              },
              cssClass: shiftsCssClasses[index % 3],
            }));
            allMappendShifts.push(...mappedShifts);
          }
        });
      }
      return allMappendShifts;
    },
  });

  const { isLoading: shibutsimLoading, data: shibutsim } = useQuery({
    queryKey: ["shibutsim", campId],
    queryFn: () => (getShibutsimOfCurrentWeekByCampId(campId, autoShibutsDates)),
    enabled: !!campId && !!outposts && !!guards && !!shifts,
    select: (data) => {
      let mappedShibutsim = [];
      if (data.length > 0) {
        mappedShibutsim = mapShibutsim(data);
      }
      return mappedShibutsim;
    },
  });

  const mapShibutsim = useCallback( (shibutsim) => {
    return shibutsim.map((s) => {
      const { id, ...copiedShibuts } = s;
      const shift = shifts.find((sh) => sh.id == s.shiftId);
      const guard = guards.find((g) => g.value == s.guardId);
      const updatedShibuts = {
        ...copiedShibuts,
        shibutsId: id,
        start: getDateAndTime(s.theDate, shift.start),
        end: getDateAndTime(s.theDate, shift.end, true),
        guardName: guard.text,
        resource: s.outpostId,
        color: guard.color,
      };
      return updatedShibuts;
    });
  });

  const findClosestShift = useCallback(
    (outpost, start) => {
      let shift = shifts.filter((s) => s.resource == outpost && getDayNumber(s.recurring.weekDays) == start.getDay() && getHourNumber(s.start) <= new Date(start).getHours() && getHourNumber(s.end, true) >= new Date(start).getHours());
      if (shift.length > 1) {
        return shift.reduce((prev, current) => (prev && getHourNumber(prev.start) > getHourNumber(current.start) ? prev : current));
      }
      return shift[0];
    },
    [shifts]
  );

  const checkTimeLimit = useCallback((guard, shibuts) => {
    let hasTimeLimit = false;
    const shibutsStart = shibuts.start.getHours();
    const shibutsEnd = shibuts.end.getHours();
    if (guard.timeLimits.length > 0) {
      const limits = guard.timeLimits.filter((t) => t.dayId == shibuts.start.getDay() && !((t.fromHour <= shibutsStart && t.toHour <= shibutsStart) || (t.fromHour >= shibutsEnd && t.toHour >= shibutsEnd)));
      if (limits.length > 0) {
        hasTimeLimit = true;
      }
    }
    return hasTimeLimit;
  }, []);

  const checkOutpostLimit = useCallback((guard, shibuts) => {
    let hasOutpostLimit = false;
    if (guard.outpostLimits.length > 0) {
      const limits = guard.outpostLimits.filter((o) => o.outpostId == shibuts.resource);
      if (limits.length > 0) {
        hasOutpostLimit = true;
      }
    }
    return hasOutpostLimit;
  }, []);

  const checkGuardHasLimits = useCallback(
    (guard, shibuts) => {
      let hasLimits = false;
      const hasTimeLimit = checkTimeLimit(guard, shibuts);
      const hasOutpostLimit = checkOutpostLimit(guard, shibuts);
      if (hasTimeLimit) {
        toast.error("שומר " + guard.text + " אינו יכול לשמור בשעות אלו");
        hasLimits = true;
      }
      if (hasOutpostLimit) {
        const outpost = outposts.find((o) => {
          return o.id === shibuts.outpostId;
        });
        toast.error("שומר " + guard.text + " לא יכול לשמור בעמדה " + outpost.name);
        hasLimits = true;
      }
      return hasLimits;
    },
    [checkOutpostLimit, checkTimeLimit, outposts]
  );

  const checkExistinShibuts = useCallback(
    (shibuts) => {
      const existShibuts = shibutsim.filter((s) => s.guardId == shibuts.guardId && s.shiftId == shibuts.shiftId && s.outpostId == shibuts.outpostId && s.start.getTime() == shibuts.start.getTime());
      if (existShibuts.length > 0) {
        //same shibuts
        if (shibuts.shibutsId == existShibuts[0].shibutsId) {
          return true;
        }
        const outpostName = outposts.find((o) => o.id == shibuts.outpostId).name;
        toast.error(`כבר קיים שיבוץ ל ${existShibuts[0].guardName} בעמדה ${outpostName} בשעה ${getTimeStr(existShibuts[0].end.getHours())}`);
        return true;
      }
      return false;
    },
    [shibutsim, outposts]
  );

  const onClose = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const myDefaultShibuts = useCallback(
    (args) => {
      const shift = findClosestShift(args.resource, args.start);
      if (shift != undefined) {
        const start = new Date(args.start.setHours(getHourNumber(shift.start)));
        const end = new Date(args.start.setHours(getHourNumber(shift.end, true)));
        setEdit(false);
        return {
          start: start,
          end: end,
          guardName: "",
          guardId: "",
          shiftId: shift.id,
          outpostId: args.resource,
          resource: args.resource,
          campId: campId,
          color: "#ff0000",
        };
      }
    },
    [findClosestShift, shibutsim]
  );

  const onShibutsClick = useCallback(
    (args) => {
      const shibuts = args.event;
      const outpost = outposts.find((o) => {
        return o.id === shibuts.resource;
      });
      shibuts.outpostId = shibuts.resource;
      setHeader("<div>שינוי שומר  " + shibuts.guardName + " בעמדה " + outpost.name + '</div><div class="employee-shifts-day">' + formatDate("HH:mm", new Date(shibuts.start)) + " עד " + formatDate("HH:mm", new Date(shibuts.end)) + "</div>");
      setEdit(true);
      setTempShibuts({ ...shibuts });
      setPopupOpen(true);
    },
    [outposts]
  );

  const onDeleteClick = useCallback(async () => {
    await withLoading(()=>deleteShibuts(tempShibuts.shibutsId));
    queryClient.invalidateQueries(["shibutsim"]);
    setPopupOpen(false);
  }, [tempShibuts]);

  const onShibutsCreate = useCallback(
    (args) => {
      const shibuts = args.event;
      if (shibuts.shiftId == undefined) {
        toast.error("אין משמרות בזמן זה");
        return false;
      } else {
        const outpost = outposts.find((o) => {
          return o.id === shibuts.resource;
        });
        shibuts.outpostId = outpost.id;
        setHeader("<div>משמרת חדשה בעמדה " + outpost.name + '</div><div class="employee-shifts-day">' + formatDate("HH:mm", shibuts.start) + " עד " + formatDate("HH:mm", shibuts.end) + "</div>");
        setTempShibuts(shibuts);
        setPopupOpen(true);
      }
    },
    [outposts, shibutsim]
  );

  const saveShibuts = useCallback(
    async (shibutsToSave) => {
      const outpostName = outposts.find((o) => o.id == shibutsToSave.outpostId).name;
      const isExistingShibuts = checkExistinShibuts(shibutsToSave);
      if (shibutsToSave.guardId != 0 && !isExistingShibuts) {
        shibutsToSave.campId = campId;
        shibutsToSave.theDate = shibutsToSave.start.getTime();
        shibutsToSave.outpostName = outpostName;
        shibutsToSave.id = shibutsToSave.shibutsId;
        await withLoading(()=>createOrUpdateShibuts(shibutsToSave));
        queryClient.invalidateQueries(["shibutsim"]);
      }
      onClose();
    },
    [outposts, shibutsim, tempShibuts, checkExistinShibuts, campId]
  );

  const onShibutsMove = useCallback(
    (obj) => {
      let shibuts = { ...obj.event };
      let shift = findClosestShift(shibuts.resource, shibuts.start);
      if (shift !== undefined) {
        const guard = guards.find((g) => g.value == shibuts.guardId);
        const guardHasLimits = checkGuardHasLimits(guard, shibuts);
        if (guardHasLimits) return false;
        shibuts.start.setHours(getHourNumber(shift.start), 0, 0);
        shibuts.end.setHours(getHourNumber(shift.end), 0, 0);
        shibuts.outpostId = shibuts.resource;
        shibuts.shiftId = shift.id;
        setTempShibuts(shibuts);
        saveShibuts(shibuts);
      } else {
        toast.error("אין משמרות בזמן זה בעמדה זו");
        return false;
      }
    },
    [findClosestShift, checkGuardHasLimits, guards, outposts, shibutsim]
  );

  const popupButtons = useMemo(() => {
    if (isEdit) {
      return [
        "cancel",
        {
          handler: () => {
            saveShibuts(tempShibuts);
          },
          keyCode: "enter",
          text: "שמירה",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    } else {
      return [
        "cancel",
        {
          handler: () => {
            saveShibuts(tempShibuts);
          },
          keyCode: "enter",
          text: "הוספה",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    }
  }, [tempShibuts]);

  const myCustomShibuts = useCallback((args) => {
    return (
      <div>
        <div className="md-timetable-event-title">{args.original.guardName}</div>
      </div>
    );
  }, []);

  const onGuardChange = useCallback(
    (selectedGuard) => {
      const guard = guards.find((g) => g.value == selectedGuard.value);
      if (!checkGuardHasLimits(guard, tempShibuts)) {
        setTempShibuts({
          ...tempShibuts,
          guardName: selectedGuard.valueText,
          guardId: selectedGuard.value,
          color: guards.find((g) => g.value === selectedGuard.value).color,
        });
      }
    },
    [tempShibuts, guards, checkGuardHasLimits]
  );

  const onAutoShibutsClick = useCallback( async () => {
    if(autoShibutsDates){
      await withLoading(()=>getAutoShibutsimOfCurrentWeekByCampId(campId, autoShibutsDates));
      queryClient.invalidateQueries("shibutsim");
    }else{
      toast.error("נא לבחור תאריכים לשיבוץ אוטומטי")
    }
  }, [autoShibutsDates]);

  const onDeleteAutoShibutsClick = useCallback( async () => {
    if(autoShibutsDates){
      await withLoading(()=>deleteAutoShibutsim(campId, autoShibutsDates));
      queryClient.invalidateQueries("shibutsim");
    }else{
      toast.error("נא לבחור תאריכים לשיבוץ אוטומטי למחיקה")
    }
    
  }, [autoShibutsDates, campId]);

  const autoShibutsDatesChange = (ev) => {
    setAutoShibutsDates(ev.value);
}

  return (
    <div>
      <SelectCamp setSelectedCampId={setCampId} selectedCampId={campId} title={"שיבוץ שמירות"} title2={"בבסיס:"} />
      <Datepicker
          select="range"
          inputComponent="input"
          inputProps={{
              placeholder: 'בחירת תאריכים לשיבוץ',
              style: {"line-height": "2.5"}
          }}
          value={autoShibutsDates}
          onChange={autoShibutsDatesChange}
          min={new Date()}
      />
      <Button className="mbsc-button " color="info" onClick={onAutoShibutsClick}>
        שיבוץ אוטומטי
      </Button>
      <Button className="mbsc-button" color="danger" onClick={onDeleteAutoShibutsClick}>
        מחיקת שיבוצים
      </Button>
      {isLoading || guardsLoading || outpostsLoading || shiftsLoading || shibutsimLoading ? (
        <LoadingComp />
      ) : (
        <>
          <Eventcalendar className="md-timetable" view={view} data={shibutsim} resources={outposts} extendDefaultEvent={myDefaultShibuts} renderScheduleEventContent={myCustomShibuts} onEventUpdate={onShibutsMove} clickToCreate={true} dragToCreat={true} dragToMove={true} dragTimeStep={15} eventDelete={true} onEventClick={onShibutsClick} onEventCreate={onShibutsCreate} colors={shifts} />

          <Popup display="bottom" fullScreen={true} contentPadding={false} headerText={headerText} buttons={popupButtons} isOpen={isPopupOpen} onClose={onClose} responsive={responsivePopup} cssClass="employee-shifts-popup">
            <div className="mbsc-form-group">
              <Select data={guards} onChange={onGuardChange} label="בחירת שומר" />
            </div>
            {isEdit && (
              <div className="mbsc-button-group">
                <AddToCalendar shibuts={tempShibuts} guards={guards} outposts={outposts} />
                <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>
                  <span className="mbsc-font-icon mbsc-icon-remove" style={{ margin: 5 }} />
                  <span>מחיקת משמרת</span>
                </Button>
              </div>
            )}
          </Popup>
        </>
      )}
    </div>
  );
}

export default ShiftSchedule;

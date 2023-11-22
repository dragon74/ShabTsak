import {useState, useMemo, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {Eventcalendar, setOptions, Popup, Button, Select, formatDate, localeHe} from '@mobiscroll/react';
import GuardService from "@/services/GuardService.js";
import { getOutpostsAndShiftsForCampId } from "@/services/OutpostService";
import { createOrUpdateShibuts, getShibutsimOfCurrentWeekByCampId, deleteShibuts, getAutoShibutsimOfCurrentWeekByCampId } from "@/services/ShibutsService";
import { useQuery, useQueryClient } from "react-query";
import SelectCamp from "components/general_comps/selectCamp.jsx";
import { getTimeStr, getDayStr, getDayNumber, getHourNumber, getDateAndTime } from "../../utils/dateUtils";
import { toast } from "react-toastify";
import LoadingComp from "../general_comps/loadingComp";

setOptions({
    locale: localeHe,
    theme: 'ios',
    themeVariant: 'light'
});

const responsivePopup = {
    medium: {
        display: 'center',
        width: 400,
        fullScreen: false,
        touchUi: false,
        showOverlay: false
    }
};

function ShiftSchedule() {
    const queryClient = useQueryClient();
    const [headerText, setHeader] = useState('');
    const [isEdit, setEdit] = useState(false);
    const [tempShibuts, setTempShibuts] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [campId, setCampId] = useState(null);
    const [isAutoShibutsim, setIsAutoShibutsim] = useState(false);

    const colors = useMemo(() => {
        return [
            'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'navy', 'maroon', 'olive', 'silver'
          ];
    }, []);

    const shiftsCssClasses = useMemo(() => {
        return [
            'md-stripes-bg', 'md-rect-bg', 'md-dots-bg'
          ];
    }, []);

    const view = useMemo(() => {
        return {
             timeline: {
                type: 'day',
                startDay: 0,
                endDay: 7
            }
        };
    }, []);

    const { isLoading: guardsLoading, data: guards } = useQuery({
        queryKey: ["guardsAndLimits", campId],
        queryFn: () => GuardService.getGuardsAndLimitsForCampId(campId),
        enabled: !!campId,
        select: (data) => {
            let mappedGuards = data;
            if(data.length > 0){
                mappedGuards = data.map((g) => ({
                                    value: g.guard.id, 
                                    text: g.guard.name, 
                                    color: colors[g.guard.id%10],
                                    outpostLimits: g.outpostLimits,
                                    timeLimits: g.timeLimits
                            }));
            }
            console.log("guards", mappedGuards);
            return mappedGuards;
        }
    });

    const { isLoading: outpostsLoading, data: outposts } = useQuery({
        queryKey: ["outpostsAndShifts", campId],
        queryFn: () => getOutpostsAndShiftsForCampId(campId),
        enabled: !!campId,
        select: (data) => {
            console.log("outpostsAndShifts - outpost" ,data.map((o) => o.outpost));
            return data.map((o) => o.outpost);
        }
    });

    const { isLoading: shiftsLoading, data: shifts } = useQuery({
        queryKey: ["outpostsAndShifts", campId],
        enabled: false,
        select: (data) => {
            const allMappendShifts = [];
            if(data.length > 0){
                data.forEach(({shifts}) =>{
                    if(shifts.length > 0){
                        const mappedShifts = shifts.map((s, index) => ({
                            id: s.id,
                            start: getTimeStr(s.fromHour),
                            end: getTimeStr(s.toHour),
                            resource: s.outpostId,
                            recurring: {
                                repeat: 'weekly',
                                weekDays: getDayStr(s.dayId)
                            },
                            cssClass: shiftsCssClasses[index % 3]
                        }))
                        allMappendShifts.push(...mappedShifts);
                    }
                })
            }
            console.log("shifts", allMappendShifts);
            return allMappendShifts;
        }
    });

    const { isLoading: shibutsimLoading, data: shibutsim } = useQuery({
        queryKey: ["shibutsim", campId, isAutoShibutsim],
        queryFn: () => isAutoShibutsim ? getAutoShibutsimOfCurrentWeekByCampId(campId) : getShibutsimOfCurrentWeekByCampId(campId),
        enabled: !!campId && !!outposts && !!guards && !!shifts,
        select: (data) => {
            let mappedShibutsim = [];
            if(data.length > 0){
                mappedShibutsim = data.map(s => {
                        const { id, ...copiedShibuts } = s;   
                        const updatedShibuts = {
                            ...copiedShibuts,
                            shibutsId: id,
                            start: getDateAndTime(s.theDate, shifts.find(sh=>sh.id==s.shiftId).start),
                            end: getDateAndTime(s.theDate, shifts.find(sh=>sh.id==s.shiftId).end),
                            guardName: guards.find(g=>g.value==s.guardId).text,
                            resource: s.outpostId,
                            color: guards.find(g=>g.value==s.guardId).color
                        };
                      
                        return updatedShibuts;
                    });
            }
            console.log("shibutsim", mappedShibutsim);
            return mappedShibutsim;
        }
    });

    const findClosestShift = useCallback((outpost, start) => {
        let shift = shifts.filter(s => s.resource == outpost && 
            getDayNumber(s.recurring.weekDays) == start.getDay() &&
            getHourNumber(s.start) <= new Date(start).getHours() &&
            getHourNumber(s.end) >= new Date(start).getHours());
        if(shift.length > 1){
            return shift.reduce((prev, current) => (prev && getHourNumber(prev.start) > getHourNumber(current.start)) ? prev : current);
        }
        return shift[0];
    },[shifts]);

    const checkTimeLimit = useCallback((guard, shibuts) => {
        let hasTimeLimit = false;
        const shibutsStart = shibuts.start.getHours();
        const shibutsEnd = shibuts.end.getHours();
        if(guard.timeLimits.length > 0){
            const limits = guard.timeLimits.filter( t => 
                            t.dayId == shibuts.start.getDay() &&
                            ((t.fromHour <= shibutsStart && shibutsStart < t.toHour) ||
                             (t.fromHour < shibutsEnd && shibutsEnd <= t.toHour)))
            if( limits.length > 0 ){
                hasTimeLimit = true;
            }
        }
        return hasTimeLimit;
    },[]);

    const checkOutpostLimit = useCallback((guard, shibuts) => {
        let hasOutpostLimit = false;
        if(guard.outpostLimits.length > 0){
            const limits = guard.outpostLimits.filter( o => o.outpostId == shibuts.resource).length;
            if( limits.length > 0 ){
                hasOutpostLimit = true;
            }
        }       
        return hasOutpostLimit;
    },[]);

    const checkGuardHasLimits = useCallback((guard, shibuts) => {
        const hasTimeLimit = checkTimeLimit(guard, shibuts);
        const hasOutpostLimit = checkOutpostLimit(guard, shibuts);
        if(hasTimeLimit){
            toast.error("שומר " + guard.text + " אינו יכול לשמור בשעות " + shibuts.start.getHours() + ":00 - " + shibuts.end.getHours() + ":00");
            return true;
        }
        if(hasOutpostLimit){
            const outpostName = outposts.find((o) => { return o.id === shibuts.outpostId });
            toast.error("שומר " + guard.text + " לא יכול לשמור בעמדה " + outpostName);
            return true;
        }
        return false;
    },[checkOutpostLimit, checkTimeLimit, outposts])

    const checkExistinShibuts = useCallback( (shibuts) => {
        const outpostName = outposts.find(o=>o.id==shibuts.outpostId).name;
        const existShibuts = shibutsim.filter(s=>s.guardId == shibuts.guardId &&
                                s.shiftId == shibuts.shiftId &&
                                s.outpostId == shibuts.outpostId);
        if(existShibuts.length > 0){
            toast.error(`כבר קיים שיבוץ ל ${existShibuts[0].guardName} בעמדה ${outpostName} בשעה ${getTimeStr(existShibuts[0].end.getHours())}`);
            return true;
        }
        return false;
    },[shibutsim, outposts]);

    const onClose = useCallback(() => {
        setPopupOpen(false);
    }, []);

    const myDefaultShibuts = useCallback((args) => {
        const shift = findClosestShift(args.resource,args.start);
        if(shift != undefined){
            const start = new Date(args.start.setHours(getHourNumber(shift.start)));
            const end = new Date(args.start.setHours(getHourNumber(shift.end)));
            return {
                start: start,
                end: end,
                guardName: '',
                guardId: '',
                shiftId: shift.id,
                outpostId: args.resource,
                resource: args.resource,
                color: '#ff0000'
            };
        }
    }, [findClosestShift]);

    const onShibutsClick = useCallback((args) => {
        const shibuts = args.event;
        const outpost = outposts.find((o) => { return o.id === shibuts.resource });
        shibuts.outpostId = shibuts.resource;
        setHeader('<div>שינוי שומר  ' + shibuts.guardName + ' בעמדה ' + outpost.name +'</div><div class="employee-shifts-day">' +
                formatDate('HH:mm', new Date(shibuts.start)) + ' עד ' + formatDate('HH:mm', new Date(shibuts.end)) + '</div>');
        setEdit(true);
        setTempShibuts({ ...shibuts });
        setPopupOpen(true);
    }, [outposts]);

    const onDeleteClick = useCallback(async () => {
        await deleteShibuts(tempShibuts.shibutsId);
        queryClient.invalidateQueries(['shibutsim'])
        setPopupOpen(false);
    }, [tempShibuts]);

    const onShibutsCreated = useCallback((args) => {
        const shibuts = args.event;
        if(shibuts.shiftId == undefined){
            toast.error("אין משמרות בזמן זה");
        } else {
            const outpost = outposts.find((o) => { return o.id === shibuts.resource });
            shibuts.outpostId = outpost.id;
            setHeader('<div>משמרת חדשה בעמדה ' + outpost.name + '</div><div class="employee-shifts-day">' +
                formatDate('HH:mm', shibuts.start) + ' עד ' + formatDate('HH:mm', shibuts.end) + '</div>');
            setTempShibuts(shibuts);
            setPopupOpen(true);
        }
    }, [outposts]);

    const saveShibuts = useCallback(async (shibutsToSave) => {
        const outpostName = outposts.find(o=>o.id==shibutsToSave.outpostId).name;
        const isExistingShibuts = checkExistinShibuts(shibutsToSave);
        if(shibutsToSave.guardId != 0 && !isExistingShibuts){
            shibutsToSave.campId = campId;
            shibutsToSave.theDate = shibutsToSave.start.getTime();
            shibutsToSave.outpostName = outpostName;
            shibutsToSave.id = shibutsToSave.shibutsId;
            await createOrUpdateShibuts(shibutsToSave);
            queryClient.invalidateQueries(['shibutsim']);
            setPopupOpen(false);
        }else{
            onClose();
        }
    }, [outposts, shibutsim, tempShibuts, checkExistinShibuts, campId]);

    const onShibutsMove = useCallback((obj) => {
        let shibuts = {...obj.event};
        let shift = findClosestShift(obj.resource, shibuts.start);
        shibuts.shiftId = shift.id;
        const guard = guards.find( g => g.value == shibuts.guardId);
        const guardHasLimits = checkGuardHasLimits(guard, shibuts);
        if(shift != undefined && !guardHasLimits){
            shibuts.start.setHours(getHourNumber(shift.start),0,0);
            shibuts.end.setHours(getHourNumber(shift.end),0,0);
            shibuts.outpostId = shibuts.resource;
        }
        setTempShibuts(shibuts);
        saveShibuts(shibuts);
    },[findClosestShift, checkGuardHasLimits, guards, outposts, shibutsim]);

    const popupButtons = useMemo(() => {
        if (isEdit) {
            return ['cancel', {
                handler: () => {
                    saveShibuts(tempShibuts);
                },
                keyCode: 'enter',
                text: 'שמירה',
                cssClass: 'mbsc-popup-button-primary'
            }];
        } else {
            return ['cancel', {
                handler: () => {
                    saveShibuts(tempShibuts);
                },
                keyCode: 'enter',
                text: 'הוספה',
                cssClass: 'mbsc-popup-button-primary'
            }];
        }
    }, [tempShibuts]);

    const myCustomShibuts = useCallback((args) => {
        return <div>
                   <div className="md-timetable-event-title">{args.original.guardName}</div>
               </div>;
    }, []);
    
    const onGuardChange = useCallback((selectedGuard) => { 
        const guard = guards.find(g=>g.value == selectedGuard.value);        
        if(!checkGuardHasLimits(guard, tempShibuts)){
            setTempShibuts({
                ...tempShibuts,
                guardName: selectedGuard.valueText,
                guardId: selectedGuard.value,
                color: guards.find(g => g.value === selectedGuard.value).color
            })
        }
    },[tempShibuts, guards, checkGuardHasLimits]);

    const onAutoShibutsClick = useCallback(() => {
        setIsAutoShibutsim(true);
        queryClient.invalidateQueries("shibutsim");
    }, []);

    return (
        <div>
            <SelectCamp setSelectedCampId={setCampId} selectedCampId={campId} title={"לוח משמרות"} title2={"בבסיס:"} />
            <Button className="mbsc-button-block" color="info" onClick={onAutoShibutsClick}>שיבוץ אוטומטי</Button>
            {
            (guardsLoading || outpostsLoading || shiftsLoading || shibutsimLoading) ?
                (<LoadingComp /> )  :   
        
            (  <>
                <Eventcalendar
                    className="md-timetable"
                    view={view}
                    data={shibutsim}
                    resources={outposts}
                    extendDefaultEvent={myDefaultShibuts}
                    renderScheduleEventContent={myCustomShibuts}
                    onEventDragEnd={onShibutsMove}
                    clickToCreate={true}
                    dragToCreat={true}
                    dragToMove={true}
                    dragTimeStep={15}
                    eventDelete={true}
                    onEventClick={onShibutsClick}
                    onEventCreated={onShibutsCreated}
                    colors={shifts}
                />
                
                <Popup
                    display="bottom"
                    fullScreen={true}
                    contentPadding={false}
                    headerText={headerText}
                    buttons={popupButtons}
                    isOpen={isPopupOpen}
                    onClose={onClose}
                    responsive={responsivePopup}
                    cssClass="employee-shifts-popup"
                >
                <div className="mbsc-form-group">
                    <Select 
                        data={guards} 
                        onChange={onGuardChange}
                        label="בחירת שומר" />
                </div>
                    {isEdit && <div className="mbsc-button-group">
                        <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>מחיקת משמרת</Button>
                    </div>}
                </Popup>
                </>
            )}
        </div>
    ); 
}

export default ShiftSchedule;
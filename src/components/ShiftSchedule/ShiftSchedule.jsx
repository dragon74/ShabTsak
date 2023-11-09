import {useState, useMemo, useCallback, useEffect } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {Eventcalendar, setOptions, Popup, Button, Select, formatDate, localeHe, snackbar} from '@mobiscroll/react';
import GuardService from "@/services/GuardService.js";
import { getOutpostsAndShiftsForCampId } from "@/services/OutpostService";
//import { createOrUpdateShift } from "@/services/ShiftService";
import { useQuery } from "react-query";
import SelectCamp from "components/general_comps/selectCamp.jsx";
import { getTimeStr, getDayStr, getDayNumber, getHourNumber } from "../../lib/utils/dateUtils";
import { toast } from "react-toastify";

setOptions({
    locale: localeHe,
    theme: 'ios',
    themeVariant: 'light'
});

const defaultShibutsim = [{
    start: '2023-10-25T07:00',
    end: '2023-10-25T13:00',
    guardName: 'אריה',
    outpost: 2,
    resource:1,
    color:"green"
}];

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
    const [shibutsim, setShibutsim] = useState(defaultShibutsim);
    const [headerText, setHeader] = useState('');
    const [isEdit, setEdit] = useState(false);
    const [tempShibuts, setTempShibuts] = useState(null);
    const [shibutsDate, setShibutsDate] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [guardName, setGuardName] = useState(null);
    const [campId, setCampId] = useState(null);
    const [outposts, setOutposts] = useState([]);
    const [guards, setGuards] = useState([]);
    const [shifts, setShifts] = useState([]);

    const colors = useMemo(() => {
        return [
            'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'navy', 'maroon', 'olive', 'silver'
          ];
    }, []);

    const { isLoading: loadingGuardsAndLimits, isError: errorGuardsAndLimits, data: guardsAndLimits } = useQuery({
        queryKey: ["guardsAndLimits", campId],
        queryFn: () => GuardService.getGuardsAndLimitsForCampId(campId),
        enabled: !!campId,
        initialData: []
    });

    const { isLoading: loadingOutpostsAndShifts, isError: errorOutpostsAndShifts, data: outpostsAndShifts } = useQuery({
        queryKey: ["outpostsAndShifts", campId],
        queryFn: () => getOutpostsAndShiftsForCampId(campId),
        enabled: !!campId,
        initialData: []
    });

    useEffect(() => {
        //set outposts and shifts
        if (!loadingGuardsAndLimits && !errorGuardsAndLimits) {
            console.log("outpostsAndShifts" ,outpostsAndShifts)
            setOutposts(outpostsAndShifts.map((o) => o.outpost));
            const shifts = outpostsAndShifts.map((o) => o.shifts)
            handleSetShifts(shifts);
        }
        //set guards and limits
        if(!loadingOutpostsAndShifts && !errorOutpostsAndShifts){
            console.log("guardsAndLimits" , guardsAndLimits)
            const mappedGuards = guardsAndLimits.map((g) => ({
                                value: g.id, 
                                text: g.name, 
                                color: colors[g.id%10]
                           }))
            setGuards(mappedGuards);
        }

        function handleSetShifts(allShifts){
                const allMappendShifts = [];
                allShifts.forEach(shifts =>{
                    const mappedShifts = shifts.map((s, index) => ({
                        start: getTimeStr(s.fromHour),
                        end: getTimeStr(s.toHour),
                        resource: s.outpostId,
                        recurring: {
                            repeat: 'weekly',
                            weekDays: getDayStr(s.dayId)
                        },
                        cssClass: index % 2 === 0 ? 'md-stripes-bg' : 'md-rect-bg'
                    }))
                    allMappendShifts.push(...mappedShifts);
                })
                setShifts(allMappendShifts);
                console.log("shifts", shifts);
        }

    }, [outpostsAndShifts, loadingOutpostsAndShifts, errorOutpostsAndShifts, 
        guardsAndLimits, loadingGuardsAndLimits, errorGuardsAndLimits, colors, shifts]);    

    

    const view = useMemo(() => {
        return {
             timeline: {
                type: 'day',
                startDay: 1,
                endDay: 7
            }
        };
    }, []);

    const loadPopupForm = useCallback((shibuts) => {
        setGuardName([shibuts.guardName])
        setShibutsDate([shibuts.start, shibuts.end]);
    }, []);

    const onClose = useCallback(() => {
        if (!isEdit) {
            // refresh the list, if add popup was canceled, to remove the temporary shibuts
            setShibutsim([...shibutsim]);
        }
        setOpen(false);
    }, [isEdit, shibutsim]);

    const myDefaultShibuts = useCallback((args) => {
        let startsDate = args.start;
        let endDate = new Date(startsDate.getFullYear(), startsDate.getMonth(), startsDate.getDate(), startsDate.getHours()+1);
        return {
            start: startsDate,
            end: endDate,
            guardName: '',
            outpost: args.resource,
            color: '#ff0000'
        };
    }, []);

    const deleteShibuts = useCallback((shibuts) => {
        setShibutsim(shibuts.filter(item => item.id !== shibuts.id));
        setTimeout(() => {
            snackbar({
                button: {
                    action: () => {
                        setShibuts(prevShibuts => [...prevShibuts, shibuts]);
                    },
                    text: 'Undo'
                },
                message: 'Shibuts deleted'
            });
        });
    }, [shibutsim]);

    const onShibutsClick = useCallback((args) => {
        const shibuts = args.event;
        const outpost = outposts.find((o) => { return o.id === shibuts.outpost });
        //drop down with all existing guards
        setHeader('<div>שינוי שומר  ' + shibuts.guardName + ' בעמדה ' + outpost.name +'</div><div class="employee-shifts-day">' +
                formatDate('HH:mm', new Date(shibuts.start)) + ' עד ' + formatDate('HH:mm', new Date(shibuts.end)) + '</div>');
        setEdit(true);
        setTempShibuts({ ...shibuts });
        setGuardName(shibuts.guardName);
        // fill popup form with shibuts data
        loadPopupForm(shibuts);
        setOpen(true);
    }, [loadPopupForm, outposts]);

    const onDeleteClick = useCallback(() => {
        deleteShibuts(tempShibuts);
        setOpen(false);
    }, [deleteShibuts, tempShibuts]);

    const onShibutsCreated = useCallback((args) => {
        const shibuts = args.event;
        const shift = findShift(shibuts.outpost, shibuts.start, shibuts.end);
        if(shift.length == 1){
            shibuts.start.setHours(getHourNumber(shift[0].start));
            shibuts.end.setHours(getHourNumber(shift[0].end));
            const outpost = outposts.find((o) => { return o.id === shibuts.outpost });
            //drop down with all existing guards
            setHeader('<div>משמרת חדשה בעמדה ' + outpost.name + '</div><div class="employee-shifts-day">' +
                formatDate('HH:mm', shibuts.start) + ' עד ' + formatDate('HH:mm', shibuts.end) + '</div>');
            setEdit(false);
            setTempShibuts(shibuts);
            // fill popup form with Shibuts data
            loadPopupForm(shibuts);
            setOpen(true);
        }else{
            toast.error("יש יותר ממשמרת אחת בזמן הנבחר");
            args.event = {};
        }
    }, [loadPopupForm, outposts]);

    const findShift = useCallback((outpost, start, end) => {
        return shifts.filter(s => s.resource == outpost && 
            getDayNumber(s.recurring.weekDays) == start.getDay() &&
            getHourNumber(s.start)<=new Date(start).getHours() &&
            getHourNumber(s.end)>=new Date(end).getHours())
    },[shifts]);

    const findClosestShift = useCallback((outpost, start) => {
        let shift = shifts.filter(s => s.resource == outpost && 
            getDayNumber(s.recurring.weekDays) == start.getDay() &&
            getHourNumber(s.start)<=new Date(start).getHours() &&
            getHourNumber(s.end)>=new Date(start).getHours())
        if(shift.length > 1){
            shift = shift.splice(-1);
        }
        return shift;
    },[shifts]);

    const onShibutsMove = useCallback((obj) => {
        let shift = findClosestShift(obj.event.resource, obj.event.start);
        if(shift.length == 1){
            obj.event.start.setHours(getHourNumber(shift[0].start),0,0);
            obj.event.end.setHours(getHourNumber(shift[0].end),0,0);
        }
    },[shifts]);

    const onShibutsDeleted = useCallback((args) => {
        deleteShibuts(args.event)
    }, [deleteShibuts]);

    const saveShibuts = useCallback(() => {
        const start = new Date(shibutsDate[0]);
        const end = new Date(shibutsDate[1]);
        const color = guards.find(g => g.text === tempShibuts.guardName).color;
        const newShibuts = {
            id: tempShibuts.id,
            start: start,
            end: end,
            guardName: tempShibuts.guardName,
            outpost: tempShibuts.outpost,
            resource: tempShibuts.outpost,
            color: color
        };
        if (isEdit) {
            // update the shibuts in the list
            const index = shibutsim.findIndex(x => x.id === tempShibuts.id);
            const newShibutsimList = [...shibutsim];
            newShibutsimList.splice(index, 1, newShibuts);
            setShibutsim(newShibutsimList);
        } else {
            // add the new shibuts to the list
            setShibutsim([...shibutsim, newShibuts]);
        }
        //save Shibuts on server
        //createOrUpdateShibuts()
        // close the popup
        setOpen(false);
    }, [isEdit, shibutsim, tempShibuts, shibutsDate]);

    // popup options
    const popupButtons = useMemo(() => {
        if (isEdit) {
            return ['cancel', {
                handler: () => {
                    saveShibuts();
                },
                keyCode: 'enter',
                text: 'שמירה',
                cssClass: 'mbsc-popup-button-primary'
            }];
        } else {
            return ['cancel', {
                handler: () => {
                    saveShibuts();
                },
                keyCode: 'enter',
                text: 'הוספה',
                cssClass: 'mbsc-popup-button-primary'
            }];
        }
    }, [isEdit, saveShibuts]);

    const myCustomShibuts = useCallback((args) => {
        return <div>
                   <div className="md-timetable-event-title">{args.original.guardName}</div>
               </div>;
    }, []);
    
    const guardNameChange = (ev) => { 
        setTempShibuts({
            ...tempShibuts,
            guardName: ev.valueText
        })
        setGuardName(ev.valueText); 
    };


    return (
        <div>
            <SelectCamp setSelectedCampId={setCampId} selectedCampId={campId} title={"לוח משמרות"} title2={"בבסיס:"} />
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
                onEventDeleted={onShibutsDeleted}
                colors={shifts}
            />
            <Popup
                display="bottom"
                fullScreen={true}
                contentPadding={false}
                headerText={headerText}
                buttons={popupButtons}
                isOpen={isOpen}
                onClose={onClose}
                responsive={responsivePopup}
                cssClass="employee-shifts-popup"
            >
            <div className="mbsc-form-group">
                <Select 
                    value={guardName}
                    data={guards} 
                    onChange={guardNameChange}
                    label="בחירת שומר" />
            </div>
                {isEdit && <div className="mbsc-button-group">
                    <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>מחיקת משמרת</Button>
                </div>}
            </Popup>
        </div>
    ); 
}

export default ShiftSchedule;
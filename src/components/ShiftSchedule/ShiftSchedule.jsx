import React, { useState, useMemo, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {Eventcalendar, setOptions, Popup, Button, Select, formatDate, localeHe, snackbar} from '@mobiscroll/react';
import { getGuardsByCampId } from '@/services/GuardService';
import { getOutpostsByCampId } from "@/services/OutpostService";
import { useQuery } from "react-query";
import SelectCamp from "components/general_comps/selectCamp.jsx";

setOptions({
    locale: localeHe,
    theme: 'ios',
    themeVariant: 'light'
});

const defaultShifts = [{
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
    const [shifts, setShifts] = useState(defaultShifts);
    const [headerText, setHeader] = useState('');
    const [isEdit, setEdit] = useState(false);
    const [tempShift, setTempShift] = useState(null);
    const [shiftDate, setDate] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [guardName, setGuardName] = useState(null);
    const [campId, setCampId] = useState(null);

    const colors = [
        'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'navy', 'maroon', 'olive', 'silver'
      ];

    const { isLoading: loadingGuards, data: guards } = useQuery({
        queryKey: ["guards", campId],
        queryFn: () => getGuardsByCampId(campId),
        enabled: !!campId,
        select: guards => guards.map((g) => ({
            value: g.id,
            text: g.name,
            color: colors[g.id%10]
        })),
        initialData: []
    });
    console.log("Guards for campId:", campId, loadingGuards ? "Loading guards..." : guards);

    const { isLoading: loadingOutposts, data: outposts } = useQuery({
        queryKey: ["outposts", campId],
        queryFn: () => getOutpostsByCampId(campId),
        enabled: !!campId,
        initialData: []
    });
    console.log("Outposts for campId:", campId, loadingOutposts ? "Loading outposts..." : outposts);

    const view = useMemo(() => {
        return {
             timeline: {
                type: 'day',
                startDay: 1,
                endDay: 7
            }
        };
    }, []);
    
    const myOutposts = useMemo(() => {
        return [{
            id: 1,
            name: 'ש"ג'
        }, {
            id: 2,
            name: 'סיור'
        }, {
            id: 3,
            name: 'דרומית'
        }, {
            id: 4,
            name: 'חצר/גנים'
        }];
    }, []);

    const loadPopupForm = useCallback((shift) => {
        setGuardName([shift.guardName])
        setDate([shift.start, shift.end]);
    }, []);

    const onClose = useCallback(() => {
        if (!isEdit) {
            // refresh the list, if add popup was canceled, to remove the temporary shift
            setShifts([...shifts]);
        }
        setOpen(false);
    }, [isEdit, shifts]);

    const myDefaultShift = useCallback((args) => {
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

    const deleteShift = useCallback((shift) => {
        setShifts(shifts.filter(item => item.id !== shift.id));
        setTimeout(() => {
            snackbar({
                button: {
                    action: () => {
                        setShifts(prevShifts => [...prevShifts, shift]);
                    },
                    text: 'Undo'
                },
                message: 'Shift deleted'
            });
        });
    }, [shifts]);

    const onShiftClick = useCallback((args) => {
        const shift = args.event;
        const outpost = myOutposts.find((p) => { return p.id === shift.outpost });
        //drop down with all existing guards
        setHeader('<div>שינוי שומר  ' + shift.guardName + ' בעמדה ' + outpost.name +'</div><div class="employee-shifts-day">' +
                formatDate('HH:mm', new Date(shift.start)) + ' עד ' + formatDate('HH:mm', new Date(shift.end)) + '</div>');
        setEdit(true);
        setTempShift({ ...shift });
        setGuardName(shift.guardName);
        // fill popup form with shift data
        loadPopupForm(shift);
        setOpen(true);
    }, [loadPopupForm]);

    const onDeleteClick = React.useCallback(() => {
        deleteShift(tempShift);
        setOpen(false);
    }, [deleteShift, tempShift]);

    const onShiftCreated = useCallback((args) => {
        const shift = args.event;
        const outpost = myOutposts.find((p) => { return p.id === shift.outpost });
        //drop down with all existing guards
        setHeader('<div>משמרת חדשה בעמדה ' + outpost.name + '</div><div class="employee-shifts-day">' +
            formatDate('HH:mm', new Date(shift.start)) + ' עד ' + formatDate('HH:mm', new Date(shift.end)) + '</div>');
        setEdit(false);
        setTempShift(shift);
        // fill popup form with shift data
        loadPopupForm(shift);
        setOpen(true);
    }, [loadPopupForm]);

    const onShiftDeleted = useCallback((args) => {
        deleteShift(args.event)
    }, [deleteShift]);

    const saveShift = useCallback(() => {
        const start = new Date(shiftDate[0]);
        const end = new Date(shiftDate[1]);
        const color = guards.find(g => g.text === tempShift.guardName).color;
        const newShift = {
            id: tempShift.id,
            start: start,
            end: end,
            guardName: tempShift.guardName,
            outpost: tempShift.outpost,
            resource: tempShift.resource,
            color: color
        };
        if (isEdit) {
            // update the shift in the list
            const index = shifts.findIndex(x => x.id === tempShift.id);
            const newShiftList = [...shifts];

            newShiftList.splice(index, 1, newShift);
            setShifts(newShiftList);
        } else {
            // add the new shift to the list
            setShifts([...shifts, newShift]);
        }
        // close the popup
        setOpen(false);
    }, [isEdit, shifts, tempShift, shiftDate]);

    // popup options
    const popupButtons = useMemo(() => {
        if (isEdit) {
            return ['cancel', {
                handler: () => {
                    saveShift();
                },
                keyCode: 'enter',
                text: 'שמירה',
                cssClass: 'mbsc-popup-button-primary'
            }];
        } else {
            return ['cancel', {
                handler: () => {
                    saveShift();
                },
                keyCode: 'enter',
                text: 'הוספה',
                cssClass: 'mbsc-popup-button-primary'
            }];
        }
    }, [isEdit, saveShift]);

    const myCustomShift = useCallback((args) => {
        return <div>
                   <div className="md-timetable-event-title">{args.original.guardName}</div>
               </div>;
    }, []);
    
    const guardNameChange = (ev) => { 
        setTempShift({
            ...tempShift,
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
                data={shifts}
                resources={myOutposts}
                extendDefaultEvent={myDefaultShift}
                renderScheduleEventContent={myCustomShift}
                clickToCreate={true}
                dragToCreat={true}
                dragToMove={true}
                dragToResize={true}
                dragTimeStep={15}
                eventDelete={true}
                onEventClick={onShiftClick}
                onEventCreated={onShiftCreated}
                onEventDeleted={onShiftDeleted}
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
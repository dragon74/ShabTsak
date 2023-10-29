import React, { useState, useMemo, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, setOptions, Popup, Button, Select, formatDate, localeHe } from '@mobiscroll/react';

setOptions({
    locale: localeHe,
    theme: 'ios',
    themeVariant: 'light'
});

const defaultShifts = [{
    start: '2023-10-25T07:00',
    end: '2023-10-25T13:00',
    guardName: 'אריה',
    position: 2,
    resource:1,
    color:"green"
}];

const initGuards = [{
    value: 1,
    text: 'בושי',
    color:"red",
}, {
    value: 2,
    text: 'אריה',
    color:"green",
}, {
    value: 3,
    text: 'דוד',
    color:"yellow",
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
    const [guards, _setGuards] = useState(initGuards);
    const [headerText, setHeader] = useState('');
    const [isEdit, setEdit] = useState(false);
    const [tempShift, setTempShift] = useState(null);
    const [shiftDate, setDate] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [guardName, setGuardName] = useState(null);


    const view = useMemo(() => {
        return {
             timeline: {
                type: 'day',
                startDay: 1,
                endDay: 7
            }
        };
    }, []);
    
    const myPositions = useMemo(() => {
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
            position: args.resource,
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
        const position = myPositions.find((p) => { return p.id === shift.position });
        //drop down with all existing guards
        setHeader('<div>שינוי שומר  ' + shift.guardName + ' בעמדה ' + position.name +'</div><div class="employee-shifts-day">' +
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
        const position = myPositions.find((p) => { return p.id === shift.position });
        //drop down with all existing guards
        setHeader('<div>משמרת חדשה בעמדה ' + position.name + '</div><div class="employee-shifts-day">' +
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
            position: tempShift.position,
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
        //
    }, [isEdit, shifts, shiftDate, guards, tempShift.guardName, tempShift.id, tempShift.position, tempShift.resource]);

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
    
    // useEffect(() => {
    //     getJson('https://trial.mobiscroll.com/timetable-events/', (events) => {
    //         setEvents(events);
    //     }, 'jsonp');
    // }, []);

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
            <Eventcalendar
                className="md-timetable"
                view={view}
                data={shifts}
                resources={myPositions}
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
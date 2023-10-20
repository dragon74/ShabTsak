import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, Datepicker, snackbar, setOptions, Popup, Button, Input, Textarea, formatDate, localeHe } from '@mobiscroll/react';

setOptions({
    locale: localeHe,
    theme: 'ios',
    themeVariant: 'light'
});

const staff = [{
    id: 1,
    name: 'בושי',
    color: '#e20000',
    img: 'https://img.mobiscroll.com/demos/m1.png'
}, {
    id: 2,
    name: 'אריה',
    color: '#60e81a',
    img: 'https://img.mobiscroll.com/demos/f1.png'
}, {
    id: 3,
    name: 'דוד',
    color: '#3ba7ff',
    img: 'https://img.mobiscroll.com/demos/m2.png'
}, {
    id: 4,
    name: 'אהרון',
    color: '#e25dd2',
    img: 'https://img.mobiscroll.com/demos/m3.png'
}, {
    id: 5,
    name: 'שלמה',
    color: '#f1e920',
    img: 'https://img.mobiscroll.com/demos/f2.png'
}, {
    id: 6,
    name: 'יוני',
    color: '#1ac38d',
    img: 'https://img.mobiscroll.com/demos/f3.png'
}];

const defaultShifts = [{
    start: '2023-10-16T07:00',
    end: '2023-10-16T13:00',
    title: '07:00 - 13:00',
    resource: 2,
    slot: 1
}, {
    start: '2023-10-16T07:00',
    end: '2023-10-16T13:00',
    title: '07:00 - 13:00',
    resource: 3,
    slot: 1
}, {
    start: '2023-10-16T07:00',
    end: '2023-10-16T13:00',
    title: '07:00 - 13:00',
    resource: 6,
    slot: 1
}, {
    start: '2023-10-16T12:00',
    end: '2023-10-16T18:00',
    title: '12:00 - 18:00',
    resource: 4,
    slot: 2
}, {
    start: '2023-10-16T12:00',
    end: '2023-10-16T18:00',
    title: '12:00 - 18:00',
    resource: 5,
    slot: 2
}, {
    start: '2023-10-17T07:00',
    end: '2023-10-17T13:00',
    title: '07:00 - 13:00',
    resource: 1,
    slot: 1
}, {
    start: '2023-10-17T07:00',
    end: '2023-10-17T13:00',
    title: '07:00 - 13:00',
    resource: 2,
    slot: 1
}, {
    start: '2023-10-17T07:00',
    end: '2023-10-17T13:00',
    title: '07:00 - 13:00',
    resource: 6,
    slot: 1
}, {
    start: '2023-10-17T12:00',
    end: '2023-10-17T18:00',
    title: '12:00 - 18:00',
    resource: 3,
    slot: 2
}, {
    start: '2023-10-17T12:00',
    end: '2023-10-17T18:00',
    title: '12:00 - 18:00',
    resource: 5,
    slot: 2
}, {
    start: '2023-10-18T07:00',
    end: '2023-10-18T13:00',
    title: '07:00 - 13:00',
    resource: 1,
    slot: 1
}, {
    start: '2023-10-18T07:00',
    end: '2023-10-18T13:00',
    title: '07:00 - 13:00',
    resource: 3,
    slot: 1
}, {
    start: '2023-10-18T07:00',
    end: '2023-10-18T13:00',
    title: '07:00 - 13:00',
    resource: 4,
    slot: 1
}, {
    start: '2023-10-18T12:00',
    end: '2023-10-18T18:00',
    title: '12:00 - 18:00',
    resource: 2,
    slot: 2
}, {
    start: '2023-10-18T12:00',
    end: '2023-10-18T18:00',
    title: '12:00 - 18:00',
    resource: 6,
    slot: 2
}, {
    start: '2023-10-19T07:00',
    end: '2023-10-19T13:00',
    title: '07:00 - 13:00',
    resource: 5,
    slot: 1
}, {
    start: '2023-10-19T07:00',
    end: '2023-10-19T13:00',
    title: '07:00 - 13:00',
    resource: 6,
    slot: 1
}, {
    start: '2023-10-19T12:00',
    end: '2023-10-19T18:00',
    title: '12:00 - 18:00',
    resource: 2,
    slot: 2
}, {
    start: '2023-10-19T12:00',
    end: '2023-10-19T18:00',
    title: '12:00 - 18:00',
    resource: 4,
    slot: 2
}, {
    start: '2023-10-20T07:00',
    end: '2023-10-20T13:00',
    title: '07:00 - 13:00',
    resource: 1,
    slot: 1
}, {
    start: '2023-10-20T07:00',
    end: '2023-10-20T13:00',
    title: '07:00 - 13:00',
    resource: 5,
    slot: 1
}, {
    start: '2023-10-20T12:00',
    end: '2023-10-20T18:00',
    title: '12:00 - 18:00',
    resource: 2,
    slot: 2
}, {
    start: '2023-10-20T12:00',
    end: '2023-10-20T18:00',
    title: '12:00 - 18:00',
    resource: 3,
    slot: 2
}, {
    start: '2023-10-20T12:00',
    end: '2023-10-20T18:00',
    title: '12:00 - 18:00',
    resource: 6,
    slot: 2
}];

const slots = [{
    id: 1,
    name: 'ש"ג',
}, {
    id: 2,
    name: 'סיור',
}, {
    id: 3,
    name: 'דרומית',
}, {
    id: 4,
    name: 'מזרחית',
}];

const invalid = [{
    start: '2023-10-19T00:00',
    end: '2023-10-19T23:59',
    resource: 4,
    slot: 1
}, {
    start: '2023-10-17T00:00',
    end: '2023-10-17T23:59',
    resource: 2,
    slot: 2
}];

const viewSettings = {
    timeline: {
        type: 'day',
        eventList: true,
        startDay: 1,
        endDay: 7
    }
};

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
    const [shifts, setShifts] = React.useState(defaultShifts);
    const [tempShift, setTempShift] = React.useState(null);
    const [start, startRef] = React.useState(null);
    const [end, endRef] = React.useState(null);
    const [min, setMinTime] = React.useState('');
    const [max, setMaxTime] = React.useState('');
    const [isOpen, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [headerText, setHeader] = React.useState('');
    const [shiftDate, setDate] = React.useState([]);
    const [shiftNotes, setNotes] = React.useState('');

    const saveEvent = React.useCallback(() => {
        const start = new Date(shiftDate[0]);
        const end = new Date(shiftDate[1]);
        const newEvent = {
            id: tempShift.id,
            title: formatDate('HH:mm', start) + ' - ' + formatDate('HH:mm', end),
            notes: shiftNotes,
            start: start,
            end: end,
            resource: tempShift.resource,
            slot: tempShift.slot,
        };
        if (isEdit) {
            // update the event in the list
            const index = shifts.findIndex(x => x.id === tempShift.id);
            const newEventList = [...shifts];

            newEventList.splice(index, 1, newEvent);
            setShifts(newEventList);
        } else {
            // add the new event to the list
            setShifts([...shifts, newEvent]);
        }
        // close the popup
        setOpen(false);
    }, [isEdit, shifts, shiftNotes, tempShift, shiftDate]);

    const deleteEvent = React.useCallback((event) => {
        setShifts(shifts.filter(item => item.id !== event.id));
        setTimeout(() => {
            snackbar({
                button: {
                    action: () => {
                        setShifts(prevEvents => [...prevEvents, event]);
                    },
                    text: 'Undo'
                },
                message: 'Event deleted'
            });
        });
    }, [shifts]);

    const loadPopupForm = React.useCallback((event) => {
        setDate([event.start, event.end]);
        setNotes(event.notes);
    }, []);

    // handle popup form changes
    const notesChange = React.useCallback((ev) => {
        setNotes(ev.target.value);
    }, []);

    const onDeleteClick = React.useCallback(() => {
        deleteEvent(tempShift);
        setOpen(false);
    }, [deleteEvent, tempShift]);

    // scheduler options
    const onEventClick = React.useCallback((args) => {
        const event = args.event;
        const resource = staff.find((r) => { return r.id === event.resource });
        const slot = slots.find((s) => { return s.id === event.slot });
        setHeader('<div>Edit ' + resource.name + '\'s hours</div><div class="employee-shifts-day">' +
                formatDate('DDDD', new Date(event.start)) + ' ' + slot.name + ',' + formatDate('DD MMMM YYYY', new Date(event.start)) + '</div>');
        setMinTime(event.slot === 1 ? '07:00' : '12:00');
        setMaxTime(event.slot === 1 ? '13:00' : '18:00');
        setEdit(true);
        setTempShift({ ...event });
        // fill popup form with event data
        loadPopupForm(event);
        setOpen(true);
    }, [loadPopupForm]);

    const onEventCreated = React.useCallback((args) => {
        const event = args.event;
        const slot = slots.find((s) => { return s.id === event.slot });
        setHeader('<div>New shift</div><div class="employee-shifts-day">' +
            formatDate('DDDD', new Date(event.start)) + ' ' + slot.name + ',' + formatDate('DD MMMM YYYY', new Date(event.start)) + '</div>');
        setEdit(false);
        setMinTime(event.slot === 1 ? '07:00' : '12:00');
        setMaxTime(event.slot === 1 ? '13:00' : '18:00');
        setTempShift(event);
        // fill popup form with event data
        loadPopupForm(event);
        // open the popup
        setOpen(true);
    }, [loadPopupForm]);

    const onEventDeleted = React.useCallback((args) => {
        deleteEvent(args.event)
    }, [deleteEvent]);

    // popup options
    const popupButtons = React.useMemo(() => {
        if (isEdit) {
            return ['cancel', {
                handler: () => {
                    saveEvent();
                },
                keyCode: 'enter',
                text: 'Save',
                cssClass: 'mbsc-popup-button-primary'
            }];
        } else {
            return ['cancel', {
                handler: () => {
                    saveEvent();
                },
                keyCode: 'enter',
                text: 'Add',
                cssClass: 'mbsc-popup-button-primary'
            }];
        }
    }, [isEdit, saveEvent]);

    const onClose = React.useCallback(() => {
        if (!isEdit) {
            // refresh the list, if add popup was canceled, to remove the temporary event
            setShifts([...shifts]);
        }
        setOpen(false);
    }, [isEdit, shifts]);
    
    const extendDefaultEvent = React.useCallback((args) => {
        const d = args.start;
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), args.slot === 1 ? 7 : 12);
        const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), args.slot === 1 ? 13 : 18);

        return {
            title: formatDate('HH:mm', start) + ' - ' + formatDate('HH:mm', end),
            start: start,
            end: end,
            resource: args.resource
        };
    }, []);

    const renderMyResource = (resource) => {
        return <div className="employee-shifts-cont">
            <div className="employee-shifts-name">{resource.name}</div>
            <div className="employee-shifts-title">{resource.title}</div>
            <img className="employee-shifts-avatar" src={resource.img} alt="Avatar" />
        </div>;
    }
    
    const dateChange = React.useCallback((args) => {
        setDate(args.value);
    }, []);
    
    return <div>
        <Eventcalendar
            rtl={true}
            view={viewSettings}
            data={shifts}
            resources={staff}
            slots={slots}
            invalid={invalid}
            dragToCreate={false}
            dragToResize={false}
            dragToMove={true}
            clickToCreate={true}
            extendDefaultEvent={extendDefaultEvent}
            onEventClick={onEventClick}
            onEventCreated={onEventCreated}
            onEventDeleted={onEventDeleted}
            renderResource={renderMyResource}
            cssClass="md-employee-shifts"
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
                 <Input
                    ref={startRef}
                    dropdown={true}
                    label="Shift start">
                </Input>
                <Input
                    ref={endRef}
                    dropdown={true}
                    label="Shift end">
                </Input>
                <Datepicker
                    select="range"
                    controls={['time']}
                    startInput={start}
                    endInput={end}
                    display="anchored"
                    showRangeLabels={false}
                    touchUi={false}
                    onChange={dateChange}
                    value={shiftDate}
                    stepMinute={30}
                    timeWheels="|h:mm A|"
                    minTime={min}
                    maxTime={max}
                />
            </div>
            <div className="mbsc-form-group">
                <Textarea label="Notes" value={shiftNotes} onChange={notesChange} />
            </div>
            {isEdit && <div className="mbsc-button-group">
                <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete shift</Button>
            </div>}
        </Popup>
    </div>
}

export default ShiftSchedule;
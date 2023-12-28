import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormHelperText,
    ThemeProvider,
    Select,
    MenuItem,
    Dialog,
    InputLabel,
    FormControl,
    Stack,
} from "@mui/material";
import { theme } from "@/theme/theme";
import { toast } from "react-toastify";
import {
    createOrUpdateShift, deleteShift,
    getShiftsByOutpostId,
} from "@/services/shiftService.js";
import { daysOfWeekHebrew, hourArr } from "@/utils/dateUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

function ShiftDialog({ onCloseDialog, method, item }) {
    const queryClient = useQueryClient();
    const params = useParams();
    const outpostId = Number(params["id"]);
    const [shiftExistIndexes, setShiftExistIndexes] = useState([]);
    const actionHebrew = method === "POST" ? "הוסף" : "ערוך";
    const { data: shifts } = useQuery({
        queryFn: () => getShiftsByOutpostId(outpostId),
        queryKey: ["shifts", outpostId],
        select: (data) => {
            if (method === "POST") {
                return data;
            }
            return data?.filter(({ id }) => id !== item?.id);
        }
    });

    function isConflictingShift(shift, from, to) {
        // Checks if updated from hour is within the shift time range
        return (((from >= shift.fromHour && from < shift.toHour) ||
            // Checks if updated to hour is within the shift time range
            (to > shift.fromHour && to <= shift.toHour) ||
            // Checks if updated to and from are outside the shift time range
            (from <= shift.fromHour && to >= shift.toHour) ||
            // Checks if updated to and from are both within the shift time range
            (from >= shift.fromHour && to <= shift.toHour)));
    }

    console.log(shifts);
    const schema = yup.object().shape(
            {
                dayId:
                    yup.array()
                       .min(1, "חובה למלא יום בשבוע")
                       .max(7, "מקסימום 7 ימים")
                       .required()
                       .test("is-unique-shift", `משמרת כבר קיימת`, async function (value) {
                           const { fromHour, toHour } = this.parent;
                           const shiftExists = shifts?.filter((shift) => {
                               return value.includes(shift.dayId) && isConflictingShift(shift, fromHour, toHour);
                           });
                           setShiftExistIndexes([...new Set(shiftExists?.map(({ dayId }) => dayId - 1))] || []);
                           return shiftExists?.length === 0;
                       }),
                fromHour:
                    yup.number().min(0).max(24).required(),
                toHour:
                    yup.number().min(0).max(24).required()
                       .test("is-greater", "שעת הסיום חייבת להיות מאוחרת משעת ההתחלה", async function (value) {
                           const { fromHour } = this.parent;
                           return value > fromHour;
                       }),
            }
        )
    ;
    const {
        watch,
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            dayId: method === "PUT" ? [Number(item.dayId)] : [],
            fromHour: item ? Number(item.fromHour) : 8,
            toHour: item ? Number(item.toHour) : 11,
            outpostId,
            ...(method === "PUT" && { id: item.id }),
        },
        resolver: yupResolver(schema),
    });
    const onSubForm = async ({ fromHour, toHour, outpostId, dayId }) => {
        if (method === "PUT" && !isDirty) {
            // Form data has not changed, show a toast error
            toast.info("הטופס לא השתנה, נא שנה את אחד הפרמטרים");
            return;
        }
        try {
            if (method === "PUT") {
                await deleteShift(item.id);
            }
            await Promise.all(dayId.map((day) => {
                return createOrUpdateShift({
                    fromHour,
                    toHour,
                    outpostId,
                    dayId: day,
                });
            }));
            toast.success(`${dayId.length > 1 ? `${dayId.length} משמרות נשמרו` : "משמרת נשמרה"} בהצלחה`)
        } catch (error) {
            console.error(error);
            toast.error("שגיאה בשמירת המשמרת");
            return;
        }
        reset();
        await queryClient.invalidateQueries(["shifts"]);
        onCloseDialog()
    };

    const selectedDays = watch("dayId");

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={true}
                onClose={onCloseDialog}
                PaperProps={{
                    style: {
                        minWidth: "480px", // Set your minimum width here
                        maxWidth: "90vw", // Set a maximum width (e.g., 90% of viewport width)
                        padding: "20px",
                    },
                }}
            >
                <DialogTitle>
                    {actionHebrew} משמרות
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubForm)}>
                    <DialogContent style={{ padding: "10px 20px" }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label-day">ימים בשבוע</InputLabel>
                            <Select
                                labelId="select-label-day"
                                multiple
                                {...register("dayId", {
                                    required: { value: true, message: "חובה למלא יום בשבוע" },
                                    min: { value: 1, message: "מנימום יום ראשון" },
                                    max: { value: 7, message: "מנימום יום שבת" },
                                })}
                                label="יום בשבוע"
                                defaultValue={item?.dayId ? [Number(item.dayId)] : []}
                            >
                                {daysOfWeekHebrew.map((day, index) => (
                                    <MenuItem
                                        sx={selectedDays.includes(index + 1) ? (shiftExistIndexes?.includes(index) ? { color: "error.main" } : { fontWeight: 500 }) : {}}
                                        key={index + 1}
                                        value={index + 1}
                                    >
                                        {day}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText error={!!errors?.dayId} sx={{ height: "1.5em" }}>
                                {shiftExistIndexes?.length > 0 ? `משמרת כבר קיימת בימי ${shiftExistIndexes?.sort().map((index) => daysOfWeekHebrew[index]).join(", ")}` : ""} {/* error message dayId */}
                            </FormHelperText>
                        </FormControl>
                        <Stack direction="row" gap={2} sx={{ "&>*": { flex: 1 }, marginTop: "1.5em" }}>
                            <FormControl>
                                <InputLabel id="select-label-fromHour">משעה</InputLabel>
                                <Select
                                    labelId="select-label-fromHour"
                                    id="demo-simple-select"
                                    {...register("fromHour", {
                                        required: { value: true, message: "חובה למלא שעה" },
                                        min: { value: 1, message: "מנימום שעה 1:00" },
                                        max: { value: 24, message: "מקסימום שעה 24:00" },
                                    })}
                                    label="משעה"
                                    defaultValue={item ? item.fromHour : 8}
                                >
                                    {hourArr.map((hour, index) => (
                                        <MenuItem
                                            key={index}
                                            value={hour}
                                        >
                                            {hour}:00
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="select-label-toHour">עד שעה</InputLabel>
                                <Select
                                    labelId="select-label-toHour"
                                    id="demo-simple-select"
                                    {...register("toHour", {
                                        required: { value: true, message: "חובה למלא שעה" },
                                    })}
                                    label="עד שעה"
                                    defaultValue={item ? item.toHour : 11}
                                >
                                    {hourArr.map((hour, index) => (
                                        <MenuItem
                                            key={index}
                                            value={hour}
                                        >
                                            {hour}:00
                                        </MenuItem>
                                    ))}
                                </Select>
                                {/*<FormHelperText error={!!errors?.toHour}>*/}
                                {/*    {errors?.toHour && errors?.toHour?.message}*/}
                                {/*</FormHelperText>*/}
                            </FormControl>
                        </Stack>

                        {/* error message fromHour */}
                        <FormHelperText error={!!errors?.toHour} sx={{ height: "1.5em", paddingInlineStart: "1em" }}>
                            {errors?.toHour && errors?.toHour?.message}
                        </FormHelperText>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            type="button"
                            onClick={onCloseDialog}
                            style={{ marginLeft: "8px" }}
                        >
                            ביטול
                        </Button>
                        <Button type="submit">{actionHebrew}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </ThemeProvider>
    );
}

ShiftDialog.propTypes = {
    onCloseDialog: PropTypes.func.isRequired,
    method: PropTypes.oneOf(["PUT", "POST"]).isRequired,
    item: PropTypes.object,
};
export default ShiftDialog;

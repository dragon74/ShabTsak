import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
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
  Grid,
} from "@mui/material";
import { theme } from "@/theme/theme";
import { toast } from "react-toastify";
import {
  createOrUpdateShift,
  getShiftsByOutpostId,
} from "@/services/ShiftService";
import { daysOfWeekHebrew, hourArr } from "@/lib/utils/dateUtils";
import dayjs from "dayjs";

function ShiftDialog({ openDialog, setOpenDialog, method, item }) {
  const queryClient = useQueryClient();
  const params = useParams();
  const outpostId = Number(params["id"]);

  const { data: shifts } = useQuery({
    queryFn: () => getShiftsByOutpostId(outpostId),
    queryKey: ["shifts", outpostId],
  });

  const defaultDayId = method === "PUT" ? Number(item.dayId) : 1; // Set a default day value when not in "PUT" mode
  const defaultFromHour = method === "PUT" ? Number(item.fromHour) : 8; // Set a default "fromHour" value
  const defaultToHour = method === "PUT" ? Number(item.toHour) : 11; // Set a default "toHour" value

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      dayId: defaultDayId,
      fromHour: defaultFromHour,
      toHour: defaultToHour,
      outpostId,
      ...(method === "PUT" && { id: item.id }),
    },
    resolver: (data) => {
      const validationErrors = {};
      if (!isFromHourValid(data.fromHour, data.toHour)) {
        validationErrors.fromHour = {
          type: "manual",
          message: "שעת התחלה חייבת להיות פחותה משעת סיום",
        };
      }
      if (Object.keys(validationErrors).length > 0) {
        return {
          values: data,
          errors: validationErrors,
        };
      }
      return {
        values: data,
        errors: {},
      };
    },
  });

  const actionHebrew = useMemo(() => {
    if (method === "POST") return "הוסף";
    else if (method === "PUT") return "ערוך";
    else return method;
  }, [method]);

  const onSubForm = async ({ fromHour, toHour, outpostId, dayId }) => {
    if (method === "PUT" && !isDirty) {
      // Form data has not changed, show a toast error
      toast.info("הטופס לא השתנה, נא שנה את אחד הפרמטרים");
      return;
    }

    const isDuplicate =
      shifts &&
      shifts.some((shift) => {
        return (
          outpostId === shift.outpostId &&
          dayId === shift.dayId &&
          // fromHour obj inside the shift time range
          ((fromHour >= shift.fromHour && fromHour < shift.toHour) ||
            //toHour obj inside the shift time range
            (toHour > shift.fromHour && toHour <= shift.toHour) ||
            //all obj outside the shift time range
            (fromHour <= shift.fromHour && toHour >= shift.toHour) ||
            //all obj inside the shift time range
            (fromHour >= shift.fromHour && toHour <= shift.toHour))
        );
      });
    if (isDuplicate) {
      // Show an error message or handle the duplicate case here
      toast.error("המשמרת בשעות הללו כבר קיימת ברשימת המשמרות");
      return;
    }
    // If it's not a duplicate do create or update
    await createOrUpdateShift({ fromHour, toHour, outpostId, dayId }, method, item);

    //  clear the shifts query
    if (method === "POST") reset();
    queryClient.invalidateQueries(["shifts"]);
    setOpenDialog(false);
  };

  const isFromHourValid = (fromHour, toHour) => {
    return Number(fromHour) < Number(toHour);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
        PaperProps={{
          style: {
            minWidth: "300px", // Set your minimum width here
            maxWidth: "90vw", // Set a maximum width (e.g., 90% of viewport width)
            padding: "20px",
          },
        }}
      >
        <DialogTitle>
          {actionHebrew} משמרת {item?.id && `יום ${dayjs().weekday(item?.dayId).format("dddd")}`}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubForm)}>
          <DialogContent style={{ padding: "10px 20px" }}>
            <InputLabel id="select-label-days">יום בשבוע</InputLabel>
            <Select
              fullWidth
              labelId="select-label-days"
              id="demo-simple-select"
              {...register("dayId", {
                required: { value: true, message: "חובה למלא יום בשבוע" },
                min: { value: 1, message: "מנימום יום ראשון" },
                max: { value: 7, message: "מנימום יום שבת" },
              })}
              defaultValue={defaultDayId} // Set this value to the default hour you want
              label="יום בשבוע"
            >
              {daysOfWeekHebrew.map((day, index) => (
                <MenuItem
                  sx={{ textAlign: "center" }}
                  key={index + 1}
                  value={index + 1}
                >
                  {day}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!errors.dayId}>
              {errors.dayId && errors?.dayId?.message}
            </FormHelperText>

            <Grid container spacing={2}>
              <Grid item>
                <InputLabel id="select-label-fromHour">משעה</InputLabel>
                <Select
                  labelId="select-label-fromHour"
                  id="demo-simple-select"
                  sx={{ textAlign: "center" }}
                  {...register("fromHour", {
                    required: { value: true, message: "חובה למלא שעה" },
                    min: { value: 1, message: "מנימום שעה 1:00" },
                    max: { value: 24, message: "מקסימום שעה 24:00" },
                  })}
                  label="משעה"
                  defaultValue={defaultFromHour}
                >
                  {hourArr.map((hour, index) => (
                    <MenuItem
                      sx={{ textAlign: "center" }}
                      key={index}
                      value={hour}
                    >
                      {hour}:00
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item>
                <InputLabel id="select-label-toHour">עד שעה</InputLabel>
                <Select
                  labelId="select-label-toHour"
                  id="demo-simple-select"
                  sx={{ textAlign: "center" }}
                  {...register("toHour", {
                    required: { value: true, message: "חובה למלא שעה" },
                  })}
                  label="עד שעה"
                  defaultValue={defaultToHour}
                >
                  {hourArr.map((hour, index) => (
                    <MenuItem
                      sx={{ textAlign: "center" }}
                      key={index}
                      value={hour}
                    >
                      {hour}:00
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText error={!!errors.toHour}>
                  {errors.toHour && errors?.toHour?.message}
                </FormHelperText>
              </Grid>
            </Grid>

            {/* error message fromHour */}
            <FormHelperText error={!!errors.fromHour}>
              {errors.fromHour && errors?.fromHour?.message}
            </FormHelperText>
          </DialogContent>

          <DialogActions>
            <Button
              type="button"
              onClick={() => setOpenDialog(false)}
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
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  method: PropTypes.oneOf(["PUT", "POST"]).isRequired,
  item: PropTypes.object,
};
export default ShiftDialog;

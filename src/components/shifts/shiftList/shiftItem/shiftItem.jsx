import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconButton, TableCell, TableRow, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ROUTES from "../../../../constants/routeConstants";
import ShiftItemDelete from "./shiftDeleteBtn/shiftDeleteBtn";
import ShiftDialog from "../../shiftDialog";

ShiftItem.propTypes = {
    doApiShifts: PropTypes.func.isRequired,
    item: PropTypes.object
}

function ShiftItem({ doApiShifts, item }) {

    const nav = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <TableRow>
            <TableCell align="center">{item.dayId}</TableCell>
            <TableCell align="center">{item.minGuards}</TableCell>
            <TableCell align="center">
                <Button
                    color="orange"
                    variant="outlined"
                    onClick={() => {
                        nav(ROUTES.SHIFTS + "/outpost/" + item.id)
                    }}
                >
                    משמרות
                </Button>
            </TableCell>
            <TableCell
                align="center"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    // style={{ marginRight: "8px" }}
                    color="secondary"
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                >
                    <EditIcon />
                </IconButton>
                {/* Outpost button delete */}
                <ShiftItemDelete item={item} doApiShifts={doApiShifts} />
            </TableCell>

            <ShiftDialog openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                method={"PUT"}
                doApiShifts={doApiShifts}
                item={item}
            />
        </TableRow>
    )
}

export default ShiftItem
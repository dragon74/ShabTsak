import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import {  TableCell, TableRow, Button } from "@mui/material";
import ROUTES from "../../../../constants/routeConstants";
import ShiftItemActions from './shiftItemActions/shiftItemActions';

ShiftItem.propTypes = {
    item: PropTypes.object
}

export default function ShiftItem({ item }) {

    const nav = useNavigate();

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

              <ShiftItemActions item={item}/>

            </TableCell>
        </TableRow>
    )
}


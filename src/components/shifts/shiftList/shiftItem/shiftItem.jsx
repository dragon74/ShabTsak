import PropTypes from 'prop-types';
import {  TableCell, TableRow } from "@mui/material";
import ShiftItemActions from './shiftItemActions/shiftItemActions';

ShiftItem.propTypes = {
    item: PropTypes.object
}

export default function ShiftItem({ item }) {


    return (
        <TableRow>
            <TableCell align="center">{item.dayId}</TableCell>
            <TableCell align="center">{item.fromHour}:00</TableCell>
            <TableCell align="center">{item.toHour}:00</TableCell>
            
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


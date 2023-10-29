import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow, Button } from "@mui/material";
import ROUTES from "../../../../constants/routeConstants";
import OutpostItemActions from './outpostItemActions/outpostItemAction';

OutpostItem.propTypes = {
    item: PropTypes.object.isRequired
}

function OutpostItem({ item }) {
    const nav = useNavigate();

    return (
        <TableRow>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.minGuards}</TableCell>

            <TableCell align="center">
                <Button
                    color="orange"
                    variant="outlined"
                    onClick={() => {
                        nav(`${ROUTES.SHIFTS}/outpost/${item.id}/${item.name}`)
                    }}
                >
                    משמרות
                </Button>
            </TableCell>

            {/* action btns */}
            <TableCell
                align="center"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
              <OutpostItemActions item={item}/>
            </TableCell>

        </TableRow>
    )
}

export default OutpostItem
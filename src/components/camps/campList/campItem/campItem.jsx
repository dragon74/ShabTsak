import PropTypes from 'prop-types';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ROUTES from '../../../../constants/routeConstants';
import DialogCamp from "../../dialogCamp";
import CampDeleteBtn from './campDeleteBtn/campDeleteBtn';

CampItem.propTypes = {
    index: PropTypes.number.isRequired,
    doApiCamps: PropTypes.func.isRequired,
    item: PropTypes.object
}

function CampItem ({ item, index, doApiCamps })  {
    const [openDialog, setOpenDialog] = useState(false);
    const nav = useNavigate();
    return (
        <TableRow>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">
                <Button
                    color="purple"
                    variant="outlined"
                    onClick={() => {
                        nav(`${ROUTES.OUTPOSTS}/camp/${item.id}/${item.name}`)
                    }}
                >
                    עמדות
                </Button>
            </TableCell>
            <TableCell align="center">
                <Button
                    color="brown"
                    variant="outlined"
                    onClick={() => {
                        nav(`${ROUTES.GUARDS}/camp/${item.id}/${item.name}`)
                    }}
                >
                    שומרים
                </Button>
            </TableCell>
            {/* action btns */}
            <TableCell
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    // sx={{ marginRight: "8px" }}
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                    color="secondary">
                    <EditIcon />
                </IconButton>

                {/* button delete camp */}
                <CampDeleteBtn item={item} doApiCamps={doApiCamps} />
            </TableCell>

            <DialogCamp openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                method={"PUT"}
                doApiCamps={doApiCamps}
                item={item}
            />

        </TableRow>
    )
}

export default CampItem
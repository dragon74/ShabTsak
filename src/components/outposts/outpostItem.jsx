import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconButton, TableCell, TableRow, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ROUTES from "../../constants/routeConstants";
import DeleteOutpost from "./deleteOutpost/deleteOutpost";
import DialogOutpost from "./dialogOutpost";

OutpostItem.propTypes = {
    doApiOutposts: PropTypes.func.isRequired,
    item: PropTypes.object
}

function OutpostItem({ doApiOutposts, item }) {

    const nav = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <TableRow>
            <TableCell align="center">{item.name}</TableCell>
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

                {/* button delete Outpost */}
                <DeleteOutpost item={item} doApiOutposts={doApiOutposts} />
            </TableCell>

            <DialogOutpost openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                method={"PUT"}
                doApiOutposts={doApiOutposts}
                item={item}
            />
        </TableRow>
    )
}

export default OutpostItem
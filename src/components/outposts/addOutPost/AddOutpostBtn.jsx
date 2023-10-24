/* eslint-disable react/prop-types */

import {Button} from "@mui/material";

const AddOutpostBtn = ({ setOpenDialog }) => {
    return (
        <Button type="button"
            color="primary"
            variant="contained"
            onClick={() => {
                setOpenDialog(true);
            }}
        >
            הוסף עמדה
        </Button>
    )
}

export default AddOutpostBtn
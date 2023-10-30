import PropTypes from 'prop-types';
import { Button, Box } from "@mui/material";

AddOutpostBtn.propTypes = {
    setOpenDialog: PropTypes.func.isRequired,
}

export default function AddOutpostBtn ({ setOpenDialog }) {
    return (
        <Box  style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
            <Button type="button"
                color="primary"
                variant="contained"
                onClick={() => {
                    setOpenDialog(true);
                }}
            >
                הוסף עמדה
            </Button>
        </Box>
    )
}

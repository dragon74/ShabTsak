import PropTypes from 'prop-types';
import { Button, Box } from "@mui/material";

export default function AddShiftBtn ({ setOpenDialog })  {
    return (
        <Box  style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
            <Button type="button"
                color="primary"
                variant="contained"
                onClick={() => {
                    setOpenDialog(true);
                }}
            >
                הוסף משמרת
            </Button>
        </Box>
    )
}

AddShiftBtn.propTypes = {
    setOpenDialog: PropTypes.func.isRequired,
}


import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

function AddCampBtn({ setOpenDialog })  {
  return (
    <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
      <Button variant="contained"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        הוסף בסיס
      </Button>
    </Box>
  )
}

AddCampBtn.propTypes = {
  setOpenDialog: PropTypes.func.isRequired,
}

export default AddCampBtn
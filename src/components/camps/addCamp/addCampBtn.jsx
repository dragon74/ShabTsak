/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';

const AddCampBtn = ({ setOpenDialog }) => {
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

export default AddCampBtn
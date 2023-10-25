import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export default function LoadingComp() {
    return (
        <Box style={{ display: "flex", alignItems: "center" }}>
            <CircularProgress size={"50px"} sx={{ margin: '0 auto' }} />
        </Box>
    )
}

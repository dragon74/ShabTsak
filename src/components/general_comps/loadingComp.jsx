import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export default function LoadingComp() {
    return (
        <Box sx={{ display: "flex", alignItems: "center",minHeight:"40vh" }}>
            <CircularProgress size={"50px"} sx={{ margin: '0 auto' }} />
        </Box>
    )
}

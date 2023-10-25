import { Box, Container, Button, Typography } from "@mui/material";
import ROUTES from "../../constants/routeConstants.js";
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    // Push the footer to the bottom
    <Container sx={{ mt: 'auto', pb: 0.5, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box component="nav">
            <Button component={RouterLink} variant="link" to={ROUTES.HOME}>עמוד הבית</Button>
            <Button component={RouterLink} variant="link" to={ROUTES.PRIVACY}>פרטיות</Button>
        </Box>
        <Box>
            <Typography variant="body2" gutterBottom={false}>2023 Chaya & Dan & Hadas & Niv & Ofir  ©</Typography>
        </Box>
    </Container>
  )
}

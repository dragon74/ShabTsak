import { Box, Stack, Button, Typography, Container } from "@mui/material";
import ROUTES from "../../../constants/routeConstants.js";
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
      <Container sx={{ mt: 'auto' }}>
          <Stack sx={{ pb: 0.5, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} direction={{ sm: "row" }} paddingX={2}>
              <Box component="nav">
                  <Button component={RouterLink} variant="link" to={ROUTES.HOME}>עמוד הבית</Button>
                  <Button component={RouterLink} variant="link" to={ROUTES.PRIVACY}>פרטיות</Button>
                  <Button component={RouterLink} variant="link" to={ROUTES.TERMS}>תנאי שימוש</Button>
              </Box>
              <Box textAlign="center">
                  <Typography variant="body2" gutterBottom={false}>2023 Chaya & Dan & Hadas & Niv & Ofir  ©</Typography>
              </Box>
          </Stack>
      </Container>
  )
}

import { Box, Container, CssBaseline, Typography  } from '@mui/material'
import ROUTES from "../../constants/routeConstants"
import BackLink from './backLink'

export default function NotFound() {
    return (
        <div>
            <CssBaseline />
            <Container fixed>
                <Box textAlign={"center"} mt={4}>
                    <Typography variant="h4" component="h2" >
                        עמוד לא נמצא 404!
                    </Typography>
                    <BackLink to={ROUTES.HOME}>
                        חזרה לעמוד הבית
                    </BackLink>
                </Box>
            </Container>
        </div>
    )
}

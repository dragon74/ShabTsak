import { Box, Container, CssBaseline, Typography, Link as MuiLink  } from '@mui/material'
import { Link } from 'react-router-dom'
import ROUTES from "../../constants/routeConstants"

export default function NotFound() {
    return (
        <div>
            <CssBaseline />
            <Container fixed>
                <Box textAlign={"center"} mt={4}>
                    <Typography variant="h4" component="h2" >
                        עמוד לא נמצא 404!
                    </Typography>
                    <MuiLink component={Link} to={ROUTES.HOME}>
                        חזרה לעמוד הבית
                    </MuiLink>
                </Box>
            </Container>
        </div>
    )
}

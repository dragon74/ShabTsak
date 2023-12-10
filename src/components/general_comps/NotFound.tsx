import { Box, Container, CssBaseline, Typography  } from '@mui/material'
import BackLink from './BackLink.jsx'

export default function NotFound() {
    return (
        <div>
            <CssBaseline />
            <Container fixed>
                <Box textAlign={"center"} mt={4}>
                    <Typography variant="h4" component="h2" >
                        עמוד לא נמצא 404!
                    </Typography>
                    <BackLink>
                        חזרה לעמוד הבית
                    </BackLink>
                </Box>
            </Container>
        </div>
    )
}

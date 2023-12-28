import { Box, Container, CssBaseline, Typography  } from '@mui/material'
import BackLink from './BackLink.jsx'

export default function NotFound() {
    return (
        <div>
            <CssBaseline />
            <Container fixed>
                <Box mt={4}>
                    <BackLink>
                        חזרה לעמוד הקודם
                    </BackLink>
                    <Typography sx={{ textAlign: "center" }} variant="h4" component="h2" >
                        עמוד לא נמצא 404!
                    </Typography>
                </Box>
            </Container>
        </div>
    )
}

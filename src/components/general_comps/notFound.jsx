import { Box, Container, CssBaseline } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='not-found-comp'>
            <CssBaseline />
            <Container fixed>
                <Box textAlign={"center"}>
                    <h2>עמוד לא נמצא 404!</h2>
                    <Link to="/">חזרה לעמוד הבית</Link>
                </Box>
            </Container>
        </div>

    )
}

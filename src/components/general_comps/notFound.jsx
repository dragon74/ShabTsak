import { Container, CssBaseline } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='not-found-comp'>
            <CssBaseline />
            <Container fixed>
                <h1>page not found 404!</h1>
                <Link to="/"> Back to website</Link>
            </Container>
        </div>

    )
}

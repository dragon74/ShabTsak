import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='not-found-comp bg-light p-5 text-center'>
            <h1 className='text-center'>page not found 404!</h1>
            <Link to="/"> Back to home</Link>
        </div>

    )
}

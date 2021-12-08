import { Link } from 'react-router-dom'

const Header = ( {pageTitle} ) => {
    return (
        <header className='header'>
            <h1>{pageTitle}</h1>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
        </header> 
    )
}

export default Header

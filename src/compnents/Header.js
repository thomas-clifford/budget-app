import { Link } from 'react-router-dom'

const Header = ( {pageTitle} ) => {
    return (
        <header className='header'>
            <Link to='/'>
                <h1 style={{paddingRight: '10px'}}>{pageTitle}</h1>
            </Link>
        </header> 
    )
}

export default Header

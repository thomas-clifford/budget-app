import { Link } from 'react-router-dom'
import Month from './Month.js'

const Months = ({ monthsOfTheYear }) => {

    return (
        <div>
            {monthsOfTheYear.map((month) =>
                <Link to={`/${month.name}`}>
                    <Month month={month.name} amount={month.remainingMoney}/>
                </Link>
            )}
        </div>
    )
}

export default Months

import { Link } from 'react-router-dom'
import Month from './Month.js'

const Months = ({ monthsOfTheYear }) => {

    return (
        <div className='gridWrapper'>
            {monthsOfTheYear.map((month) =>
                <Link className='monthLink'
                    style={{
                        backgroundColor: `${month.remainingMoney.includes('-') ? 'rgba(221, 66, 66, 0.925)' : 'rgba(79, 192, 103, 0.925)'}`
                    }}
                    to={`/${month.name}`}>
                    <Month 
                        month={month.name} 
                        amount={month.remainingMoney}
                        monthColor={month.remainingMoney.includes('-') ? 'red' : 'green'}/>
                </Link>
            )}
        </div>
    )
}

export default Months

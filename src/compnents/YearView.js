import { useState } from 'react'
import Months from "./Months"

const YearView = ({ years }) => {

    const [currentYear, setCurrentYear] = useState(years[years.length-1])

    const handleYearSelection = val => {
        const year = val.target.value
        setCurrentYear(years.filter(y => (y.name === year))[0])
    }


    return (
        <div className='homePage'>
            <h3>Year</h3>
            <select
                className='yearSelect'
                defaultValue={years[years.length-1].name}
                onChange={handleYearSelection}
                style={{display: 'block'}}>
                    {years.map((year) => (
                        <option key={year.name}>{year.name}</option>
                    ))}
            </select>
            <h3>Month</h3>
            <Months monthsOfTheYear={currentYear.months}/>
        </div>
    )
}

export default YearView

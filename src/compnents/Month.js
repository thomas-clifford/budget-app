const Month = ({month, amount, monthColor}) => {
    console.log(monthColor)
    return (
        <div className='month' style={{backgroundColor: monthColor}}>
            <h3>{month}</h3>
            <p>{amount}</p>
        </div>
    )
}

export default Month

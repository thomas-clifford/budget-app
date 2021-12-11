import SpendingCategory from "./SpendingCategory"

const MonthView = ({ month }) => {

    const spendingCategories = [
        'Housing',
        'Transportation',
        'Food',
        'Personal Care',
        'Entertainment',
        'Loans',
        'Insurance',
        'Savings and Investments',
        'School'
    ]

    return (
        <div className='monthView'>
            <div>
                <h1>{month}</h1>
            </div>
            {spendingCategories.map((category) => 
                <SpendingCategory categoryName={category}/>
            )}
        </div>
    )
}

export default MonthView

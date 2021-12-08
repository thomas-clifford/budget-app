const SpendingCategory = ({ categoryName }) => {
    return (
        <div>
            <h3>{categoryName}</h3>
            <thead>
                <ul>
                    <li>{categoryName}</li>
                    <li>Projected Cost</li>
                    <li>Actual Cost</li>
                    <li>Difference</li>
                </ul>
            </thead>
            <tbody>
                <ul>
                    <li><input type='text'/></li>
                    <li><input type='text'/></li>
                    <li><input type='text'/></li>
                    <li>Projected - Actual</li>
                </ul>
            </tbody>
            <button>+</button>
        </div>
    )
}

export default SpendingCategory

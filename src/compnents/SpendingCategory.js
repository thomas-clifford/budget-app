const SpendingCategory = ({ categoryName }) => {
    return (
        <div className='spendingCategory'>
            <h3>{categoryName}</h3>
            <table className='spendingCategoryTable'>
                <tr>
                    <th>Product/Service</th>
                    <th>Projected Cost</th>
                    <th>Actual Cost</th>
                    <th>Difference</th>
                </tr>
                <tr>
                    <td>item</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                </tr>
            </table>
            <br/>
            <table className='spendingCategoryAddTable'>
                <tr>
                    <th>product/service</th>
                    <th>price</th>
                    <th>add item</th>
                </tr>
                <tr>
                    <td>
                        <select className='productSelect'>
                            <option>item</option>
                            <option>new entry</option>
                        </select>
                    </td>
                    <td>
                        <input className='productPrice' type='text'></input>
                    </td>
                    <td><button className='btn'>+</button></td>
                </tr>
            </table>
        </div>
    )
}

export default SpendingCategory

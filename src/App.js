import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './compnents/Header.js'
import MonthView from './compnents/MonthView.js'
import YearView from './compnents/YearView.js'

const years = [
  {
      name: '2020',
      months: [
          {
              name: 'january',
              remainingMoney: '$0.70'
          },
          {
              name: 'february',
              remainingMoney: '$6.80'
          },
          {
              name: 'march',
              remainingMoney: '$0.00'
          },
          {
              name: 'april',
              remainingMoney: '$0.87'
          },
          {
              name: 'may',
              remainingMoney: '-$0.50'
          },
          {
              name: 'june',
              remainingMoney: '$3.00'
          },
          {
              name: 'july',
              remainingMoney: '$12.00'
          },
          {
              name: 'august',
              remainingMoney: '-$4.05'
          },
          {
              name: 'september',
              remainingMoney: '$0.70'
          },
          {
              name: 'october',
              remainingMoney: '$34.00'
          },
          {
              name: 'november',
              remainingMoney: '$0.50'
          },
          {
              name: 'december',
              remainingMoney: '$34.00'
          },
      ]
  },
  {
      name: '2021',
      months: [
          {
              name: 'january',
              remainingMoney: '$1.40'
          },
          {
              name: 'february',
              remainingMoney: '$16.50'
          },
          {
              name: 'march',
              remainingMoney: '$0.34'
          },
          {
              name: 'april',
              remainingMoney: '$1.45'
          },
          {
              name: 'may',
              remainingMoney: '-$65.30'
          },
          {
              name: 'june',
              remainingMoney: '$3.23'
          },
          {
              name: 'july',
              remainingMoney: '$2.03'
          },
          {
              name: 'august',
              remainingMoney: '-$5.07'
          },
          {
              name: 'september',
              remainingMoney: '$4.70'
          },
          {
              name: 'october',
              remainingMoney: '$3.00'
          },
          {
              name: 'november',
              remainingMoney: '$0.52'
          },
          {
              name: 'december',
              remainingMoney: '$123.00'
          },
      ]
  },
  {
      name: '2022',
      months: [
          {
              name: 'january',
              remainingMoney: '$2.77'
          },
          {
              name: 'february',
              remainingMoney: '$21.50'
          },
          {
              name: 'march',
              remainingMoney: '$0.34'
          },
          {
              name: 'april',
              remainingMoney: '$3.41'
          },
          {
              name: 'may',
              remainingMoney: '$5.30'
          },
          {
              name: 'june',
              remainingMoney: '$8.23'
          },
          {
              name: 'july',
              remainingMoney: '$6.03'
          },
          {
              name: 'august',
              remainingMoney: '-$5.67'
          },
          {
              name: 'september',
              remainingMoney: '$4.70'
          },
          {
              name: 'october',
              remainingMoney: '$45.00'
          },
          {
              name: 'november',
              remainingMoney: '$87.52'
          },
          {
              name: 'december',
              remainingMoney: '$123.00'
          },
      ]
  }
]

const App = () => {
  return (
    <Router>
      <div>
        <Header pageTitle='Budget App'/>
      </div>
      <Switch>
        <Route path='/about'>
          <h2>about page</h2>
          <h4>Author: Thomas Clifford</h4>
          <h4>Disclaimer: No keyboards were harmed in the making of this website.</h4>
        </Route>
        <Route path='/january'>
          <MonthView month='January'/>
        </Route>
        <Route path='/february'>
          <MonthView month='February'/>
        </Route>
        <Route path='/march'>
          <MonthView month='March'/>
        </Route>
        <Route path='/april'>
          <MonthView month='April'/>
        </Route>
        <Route path='/may'>
          <MonthView month='May'/>
        </Route>
        <Route path='/june'>
          <MonthView month='June'/>
        </Route>
        <Route path='/july'>
          <MonthView month='July'/>
        </Route>
        <Route path='/august'>
          <MonthView month='August'/>
        </Route>
        <Route path='/september'>
          <MonthView month='September'/>
        </Route>
        <Route path='/october'>
          <MonthView month='October'/>
        </Route>
        <Route path='/november'>
          <MonthView month='November'/>
        </Route>
        <Route path='/december'>
          <MonthView month='December'/>
        </Route>
        <Route path='/'>
          <YearView years={years}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App

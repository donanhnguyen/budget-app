import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import calculatePayCheck from '../js/calculatePayCheck';
import NewExpenseFormContainer from './new_expense_form_container';

class EditBudget extends React.Component {

    constructor(props) {
        super(props);
    }  

    componentDidMount () {
        var {currentBudget, currentUser} = this.props;
        if (currentUser && currentBudget) {
            var currentBudgetId = currentBudget.id;
            var currentUserId = currentUser.id
            this.props.fetchExpenses(currentUserId, currentBudgetId);
        }
    }

    componentWillUnmount () {
        this.props.resetBudgets();
    }

    calculateTakeHomePay () {
        var {currentBudget} = this.props;
        var takeHomePay = calculatePayCheck(currentBudget.salary, "monthly");
        return takeHomePay;
    }

    render () {
        var {currentBudget, currentUser} = this.props;
        var {currentExpenses} = this.props;
        var totalExpenses = 0;
        currentExpenses.forEach((expense) => {
            totalExpenses += expense.amount;
        })
        var moneySpent = totalExpenses;
        if ((currentUser || JSON.parse(localStorage.getItem('loggedInUser'))) && currentBudget) {
            return (
                <div >
                    <div className='year-and-salary-info'>
                        <h1>Month of {currentBudget.month} {currentBudget.year}</h1>
                        <h1>${currentBudget.salary.toLocaleString()} annual salary</h1>
                    </div>
                    
                    <div>
                        <NewExpenseFormContainer moneySpent={moneySpent} currentBudget={currentBudget} takeHomePayDataset={this.calculateTakeHomePay()}/>
                    </div>
                </div>
            ) 
        } else {
            return <Redirect to='/'/>
        }
    }

}

export default EditBudget;
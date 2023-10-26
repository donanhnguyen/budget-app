import React from 'react';
import ReactDOM from 'react-dom';
import createPieChart from '../js/createPieChart';
import Expense from './expense';

class NewExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: null,
            amount: 0,
            date: null,
            description: null,
            user_id: this.props.currentUser ? this.props.currentUser.id : JSON.parse(localStorage.getItem('loggedInUser')).id,
            currentTakeHomePay: this.props.takeHomePayDataset[0].amount
        }
    }

    generatePayInfo () {
        var {takeHomePayDataset, currentExpenses, moneySpent} = this.props;
        var pieChart = ReactDOM.findDOMNode(this.refs.pieChart);
        pieChart.innerHTML = "";
        var allExpenses = [];
        for (let j=0; j<takeHomePayDataset.length; j++) {
            allExpenses.push(takeHomePayDataset[j]);
        }
        var expenseObject = {};
        for (let i = 0; i<currentExpenses.length; i++) {
            let currentExpense = currentExpenses[i];
            if (!expenseObject[currentExpense.category]) {
                expenseObject[currentExpense.category] = currentExpense.amount;
            } else {
                expenseObject[currentExpense.category] += currentExpense.amount;
            }
        }
        var expenseObjectKeys = Object.keys(expenseObject);
        for (let k=0; k < expenseObjectKeys.length; k++) {
            var expenseCategoryObject = {};
            var currentKey = expenseObjectKeys[k];
            expenseCategoryObject['type'] = currentKey;
            expenseCategoryObject['amount'] = expenseObject[currentKey];
            allExpenses.push(expenseCategoryObject);
        }
        
        allExpenses.forEach((expense) => {
            if (expense.type === 'Take-Home') {
                expense.amount = this.state.currentTakeHomePay - moneySpent;
            }
        })

        return allExpenses;
    }

    generatePieChart (array) {
        var pieChart = ReactDOM.findDOMNode(this.refs.pieChart);
        pieChart.innerHTML = "";
        createPieChart(array);
    }

    componentDidUpdate () {
        this.generatePieChart(this.generatePayInfo());
    }

    componentWillUnmount () {
        this.props.resetExpenses();
        this.props.resetExpenseErrors();
    }

    afterExpenses () {
        var {moneySpent} = this.props;
        return this.state.currentTakeHomePay - moneySpent;
    }

    update (field) {
        return (event) => {
            this.setState({
                [field]: event.currentTarget.value
            })
        }
    }

    clearForm () {
        const postFormReset = ReactDOM.findDOMNode(this.refs.postFormReset);
        postFormReset.reset();
        const category = ReactDOM.findDOMNode(this.refs.category);
        category.selectedIndex = 0;
        this.setState({
            category: null,
            amount: null,
            description: null
        })
    }

    submitExpense (event) {
        event.preventDefault();
        var currentBudgetId = this.props.currentBudget.id;
        const createdExpense = Object.assign({}, this.state);
        this.props.createExpense(this.state.user_id, currentBudgetId, createdExpense);
        this.props.resetExpenseErrors();
        this.clearForm();
    }

    displayAllExpenses () {
        var {currentExpenses, currentBudget, deleteExpense, updateExpense} = this.props;
        var sortedExpenses = currentExpenses.sort((a, b) => {
            var keyA = new Date (a.date);
            var keyB = new Date (b.date);
            return keyA - keyB;
        })
        var displayExpenses = sortedExpenses.map((expense) => {
            return (
                <li>
                    <Expense 
                        expense={expense} 
                        currentBudget={currentBudget} 
                        currentUserId={this.state.user_id}
                        deleteExpense={deleteExpense}
                        updateExpense={updateExpense}
                    />
                </li>
            )
        })
        var display = currentExpenses.length > 0 ? displayExpenses.reverse() : <h1>You don't have any expenses yet.</h1>
        return display;
    }

    displayErrors () {
        var displayErrors = this.props.expenseErrors.map((error, i) => {
            return <li style={{color: 'red'}} key={`${i}`}>{error}</li>;
        })
        if (this.props.expenseErrors.length > 0) {
            return displayErrors;
        }
    }

    monthNameToNumber(monthName) {
        const {year} = this.props.currentBudget
        // Create a new Date object using the month name
        const date = new Date(`${monthName} 1, ${year}`); 
      
        // Use the getMonth method to get the month number (0-based)
        let monthNumber = date.getMonth() + 1; // Adding 1 to make it 1-based
        if (monthNumber.toString().length == 1) {
            monthNumber = "0" + monthNumber;
        }
        return monthNumber;
      }

    lastDay() {
        const {year, month} = this.props.currentBudget

        const date = new Date(`${month} 1, ${year}`); 
      
        let monthNumber = date.getMonth() + 1; // Adding 1 to make it 1-based

        let lastDay;

        if ([4, 6, 9, 11].includes(monthNumber)) {
            lastDay = 30; // April, June, September, November
        } else if (monthNumber === 2) {
        // February
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            lastDay = 29; // Leap year
        } else {
            lastDay = 28; // Non-leap year
        }
        } else {
            lastDay = 31; // All other months
        }
        return lastDay;
    }

    render () {

        const {year, month} = this.props.currentBudget
 
        const minDate = `${year}-${this.monthNameToNumber(month)}-01`;
        const maxDate = `${year}-${this.monthNameToNumber(month)}-${this.lastDay()}`;

        return (
            <div>
                <div className='take-home-info'>
                    <h1 class="page-title">Take-home monthly pay: ${this.state.currentTakeHomePay.toLocaleString()}</h1>
                    <h1 class="page-title">Leftover AFTER expenses:<span className='leftover'>${this.afterExpenses().toLocaleString()}</span></h1>
                </div>
                
                <div class="flex-container">
                    
                    <div ref='pieChart' class='left' id='pie-chart'></div>

                    <div ref='postForm' class={`post-form-container`}>

                        <form ref='postFormReset' class="custom-form" onSubmit={this.submitExpense.bind(this)}>
                            <div class="custom-form-group">
                                <label for='category'>Category</label>
                                <select class='custom-category-dropdown' ref='category' id='category' onChange={this.update('category')}>
                                    <option value="" selected disabled hidden>Choose Category</option>
                                    <option value="Housing">Housing</option>
                                    <option value="Food">Food</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Misc">Misc</option>
                                </select>
                            </div>
                            <div class="custom-form-group">
                                <label for='amount'>Amount</label>
                                <input class='custom-subject' id='amount' type='number' onChange={this.update('amount')}/>
                            </div>
                            <div class="custom-form-group">
                                <label for='date'>Date</label>
                                <input class='custom-subject' id='date' type='date' onChange={this.update('date')}
                                    min={minDate}
                                    max={maxDate}
                                />
                            </div>
                            <div class="custom-form-group">
                                <label for='description'>Description</label>
                                <input class='custom-subject' id='description' type='text' onChange={this.update('description')}/>
                            </div>
                            <div class="custom-form-group">
                                <input class='post-submit-button' type='submit' value='Add New Expense' />
                            </div>
                        </form>

                        <div class="form-group">
                            <ul class="error-list">{this.displayErrors()}</ul>
                        </div>
                    </div>
                </div>
                <div class='clearfix'></div>
                <div class='all-expenses'>
                    <ul>
                        {this.displayAllExpenses()}
                    </ul>
                </div>
            </div>

        )
    }

}

export default NewExpenseForm;
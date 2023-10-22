import React from 'react';
import Budget from './budget';
import NewBudgetFormContainer from './new_budget_form_container';

class YourBudgets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {ready: false};
    }

    sortBudgets (budgets) {
        const monthMap = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
            July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
          };
          
          // Sort the budgets array
          budgets.sort((a, b) => {
            // Compare years first
            const yearComparison = b.year.toString().localeCompare(a.year.toString());
            if (yearComparison !== 0) {
              return yearComparison;
            }
          
            // If years are the same, compare months
            const monthA = monthMap[a.month];
            const monthB = monthMap[b.month];
            return monthB - monthA;
         })
          
          return budgets
    }

    yourBudgets () {
        var budgets = this.sortBudgets(this.props.currentUserBudgets);
        var displayBudgets = budgets.map((singleBudget) => {
            return (
                <div>
                    <Budget 
                        budget={singleBudget} 
                        deleteBudget={this.props.deleteBudget} 
                        currentUser={this.props.currentUser}>
                    </Budget>
                </div>
            )
        });
        return displayBudgets;
    }  

    componentDidMount () {
        if (this.props.currentUser || JSON.parse(localStorage.getItem('loggedInUser'))) {
             this.props.fetchBudgets(this.props.currentUser ? this.props.currentUser.id : JSON.parse(localStorage.getItem('loggedInUser')).id);
        }
        setTimeout(function () {
            this.setState({ready: true});
        }.bind(this), 500);
    }

    zeroBudgets () {
        if (this.props.currentUserBudgets.length === 0) {
            return <div><h1>You do not have any budgets!</h1></div>
        };
    }

    render () {
        if (this.state.ready) {
            if (this.props.currentUser || JSON.parse(localStorage.getItem('loggedInUser'))) {
                return (
                    <div class="home-page-container">
                        <div>
                            {this.zeroBudgets()}
                            {this.yourBudgets()}
                        </div>
                        <div>
                            <NewBudgetFormContainer />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1>You are not logged in, please login or sign up!</h1>
                    </div>
                )
            } 
        } else {
            return <div class='loader'></div>
        }
    }

}

export default YourBudgets;
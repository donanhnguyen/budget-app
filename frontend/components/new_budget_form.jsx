import React from 'react';
import ReactDOM from 'react-dom';

class NewBudgetForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            month: null,
            year: new Date().getFullYear(),
            salary: null,
            user_id: this.props.currentUser ? this.props.currentUser.id : null,
        }
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
        const budgetMonth = ReactDOM.findDOMNode(this.refs.month);
        budgetMonth.selectedIndex = 0;
        this.setState({
            month: null,
            year: null,
            salary: null
        })
    }

    submitBudget(event) {
        event.preventDefault();
        const createdBudget = Object.assign({}, this.state);
        this.props.createBudget(this.props.currentUser.id, createdBudget);
        this.props.resetBudgetErrors();
        this.clearForm();
    }

    componentWillUnmount () {
        this.props.resetBudgetErrors();
    }

    displayBudgetErrors () {
        var displayErrors = this.props.budgetErrors.map((error, i) => {
            return <li style={{color: 'red'}} key={`${i}`}>{error}</li>;
        })
        if (this.props.budgetErrors.length > 0) {
            return displayErrors;
        }
    }
    generateYearOptions() {
        const currentYear = new Date().getFullYear();
        const yearsToShow = 10; // You can adjust the number of years to show
      
        const yearOptions = [];
        for (let i = currentYear; i >= currentYear - yearsToShow; i--) {
          yearOptions.push(
            <option key={i} value={i}>
              {i}
            </option>
          );
        }
      
        return yearOptions;
      }
      
    render () {

        return (
            <div>
                <div>
                    <ul>{this.displayBudgetErrors()}</ul>
                </div>
                <div ref='postForm' class={`post-budget-container`}>
                    <form ref="postFormReset" onSubmit={this.submitBudget.bind(this)}>
                        <label for='month'>Month</label>
                            <br />
                            <select class='post-category-dropdown' ref='month' id='month' onChange={this.update('month')}>
                                <option value="" selected disabled hidden>Choose Month</option>
                                <option value="Jan">Jan</option>
                                <option value="Feb">Feb</option>
                                <option value="Mar">Mar</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="Aug">Aug</option>
                                <option value="Sept">Sept</option>
                                <option value="Oct">Oct</option>
                                <option value="Nov">Nov</option>
                                <option value="Dec">Dec</option>
                            </select>
                            <br /><br />
                        <label for='year'>Year</label>
                            <br/>
                            <select className='post-subject' id='year' onChange={this.update('year')}>
                                {this.generateYearOptions()}
                            </select>
                            <br/>
                        <label for='salary'>Annual Salary</label>
                            <br/>
                        <input class='post-subject' id='salary' type='number' onChange={this.update('salary')}/>
                            <br />
                        <input class='post-submit-button' type='submit' value='Create New Budget' />
                    </form>
                </div>
            </div>
        )
    }

}

export default NewBudgetForm;
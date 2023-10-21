import {connect} from 'react-redux';
import EditBudget from './edit_budget'
import {fetchBudgets, createBudget, resetBudgets} from '../actions/budget_actions';
import {fetchExpenses, createExpense, resetExpenses} from '../actions/expense_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.session.currentUser || JSON.parse(localStorage.getItem('loggedInUser')),
    currentBudget: state.entities.budgets[ownProps.match.params.budget_id],
    currentExpenses: Object.keys(state.entities.expenses).map((key) => state.entities.expenses[key])
})

const mapDispatchToProps = (dispatch) => ({
    fetchBudgets: (user_id) => dispatch(fetchBudgets(user_id)),
    resetBudgets: () => dispatch(resetBudgets()),
    fetchExpenses: (user_id, budget_id) => dispatch(fetchExpenses(user_id, budget_id)),
})

const EditBudgetContainer = connect(mapStateToProps, mapDispatchToProps)(EditBudget);

export default EditBudgetContainer;
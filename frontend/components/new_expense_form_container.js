import {connect} from 'react-redux';
import NewExpenseForm from './new_expense_form';
import {fetchExpenses, createExpense, resetExpenses, resetExpenseErrors, deleteExpense, updateExpense} from '../actions/expense_actions';
import {resetBudgets} from '../actions/budget_actions';

const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser,
    currentExpenses: Object.keys(state.entities.expenses).map((key) => state.entities.expenses[key]),
    expenseErrors: Object.keys(state.entities.expensesErrors).map((key) => {
        return `${key} ${state.entities.expensesErrors[key][0]}`;
    })
})
    
const mapDispatchToProps = (dispatch) => ({
    fetchExpenses: (user_id, budget_id) => dispatch(fetchExpenses(user_id, budget_id)),
    createExpense: (user_id, budget_id, expense) => dispatch(createExpense(user_id, budget_id, expense)),
    resetExpenses: () => dispatch(resetExpenses()),
    resetBudgets: () => dispatch(resetBudgets()),
    resetExpenseErrors: () => dispatch(resetExpenseErrors()),
    deleteExpense: (user_id, budget_id, expense_id) => dispatch(deleteExpense(user_id, budget_id, expense_id)),
    updateExpense: (user_id, budget_id, expense_id, updated_expense) => dispatch(updateExpense(user_id, budget_id, expense_id, updated_expense))
})

const NewExpenseFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewExpenseForm);

export default NewExpenseFormContainer;
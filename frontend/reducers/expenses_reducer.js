import {RECEIVE_EXPENSES, RECEIVE_EXPENSE, RESET_EXPENSES, UPDATE_WITH_DELETED_EXPENSE, RECEIVE_UPDATED_EXPENSE} from '../actions/expense_actions';
import merge from 'lodash/merge';

const expensesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_EXPENSES:
            const newState = {};
            action.expenses.forEach((expense) => {
                newState[expense.id] = expense;
            });
            return newState;
        case RECEIVE_EXPENSE:
            const newExpense = {[action.expense.id]: action.expense};
            return merge({}, state, newExpense);
        case UPDATE_WITH_DELETED_EXPENSE:
            const stateArray = Object.keys(state).map((key) => state[key]);
            const newStateWithoutDeletedExpense = stateArray.filter((expense) => {
                return expense.id !== action.expense.id
                }    
            )
            const newStateOkay= {};
            newStateWithoutDeletedExpense.forEach((single_expense) => {
                newStateOkay[single_expense.id] = single_expense;
            });
            return newStateOkay;
        case RECEIVE_UPDATED_EXPENSE:
                // Handle updating the expense here
                return {
                  ...state,
                  [action.updatedExpense.id]: action.updatedExpense,
                };
        case RESET_EXPENSES:
            return {};
        default:
            return state;
    }
};

export default expensesReducer
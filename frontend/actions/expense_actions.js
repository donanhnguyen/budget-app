import * as EXPENSEAPIUtil from '../util/expense_api_util';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const RECEIVE_EXPENSE = 'RECEIVE_EXPENSE';
export const RECEIVE_EXPENSE_ERRORS = 'RECEIVE_EXPENSE_ERRORS';
export const RESET_EXPENSES = 'RESET_EXPENSES';
export const RESET_EXPENSE_ERRORS = 'RESET_EXPENSE_ERRORS';
export const UPDATE_WITH_DELETED_EXPENSE = 'UPDATE_WITH_DELETED_EXPENSE';
export const RECEIVE_UPDATED_EXPENSE = 'RECEIVE_UPDATED_EXPENSE';

export const receiveExpenses = (expenses) => ({
    type: RECEIVE_EXPENSES,
    expenses: expenses
});

export const receiveExpense = (expense) => ({
    type: RECEIVE_EXPENSE,
    expense: expense
});

export const resetExpenses = () => ({
    type: RESET_EXPENSES,
})

export const receiveExpenseErrors = (errors) => ({
    type: RECEIVE_EXPENSE_ERRORS,
    errors: errors
})

export const resetExpenseErrors = () => ({
    type: RESET_EXPENSE_ERRORS
})

export const receiveUpdatedExpense = (updatedExpense) => {
    return {
        type: RECEIVE_UPDATED_EXPENSE,
        updatedExpense,
    };
};

export const updateWithDeletedExpense = (expense) => ({
    type: UPDATE_WITH_DELETED_EXPENSE,
    expense: expense
})

export const fetchExpenses = (user_id, budget_id) => {
    return function (dispatch) {
        EXPENSEAPIUtil.fetchExpenses(user_id, budget_id).then((all_expenses) =>  dispatch(receiveExpenses(all_expenses)))
    }
};

export const createExpense = (user_id, budget_id, expense) => {
    return function (dispatch) {
        EXPENSEAPIUtil.createExpense(user_id, budget_id, expense).then( (created_expense) => (
            dispatch(receiveExpense(created_expense))
        ), err => (
            dispatch(receiveExpenseErrors(err.responseJSON))
        ))
    }
};

export const deleteExpense = (user_id, budget_id, expense_id) => {
    return function (dispatch) {
        EXPENSEAPIUtil.deleteExpense(user_id, budget_id, expense_id).then((deleted_expense) => {
            dispatch(updateWithDeletedExpense(deleted_expense));
        })
    }
}

export const updateExpense = (user_id, budget_id, expense_id, updatedExpense) => {
    return function (dispatch) {
        EXPENSEAPIUtil.updateExpense(user_id, budget_id, expense_id, updatedExpense).then(
            (updated_expense) => {
                dispatch(receiveUpdatedExpense(updated_expense));
            },
            (err) => {
                dispatch(receiveExpenseErrors(err.responseJSON));
            }
        );
    };
};

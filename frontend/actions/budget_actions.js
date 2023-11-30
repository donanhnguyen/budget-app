import * as BudgetAPIUtil from '../util/budget_api_util';
export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS';
export const RECEIVE_BUDGET = 'RECEIVE_BUDGET';
export const RECEIVE_BUDGET_ERRORS = 'RECEIVE_BUDGET_ERRORS';
export const RESET_BUDGETS = 'RESET_BUDGETS';
export const RESET_BUDGET_ERRORS = 'RESET_BUDGET_ERRORS';
export const UPDATE_WITH_DELETED_BUDGET = 'UPDATE_WITH_DELETED_BUDGET';

export const receiveBudgets = (budgets) => ({
    type: RECEIVE_BUDGETS,
    budgets: budgets
});

export const receiveBudget = (budget) => ({
    type: RECEIVE_BUDGET,
    budget: budget
});

export const resetBudgets = () => ({
    type: RESET_BUDGETS,
})

export const receiveBudgetErrors = (errors) => ({
    type: RECEIVE_BUDGET_ERRORS,
    errors: errors
})

export const resetBudgetErrors = () => ({
    type: RESET_BUDGET_ERRORS
})

export const updateWithDeletedBudget = (budget) => ({
    type: UPDATE_WITH_DELETED_BUDGET,
    budget: budget
})

export const fetchBudgets = (user_id) => {
    return function (dispatch) {
        BudgetAPIUtil.fetchBudgets(user_id).then((all_budgets) =>  dispatch(receiveBudgets(all_budgets)))
    }
};

export const createBudget = (user_id, budget) => {
    return function (dispatch) {
        BudgetAPIUtil.createBudget(user_id, budget).then( (created_budget) => (
            dispatch(receiveBudget(created_budget))
        ), err => {
                dispatch(receiveBudgetErrors(err.responseJSON))
                setTimeout(() => {
                    dispatch(resetBudgetErrors())
                }, 2000)
            }
        )
    }
};

export const deleteBudget = (user_id, budget_id) => {
    return function (dispatch) {
        BudgetAPIUtil.deleteBudget(user_id, budget_id).then((deleted_budget) => {
            dispatch(updateWithDeletedBudget(deleted_budget));
        })
    }
}
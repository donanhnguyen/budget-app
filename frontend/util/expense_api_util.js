export const fetchExpenses = (user_id, budget_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/users/${user_id}/budgets/${budget_id}/expenses`
    })
};

export const createExpense = (user_id, budget_id, expense) => (
    $.ajax({
        method: 'POST',
        url: `api/users/${user_id}/budgets/${budget_id}/expenses`,
        data: {expense}
    })
);

export const updateExpense = (user_id, budget_id, expense_id, expense) => (
    $.ajax({
        method: 'PATCH',
        url: `api/users/${user_id}/budgets/${budget_id}/expenses/${expense_id}`,
        data: { expense }
    })
);

export const deleteExpense = (user_id, budget_id, expense_id) => (
    $.ajax({
        method: 'DELETE',
        url: `api/users/${user_id}/budgets/${budget_id}/expenses/${expense_id}`
    })
)

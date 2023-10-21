import React, { useState} from 'react';

const Expense = ({ expense, currentUserId, currentBudget, deleteExpense, updateExpense }) => {

    const [editMode, setEditMode] = useState(false);
    const [newDescription, setNewDescription] = useState(expense.description);
    const [newAmount, setNewAmount] = useState();

    const deleteExpenseHandler = () => {
        const confirmMessage = window.confirm('Are you sure you want to delete this expense?');
        if (confirmMessage) {
            deleteExpense(currentUserId, currentBudget.id, expense.id);
            setNewAmount();
            setNewDescription(expense.description);
            setEditMode(false);
        }
    };

    const handleEditExpense = () => {
        const body = {
            ...expense,
            amount: newAmount,
            description: newDescription
        }
        if (newDescription.length && newAmount && newAmount != 0) {
            updateExpense(currentUserId, currentBudget.id, expense.id, body)
            setNewAmount();
            setNewDescription(expense.description);
            setEditMode(false);
        }
    }

  return (
    <div>
      <h1>
        {expense.date} : {expense.category}
      </h1>

      {editMode ? 
        <>
            <label>Amount</label>
            <input type='number' className='edit-expense-input' onChange={(e) => setNewAmount(e.target.value)}></input>
        </>
        :
        <p>Amount: ${expense.amount}</p>
        }

      <p>Description:</p>

        {editMode ? 
        <input type='text' onChange={(e) => setNewDescription(e.target.value)}></input>
        :
        <p>{expense.description}</p>
        }
        <br></br>
      <button className="post-submit-button" onClick={deleteExpenseHandler}>Delete Expense</button>

      {editMode ?
        <>
        <button onClick={handleEditExpense}>Edit</button><button onClick={() => setEditMode((prevState) => !prevState)}>Cancel</button>
        </>  
        :
        <button className="post-submit-button" onClick={() => setEditMode((prevState) => !prevState)}>Edit Expense</button>
        }
      
    </div>
  );
};

export default Expense;

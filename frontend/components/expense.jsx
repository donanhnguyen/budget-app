import React, { useState} from 'react';

const Expense = ({ expense, currentUserId, currentBudget, deleteExpense, updateExpense }) => {

    const [editMode, setEditMode] = useState(false);
    const [newDescription, setNewDescription] = useState(expense.description);
    const [newAmount, setNewAmount] = useState(expense.amount);
    const parts = expense.date.split('-');
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

    const deleteExpenseHandler = () => {
        const confirmMessage = window.confirm('Are you sure you want to delete this expense?');
        if (confirmMessage) {
            deleteExpense(currentUserId, currentBudget.id, expense.id);
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
            setEditMode(false);
        }
    }

  return (
    <div>
      <h1>
        {formattedDate} : {expense.category}
      </h1>

      {editMode ? 
        <>
            <p>Amount</p>
            <input type='number' className='edit-expense-input' onChange={(e) => setNewAmount(e.target.value)} value={newAmount}></input>
        </>
        :
        <p>Amount: ${expense.amount}</p>
        }

      <p>Description:</p>

        {editMode ? 
        <input type='text' onChange={(e) => setNewDescription(e.target.value)} value={newDescription}></input>
        :
        <p>{expense.description}</p>
        }

        {!editMode ?
        <button className="post-submit-button" onClick={deleteExpenseHandler}>Delete Expense</button>
        :""}
    
      {editMode ?
        <>
        <br></br>
        <button className='expense-edit-button' onClick={handleEditExpense}>Edit</button><button className='expense-edit-button' onClick={() => setEditMode((prevState) => !prevState)}>Cancel</button>
        </>  
        :
        <button className="edit-expense-button" onClick={() => setEditMode((prevState) => !prevState)}>Edit Expense</button>
        }
      
    </div>
  );
};

export default Expense;

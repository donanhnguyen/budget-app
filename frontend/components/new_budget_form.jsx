import React, { useState, useRef, useEffect } from 'react';

const NewBudgetForm = (props) => {
  const [budget, setBudget] = useState({
    month: null,
    year: null,
    salary: null,
    user_id: props.currentUser ? props.currentUser.id : null,
  });

  const postFormRef = useRef(null);
  const monthRef = useRef(null);

//   useEffect(() => {
//     props.resetBudgetErrors();
//   }, [props]);

  const update = (field) => (event) => {
    setBudget({
      ...budget,
      [field]: event.currentTarget.value,
    });
  };

  const clearForm = () => {
    monthRef.current.selectedIndex = 0;
    setBudget({
      month: '',
      year: '',
      salary: '',
    });
  };

  const submitBudget = (event) => {
    event.preventDefault();
    props.createBudget(props.currentUser.id, budget);
    props.resetBudgetErrors();
    clearForm();
  };

  const displayBudgetErrors = () => {
    if (props.budgetErrors.length > 0) {
      return props.budgetErrors.map((error, i) => (
        <li style={{ color: 'red' }} key={`${i}`}>
          {error}
        </li>
      ));
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const yearsToShow = 10;

    const yearOptions = [];
    for (let i = currentYear; i >= currentYear - yearsToShow; i--) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return yearOptions;
  };

  return (
    <div>
      <div>
        <ul>{displayBudgetErrors()}</ul>
      </div>
      <div ref={postFormRef} className={`post-budget-container`}>
        <form onSubmit={submitBudget}>
          <label htmlFor='month'>Month</label>
          <br />
          <select
            className='post-category-dropdown'
            ref={monthRef}
            id='month'
            onChange={update('month')}
            
          >
            <option value='' selected disabled hidden>
              Choose Month
            </option>
            <option value='Jan'>Jan</option>
            <option value='Feb'>Feb</option>
            <option value='Mar'>Mar</option>
            <option value='April'>April</option>
            <option value='May'>May</option>
            <option value='June'>June</option>
            <option value='July'>July</option>
            <option value='Aug'>Aug</option>
            <option value='Sept'>Sept</option>
            <option value='Oct'>Oct</option>
            <option value='Nov'>Nov</option>
            <option value='Dec'>Dec</option>
          </select>
          <br /><br />
          <label htmlFor='year'>Year</label>
          <br />
          <select
            className='post-subject'
            id='year'
            onChange={update('year')}
            value={budget.year}
          >
            <option value="" disabled selected>
                Year
            </option>
            {generateYearOptions()}
          </select>
          <br />
          <label htmlFor='salary'>Annual Salary</label>
          <br />
          <input
            className='post-subject'
            id='salary'
            type='number'
            onChange={update('salary')}
            value={budget.salary}
          />
          <br />
          <input className='post-submit-button' type='submit' value='Create New Budget' />
        </form>
      </div>
    </div>
  );
};

export default NewBudgetForm;

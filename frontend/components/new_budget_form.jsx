import React, { useState, useRef, useEffect } from 'react';

const NewBudgetForm = (props) => {
  const [budget, setBudget] = useState({
    month: null,
    year: null,
    salary: null,
    user_id: props.currentUser ? props.currentUser.id : (JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')).id : null  ),
  });

  useEffect(() => {
    setBudget((prevState) => {
      return {
        ...prevState,
        user_id: JSON.parse(localStorage.getItem('loggedInUser')).id
      }
    })
  }, [])

  const postFormRef = useRef(null);
  const monthRef = useRef(null);

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
    props.createBudget(JSON.parse(localStorage.getItem('loggedInUser')).id, budget);
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

            <form onSubmit={submitBudget} className="custom-budget-form">
            <label htmlFor='month' className="custom-form-label">Month</label>
            <br />
            <select
                className='custom-category-dropdown'
                ref={monthRef}
                id='month'
                onChange={update('month')}
            >
                    <option value='' selected disabled hidden>
                      Choose Month
                    </option>
                    <option value='January'>January</option>
                    <option value='February'>February</option>
                    <option value='March'>March</option>
                    <option value='April'>April</option>
                    <option value='May'>May</option>
                    <option value='June'>June</option>
                    <option value='July'>July</option>
                    <option value='August'>August</option>
                    <option value='September'>September</option>
                    <option value='October'>October</option>
                    <option value='November'>November</option>
                    <option value='December'>December</option>
            </select>
            <label htmlFor='year' className="custom-form-label">Year</label>
            <br />
            <select
                className='custom-subject'
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
            <label htmlFor='salary' className="custom-form-label">Annual Salary</label>
            <br />
            <input
                className='custom-subject'
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

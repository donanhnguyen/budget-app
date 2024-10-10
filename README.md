### Budget App

[Video Link](https://www.youtube.com/watch?v=bFmg4_Urr7A)
<br>
[Live Link](https://budget-app-m0c9.onrender.com/#/)

- Full-Stack application allowing users to manage their monthly budgets and expenses.
- Pie chart programmed and displayed dynamically for data visualization (D3.js) for paycheck calculations and info.
- Technologies Used: Javascript, D3.js, React.js, HTML, CSS, Webpack, Ruby, Rails, PostgreSQL.	

<h1>Run Project Locally</h1>

Git clone the project using:

`git clone https://github.com/donanhnguyen/budget-app.git`

Then, CD into project:

`cd budget-app`

Install homebrew in order to install Ruby:

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" `

Check if homebrew is installed by running:

`brew --version`

Install ruby using rbenv:

`rbenv install 3.2.0`

Install bundles:

`bundle install`

Install NPM and Javascript packages:

`npm install`

Create rails database:

`bundle e rails db:setup`

Migrate:

`bundle e rails db:migrate`

Check if postgres is installed by running:

`postgres -V`

If not, then run:

`brew install postgresql`

Start PostgreSQL:

`brew services start postgresql`

Run the rails server:
`
bundle e rails s`

When the server is running, access http://localhost:3000.

<h1>Project Directions:</h1>

1. Create an account.

2. Access your budgets at the top left-corner at "Your Budgets".

3. Create a budget by the month, enter the month and year, and annual salary. Your salary will then automatically be taxed based on how much money you make.

4. Enter your budget page and see the breakdown of where your money is going.

5. Then add your expenses, and at the end of the month, see how much take-home money you have left.

<h1>Home Greeting Page</h1>

<br>
<div align='center'>
    <img src='./images/image1.png' width=100%/>
</div>
<br>


<h1>Login/Signup Page</h1>

<br>
<div align='center'>
    <img src='./images/image2.png' width=100%/>
</div>
<br>

<h1>List of budgets</h1>

<br>
<div align='center'>
    <img src='./images/image3.png' width=100%/>
</div>
<br>

<h1>Budget and expense tracker with pie chart</h1>

<br>
<div align='center'>
    <img src='./images/image4.png' width=100%/>
</div>
<br>
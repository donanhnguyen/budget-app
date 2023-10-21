class Api::ExpensesController < ApplicationController

    def index
        @user = User.find(params[:user_id])
        @budget = @user.budgets.find_by(id: params[:budget_id])
        @all_expenses = @budget.expenses
        render :index
    end

    def create
      @user = User.find(params[:user_id])
      @budget = @user.budgets.find_by(id: params[:budget_id])
      @expense = @budget.expenses.create(expense_params)
      if @expense.save
        render :show
      else
        render json: @expense.errors, status: :unprocessable_entity
      end
    end

    def update
      @user = User.find(params[:user_id])
      @budget = @user.budgets.find_by(id: params[:budget_id])
      @expense = @budget.expenses.find(params[:id])
    
      if @expense.update(expense_params)
        render :show
      else
        render json: @expense.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @expense = Expense.find(params[:id])
      @expense.destroy
      render :show
    end

    private

    def expense_params
      params.require(:expense).permit(
        :category,
        :description,
        :date,
        :amount,
        :budget_id,
      )
    end

end

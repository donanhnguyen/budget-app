Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index] do 
      resources :budgets, only: [:create, :index, :show, :destroy, :update] do
        resources :expenses, only: [:create, :index, :show, :destroy, :update]
      end
    end
    resource :session, only: [:create, :destroy, :show, :index]
  end

  root "root_page#root"

end

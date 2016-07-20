Rails.application.routes.draw do
  get 'page/index'

  resources :records
    root 'records#index'
end

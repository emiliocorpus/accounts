Rails.application.routes.draw do
  resources :records
    root 'welcome#index'


end
